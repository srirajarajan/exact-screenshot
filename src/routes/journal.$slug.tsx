import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { JOURNAL } from "@/lib/content";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const post = JOURNAL.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found — Maison Orchestra" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.post.title} | Maison Orchestra Journal`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.post.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: JournalPostPage,
});

function JournalPostPage() {
  const { post } = Route.useLoaderData();
  const related = JOURNAL.filter(
    (p) => p.slug !== post.slug && p.category === post.category,
  ).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-6 pb-28 pt-40 lg:pt-48">
      <p className="eyebrow">
        {post.category} · {post.readTime}
      </p>
      <h1 className="display mt-6 text-[clamp(2rem,5vw,3.75rem)] leading-[1.05]">
        {post.title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-foreground/70">
        {post.excerpt}
      </p>

      <img
        src={post.image}
        alt={post.title}
        width={900}
        height={1200}
        className="mt-12 aspect-[16/9] w-full object-cover"
      />

      <div className="mt-12 space-y-6">
        {post.body.map((para) => (
          <p key={para} className="text-base leading-[1.9] text-foreground/80">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-3 border-t border-border pt-10">
        <Link
          to="/event-studio"
          search={{}}
          className="border border-champagne bg-champagne px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.24em] text-obsidian transition-opacity hover:opacity-85"
        >
          Design your event
        </Link>
        <Link
          to="/journal"
          className="border border-foreground/30 px-8 py-3.5 text-[0.65rem] uppercase tracking-[0.24em] transition-colors hover:border-champagne hover:text-champagne"
        >
          Back to journal
        </Link>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <p className="eyebrow mb-6">More on {post.category}</p>
          <ul className="space-y-1">
            {related.map((r) => (
              <li key={r.slug} className="border-b border-border">
                <Link
                  to="/journal/$slug"
                  params={{ slug: r.slug }}
                  className="block py-4 text-sm text-foreground/80 transition-colors hover:text-champagne"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
