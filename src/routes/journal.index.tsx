import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { JOURNAL } from "@/lib/content";

const TITLE = "Journal — Wedding, Birthday & Event Design Ideas | Maison Orchestra";
const DESC =
  "Stage design, decor inspiration, destination guides and planning advice from our studio.";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: JournalIndex,
});

const CATEGORIES = ["All", ...new Set(JOURNAL.map((p) => p.category))];

function JournalIndex() {
  const [filter, setFilter] = useState("All");
  const posts =
    filter === "All" ? JOURNAL : JOURNAL.filter((p) => p.category === filter);

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Notes from the studio."
        intro="Practical writing on stage design, decor, destinations and what things actually cost."
      />

      <section className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="mb-12 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={[
                "border px-5 py-2.5 text-[0.6rem] uppercase tracking-[0.2em] transition-colors",
                filter === c
                  ? "border-champagne bg-champagne text-obsidian"
                  : "border-border text-muted-foreground hover:border-champagne/50 hover:text-champagne",
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-px bg-border lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <Link
                to="/journal/$slug"
                params={{ slug: p.slug }}
                className="group flex h-full flex-col bg-background"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={900}
                    height={1200}
                    className="size-full object-cover opacity-70 transition-all duration-[1200ms] group-hover:scale-105 group-hover:opacity-95"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <p className="text-[0.6rem] uppercase tracking-[0.24em] text-champagne">
                    {p.category} · {p.readTime}
                  </p>
                  <h2 className="display mt-4 text-2xl group-hover:text-champagne">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.excerpt}
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
