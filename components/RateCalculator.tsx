"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calculator, Minus, Plus, Info, Copy, Check, Mail } from "lucide-react";
import {
  bandFor,
  dayTours,
  multidayTours,
  partyBoatAddOn,
  promo,
  promoBands,
  promoPackages,
  standardBands,
  type RateBand,
} from "@/lib/tours";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { peso } from "./Packages";

/**
 * An option carries its own rate bands, because the promo lineup bands at
 * 2/6/10/20 pax while the standard published rates band at 5/10/15/21. The
 * minimum group size therefore depends on which package is selected.
 */
type Option = {
  slug: string;
  name: string;
  kind: "Day tour" | "Multiday";
  groupLabel: string;
  bands: RateBand<string>[];
  rates: Record<string, number>;
  /** Per-person add-on, priced by band. */
  addOn?: { label: string; rates: Record<string, number> };
  /** Flat add-on charged once for the group, not per person. */
  flatAddOn?: { label: string; price: number };
};

const dayOptions: Option[] = dayTours.map((t) => ({
  slug: t.slug,
  name: t.name,
  kind: "Day tour" as const,
  groupLabel: "Day tours",
  bands: standardBands,
  rates: t.rates,
  addOn: t.addOn,
}));

const multidayOptions: Option[] = promo.active
  ? promoPackages.map((p) => ({
      slug: p.slug,
      name: p.name,
      kind: "Multiday" as const,
      groupLabel: "Promo packages",
      bands: promoBands,
      rates: p.rates,
      flatAddOn: { label: partyBoatAddOn.label, price: partyBoatAddOn.price },
    }))
  : multidayTours.map((t) => ({
      slug: t.slug,
      name: t.name,
      kind: "Multiday" as const,
      groupLabel: "Multiday packages",
      bands: standardBands,
      rates: t.rates,
      addOn: t.addOn,
    }));

const options: Option[] = [...dayOptions, ...multidayOptions];

const MAX_PAX = 60;

/** Smallest group the selected package is priced for. */
const minPaxFor = (o: Option) => o.bands[0].minPax;

/**
 * Copies text, falling back to execCommand where the async Clipboard API is
 * unavailable (older browsers, or a non-secure context).
 */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:0;left:-9999px;";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}

export function RateCalculator() {
  const [slug, setSlug] = useState(options[0].slug);
  const [pax, setPax] = useState(10);
  const [withAddOn, setWithAddOn] = useState(false);

  const selected = options.find((o) => o.slug === slug) ?? options[0];
  const minPax = minPaxFor(selected);

  const result = useMemo(() => {
    const key = bandFor(selected.bands, pax);
    const band = selected.bands.find((b) => b.key === key) ?? selected.bands[0];
    const perPerson = selected.rates[key];
    const addOnPer = withAddOn && selected.addOn ? selected.addOn.rates[key] : 0;
    const addOnFlat = withAddOn && selected.flatAddOn ? selected.flatAddOn.price : 0;
    return {
      bandLabel: band.label,
      perPerson,
      addOnPer,
      addOnFlat,
      total: (perPerson + addOnPer) * pax + addOnFlat,
    };
  }, [selected, pax, withAddOn]);

  const addOn = selected.addOn ?? selected.flatAddOn;

  // Switching packages clears an add-on that no longer applies, and lifts the
  // group size if the new package is priced from a larger minimum.
  function selectPackage(nextSlug: string) {
    setSlug(nextSlug);
    setWithAddOn(false);
    const next = options.find((o) => o.slug === nextSlug);
    if (next) setPax((p) => Math.max(minPaxFor(next), p));
  }

  /**
   * Messenger has no way to prefill a message — m.me only accepts a `ref`
   * payload, which requires a Page with a bot webhook and is never shown to
   * the sender. So the enquiry is put on the clipboard to paste instead, and
   * email is offered as the channel that genuinely does prefill.
   */
  const enquiry = useMemo(() => {
    const lines = [
      `Hi Papagabs! I'd like to enquire about this trip:`,
      ``,
      `Package: ${selected.name} (${selected.kind})`,
      `Group size: ${pax} travellers`,
      `Rate: ${peso(result.perPerson)} per person`,
    ];
    if (result.addOnPer > 0 && addOn) {
      lines.push(`Add-on: ${addOn.label} (+${peso(result.addOnPer)} per person)`);
    }
    if (result.addOnFlat > 0 && addOn) {
      lines.push(`Add-on: ${addOn.label} (+${peso(result.addOnFlat)} for the group)`);
    }
    lines.push(`Estimated total: ${peso(result.total)}`, ``, `Preferred dates: `);
    return lines.join("\n");
  }, [selected, pax, result, addOn]);

  const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    `Tour enquiry: ${selected.name} for ${pax} pax`
  )}&body=${encodeURIComponent(enquiry)}`;

  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  // Runs without preventDefault so the anchor still opens Messenger natively,
  // which avoids the popup blocking that a scripted window.open would hit.
  async function handleCopyAndOpen() {
    const ok = await copyText(enquiry);
    setCopied(ok ? "ok" : "fail");
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied("idle"), 6000);
  }

  return (
    <section id="estimate" className="relative overflow-hidden bg-foam py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-lagoon/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Plan your budget"
          title="Estimate your trip"
          description="Choose a package and your group size to see the published per-person rate and an estimated total."
          icon={Calculator}
        />

        <Reveal delay={160}>
          <div className="mt-10 overflow-hidden rounded-3xl border border-deep/8 bg-white shadow-xl shadow-deep/5">
            <div className="grid grid-cols-1 md:grid-cols-5">
              {/* Inputs */}
              <div className="space-y-6 p-7 md:col-span-3">
                <div>
                  <label
                    htmlFor="package-select"
                    className="text-xs font-semibold uppercase tracking-wider text-ink/50"
                  >
                    Package
                  </label>
                  <select
                    id="package-select"
                    value={slug}
                    onChange={(e) => selectPackage(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-deep/12 bg-sand px-4 py-3 text-sm font-medium text-deep outline-none transition-colors focus:border-lagoon focus:ring-2 focus:ring-lagoon/25"
                  >
                    {[...new Set(options.map((o) => o.groupLabel))].map((group) => (
                      <optgroup key={group} label={group}>
                        {options
                          .filter((o) => o.groupLabel === group)
                          .map((o) => (
                            <option key={o.slug} value={o.slug}>
                              {o.name}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">
                    Group size
                  </span>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setPax((p) => Math.max(minPax, p - 1))}
                      disabled={pax <= minPax}
                      aria-label="Decrease group size"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-deep/12 text-deep transition-colors hover:bg-foam disabled:opacity-35"
                    >
                      <Minus className="h-4 w-4" strokeWidth={2.5} />
                    </button>

                    <div className="flex-1 text-center">
                      <p className="font-display text-3xl font-semibold text-deep">{pax}</p>
                      <p className="text-[11px] font-medium uppercase tracking-wider text-ink/45">
                        travellers
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPax((p) => Math.min(MAX_PAX, p + 1))}
                      disabled={pax >= MAX_PAX}
                      aria-label="Increase group size"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-deep/12 text-deep transition-colors hover:bg-foam disabled:opacity-35"
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </button>
                  </div>

                  <input
                    type="range"
                    min={minPax}
                    max={MAX_PAX}
                    value={pax}
                    onChange={(e) => setPax(Number(e.target.value))}
                    aria-label="Group size slider"
                    className="mt-4 w-full accent-lagoon"
                  />
                </div>

                {addOn && (
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-sun/12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={withAddOn}
                      onChange={(e) => setWithAddOn(e.target.checked)}
                      className="h-4 w-4 accent-coral"
                    />
                    <span className="text-sm font-medium text-deep">{addOn.label}</span>
                  </label>
                )}
              </div>

              {/* Result */}
              <div className="flex flex-col justify-between bg-deep p-7 text-white md:col-span-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    {selected.kind} · {result.bandLabel}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-semibold">{selected.name}</h3>

                  <dl className="mt-6 space-y-2.5 text-sm">
                    <div className="flex justify-between text-white/75">
                      <dt>Rate per person</dt>
                      <dd className="font-medium text-white">{peso(result.perPerson)}</dd>
                    </div>
                    {result.addOnPer > 0 && (
                      <div className="flex justify-between text-white/75">
                        <dt>Add-on per person</dt>
                        <dd className="font-medium text-white">+{peso(result.addOnPer)}</dd>
                      </div>
                    )}
                    {result.addOnFlat > 0 && (
                      <div className="flex justify-between text-white/75">
                        <dt>Add-on (per boat)</dt>
                        <dd className="font-medium text-white">+{peso(result.addOnFlat)}</dd>
                      </div>
                    )}
                    <div className="flex justify-between text-white/75">
                      <dt>Travellers</dt>
                      <dd className="font-medium text-white">× {pax}</dd>
                    </div>
                  </dl>

                  <div className="mt-5 border-t border-white/15 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                      Estimated total
                    </p>
                    <p className="mt-1 font-display text-3xl font-semibold text-lagoon-light">
                      {peso(result.total)}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={siteConfig.facebookMessengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleCopyAndOpen}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-dark"
                  >
                    <Copy className="h-4 w-4" strokeWidth={2.5} />
                    Copy details &amp; open Messenger
                  </a>

                  <div aria-live="polite" className="min-h-5">
                    {copied === "ok" && (
                      <p className="animate-fade-in mt-2.5 flex items-center justify-center gap-1.5 text-[11px] font-medium text-lagoon-light">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        Copied — just paste it into the chat.
                      </p>
                    )}
                    {copied === "fail" && (
                      <p className="animate-fade-in mt-2.5 text-center text-[11px] font-medium text-sun">
                        Couldn&apos;t copy automatically — please type your details in the chat.
                      </p>
                    )}
                  </div>

                  <a
                    href={mailtoUrl}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-xs font-semibold text-white/85 transition-colors hover:border-white/40 hover:bg-white/10"
                  >
                    <Mail className="h-3.5 w-3.5" strokeWidth={2.5} />
                    Email this enquiry instead
                  </a>

                  <p className="mt-3 flex gap-1.5 text-[11px] leading-relaxed text-white/50">
                    <Info className="mt-px h-3 w-3 shrink-0" strokeWidth={2.5} />
                    Estimate only, based on published rates. Ferry fares to and from Romblon and
                    personal expenses are not included.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
