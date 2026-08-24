import type { LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  icon: Icon,
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
            isDark ? "bg-white/10 text-lagoon-light" : "bg-lagoon/10 text-lagoon-dark"
          }`}
        >
          {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />}
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={`mt-4 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-[2.75rem] ${
            isDark ? "text-white" : "text-deep"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={140}>
          <p className={`mt-4 text-base leading-relaxed ${isDark ? "text-white/70" : "text-ink/65"}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
