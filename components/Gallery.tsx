import { Camera, Waves } from "lucide-react";
import { galleryPhotos, experiencePhotos, featuredPlaces } from "@/lib/gallery";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "./SectionHeading";
import { Carousel } from "./Carousel";
import { Reveal } from "./Reveal";

export function Gallery() {
  return (
    <>
      <section id="gallery" className="bg-sand py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Explore. Experience."
            title="Romblon from above"
            description="Islands, lagoons and hidden coves across the province — swipe through, or tap any photo to view it full size."
            icon={Waves}
          />

          <Reveal delay={140}>
            <ul className="mt-7 flex flex-wrap justify-center gap-2">
              {featuredPlaces.map((place) => (
                <li
                  key={place}
                  className="rounded-full border border-deep/10 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-ink/70 backdrop-blur"
                >
                  {place}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10">
              <Carousel slides={galleryPhotos} label="Romblon aerial photo gallery" />
            </div>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-8 flex flex-wrap items-center justify-center gap-1.5 text-center text-xs text-ink/55">
              <Camera className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} />
              <span>Photos courtesy of</span>
              <a
                href={siteConfig.romblonTourismUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-lagoon-dark underline decoration-lagoon/40 underline-offset-2 transition-colors hover:text-coral hover:decoration-coral/60"
              >
                {siteConfig.romblonTourismName}
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <section id="experience" className="relative overflow-hidden bg-deep py-20 sm:py-28">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-lagoon/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-coral/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Moments"
            title="Experiences we run"
            description="From cliffside dining and cave walks to market cook tours — here's what a trip with us actually looks like."
            icon={Camera}
            tone="dark"
          />

          <Reveal delay={160}>
            <div className="mt-12">
              <Carousel
                slides={experiencePhotos.map((p) => ({
                  src: p.src,
                  caption: p.caption,
                  alt: `${p.caption} with Papagabs Travel and Tours`,
                }))}
                aspect="aspect-4/5"
                itemWidth="w-[62%] sm:w-[38%] lg:w-[23.5%]"
                label="Tour experience photos"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
