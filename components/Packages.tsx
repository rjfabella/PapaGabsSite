"use client";

import { Img as Image } from "./Img";
import { useState } from "react";
import {
  Check,
  X,
  Sun,
  CalendarDays,
  Plus,
  MapPin,
  Ship,
} from "lucide-react";
import {
  dayTourInclusions,
  dayTours,
  multidayExclusions,
  multidayInclusions,
  multidayTours,
  rateTierLabels,
  type DayTour,
  type MultidayTour,
} from "@/lib/tours";
import { siteConfig } from "@/lib/site-config";
import { MessengerIcon } from "./BrandIcons";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function peso(n: number) {
  return `₱${n.toLocaleString("en-PH")}`;
}

function PackageCard({ tour, index }: { tour: DayTour | MultidayTour; index: number }) {
  const isDayTour = "highlights" in tour;
  const lowest = Math.min(...rateTierLabels.map((t) => tour.rates[t.key]));

  return (
    <Reveal delay={index * 70} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-deep/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-deep/10">
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={tour.image}
            alt={tour.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-deep/70 via-deep/10 to-transparent" />

          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-deep backdrop-blur">
            {isDayTour ? (
              <>
                <Sun className="h-3 w-3 text-sun" strokeWidth={2.5} /> Day tour
              </>
            ) : (
              <>
                <CalendarDays className="h-3 w-3 text-lagoon" strokeWidth={2.5} />{" "}
                {(tour as MultidayTour).duration}
              </>
            )}
          </span>

          <div className="absolute inset-x-4 bottom-3">
            <h3 className="font-display text-xl font-semibold text-white drop-shadow-sm">
              {tour.name}
            </h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-xs font-medium text-white/85">
              <MapPin className="h-3 w-3" strokeWidth={2.5} />
              {isDayTour ? (tour as DayTour).location : "Romblon Province"}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          {isDayTour && (
            <ul className="mb-4 space-y-1.5">
              {(tour as DayTour).highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-ink/70">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-palm" strokeWidth={3} />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-medium text-ink/50">from</span>
              <span className="font-display text-2xl font-semibold text-deep">{peso(lowest)}</span>
              <span className="text-xs font-medium text-ink/50">/ person</span>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-1 rounded-xl bg-foam p-1.5">
              {rateTierLabels.map((t) => (
                <div key={t.key} className="rounded-lg px-1 py-1.5 text-center">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-ink/45">
                    {t.label.replace(" pax", "")}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold text-deep">
                    {peso(tour.rates[t.key])}
                  </p>
                </div>
              ))}
            </div>

            {tour.addOn && (
              <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-sun/12 px-3 py-2">
                <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral-dark" strokeWidth={3} />
                <div>
                  <p className="text-xs font-semibold text-deep">{tour.addOn.label}</p>
                  <p className="mt-0.5 text-[11px] text-ink/60">
                    {peso(tour.addOn.rates["21plus"])} – {peso(tour.addOn.rates["5to9"])} per person
                  </p>
                </div>
              </div>
            )}

            <a
              href={siteConfig.facebookMessengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-deep px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-lagoon-dark"
            >
              <MessengerIcon className="h-4 w-4" />
              Inquire about this tour
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function InclusionsBox({
  inclusions,
  exclusions,
}: {
  inclusions: string[];
  exclusions?: string[];
}) {
  return (
    <Reveal>
      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 rounded-3xl border border-deep/8 bg-white/70 p-7 backdrop-blur sm:grid-cols-2">
        <div>
          <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-deep">
            <span className="rounded-lg bg-palm/12 p-1.5 text-palm">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            What&apos;s included
          </h4>
          <ul className="mt-3 space-y-2">
            {inclusions.map((i) => (
              <li key={i} className="flex gap-2 text-sm text-ink/70">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-palm" strokeWidth={3} />
                {i}
              </li>
            ))}
          </ul>
        </div>

        {exclusions && (
          <div>
            <h4 className="flex items-center gap-2 font-display text-sm font-semibold text-deep">
              <span className="rounded-lg bg-coral/12 p-1.5 text-coral-dark">
                <X className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              Not included
            </h4>
            <ul className="mt-3 space-y-2">
              {exclusions.map((i) => (
                <li key={i} className="flex gap-2 text-sm text-ink/70">
                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-coral-dark" strokeWidth={3} />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Reveal>
  );
}

export function Packages() {
  const [tab, setTab] = useState<"day" | "multiday">("day");

  return (
    <section id="tours" className="relative bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Published rates"
          title="Tours & packages"
          description="Pick a day tour for a quick island escape, or a multiday package for the full Romblon experience. All rates are per person."
          icon={Ship}
        />

        <Reveal delay={180}>
          <div className="mt-10 flex justify-center">
            <div
              role="tablist"
              aria-label="Tour type"
              className="inline-flex rounded-full border border-deep/10 bg-white p-1.5 shadow-sm"
            >
              {(
                [
                  { key: "day", label: "Day tours", icon: Sun, count: dayTours.length },
                  {
                    key: "multiday",
                    label: "Multiday",
                    icon: CalendarDays,
                    count: multidayTours.length,
                  },
                ] as const
              ).map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${
                    tab === t.key
                      ? "bg-deep text-white shadow-md"
                      : "text-ink/60 hover:text-deep"
                  }`}
                >
                  <t.icon className="h-4 w-4" strokeWidth={2.5} />
                  {t.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                      tab === t.key ? "bg-white/20" : "bg-deep/8"
                    }`}
                  >
                    {t.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {tab === "day" ? (
          <div key="day" className="animate-fade-in">
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {dayTours.map((tour, i) => (
                <PackageCard key={tour.slug} tour={tour} index={i} />
              ))}
            </div>
            <InclusionsBox inclusions={dayTourInclusions} />
          </div>
        ) : (
          <div key="multiday" className="animate-fade-in">
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {multidayTours.map((tour, i) => (
                <PackageCard key={tour.slug} tour={tour} index={i} />
              ))}
            </div>
            <InclusionsBox inclusions={multidayInclusions} exclusions={multidayExclusions} />
          </div>
        )}
      </div>
    </section>
  );
}
