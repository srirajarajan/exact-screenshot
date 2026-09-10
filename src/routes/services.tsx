import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/content";

const TITLE = "Services — Event Design, Production & Management | Maison Orchestra";
const DESC =
  "Concept and design, venue styling, stage and floral, lighting and production, catering, hospitality and full event management.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="One studio. The whole celebration."
        intro="We design and produce in-house, so the thing you approve is the thing that gets built."
      />

      <section className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="space-y-px">
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={(i % 4) * 0.05}>
              <article className="group grid items-center gap-8 border-t border-border py-8 lg:grid-cols-12">
                <span className="text-[0.6rem] tracking-[0.3em] text-champagne/70 lg:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="display text-3xl transition-colors group-hover:text-champagne lg:col-span-4 lg:text-4xl">
                  {s.name}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-4">
                  {s.text}
                </p>
                <div className="aspect-[16/9] overflow-hidden lg:col-span-3">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    width={900}
                    height={1200}
                    className="size-full object-cover opacity-70 transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20">
          <Link
            to="/contact"
            className="inline-block border border-champagne px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] text-champagne transition-colors hover:bg-champagne hover:text-obsidian"
          >
            Request a consultation
          </Link>
        </div>
      </section>
    </>
  );
}
