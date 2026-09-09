import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import heroImage from "@/assets/hero.jpg";

const LINES = ["Your moment.", "Your story.", "Beautifully orchestrated."];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="A cinematic luxury wedding reception stage dressed in ivory florals and warm champagne light"
          width={1920}
          height={1088}
          className="size-full animate-slow-zoom object-cover"
        />
        <div className="gradient-veil absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-24 pt-40 lg:px-12 lg:pb-32">
        <motion.p
          className="eyebrow mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Event Experience &amp; Design Studio
        </motion.p>

        <h1 className="display text-[clamp(2.75rem,9vw,8rem)]">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.35 + i * 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {i === 2 ? (
                  <span className="text-champagne">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <p className="max-w-md text-sm leading-relaxed text-foreground/75">
            From intimate celebrations to spectacular occasions, we design
            unforgettable experiences around the moments that matter.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/event-studio"
              className="border border-champagne bg-champagne px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] text-obsidian transition-opacity hover:opacity-85"
            >
              Design Your Event
            </Link>
            <Link
              to="/our-work"
              className="border border-foreground/30 px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] text-foreground transition-colors hover:border-champagne hover:text-champagne"
            >
              Explore Our Work
            </Link>
          </div>
        </motion.div>

        <motion.p
          className="mt-16 text-[0.6rem] uppercase tracking-[0.34em] text-foreground/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.4 }}
        >
          Discover ↓
        </motion.p>
      </div>
    </section>
  );
}
