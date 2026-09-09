import { lazy, Suspense, useState } from "react";
import { Link } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { STYLE_PRESETS } from "@/lib/studio/catalog";
import { DEFAULT_CONFIG, type StudioConfig } from "@/lib/studio/config";
import { useHydrated } from "@/hooks/use-hydrated";

const StageScene = lazy(() =>
  import("@/components/studio/StageScene").then((m) => ({ default: m.StageScene })),
);

export function StudioPreview() {
  const hydrated = useHydrated();
  const [presetId, setPresetId] = useState("royal");
  const preset = STYLE_PRESETS.find((p) => p.id === presetId) ?? STYLE_PRESETS[0]!;
  const config: StudioConfig = { ...DEFAULT_CONFIG, ...preset.config };

  return (
    <section className="border-y border-border bg-card/40 py-28 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-6">The Event Studio</p>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              See it. Design it.
              <br />
              <span className="text-champagne">Make it yours.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground lg:ml-auto">
              Choose your stage, swap the floral installation, change the seating
              and light the room — in three dimensions, before anything is built.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative mt-14 aspect-[16/10] w-full overflow-hidden border border-border bg-obsidian sm:aspect-[16/8]">
            {hydrated ? (
              <Suspense
                fallback={
                  <div className="flex size-full items-center justify-center text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                    Preparing the stage…
                  </div>
                }
              >
                <StageScene config={config} />
              </Suspense>
            ) : (
              <div className="flex size-full items-center justify-center text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                Preparing the stage…
              </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4">
              {STYLE_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPresetId(p.id)}
                  className={[
                    "pointer-events-auto border px-4 py-2 text-[0.6rem] uppercase tracking-[0.2em] backdrop-blur-md transition-colors",
                    p.id === presetId
                      ? "border-champagne bg-champagne/20 text-champagne"
                      : "border-border bg-background/50 text-foreground/70 hover:border-champagne/50",
                  ].join(" ")}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">{preset.description}</p>
            <Link
              to="/event-studio"
              className="border border-champagne px-8 py-4 text-[0.65rem] uppercase tracking-[0.24em] text-champagne transition-colors hover:bg-champagne hover:text-obsidian"
            >
              Open the Event Studio
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
