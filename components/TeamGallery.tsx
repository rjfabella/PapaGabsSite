import { Users } from "lucide-react";
import { teamPhotos } from "@/lib/team";
import { Img as Image } from "./Img";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

/**
 * Small team-and-guests grid. Sources are a mix of landscape and one portrait,
 * so every tile is cropped to a common 4:3 via object-cover — the alternative,
 * native ratios, leaves ragged gaps in the grid.
 */
export function TeamGallery() {
  return (
    <section id="team" className="bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our people"
          title="The team, and the guests we travel with"
          description="The faces behind the tours — and some of the travellers who have explored Romblon with us."
          icon={Users}
        />

        <Reveal delay={160}>
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {teamPhotos.map((photo) => (
              <li
                key={photo.src}
                className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-deep/5 ring-1 ring-deep/5"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
