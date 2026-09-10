import { STYLE_PRESETS } from "./catalog";
import type { StudioConfig } from "./config";

export type Concept = {
  summary: string;
  config: Partial<StudioConfig>;
};

/**
 * Mock AI Event Designer.
 *
 * Keyword-matched for now; the signature is deliberately async-ready so an
 * AI call can replace the body without touching the calling component.
 */
export function conceptFromDescription(text: string): Concept {
  const t = text.toLowerCase();

  const presetId =
    (t.includes("modern") || t.includes("contemporary") || t.includes("minimal")) ? "contemporary"
    : (t.includes("traditional") || t.includes("temple") || t.includes("marigold")) ? "traditional"
    : (t.includes("grand") || t.includes("spectacular") || t.includes("large")) ? "grand"
    : (t.includes("romantic") || t.includes("intimate") || t.includes("soft")) ? "romantic"
    : "royal";

  const preset = STYLE_PRESETS.find((p) => p.id === presetId) ?? STYLE_PRESETS[0]!;

  const eventType =
    t.includes("birthday") ? "birthday"
    : t.includes("engagement") ? "engagement"
    : t.includes("baby") ? "baby-shower"
    : t.includes("corporate") || t.includes("conference") ? "corporate"
    : t.includes("anniversar") ? "anniversary"
    : "wedding";

  const guestMatch = t.match(/(\d{2,5})\s*(guests|people|pax)?/);
  const guestCount = guestMatch ? Number(guestMatch[1]) : undefined;

  return {
    summary: `Concept created — a ${preset.name.toLowerCase()} direction`,
    config: {
      ...preset.config,
      eventType,
      ...(guestCount ? { guestCount } : {}),
    },
  };
}
