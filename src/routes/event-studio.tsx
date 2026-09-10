import { lazy, Suspense, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Maximize2, RotateCcw, Sparkles, ZoomIn, ZoomOut } from "lucide-react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { useHydrated } from "@/hooks/use-hydrated";
import {
  BACKDROPS,
  DECOR,
  EVENT_TYPES,
  FLORALS,
  LIGHTING,
  SOFAS,
  STAGES,
  STYLE_PRESETS,
  formatINR,
} from "@/lib/studio/catalog";
import { DEFAULT_CONFIG, estimate, type StudioConfig } from "@/lib/studio/config";
import { saveVision } from "@/lib/studio/vision";
import { conceptFromDescription } from "@/lib/studio/ai-designer";
import { DecorToggles, ModuleSelector } from "@/components/studio/ModuleSelector";

const StageScene = lazy(() =>
  import("@/components/studio/StageScene").then((m) => ({ default: m.StageScene })),
);

const searchSchema = z.object({
  event: z.string().optional(),
  preset: z.string().optional(),
  guests: z.coerce.number().optional(),
});

const TITLE = "Event Studio — Design Your Stage in 3D | Maison Orchestra";
const DESC =
  "Choose your stage, floral arrangement, seating, backdrop, lighting and decor in 3D — and see an instant estimated price.";

export const Route = createFileRoute("/event-studio")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: EventStudioPage,
});

const TABS = [
  { id: "event", label: "Event" },
  { id: "stage", label: "Stage" },
  { id: "floral", label: "Floral" },
  { id: "sofa", label: "Seating" },
  { id: "backdrop", label: "Backdrop" },
  { id: "lighting", label: "Lighting" },
  { id: "decor", label: "Decor" },
  { id: "style", label: "Styles" },
] as const;

function EventStudioPage() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const initial = useMemo<StudioConfig>(() => {
    const preset = STYLE_PRESETS.find((p) => p.id === search.preset);
    return {
      ...DEFAULT_CONFIG,
      ...(preset ? preset.config : {}),
      ...(search.event ? { eventType: search.event } : {}),
      ...(search.guests ? { guestCount: search.guests } : {}),
    };
  }, [search.preset, search.event, search.guests]);

  const [config, setConfig] = useState<StudioConfig>(initial);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("stage");
  const [panelOpen, setPanelOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const est = useMemo(() => estimate(config), [config]);

  const set = <K extends keyof StudioConfig>(key: K, value: StudioConfig[K]) =>
    setConfig((c) => ({ ...c, [key]: value }));

  const toggleDecor = (id: string) =>
    setConfig((c) => ({
      ...c,
      decorIds: c.decorIds.includes(id)
        ? c.decorIds.filter((d) => d !== id)
        : [...c.decorIds, id],
    }));

  function applyPreset(id: string) {
    const preset = STYLE_PRESETS.find((p) => p.id === id);
    if (!preset) return;
    setConfig((c) => ({ ...c, ...preset.config }));
    toast.success(`${preset.name} style applied`);
  }

  function resetView() {
    controlsRef.current?.reset();
  }

  function zoom(factor: number) {
    const c = controlsRef.current;
    if (!c) return;
    const cam = c.object;
    cam.position.multiplyScalar(factor);
    c.update();
  }

  function fullscreen() {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.();
  }

  function onSave() {
    const vision = saveVision(config);
    toast.success(`Saved as ${vision.id}`);
    void navigate({ to: "/event-vision/$id", params: { id: vision.id } });
  }

  function runConcept() {
    if (!prompt.trim()) {
      toast.error("Describe your event first");
      return;
    }
    const concept = conceptFromDescription(prompt);
    setConfig((c) => ({ ...c, ...concept.config }));
    toast.success(concept.summary);
  }

  const eventName =
    EVENT_TYPES.find((e) => e.id === config.eventType)?.name ?? "Celebration";

  return (
    <div className="pt-20">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-6 px-6 py-10 lg:px-12">
          <div>
            <p className="eyebrow mb-4">Event Studio</p>
            <h1 className="display text-4xl sm:text-5xl">Design your event.</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Choose your stage. Customize your vision. See it come alive.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPanelOpen((v) => !v)}
            className="border border-champagne/50 px-6 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-champagne xl:hidden"
          >
            {panelOpen ? "Close controls" : "Customize"}
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-px bg-border xl:grid-cols-12">
        {/* LEFT — controls */}
        <aside
          className={[
            "bg-background xl:col-span-3 xl:block",
            panelOpen ? "block" : "hidden",
          ].join(" ")}
        >
          <div className="flex flex-wrap gap-1 border-b border-border p-4">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={[
                  "px-3 py-2 text-[0.6rem] uppercase tracking-[0.18em] transition-colors",
                  tab === t.id
                    ? "bg-champagne text-obsidian"
                    : "text-muted-foreground hover:text-champagne",
                ].join(" ")}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="max-h-[70vh] space-y-8 overflow-y-auto p-6">
            {tab === "event" ? (
              <section>
                <h2 className="eyebrow mb-4">What are you celebrating?</h2>
                <div className="grid grid-cols-2 gap-2">
                  {EVENT_TYPES.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => set("eventType", e.id)}
                      aria-pressed={config.eventType === e.id}
                      className={[
                        "border p-3 text-left text-xs transition-colors",
                        config.eventType === e.id
                          ? "border-champagne bg-champagne/10"
                          : "border-border hover:border-champagne/50",
                      ].join(" ")}
                    >
                      {e.name}
                    </button>
                  ))}
                </div>

                <label
                  htmlFor="guests"
                  className="eyebrow mb-3 mt-8 block"
                >
                  Guest count — {config.guestCount}
                </label>
                <input
                  id="guests"
                  type="range"
                  min={30}
                  max={1500}
                  step={10}
                  value={config.guestCount}
                  onChange={(e) => set("guestCount", Number(e.target.value))}
                  className="w-full accent-champagne"
                />
              </section>
            ) : null}

            {tab === "stage" ? (
              <ModuleSelector
                title="Choose your stage"
                items={STAGES}
                selectedId={config.stageId}
                onSelect={(id) => set("stageId", id)}
              />
            ) : null}

            {tab === "floral" ? (
              <ModuleSelector
                title="Choose your floral arrangement"
                items={FLORALS}
                selectedId={config.floralId}
                onSelect={(id) => set("floralId", id)}
              />
            ) : null}

            {tab === "sofa" ? (
              <ModuleSelector
                title="Choose your seating"
                items={SOFAS}
                selectedId={config.sofaId}
                onSelect={(id) => set("sofaId", id)}
              />
            ) : null}

            {tab === "backdrop" ? (
              <ModuleSelector
                title="Choose your backdrop"
                items={BACKDROPS}
                selectedId={config.backdropId}
                onSelect={(id) => set("backdropId", id)}
              />
            ) : null}

            {tab === "lighting" ? (
              <ModuleSelector
                title="Lighting experience"
                items={LIGHTING}
                selectedId={config.lightingId}
                onSelect={(id) => set("lightingId", id)}
              />
            ) : null}

            {tab === "decor" ? (
              <DecorToggles
                items={DECOR}
                selectedIds={config.decorIds}
                onToggle={toggleDecor}
              />
            ) : null}

            {tab === "style" ? (
              <section>
                <h2 className="eyebrow mb-4">Style presets</h2>
                <div className="space-y-2">
                  {STYLE_PRESETS.map((p) => (
                    <div key={p.id} className="border border-border p-4">
                      <h3 className="display text-xl uppercase">{p.name}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {p.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => applyPreset(p.id)}
                        className="mt-4 w-full border border-champagne/50 py-2.5 text-[0.6rem] uppercase tracking-[0.2em] text-champagne transition-colors hover:bg-champagne hover:text-obsidian"
                      >
                        Apply style
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border border-border p-4">
                  <h3 className="eyebrow mb-3 flex items-center gap-2">
                    <Sparkles className="size-3" /> Describe your dream event
                  </h3>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={3}
                    placeholder="I want a luxury birthday celebration for 150 guests with a modern floral stage."
                    className="w-full resize-none border border-border bg-transparent p-3 text-xs outline-none focus:border-champagne"
                  />
                  <button
                    type="button"
                    onClick={runConcept}
                    className="mt-3 w-full border border-champagne/50 py-2.5 text-[0.6rem] uppercase tracking-[0.2em] text-champagne transition-colors hover:bg-champagne hover:text-obsidian"
                  >
                    Create concept
                  </button>
                </div>
              </section>
            ) : null}
          </div>
        </aside>

        {/* CENTER — 3D stage */}
        <div className="bg-background xl:col-span-6">
          <div
            ref={frameRef}
            className="relative aspect-square w-full bg-obsidian sm:aspect-[4/3] xl:aspect-auto xl:h-[calc(100vh-13rem)]"
          >
            {hydrated ? (
              <Suspense
                fallback={
                  <div className="flex size-full items-center justify-center text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                    Building your stage…
                  </div>
                }
              >
                <StageScene config={config} controlsRef={controlsRef} />
              </Suspense>
            ) : (
              <div className="flex size-full items-center justify-center text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                Building your stage…
              </div>
            )}

            <div className="absolute right-4 top-4 flex flex-col gap-2">
              {[
                { icon: ZoomIn, label: "Zoom in", fn: () => zoom(0.85) },
                { icon: ZoomOut, label: "Zoom out", fn: () => zoom(1.18) },
                { icon: RotateCcw, label: "Reset view", fn: resetView },
                { icon: Maximize2, label: "Fullscreen", fn: fullscreen },
              ].map(({ icon: Icon, label, fn }) => (
                <button
                  key={label}
                  type="button"
                  onClick={fn}
                  aria-label={label}
                  title={label}
                  className="border border-border bg-background/60 p-2.5 text-foreground/70 backdrop-blur-md transition-colors hover:border-champagne hover:text-champagne"
                >
                  <Icon className="size-4" />
                </button>
              ))}
            </div>

            <p className="pointer-events-none absolute bottom-4 left-4 text-[0.6rem] uppercase tracking-[0.24em] text-foreground/40">
              Drag to rotate · Scroll to zoom
            </p>
          </div>
        </div>

        {/* RIGHT — summary */}
        <aside className="bg-background xl:col-span-3">
          <div className="p-6 lg:p-8">
            <h2 className="eyebrow mb-6">Your event</h2>
            <p className="display text-3xl">{eventName}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {config.guestCount} guests
            </p>

            <dl className="mt-8 space-y-4">
              {est.lines.map((line) => (
                <div key={line.label} className="border-b border-border pb-3">
                  <dt className="flex items-baseline justify-between gap-4">
                    <span className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                      {line.label}
                    </span>
                    <span className="text-sm text-champagne">
                      {formatINR(line.price)}
                    </span>
                  </dt>
                  <dd className="mt-1 text-xs text-foreground/70">{line.name}</dd>
                </div>
              ))}
              {est.guestUplift > 0 ? (
                <div className="flex items-baseline justify-between border-b border-border pb-3">
                  <span className="text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Scale ({config.guestCount} guests)
                  </span>
                  <span className="text-sm text-champagne">
                    {formatINR(est.guestUplift)}
                  </span>
                </div>
              ) : null}
            </dl>

            <div className="mt-8">
              <p className="eyebrow">Estimated price</p>
              <p className="display mt-3 text-3xl text-champagne">
                {formatINR(est.low)} – {formatINR(est.high)}
              </p>
              <p className="mt-4 text-[0.65rem] leading-relaxed text-muted-foreground">
                Final pricing is subject to consultation, availability, venue
                requirements and final quotation.
              </p>
            </div>

            <div className="mt-8 space-y-2">
              <button
                type="button"
                onClick={onSave}
                className="w-full border border-champagne bg-champagne py-4 text-[0.65rem] uppercase tracking-[0.24em] text-obsidian transition-opacity hover:opacity-85"
              >
                Save your event vision
              </button>
              <Link
                to="/contact"
                className="block w-full border border-border py-4 text-center text-[0.65rem] uppercase tracking-[0.24em] transition-colors hover:border-champagne hover:text-champagne"
              >
                Request final quote
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
