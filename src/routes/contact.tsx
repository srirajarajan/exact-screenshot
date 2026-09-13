import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { EVENT_TYPES } from "@/lib/studio/catalog";
import { listVisions } from "@/lib/studio/vision";
import { useHydrated } from "@/hooks/use-hydrated";

const TITLE = "Contact — Speak to a Concierge | Maison Orchestra";
const DESC =
  "Tell us about your celebration. Our concierge replies within one working day with a first conversation slot.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ContactPage,
});

const BUDGETS = [
  "Under ₹10 lakh",
  "₹10–25 lakh",
  "₹25–50 lakh",
  "₹50 lakh–1 crore",
  "Above ₹1 crore",
];

const field =
  "w-full border border-border bg-transparent px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-champagne";

function ContactPage() {
  const hydrated = useHydrated();
  const [sent, setSent] = useState(false);
  const visions = hydrated ? listVisions() : [];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    ) as Record<string, string>;
    if (!data['name'] || !data['email']) {
      toast.error("Please add your name and email.");
      return;
    }
    setSent(true);
    toast.success("Enquiry received — we'll reply within one working day.");
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us about your celebration."
        intro="One conversation, no obligation. We'll tell you honestly whether we're the right studio for it."
      />

      <section className="mx-auto max-w-[1600px] px-6 py-20 lg:px-12 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            {sent ? (
              <div className="border border-champagne/40 p-10">
                <h2 className="display text-3xl">Thank you.</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Your enquiry is with our concierge team. You'll hear from us
                  within one working day, usually sooner.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 border border-foreground/30 px-7 py-3 text-[0.6rem] uppercase tracking-[0.24em] transition-colors hover:border-champagne hover:text-champagne"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                <input name="name" placeholder="Full name" className={field} />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={field}
                />
                <input name="phone" placeholder="Phone" className={field} />
                <input
                  name="date"
                  placeholder="Event date"
                  className={field}
                />
                <select name="eventType" className={field} defaultValue="">
                  <option value="" disabled>
                    Event type
                  </option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
                <select name="budget" className={field} defaultValue="">
                  <option value="" disabled>
                    Budget range
                  </option>
                  {BUDGETS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <input
                  name="location"
                  placeholder="City or venue"
                  className={`${field} sm:col-span-2`}
                />
                <input
                  name="guests"
                  placeholder="Guest count"
                  className={`${field} sm:col-span-2`}
                />
                {visions.length > 0 && (
                  <select
                    name="vision"
                    className={`${field} sm:col-span-2`}
                    defaultValue=""
                  >
                    <option value="">Attach a saved Event Vision (optional)</option>
                    {visions.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.id} — {v.config.eventType}
                      </option>
                    ))}
                  </select>
                )}
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about the celebration you have in mind"
                  className={`${field} sm:col-span-2 resize-none`}
                />
                <button
                  type="submit"
                  className="sm:col-span-2 border border-champagne bg-champagne px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] text-obsidian transition-opacity hover:opacity-85"
                >
                  Send enquiry
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="space-y-10 border-l border-border pl-8">
              <div>
                <p className="eyebrow mb-3">Studio</p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  14 Boat Club Road
                  <br />
                  R.A. Puram, Chennai 600028
                </p>
              </div>
              <div>
                <p className="eyebrow mb-3">Concierge</p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  concierge@maisonorchestra.in
                  <br />
                  +91 44 4000 1400
                </p>
              </div>
              <div>
                <p className="eyebrow mb-3">Also in</p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  Bangalore · Hyderabad · Goa · Udaipur
                </p>
              </div>
              <div>
                <p className="eyebrow mb-3">Hours</p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  Monday to Saturday, 10am – 7pm IST
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
