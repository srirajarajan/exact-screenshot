import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CASE_STUDIES } from "@/lib/content";

const TITLE = "Our Work — Signature Celebrations | Maison Orchestra";
const DESC =
  "Case studies from weddings, birthdays and corporate galas we've designed and produced across India.";

export const Route = createFileRoute("/our-work/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: OurWorkIndex,
});

function OurWorkIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Our Work"
        title="Signature celebrations."
        intro="Not a gallery — a set of case studies. Concept, design, production and what it actually took."
      />
      <section className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid gap-px bg-border lg:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 0.07}>
              <Link
                to="/our-work/$slug"
                params={{ slug: cs.slug }}
                className="group flex h-full flex-col bg-background"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={cs.image}
                    alt={`${cs.title} — ${cs.concept}`}
                    loading="lazy"
                    width={900}
                    height={1200}
                    className="size-full object-cover opacity-80 transition-all duration-[1400ms] group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <div className="p-8">
                  <h2 className="display text-3xl group-hover:text-champagne">
                    {cs.title}
                  </h2>
                  <p className="mt-2 text-[0.65rem] uppercase tracking-[0.24em] text-champagne">
                    {cs.location} · {cs.guests} · {cs.duration}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {cs.concept}
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
