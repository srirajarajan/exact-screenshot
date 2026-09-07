import {
  BACKDROPS,
  DECOR,
  FLORALS,
  LIGHTING,
  SOFAS,
  STAGES,
  findItem,
  type LightingItem,
} from "./catalog";

export type StudioConfig = {
  eventType: string;
  guestCount: number;
  stageId: string;
  floralId: string;
  sofaId: string;
  backdropId: string;
  lightingId: string;
  decorIds: string[];
};

export const DEFAULT_CONFIG: StudioConfig = {
  eventType: "wedding",
  guestCount: 350,
  stageId: "stage-03",
  floralId: "floral-05",
  sofaId: "sofa-02",
  backdropId: "backdrop-04",
  lightingId: "light-03",
  decorIds: ["decor-01", "decor-05"],
};

export type EstimateLine = { label: string; name: string; price: number };

export type Estimate = {
  lines: EstimateLine[];
  subtotal: number;
  guestUplift: number;
  low: number;
  high: number;
};

export function resolveConfig(config: StudioConfig) {
  return {
    stage: findItem(STAGES, config.stageId),
    floral: findItem(FLORALS, config.floralId),
    sofa: findItem(SOFAS, config.sofaId),
    backdrop: findItem(BACKDROPS, config.backdropId),
    lighting: findItem(LIGHTING, config.lightingId) as LightingItem,
    decor: DECOR.filter((d) => config.decorIds.includes(d.id)),
  };
}

/** Guests above 200 add scale cost at 1.5% of the base per 50 guests. */
export function estimate(config: StudioConfig): Estimate {
  const r = resolveConfig(config);
  const decorTotal = r.decor.reduce((sum, d) => sum + d.price, 0);

  const lines: EstimateLine[] = [
    { label: "Stage Design", name: r.stage.name, price: r.stage.price },
    { label: "Floral Design", name: r.floral.name, price: r.floral.price },
    { label: "Seating", name: r.sofa.name, price: r.sofa.price },
    { label: "Backdrop", name: r.backdrop.name, price: r.backdrop.price },
    { label: "Lighting", name: r.lighting.name, price: r.lighting.price },
    {
      label: "Decor",
      name: r.decor.length ? `${r.decor.length} elements` : "None selected",
      price: decorTotal,
    },
  ];

  const subtotal = lines.reduce((s, l) => s + l.price, 0);
  const extraBlocks = Math.max(0, Math.ceil((config.guestCount - 200) / 50));
  const guestUplift = Math.round(subtotal * 0.015 * extraBlocks);
  const base = subtotal + guestUplift;

  return {
    lines,
    subtotal,
    guestUplift,
    low: Math.round(base / 1000) * 1000,
    high: Math.round((base * 1.18) / 1000) * 1000,
  };
}
