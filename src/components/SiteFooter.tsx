import { Link } from "@tanstack/react-router";

const COLUMNS = [
  {
    title: "Experience",
    links: [
      { label: "Event Studio", to: "/event-studio" },
      { label: "Events", to: "/events" },
      { label: "Our Work", to: "/our-work" },
      { label: "Destinations", to: "/destinations" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Services", to: "/services" },
      { label: "About", to: "/about" },
      { label: "Journal", to: "/journal" },
      { label: "Contact", to: "/contact" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="display text-2xl tracking-[0.28em]">MAISON</p>
            <p className="mt-1 text-[0.6rem] tracking-[0.42em] text-champagne">
              ORCHESTRA
            </p>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              An event experience and design studio. We design celebrations
              around the moments that matter — from intimate gatherings to
              multi-day spectacles.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-6">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      className="text-sm text-foreground/70 transition-colors hover:text-champagne"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Maison Orchestra</p>
          <p>Chennai · Bangalore · Udaipur · Goa</p>
        </div>
      </div>
    </footer>
  );
}
