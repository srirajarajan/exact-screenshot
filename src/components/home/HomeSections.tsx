import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  BEHIND,
  CASE_STUDIES,
  CATEGORIES,
  CRAFT,
  DESTINATIONS,
  JOURNEY,
  STORIES,
} from "@/lib/content";

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
      <SectionHeading
        eyebrow="Event Categories"
        title="Every moment deserves a stage."
        subtitle="Whatever you're celebrating, we turn your vision into an experience."
      />

      <div className="mt-16 grid grid-cols-2 gap-px bg-border lg:grid-cols-5">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.slug} delay={(i % 5) * 0.05}>
            <Link
              to="/events/$slug"
              params={{ slug: cat.slug }}
              className="group relative block aspect-[3/4] overflow-hidden bg-background"
            >
              <img
                src={cat.image}
                alt={`${cat.name} event design by Maison Orchestra`}
                loading="lazy"
                width={900}
                height={1200}
                className="size-full object-cover opacity-70 transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent transition-opacity duration-700 group-hover:from-obsidian/80" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-end justify-between gap-2">
                  <div className="transition-transform duration-500 group-hover:-translate-y-1">
                    <h3 className="display text-xl">{cat.name}</h3>
                    <p className="mt-1 text-[0.65rem] tracking-wider text-foreground/60">
                      {cat.line}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 translate-y-2 text-champagne opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function SignatureCelebrations() {
  return (
    <section className="border-y border-border bg-card/40 py-28 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <SectionHeading
          eyebrow="Case Studies"
          title="Signature celebrations."
          subtitle="A few of the stories we've had the privilege of designing."
        />

        <div className="mt-16 space-y-px">
          {CASE_STUDIES.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 0.06}>
              <Link
                to="/our-work/$slug"
                params={{ slug: cs.slug }}
                className="group grid items-center gap-8 border-t border-border py-10 lg:grid-cols-12"
              >
                <div className="lg:col-span-4">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={cs.image}
                      alt={`${cs.title} — ${cs.concept}`}
                      loading="lazy"
                      width={900}
                      height={1200}
                      className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="lg:col-span-6">
                  <h3 className="display text-3xl lg:text-5xl">{cs.title}</h3>
                  <p className="mt-3 text-[0.65rem] uppercase tracking-[0.24em] text-champagne">
                    {cs.location} · {cs.guests} · {cs.duration}
                  </p>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {cs.concept}
                  </p>
                </div>
                <div className="lg:col-span-2 lg:text-right">
                  <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.24em] text-foreground/70 transition-colors group-hover:text-champagne">
                    Explore Story <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ChooseYourStory() {
  return (
    <section className="surface-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="mb-6 text-[0.6875rem] uppercase tracking-[0.34em] text-obsidian/50">
            Choose Your Story
          </p>
          <h2 className="display text-4xl text-obsidian sm:text-5xl lg:text-6xl">
            We don't just plan events.
            <br />
            We design experiences.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "01", t: "Discover", d: "We learn what you're really celebrating." },
            { n: "02", t: "Visualize", d: "See your stage in three dimensions before we build." },
            { n: "03", t: "Customize", d: "Change florals, seating, backdrop and light in seconds." },
            { n: "04", t: "Estimate", d: "A transparent range, then a proper quotation." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="border-t border-obsidian/15 pt-6">
                <p className="text-[0.65rem] tracking-[0.3em] text-obsidian/40">{s.n}</p>
                <h3 className="display mt-4 text-2xl text-obsidian">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-obsidian/60">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OurCraft() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
      <SectionHeading eyebrow="Our Craft" title="We design every detail." />
      <ul className="mt-14 space-y-1">
        {CRAFT.map((c, i) => (
          <Reveal key={c} delay={i * 0.04}>
            <li className="group flex items-baseline gap-6 border-b border-border py-5">
              <span className="text-[0.6rem] tracking-[0.3em] text-champagne/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display text-3xl uppercase tracking-wide text-foreground/70 transition-colors duration-500 group-hover:text-champagne sm:text-5xl">
                {c}
              </span>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function DestinationExplorer() {
  return (
    <section className="border-y border-border bg-card/40 py-28 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <SectionHeading
          eyebrow="Destinations"
          title="Where will your story begin?"
          subtitle="We produce events across India and beyond, with local crews we've worked with for years."
        />
        <div className="mt-14 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {DESTINATIONS.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 4) * 0.05}>
              <Link
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="group block bg-background p-6 transition-colors hover:bg-accent/40 lg:p-8"
              >
                <h3 className="display text-2xl transition-colors group-hover:text-champagne">
                  {d.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {d.line}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function JourneySection() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
      <SectionHeading
        eyebrow="The Journey"
        title="From idea to memory."
        subtitle="Eight stages, one production plan, one point of contact."
      />
      <ol className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {JOURNEY.map((j, i) => (
          <Reveal key={j.step} delay={(i % 4) * 0.06}>
            <li className="group h-full bg-background p-8 transition-colors hover:bg-accent/30">
              <p className="text-[0.6rem] tracking-[0.3em] text-champagne/70">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="display mt-4 text-2xl uppercase">{j.step}</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {j.text}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}

export function BehindTheMagic() {
  return (
    <section className="relative overflow-hidden border-y border-border">
      <div className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
              Before the magic,
              <br />
              <span className="text-champagne">there's us.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
              A 180-person crew, a four-day build, and a production plan measured
              in minutes. The part guests never see is the part we're proudest of.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="space-y-1">
              {BEHIND.map((b, i) => (
                <li
                  key={b}
                  className="flex items-center justify-between border-b border-border py-4 text-sm text-foreground/75"
                >
                  <span>{b}</span>
                  <span className="text-[0.6rem] tracking-[0.3em] text-champagne/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function ClientStories() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-28 lg:px-12 lg:py-40">
      <SectionHeading eyebrow="Client Stories" title="Their story, in their words." />
      <div className="mt-16 grid gap-px bg-border lg:grid-cols-3">
        {STORIES.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.08}>
            <article className="flex h-full flex-col bg-background">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={`${s.name} celebration in ${s.place}`}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="size-full object-cover opacity-80"
                />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <p className="display text-2xl leading-snug">"{s.quote}"</p>
                <p className="mt-auto pt-8 text-[0.65rem] uppercase tracking-[0.24em] text-champagne">
                  {s.name} · {s.place}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="border-t border-border py-32 lg:py-48">
      <div className="mx-auto max-w-[1600px] px-6 text-center lg:px-12">
        <Reveal>
          <h2 className="display text-[clamp(2.5rem,8vw,7rem)]">
            Ready to create
            <br />
            something <span className="text-champagne">beautiful?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-sm text-sm text-muted-foreground">
            Your celebration begins with an idea.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link
              to="/event-studio"
              className="border border-champagne bg-champagne px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] text-obsidian transition-opacity hover:opacity-85"
            >
              Design Your Event
            </Link>
            <Link
              to="/contact"
              className="border border-foreground/30 px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] transition-colors hover:border-champagne hover:text-champagne"
            >
              Start a Conversation
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
