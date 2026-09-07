import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
}: Props) {
  return (
    <Reveal
      className={[
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "",
      ].join(" ")}
    >
      {eyebrow ? <p className="eyebrow mb-6">{eyebrow}</p> : null}
      <h2 className="display text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
      {subtitle ? (
        <p
          className={[
            "mt-6 max-w-xl text-base leading-relaxed",
            align === "center" ? "mx-auto" : "",
            tone === "light" ? "text-obsidian/65" : "text-muted-foreground",
          ].join(" ")}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
