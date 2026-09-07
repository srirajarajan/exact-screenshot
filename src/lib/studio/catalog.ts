/**
 * Event Studio catalog.
 *
 * This is the single source of truth for every configurable stage module.
 * It is intentionally shaped like database rows (id, name, price, modelUrl…)
 * so it can later be swapped for a Lovable Cloud query without touching any
 * component. Each module carries an optional `modelUrl` for a future
 * GLB/GLTF asset; while it is null the renderer falls back to the procedural
 * primitive geometry keyed by `variant`.
 */

export type ModuleKind =
  | "stage"
  | "floral"
  | "sofa"
  | "backdrop"
  | "lighting"
  | "decor";

export type CatalogItem = {
  id: string;
  kind: ModuleKind;
  name: string;
  description: string;
  price: number;
  variant: string;
  modelUrl: string | null;
  available: boolean;
  eventTypes?: string[];
};

export type EventType = {
  id: string;
  name: string;
  blurb: string;
};

export const EVENT_TYPES: EventType[] = [
  { id: "wedding", name: "Wedding", blurb: "Ceremony, reception and beyond" },
  { id: "birthday", name: "Birthday", blurb: "Milestones worth the spectacle" },
  { id: "engagement", name: "Engagement", blurb: "The beginning of the story" },
  { id: "baby-shower", name: "Baby Shower", blurb: "Soft, warm, intimate" },
  { id: "anniversary", name: "Anniversary", blurb: "Years, beautifully marked" },
  { id: "corporate", name: "Corporate", blurb: "Brand experiences at scale" },
  { id: "graduation", name: "Graduation", blurb: "A chapter, celebrated" },
  { id: "housewarming", name: "Housewarming", blurb: "New walls, new memories" },
  { id: "other", name: "Other", blurb: "Tell us what you're imagining" },
];

export const STAGES: CatalogItem[] = [
  { id: "stage-01", kind: "stage", name: "Stage 01 · Ivory Plinth", description: "Low architectural plinth with clean stepped edge.", price: 24000, variant: "plinth", modelUrl: null, available: true },
  { id: "stage-02", kind: "stage", name: "Stage 02 · Grand Riser", description: "Elevated riser with wide processional steps.", price: 32000, variant: "riser", modelUrl: null, available: true },
  { id: "stage-03", kind: "stage", name: "Stage 03 · Circular Dais", description: "Round dais with a sculpted champagne rim.", price: 35000, variant: "circle", modelUrl: null, available: true },
  { id: "stage-04", kind: "stage", name: "Stage 04 · Mandap Frame", description: "Four-pillar mandap structure with open canopy.", price: 46000, variant: "mandap", modelUrl: null, available: true },
  { id: "stage-05", kind: "stage", name: "Stage 05 · Reflective Runway", description: "Mirror-finish platform with an approach runway.", price: 52000, variant: "runway", modelUrl: null, available: true },
  { id: "stage-06", kind: "stage", name: "Stage 06 · Terrace Deck", description: "Open-air deck built for garden and beach venues.", price: 28000, variant: "deck", modelUrl: null, available: true },
];

export const FLORALS: CatalogItem[] = [
  { id: "floral-01", kind: "floral", name: "Symmetrical Floral Frame", description: "Matched twin frames in ivory rose and orchid.", price: 14000, variant: "frame", modelUrl: null, available: true },
  { id: "floral-02", kind: "floral", name: "Full Floral Arch", description: "A continuous arch of dense blooms overhead.", price: 22000, variant: "arch", modelUrl: null, available: true },
  { id: "floral-03", kind: "floral", name: "Hanging Floral Installation", description: "Suspended clusters descending from the ceiling.", price: 26000, variant: "hanging", modelUrl: null, available: true },
  { id: "floral-04", kind: "floral", name: "Side Floral Pillars", description: "Tall flanking pillars framing the seating.", price: 16000, variant: "pillars", modelUrl: null, available: true },
  { id: "floral-05", kind: "floral", name: "Layered Floral Wall", description: "A full wall of layered, tonal blooms.", price: 18000, variant: "wall", modelUrl: null, available: true },
  { id: "floral-06", kind: "floral", name: "Minimal Contemporary Florals", description: "Sparse sculptural stems, generous negative space.", price: 9000, variant: "minimal", modelUrl: null, available: true },
  { id: "floral-07", kind: "floral", name: "Luxury Cascading Arrangement", description: "Cascading garlands spilling from the structure.", price: 29000, variant: "cascade", modelUrl: null, available: true },
  { id: "floral-08", kind: "floral", name: "Traditional Floral Installation", description: "Marigold and jasmine in classical composition.", price: 15000, variant: "traditional", modelUrl: null, available: true },
];

export const SOFAS: CatalogItem[] = [
  { id: "sofa-01", kind: "sofa", name: "Royal Sofa", description: "Carved high-back throne seating for two.", price: 9000, variant: "royal", modelUrl: null, available: true },
  { id: "sofa-02", kind: "sofa", name: "Classic Sofa", description: "Tufted ivory settee with rolled arms.", price: 6000, variant: "classic", modelUrl: null, available: true },
  { id: "sofa-03", kind: "sofa", name: "Contemporary Sofa", description: "Low modular bench in bone linen.", price: 7000, variant: "contemporary", modelUrl: null, available: true },
  { id: "sofa-04", kind: "sofa", name: "Velvet Sofa", description: "Deep champagne velvet with brass feet.", price: 8500, variant: "velvet", modelUrl: null, available: true },
  { id: "sofa-05", kind: "sofa", name: "Traditional Sofa", description: "Hand-carved teak with silk bolsters.", price: 7500, variant: "traditional", modelUrl: null, available: true },
  { id: "sofa-06", kind: "sofa", name: "Modern Lounge", description: "Sculpted lounge pair with side table.", price: 6800, variant: "lounge", modelUrl: null, available: true },
];

export const BACKDROPS: CatalogItem[] = [
  { id: "backdrop-01", kind: "backdrop", name: "Floral Wall", description: "Full-height bloom wall behind the seating.", price: 16000, variant: "floral", modelUrl: null, available: true },
  { id: "backdrop-02", kind: "backdrop", name: "LED Screen", description: "Seamless LED canvas for motion content.", price: 24000, variant: "led", modelUrl: null, available: true },
  { id: "backdrop-03", kind: "backdrop", name: "Draped Fabric", description: "Soft ivory drapes with hidden uplights.", price: 10000, variant: "drape", modelUrl: null, available: true },
  { id: "backdrop-04", kind: "backdrop", name: "Architectural Panels", description: "Fluted panels in warm stone finish.", price: 12000, variant: "panels", modelUrl: null, available: true },
  { id: "backdrop-05", kind: "backdrop", name: "Traditional Backdrop", description: "Carved jali screens with warm wash.", price: 14000, variant: "jali", modelUrl: null, available: true },
  { id: "backdrop-06", kind: "backdrop", name: "Luxury Panels", description: "Mirror-inlay panels with champagne trim.", price: 21000, variant: "mirror", modelUrl: null, available: true },
  { id: "backdrop-07", kind: "backdrop", name: "Minimal Contemporary", description: "A single clean plane, precisely lit.", price: 8000, variant: "minimal", modelUrl: null, available: true },
  { id: "backdrop-08", kind: "backdrop", name: "Statement Installation", description: "Sculptural centrepiece as the backdrop.", price: 27000, variant: "statement", modelUrl: null, available: true },
];

export type LightingItem = CatalogItem & {
  key: string;
  ambient: number;
  keyIntensity: number;
  rim: string;
  fill: string;
};

export const LIGHTING: LightingItem[] = [
  { id: "light-01", key: "warm", kind: "lighting", name: "Warm Ambient", description: "Even, golden and forgiving.", price: 6000, variant: "warm", modelUrl: null, available: true, ambient: 0.55, keyIntensity: 1.6, rim: "#f0d9ae", fill: "#ffe6bd" },
  { id: "light-02", key: "romantic", kind: "lighting", name: "Romantic Glow", description: "Low candle-toned wash.", price: 7000, variant: "romantic", modelUrl: null, available: true, ambient: 0.32, keyIntensity: 1.9, rim: "#ffcf9b", fill: "#ffb98a" },
  { id: "light-03", key: "ballroom", kind: "lighting", name: "Grand Ballroom", description: "Bright chandelier-driven grandeur.", price: 9000, variant: "ballroom", modelUrl: null, available: true, ambient: 0.75, keyIntensity: 2.3, rim: "#fff2d8", fill: "#ffe9c8" },
  { id: "light-04", key: "contemporary", kind: "lighting", name: "Contemporary", description: "Crisp neutral white with clean shadow.", price: 7500, variant: "contemporary", modelUrl: null, available: true, ambient: 0.6, keyIntensity: 2, rim: "#eaf1ff", fill: "#ffffff" },
  { id: "light-05", key: "dramatic", kind: "lighting", name: "Dramatic", description: "Hard key, deep falloff, high contrast.", price: 8000, variant: "dramatic", modelUrl: null, available: true, ambient: 0.14, keyIntensity: 3.2, rim: "#ffd9a1", fill: "#8fa5c9" },
  { id: "light-06", key: "cinematic", kind: "lighting", name: "Cinematic", description: "Teal shadow against a warm key.", price: 8500, variant: "cinematic", modelUrl: null, available: true, ambient: 0.22, keyIntensity: 2.6, rim: "#7fd8d0", fill: "#ffcf9b" },
];

export const DECOR: CatalogItem[] = [
  { id: "decor-01", kind: "decor", name: "Chandeliers", description: "Crystal chandeliers above the stage.", price: 12000, variant: "chandelier", modelUrl: null, available: true },
  { id: "decor-02", kind: "decor", name: "Hanging Florals", description: "Suspended floral spheres.", price: 9000, variant: "hangingFloral", modelUrl: null, available: true },
  { id: "decor-03", kind: "decor", name: "Side Pillars", description: "Classical flanking pillars.", price: 7000, variant: "pillars", modelUrl: null, available: true },
  { id: "decor-04", kind: "decor", name: "LED Screen", description: "Additional side LED panels.", price: 15000, variant: "led", modelUrl: null, available: true },
  { id: "decor-05", kind: "decor", name: "Candle Installation", description: "Candle clusters lining the stage.", price: 5500, variant: "candles", modelUrl: null, available: true },
  { id: "decor-06", kind: "decor", name: "Welcome Sign", description: "Illuminated welcome monolith.", price: 4000, variant: "sign", modelUrl: null, available: true },
  { id: "decor-07", kind: "decor", name: "Decorative Panels", description: "Fretwork panels at the wings.", price: 6500, variant: "panels", modelUrl: null, available: true },
  { id: "decor-08", kind: "decor", name: "Aisle Decor", description: "Floral aisle markers and runner.", price: 8000, variant: "aisle", modelUrl: null, available: true },
  { id: "decor-09", kind: "decor", name: "Ceiling Installation", description: "Draped ceiling canopy overhead.", price: 18000, variant: "ceiling", modelUrl: null, available: true },
  { id: "decor-10", kind: "decor", name: "Photo Booth", description: "Styled photo corner with signage.", price: 9500, variant: "booth", modelUrl: null, available: true },
  { id: "decor-11", kind: "decor", name: "Entrance Decor", description: "Grand floral entrance archway.", price: 13000, variant: "entrance", modelUrl: null, available: true },
];

export type StylePreset = {
  id: string;
  name: string;
  description: string;
  config: {
    stageId: string;
    floralId: string;
    sofaId: string;
    backdropId: string;
    lightingId: string;
    decorIds: string[];
  };
};

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: "royal",
    name: "Royal",
    description: "Grand riser, throne seating, statement florals, golden light.",
    config: { stageId: "stage-04", floralId: "floral-07", sofaId: "sofa-01", backdropId: "backdrop-06", lightingId: "light-01", decorIds: ["decor-01", "decor-03", "decor-05"] },
  },
  {
    id: "romantic",
    name: "Romantic",
    description: "Soft blooms, classic settee, candlelight everywhere.",
    config: { stageId: "stage-03", floralId: "floral-02", sofaId: "sofa-02", backdropId: "backdrop-03", lightingId: "light-02", decorIds: ["decor-05", "decor-02"] },
  },
  {
    id: "contemporary",
    name: "Contemporary",
    description: "Architectural backdrop, modern seating, cinematic light.",
    config: { stageId: "stage-01", floralId: "floral-06", sofaId: "sofa-03", backdropId: "backdrop-04", lightingId: "light-06", decorIds: ["decor-04"] },
  },
  {
    id: "traditional",
    name: "Traditional",
    description: "Mandap frame, marigold installation, carved teak.",
    config: { stageId: "stage-04", floralId: "floral-08", sofaId: "sofa-05", backdropId: "backdrop-05", lightingId: "light-01", decorIds: ["decor-03", "decor-08", "decor-11"] },
  },
  {
    id: "grand",
    name: "Grand",
    description: "Reflective runway, floral wall, ballroom brilliance.",
    config: { stageId: "stage-05", floralId: "floral-05", sofaId: "sofa-04", backdropId: "backdrop-01", lightingId: "light-03", decorIds: ["decor-01", "decor-09", "decor-11", "decor-10"] },
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "One clean plane, sculptural stems, precise light.",
    config: { stageId: "stage-01", floralId: "floral-06", sofaId: "sofa-06", backdropId: "backdrop-07", lightingId: "light-04", decorIds: [] },
  },
];

export const CATALOG = {
  stages: STAGES,
  florals: FLORALS,
  sofas: SOFAS,
  backdrops: BACKDROPS,
  lighting: LIGHTING,
  decor: DECOR,
  presets: STYLE_PRESETS,
  eventTypes: EVENT_TYPES,
};

export function findItem(items: CatalogItem[], id: string) {
  return items.find((i) => i.id === id) ?? items[0]!;
}

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
