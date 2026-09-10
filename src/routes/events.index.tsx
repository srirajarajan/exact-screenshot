import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CATEGORIES } from "@/lib/content";

const TITLE = "Event Types — Weddings, Birthdays & More | Maison Orchestra";
const DESC =
  "Weddings, birthdays, engagements, baby showers, corporate galas and more — every celebration designed end to end.";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: EventsIndex,
});

function EventsIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Every moment deserves a stage."
        intro="We don't restrict ourselves to weddings. Choose a celebration to see how we approach it — then design it yourself in the Event Studio."
      />
      <section className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-5">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.slug} delay={(i % 5) * 0.05}>
              <Link
                to="/events/$slug"
                params={{ slug: cat.slug }}
                className="group relative block aspect-[3/4] overflow-hidden bg-background"
              >
                <img
                  src={cat.image}
                  alt={`${cat.name} event design`}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="size-full object-cover opacity-70 transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h2 className="display text-xl">{cat.name}</h2>
                  <p className="mt-1 text-[0.65rem] tracking-wider text-foreground/60">
                    {cat.line}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
