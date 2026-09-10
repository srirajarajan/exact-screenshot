import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { CASE_STUDIES } from "@/lib/content";

export const Route = createFileRoute("/our-work/$slug")({
  loader: ({ params }) => {
    const study = CASE_STUDIES.find((c) => c.slug === params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Story not found — Maison Orchestra" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.study.title} — ${loaderData.study.location} | Maison Orchestra`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.study.concept },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.study.concept },
      ],
    };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study } = Route.useLoaderData();

  const details = [
    { label: "Location", value: study.location },
    { label: "Guests", value: study.guests },
    { label: "Duration", value: study.duration },
    { label: "Concept", value: study.concept },
    { label: "Stage design", value: study.stage },
    { label: "Floral design", value: study.floral },
    { label: "Lighting", value: study.lighting },
    { label: "Decor", value: study.decor },
    { label: "Guest experience", value: study.guestExperience },
    { label: "Photography", value: study.photography },
  ];

  return (
    <>
      <section className="relative flex min-h-[80vh] items-end overflow-hidden">
        <img
          src={study.image}
          alt={`${study.title} celebration in ${study.location}`}
          width={900}
          height={1200}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="gradient-veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-20 pt-44 lg:px-12">
          <p className="eyebrow mb-6">Signature Celebration</p>
          <h1 className="display text-[clamp(2.5rem,8vw,7rem)]">{study.title}</h1>
          <p className="mt-4 text-[0.65rem] uppercase tracking-[0.24em] text-champagne">
            {study.location} · {study.guests} · {study.duration}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="display text-3xl sm:text-4xl">Design inspiration</h2>
            <div className="mt-8 flex gap-2">
              {study.palette.map((c) => (
                <span
                  key={c}
                  className="size-12 border border-border"
                  style={{ backgroundColor: c }}
                  aria-label={`Palette colour ${c}`}
                />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-foreground/80">
              {study.inspiration}
            </p>
          </Reveal>
        </div>

        <dl className="mt-20 grid gap-px bg-border sm:grid-cols-2">
          {details.map((d) => (
            <div key={d.label} className="bg-background p-8">
              <dt className="text-[0.6rem] uppercase tracking-[0.24em] text-champagne">
                {d.label}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-foreground/80">
                {d.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-20">
          <p className="eyebrow mb-8">Planning journey</p>
          <ol className="space-y-1">
            {study.journey.map((j, i) => (
              <li
                key={j}
                className="flex items-baseline gap-6 border-b border-border py-5 text-sm text-foreground/80"
              >
                <span className="text-[0.6rem] tracking-[0.3em] text-champagne/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {j}
              </li>
            ))}
          </ol>
        </div>

        <blockquote className="mt-20 border-l border-champagne pl-8">
          <p className="display text-3xl leading-snug sm:text-4xl">
            "{study.quote}"
          </p>
          <footer className="mt-6 text-[0.65rem] uppercase tracking-[0.24em] text-champagne">
            {study.couple}
          </footer>
        </blockquote>

        <div className="mt-16 flex flex-wrap gap-3">
          <Link
            to="/event-studio"
            search={{ preset: study.preset, event: "wedding", guests: 350 }}
            className="border border-champagne bg-champagne px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] text-obsidian transition-opacity hover:opacity-85"
          >
            Create a similar event
          </Link>
          <Link
            to="/our-work"
            className="border border-foreground/30 px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] transition-colors hover:border-champagne hover:text-champagne"
          >
            All celebrations
          </Link>
        </div>
      </section>
    </>
  );
}
