import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border pb-16 pt-40 lg:pb-24 lg:pt-52">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <Reveal>
          <p className="eyebrow mb-8">{eyebrow}</p>
          <h1 className="display max-w-4xl text-[clamp(2.5rem,7vw,6rem)]">
            {title}
          </h1>
          {intro ? (
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {intro}
            </p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </header>
  );
}
