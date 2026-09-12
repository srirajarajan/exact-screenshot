import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { CASE_STUDIES, DESTINATIONS } from "@/lib/content";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const destination = DESTINATIONS.find((d) => d.slug === params.slug);
    if (!destination) throw notFound();
    return { destination };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Destination not found — Maison Orchestra" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.destination.name} Destination Wedding & Event Planner | Maison Orchestra`;
    const desc = `Event design and destination planning in ${loaderData.destination.name} — ${loaderData.destination.line}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: DestinationPage,
});

function DestinationPage() {
  const { destination } = Route.useLoaderData();

  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <img
          src={destination.image}
          alt={`Events in ${destination.name}`}
          width={900}
          height={1200}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="gradient-veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-20 pt-44 lg:px-12">
          <p className="eyebrow mb-6">Destination</p>
          <h1 className="display text-[clamp(2.5rem,8vw,6.5rem)]">
            {destination.name}
          </h1>
          <p className="mt-4 text-sm text-foreground/70">{destination.line}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-px bg-border lg:grid-cols-3">
          <Reveal className="bg-background p-8">
            <h2 className="eyebrow mb-5">Event styles</h2>
            <ul className="space-y-2 text-sm text-foreground/80">
              {destination.styles.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.05} className="bg-background p-8">
            <h2 className="eyebrow mb-5">Venue concepts</h2>
            <ul className="space-y-2 text-sm text-foreground/80">
              {destination.venues.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="bg-background p-8">
            <h2 className="eyebrow mb-5">Good to know</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {destination.note}
            </p>
          </Reveal>
        </div>

        <div className="mt-20">
          <p className="eyebrow mb-8">Previous celebrations</p>
          <div className="grid gap-px bg-border sm:grid-cols-3">
            {CASE_STUDIES.map((cs) => (
              <Link
                key={cs.slug}
                to="/our-work/$slug"
                params={{ slug: cs.slug }}
                className="group bg-background p-8 transition-colors hover:bg-accent/30"
              >
                <h3 className="display text-2xl group-hover:text-champagne">
                  {cs.title}
                </h3>
                <p className="mt-2 text-[0.65rem] uppercase tracking-[0.24em] text-champagne">
                  {cs.location}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Link
            to="/contact"
            className="inline-block border border-champagne bg-champagne px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] text-obsidian transition-opacity hover:opacity-85"
          >
            Plan this destination event
          </Link>
        </div>
      </section>
    </>
  );
}
