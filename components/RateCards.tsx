import { Img as Image } from "./Img";
import { Download, FileImage, Maximize2 } from "lucide-react";
import { rateCards } from "@/lib/rate-cards";
import { assetUrl } from "@/lib/asset";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function RateCards() {
  return (
    <section id="rate-cards" className="relative overflow-hidden bg-sand py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-sun/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Take it with you"
          title="Download our rate cards"
          description="Save or print the full published rate sheets to share with your group."
          icon={FileImage}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {rateCards.map((card, i) => (
            <Reveal key={card.file} delay={i * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-deep/8 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-deep/10">
                <a
                  href={assetUrl(card.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[1024/1536] overflow-hidden bg-foam"
                  aria-label={`View ${card.title} full size in a new tab`}
                >
                  <Image
                    src={card.preview}
                    alt={`${card.title} rate card`}
                    fill
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-deep/0 transition-colors group-hover:bg-deep/25">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-deep opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      <Maximize2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                      View full size
                    </span>
                  </span>
                </a>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold text-deep">{card.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{card.blurb}</p>

                  <a
                    href={assetUrl(card.file)}
                    download={card.downloadAs}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-coral px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-coral-dark"
                  >
                    <Download className="h-4 w-4" strokeWidth={2.5} />
                    Download
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-center text-xs text-ink/50">
            Rates are per person and subject to change. Message us to confirm current
            pricing and availability for your dates.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
