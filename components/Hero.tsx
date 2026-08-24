import { Img as Image } from "./Img";
import { ArrowRight, ChevronDown, ShieldCheck } from "lucide-react";
import { MessengerIcon } from "./BrandIcons";
import { siteConfig } from "@/lib/site-config";
import { dayTours, multidayTours } from "@/lib/tours";

// Figures below are counted from the published rate sheet, not estimated.
const stats = [
  { value: `${dayTours.length + multidayTours.length}`, label: "Tour packages" },
  { value: `${dayTours.length}`, label: "Day tour areas" },
  { value: `${multidayTours.length}`, label: "Multiday routes" },
];

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <Image
        src="/images/hero/hero-main.jpg"
        alt="Aerial view of white sand and turquoise water in Romblon"
        fill
        priority
        sizes="100vw"
        className="scale-105 object-cover"
      />

      {/* Layered wash keeps text legible while staying bright and tropical */}
      <div className="absolute inset-0 bg-linear-to-b from-deep/75 via-deep/35 to-deep/85" />
      <div className="absolute inset-0 bg-linear-to-tr from-lagoon/25 via-transparent to-coral/20" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-24 pb-16 text-center">
        <div className="animate-float-slow">
          <Image
            src="/images/logo.png"
            alt={siteConfig.name}
            width={200}
            height={200}
            priority
            className="h-32 w-32 rounded-full shadow-2xl ring-4 ring-white/25 sm:h-40 sm:w-40"
          />
        </div>

        <div className="glass mt-7 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
          <ShieldCheck className="h-4 w-4 text-lagoon-light" strokeWidth={2.5} />
          {siteConfig.accreditations.join(" · ")}
        </div>

        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white text-balance sm:text-6xl md:text-7xl">
          Discover the beauty
          <span className="block bg-linear-to-r from-lagoon-light via-white to-sun bg-clip-text text-transparent">
            of Romblon
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          Island hopping, waterfalls, heritage towns, and unforgettable multiday adventures —
          planned end to end by a local, DOT-accredited team.
        </p>

        <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href="#tours"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-coral px-7 py-4 text-sm font-semibold text-white shadow-xl shadow-coral/30 transition-all hover:bg-coral-dark hover:shadow-coral/50"
          >
            View tours &amp; rates
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </a>
          <a
            href={siteConfig.facebookMessengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/25"
          >
            <MessengerIcon className="h-4 w-4" />
            Chat with us
          </a>
        </div>

        <dl className="mt-12 grid w-full max-w-lg grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-3 py-4">
              <dt className="font-display text-2xl font-semibold text-white sm:text-3xl">{s.value}</dt>
              <dd className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/70">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#highlights"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/80 transition-colors hover:text-white"
      >
        <ChevronDown className="h-7 w-7 animate-nudge-down" strokeWidth={2} />
      </a>
    </section>
  );
}
