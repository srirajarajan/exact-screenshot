import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

import { Reveal } from "@/components/Reveal";
import { EVENT_TYPES, STYLE_PRESETS } from "@/lib/studio/catalog";

type Answers = {
  celebrating: string;
  location: string;
  date: string;
  guests: string;
  style: string;
  budget: string;
};

const QUESTIONS: {
  key: keyof Answers;
  question: string;
  options?: string[];
  type?: "date" | "number" | "text";
}[] = [
  { key: "celebrating", question: "What are you celebrating?", options: EVENT_TYPES.map((e) => e.name) },
  { key: "location", question: "Where is your event?", options: ["Chennai", "Bangalore", "Hyderabad", "Goa", "Udaipur", "Jaipur", "Kerala", "Elsewhere"] },
  { key: "date", question: "When is your event?", type: "date" },
  { key: "guests", question: "How many guests?", options: ["Under 100", "100–250", "250–500", "500–1000", "1000+"] },
  { key: "style", question: "Preferred style?", options: STYLE_PRESETS.map((p) => p.name) },
  { key: "budget", question: "Estimated budget?", options: ["Under ₹1L", "₹1L – ₹3L", "₹3L – ₹8L", "₹8L – ₹20L", "₹20L+"] },
];

const GUEST_MAP: Record<string, number> = {
  "Under 100": 80,
  "100–250": 180,
  "250–500": 350,
  "500–1000": 700,
  "1000+": 1200,
};

export function EventConcierge() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const done = step >= QUESTIONS.length;
  const current = QUESTIONS[step];

  function answer(key: keyof Answers, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    setStep((s) => s + 1);
  }

  function openStudio() {
    const eventType =
      EVENT_TYPES.find((e) => e.name === answers.celebrating)?.id ?? "wedding";
    const preset =
      STYLE_PRESETS.find((p) => p.name === answers.style)?.id ?? "royal";
    void navigate({
      to: "/event-studio",
      search: {
        event: eventType,
        preset,
        guests: GUEST_MAP[answers.guests ?? ""] ?? 350,
      },
    });
  }

  return (
    <section className="surface-ivory py-28 lg:py-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <Reveal className="max-w-3xl">
          <p className="mb-6 text-[0.6875rem] uppercase tracking-[0.34em] text-obsidian/50">
            Event Concierge
          </p>
          <h2 className="display text-4xl text-obsidian sm:text-5xl lg:text-6xl">
            Let's design your celebration.
          </h2>
        </Reveal>

        <div className="mt-14 border border-obsidian/15 bg-ivory p-8 lg:p-14">
          {!done && current ? (
            <div>
              <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.3em] text-obsidian/45">
                <span>
                  Question {step + 1} / {QUESTIONS.length}
                </span>
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="disabled:opacity-30"
                >
                  Back
                </button>
              </div>
              <div className="mt-2 h-px w-full bg-obsidian/10">
                <div
                  className="h-px bg-obsidian/60 transition-all duration-500"
                  style={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                />
              </div>

              <h3 className="display mt-10 text-3xl text-obsidian sm:text-4xl">
                {current.question}
              </h3>

              {current.options ? (
                <div className="mt-8 flex flex-wrap gap-2">
                  {current.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => answer(current.key, opt)}
                      className="border border-obsidian/20 px-6 py-3 text-xs uppercase tracking-[0.14em] text-obsidian transition-colors hover:border-obsidian hover:bg-obsidian hover:text-ivory"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <form
                  className="mt-8 flex flex-wrap gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);
                    answer(current.key, String(data.get("value") ?? ""));
                  }}
                >
                  <label className="sr-only" htmlFor="concierge-input">
                    {current.question}
                  </label>
                  <input
                    id="concierge-input"
                    name="value"
                    type={current.type ?? "text"}
                    required
                    className="min-w-56 border border-obsidian/20 bg-transparent px-5 py-3 text-sm text-obsidian outline-none focus:border-obsidian"
                  />
                  <button
                    type="submit"
                    className="border border-obsidian bg-obsidian px-8 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-ivory"
                  >
                    Continue
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-obsidian/45">
                Complete
              </p>
              <h3 className="display mt-6 text-3xl text-obsidian sm:text-5xl">
                Your celebration profile is ready.
              </h3>
              <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                {QUESTIONS.map((q) => (
                  <div key={q.key} className="border-t border-obsidian/15 pt-4">
                    <dt className="text-[0.6rem] uppercase tracking-[0.24em] text-obsidian/45">
                      {q.question.replace("?", "")}
                    </dt>
                    <dd className="mt-2 text-sm text-obsidian">
                      {answers[q.key] || "—"}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-12 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={openStudio}
                  className="border border-obsidian bg-obsidian px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] text-ivory transition-opacity hover:opacity-85"
                >
                  Create My Event Vision
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers({});
                    setStep(0);
                  }}
                  className="border border-obsidian/30 px-9 py-4 text-[0.65rem] uppercase tracking-[0.24em] text-obsidian"
                >
                  Start again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
