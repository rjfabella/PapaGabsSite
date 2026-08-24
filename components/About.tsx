import { Img as Image } from "./Img";
import { MapPin, Compass, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "./Reveal";

const credentials = [
  { label: "DOT Accredited", detail: "Department of Tourism" },
  { label: "PPA TAPPS", detail: "Accredited port services" },
  { label: `DTI ${siteConfig.dtiRegNo}`, detail: "Registered business" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-foam py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-lagoon/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-coral/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-lagoon/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-lagoon-dark">
              <Compass className="h-3.5 w-3.5" strokeWidth={2.5} />
              Your local Romblon guide
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-deep text-balance sm:text-4xl md:text-[2.75rem]">
              Travel with us, create unforgettable memories
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 text-base leading-relaxed text-ink/70">
              Papagabs Travel and Tours is a home-grown agency based in Odiongan, Romblon. We
              plan and guide day tours and multiday island adventures across Romblon, Sibuyan,
              Tablas and Carabao — with our own vans, trusted boat partners, and DOT-accredited
              guides handling every detail so you can simply enjoy the trip.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-6 flex items-start gap-2.5 rounded-2xl border border-deep/8 bg-white/70 p-4 backdrop-blur">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-coral" strokeWidth={2.2} />
              <p className="text-sm text-ink/70">{siteConfig.address}</p>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <dl className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {credentials.map((c) => (
                <div
                  key={c.label}
                  className="rounded-2xl border border-deep/8 bg-white/70 p-4 backdrop-blur transition-colors hover:border-lagoon/30"
                >
                  <dt className="font-display text-sm font-semibold text-deep">{c.label}</dt>
                  <dd className="mt-0.5 text-xs text-ink/55">{c.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="relative">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-2xl shadow-deep/20">
              <Image
                src="/images/about/fleet.jpg"
                alt="Papagabs Travel and Tours van fleet ready for a tour"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 hidden w-52 rounded-2xl border border-white/60 bg-white/85 p-4 shadow-xl backdrop-blur sm:block">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-sun" strokeWidth={2.5} />
                <p className="font-display text-sm font-semibold text-deep">{siteConfig.subTagline}</p>
              </div>
              <p className="mt-1 text-xs text-ink/55">Owned and operated in Odiongan, Romblon.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
