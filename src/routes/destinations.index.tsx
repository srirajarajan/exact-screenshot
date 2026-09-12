import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { DESTINATIONS } from "@/lib/content";

const TITLE = "Destination Events — India & Beyond | Maison Orchestra";
const DESC =
  "Destination weddings and events in Chennai, Bangalore, Hyderabad, Goa, Udaipur, Jaipur, Kerala and further afield.";

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: DestinationsIndex,
});

function DestinationsIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Destinations"
        title="Where will your story begin?"
        intro="Local crews, known venues and permits handled — in every city we work in."
      />
      <section className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 4) * 0.05}>
              <Link
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="group relative block aspect-[4/5] overflow-hidden bg-background"
              >
                <img
                  src={d.image}
                  alt={`Events in ${d.name}`}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="size-full object-cover opacity-60 transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h2 className="display text-2xl">{d.name}</h2>
                  <p className="mt-1 text-xs text-foreground/60">{d.line}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
