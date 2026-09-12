import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

const TITLE = "About — An Event Experience & Design Studio | Maison Orchestra";
const DESC =
  "We create moments people remember. Our philosophy, process, team and the way we work.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: AboutPage,
});

const BLOCKS = [
  {
    title: "Our philosophy",
    text: "A celebration is not a set of deliverables. It is a few hours in which people feel something together. We design backwards from that feeling, and everything else — the stage, the florals, the light — is in service of it.",
  },
  {
    title: "Our process",
    text: "Conversation, concept, design, production. You see the stage in three dimensions long before build week, and you change it as often as you need to. Nothing is costed until the design is settled.",
  },
  {
    title: "Our team",
    text: "Designers, florists, production engineers, lighting technicians and event managers — 40 full-time, scaling to 200 on build. We do not subcontract the design.",
  },
  {
    title: "Our experience",
    text: "Over 400 celebrations since 2014, from 30-guest anniversaries to 1,200-guest weddings across six countries.",
  },
  {
    title: "Our approach",
    text: "Restraint over accumulation. One statement, one supporting move, and light. Rooms that photograph as well as they feel.",
  },
  {
    title: "Our values",
    text: "Turn up early. Tell the truth about budget. Protect the client's day from the industry's chaos.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="We create moments people remember."
        intro="Founded in Chennai in 2014. An event experience and design studio, not an agency."
      />

      <section className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {BLOCKS.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.06}>
              <article className="h-full bg-background p-8 lg:p-10">
                <h2 className="display text-2xl">{b.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {b.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 border-t border-border pt-14 sm:grid-cols-3">
          {[
            { n: "400+", l: "Celebrations designed" },
            { n: "6", l: "Countries" },
            { n: "2014", l: "Founded in Chennai" },
          ].map((s) => (
            <div key={s.l}>
              <p className="display text-5xl text-champagne">{s.n}</p>
              <p className="mt-2 text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                {s.l}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            to="/contact"
            className="inline-block border border-champagne px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] text-champagne transition-colors hover:bg-champagne hover:text-obsidian"
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
