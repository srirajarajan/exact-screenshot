import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { Reveal } from "@/components/Reveal";
import { useHydrated } from "@/hooks/use-hydrated";
import { EVENT_TYPES, formatINR } from "@/lib/studio/catalog";
import { estimate, resolveConfig } from "@/lib/studio/config";
import { getVision } from "@/lib/studio/vision";

export const Route = createFileRoute("/event-vision/$id")({
  head: () => ({
    meta: [
      { title: "Your Event Vision | Maison Orchestra" },
      {
        name: "description",
        content:
          "A saved event design with stage, floral, seating, backdrop, lighting and decor selections plus an estimated investment range.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EventVisionPage,
});

function EventVisionPage() {
  const { id } = Route.useParams();
  const hydrated = useHydrated();
  const [copied, setCopied] = useState(false);
  const vision = hydrated ? getVision(id) : undefined;

  const data = useMemo(() => {
    if (!vision) return null;
    return {
      resolved: resolveConfig(vision.config),
      est: estimate(vision.config),
      eventName:
        EVENT_TYPES.find((t) => t.id === vision.config.eventType)?.name ??
        vision.config.eventType,
    };
  }, [vision]);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-28 pt-44 text-sm text-muted-foreground">
        Loading your Event Vision…
      </div>
    );
  }

  if (!vision || !data) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-28 pt-44">
        <h1 className="display text-4xl">Vision not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Event Visions are saved on the device where they were created. Design a
          new one in the Event Studio.
        </p>
        <Link
          to="/event-studio"
          search={{}}
          className="mt-8 inline-block border border-champagne px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.24em] text-champagne transition-colors hover:bg-champagne hover:text-obsidian"
        >
          Open the Event Studio
        </Link>
      </div>
    );
  }

  const { resolved, est, eventName } = data;

  function share() {
    const url = window.location.href;
    void navigator.clipboard?.writeText(url).then(
      () => {
        setCopied(true);
        toast.success("Link copied to clipboard.");
      },
      () => toast.error("Couldn't copy the link."),
    );
  }

  function download() {
    const lines = [
      `MAISON ORCHESTRA — EVENT VISION ${vision!.id}`,
      `Created ${new Date(vision!.createdAt).toLocaleDateString("en-IN")}`,
      "",
      `Event type: ${eventName}`,
      `Guests: ${vision!.config.guestCount}`,
      "",
      ...est.lines.map((l) => `${l.label}: ${l.name} — ${formatINR(l.price)}`),
      "",
      `Estimated investment: ${formatINR(est.low)} – ${formatINR(est.high)}`,
      "",
      "This is a design estimate, not a quotation. Final pricing follows a site visit.",
    ].join("\n");
    const blob = new Blob([lines], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${vision!.id}-event-vision.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <section className="mx-auto max-w-5xl px-6 pb-28 pt-40 lg:pt-48">
      <Reveal>
        <p className="eyebrow">Event Vision {vision.id}</p>
        <h1 className="display mt-5 text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05]">
          {eventName} for {vision.config.guestCount} guests
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Saved {new Date(vision.createdAt).toLocaleDateString("en-IN")} ·{" "}
          {vision.status ?? "New"}
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <dl className="mt-14 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Stage design", value: resolved.stage.name },
            { label: "Floral arrangement", value: resolved.floral.name },
            { label: "Seating", value: resolved.sofa.name },
            { label: "Backdrop", value: resolved.backdrop.name },
            { label: "Lighting", value: resolved.lighting.name },
            {
              label: "Decor elements",
              value: resolved.decor.length
                ? resolved.decor.map((d) => d.name).join(", ")
                : "None selected",
            },
          ].map((row) => (
            <div key={row.label} className="bg-background p-7">
              <dt className="text-[0.6rem] uppercase tracking-[0.24em] text-champagne">
                {row.label}
              </dt>
              <dd className="mt-3 text-sm text-foreground/85">{row.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-14 border border-border p-8">
          <p className="eyebrow mb-6">Estimated investment</p>
          <ul className="space-y-3">
            {est.lines.map((l) => (
              <li
                key={l.label}
                className="flex items-baseline justify-between gap-6 border-b border-border/60 pb-3 text-sm"
              >
                <span className="text-muted-foreground">
                  {l.label} — {l.name}
                </span>
                <span className="text-foreground/85">{formatINR(l.price)}</span>
              </li>
            ))}
            {est.guestUplift > 0 && (
              <li className="flex items-baseline justify-between gap-6 border-b border-border/60 pb-3 text-sm">
                <span className="text-muted-foreground">
                  Scale for {vision.config.guestCount} guests
                </span>
                <span className="text-foreground/85">
                  {formatINR(est.guestUplift)}
                </span>
              </li>
            )}
          </ul>
          <p className="display mt-8 text-4xl text-champagne">
            {formatINR(est.low)} – {formatINR(est.high)}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            A design estimate, not a quotation. Final pricing follows a site
            visit and production plan.
          </p>
        </div>
      </Reveal>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          to="/contact"
          className="border border-champagne bg-champagne px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.24em] text-obsidian transition-opacity hover:opacity-85"
        >
          Request a quote
        </Link>
        <button
          type="button"
          onClick={share}
          className="border border-foreground/30 px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.24em] transition-colors hover:border-champagne hover:text-champagne"
        >
          {copied ? "Link copied" : "Share vision"}
        </button>
        <button
          type="button"
          onClick={download}
          className="border border-foreground/30 px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.24em] transition-colors hover:border-champagne hover:text-champagne"
        >
          Download summary
        </button>
        <Link
          to="/event-studio"
          search={{
            event: vision.config.eventType,
            guests: vision.config.guestCount,
          }}
          className="border border-foreground/30 px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.24em] transition-colors hover:border-champagne hover:text-champagne"
        >
          Keep editing
        </Link>
      </div>
    </section>
  );
}
