import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Events", to: "/events" },
  { label: "Event Studio", to: "/event-studio" },
  { label: "Our Work", to: "/our-work" },
  { label: "Services", to: "/services" },
  { label: "Destinations", to: "/destinations" },
  { label: "About", to: "/about" },
  { label: "Journal", to: "/journal" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 lg:px-12"
      >
        <Link to="/" className="group flex flex-col leading-none">
          <span className="display text-xl tracking-[0.28em] text-foreground">
            MAISON
          </span>
          <span className="mt-1 text-[0.55rem] tracking-[0.42em] text-champagne">
            ORCHESTRA
          </span>
        </Link>

        <ul className="hidden items-center gap-9 xl:flex">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="text-[0.7rem] uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-champagne [&.active]:text-champagne"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/event-studio"
            className="hidden border border-champagne/50 px-6 py-3 text-[0.65rem] uppercase tracking-[0.24em] text-champagne transition-colors hover:bg-champagne hover:text-obsidian sm:inline-block"
          >
            Design Your Event
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-foreground xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl xl:hidden">
          <ul className="mx-auto max-w-[1600px] px-6 py-6">
            {NAV.map((item, i) => (
              <li key={item.to} className="border-b border-border/60 last:border-0">
                <Link
                  to={item.to}
                  className="flex items-baseline gap-4 py-4 text-2xl font-light text-foreground [&.active]:text-champagne"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span className="text-[0.6rem] tracking-[0.2em] text-champagne/70">
                    0{i + 1}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Link
                to="/event-studio"
                className="block border border-champagne/50 px-6 py-4 text-center text-[0.65rem] uppercase tracking-[0.24em] text-champagne"
              >
                Design Your Event
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
