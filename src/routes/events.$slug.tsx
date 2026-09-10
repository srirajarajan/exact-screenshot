import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { CASE_STUDIES, CATEGORIES } from "@/lib/content";
import { STYLE_PRESETS } from "@/lib/studio/catalog";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const category = CATEGORIES.find((c) => c.slug === params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Event not found — Maison Orchestra" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.category.name} Planning & Decoration | Maison Orchestra`;
    const desc = `${loaderData.category.name} design and planning — stage, floral, lighting and decor, visualised in 3D before we build.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: EventCategoryPage,
});

function EventCategoryPage() {
  const { category } = Route.useLoaderData();
  const related = CASE_STUDIES.slice(0, 2);

  return (
    <>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <img
          src={category.image}
          alt={`${category.name} celebration designed by Maison Orchestra`}
          width={900}
          height={1200}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="gradient-veil absolute inset-0" />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-20 pt-40 lg:px-12">
          <p className="eyebrow mb-6">Event Experience</p>
          <h1 className="display text-[clamp(2.5rem,8vw,6.5rem)]">
            {category.name}
          </h1>
          <p className="mt-4 text-sm text-foreground/70">{category.line}</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 py-24 lg:px-12 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="display text-3xl sm:text-4xl">
              How we approach a {category.name.toLowerCase()}.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="space-y-5 text-sm leading-relaxed text-muted-foreground">
              <p>
                We start with the story, not the decor. What is this celebration
                actually for, who is in the room, and what should they feel when
                they walk in?
              </p>
              <p>
                From there we design the stage as a piece of architecture —
                structure, backdrop, floral installation, seating and light
                treated as one system rather than a shopping list.
              </p>
              <p>
                You'll see the whole thing in three dimensions in our Event
                Studio, adjust it as often as you like, and only then do we cost
                and build it.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px bg-border sm:grid-cols-3">
          {STYLE_PRESETS.slice(0, 3).map((p) => (
            <div key={p.id} className="bg-background p-8">
              <h3 className="display text-2xl uppercase">{p.name}</h3>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <Link
            to="/event-studio"
            search={{ event: category.studioType, preset: "royal", guests: 350 }}
            className="border border-champagne bg-champagne px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] text-obsidian transition-opacity hover:opacity-85"
          >
            Design this event
          </Link>
          <Link
            to="/contact"
            className="border border-foreground/30 px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] transition-colors hover:border-champagne hover:text-champagne"
          >
            Request a consultation
          </Link>
        </div>
      </section>

      <section className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <p className="eyebrow mb-10">Related celebrations</p>
          <div className="grid gap-px bg-border sm:grid-cols-2">
            {related.map((cs) => (
              <Link
                key={cs.slug}
                to="/our-work/$slug"
                params={{ slug: cs.slug }}
                className="group bg-background p-8 transition-colors hover:bg-accent/30"
              >
                <h3 className="display text-3xl group-hover:text-champagne">
                  {cs.title}
                </h3>
                <p className="mt-2 text-[0.65rem] uppercase tracking-[0.24em] text-champagne">
                  {cs.location} · {cs.guests}
                </p>
                <p className="mt-4 text-sm text-muted-foreground">{cs.concept}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
