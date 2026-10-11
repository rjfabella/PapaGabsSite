import { Star, Quote, ExternalLink, Globe, Newspaper, Plane } from "lucide-react";
import { guestReviews, hasPlaceholderReviews, type GuestReview } from "@/lib/reviews";
import { partners, type Partner } from "@/lib/partners";
import { siteConfig } from "@/lib/site-config";
import { Img as Image } from "./Img";
import { FacebookIcon } from "./BrandIcons";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const partnerIcons = { globe: Globe, newspaper: Newspaper, plane: Plane };

function PartnerBadge({ partner }: { partner: Partner }) {
  const Icon = partnerIcons[partner.icon];
  const inner = (
    <>
      {partner.logo ? (
        <Image
          src={partner.logo}
          alt={partner.name}
          width={120}
          height={40}
          className="h-8 w-auto object-contain"
        />
      ) : (
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-deep/5 text-deep/55">
          <Icon className="h-4.5 w-4.5" strokeWidth={2} aria-hidden />
        </span>
      )}
      <span className="text-left">
        <span className="block font-display text-sm font-semibold text-deep">{partner.name}</span>
        <span className="block text-[11px] text-ink/50">{partner.kind}</span>
      </span>
    </>
  );

  const className =
    "inline-flex items-center gap-3 rounded-2xl border border-deep/8 bg-white px-4 py-3 shadow-sm";

  return partner.url ? (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} transition-colors hover:border-lagoon/40`}
    >
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={`h-4 w-4 ${i < rating ? "fill-sun text-sun" : "text-deep/15"}`}
          strokeWidth={2}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: GuestReview; index: number }) {
  return (
    <Reveal delay={index * 90} className="h-full">
      <figure className="relative flex h-full flex-col rounded-3xl border border-deep/8 bg-white p-6 shadow-sm">
        <Quote
          aria-hidden
          className="absolute right-5 top-5 h-8 w-8 text-lagoon/12"
          strokeWidth={2}
        />

        <Stars rating={review.rating} />

        <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">
          {review.quote}
        </blockquote>

        <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-deep/8 pt-4">
          <div>
            <p className="text-sm font-semibold text-deep">{review.author}</p>
            {review.tour && <p className="mt-0.5 text-xs text-ink/55">{review.tour}</p>}
          </div>
          {review.placeholder && (
            <span className="shrink-0 rounded-full bg-sun/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-coral-dark">
              Placeholder
            </span>
          )}
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Reviews() {
  return (
    <section id="reviews" className="bg-foam py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Guest reviews"
          title="What our guests say"
          description="Reviews from travellers who have explored Romblon with us."
          icon={Star}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {guestReviews.map((review, i) => (
            <ReviewCard key={review.quote} review={review} index={i} />
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-10 flex flex-col items-center gap-3">
            <a
              href={siteConfig.facebookReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-lagoon-dark"
            >
              <FacebookIcon className="h-4 w-4" />
              Read our reviews on Facebook
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
            </a>

            {hasPlaceholderReviews && (
              <p className="text-center text-xs text-ink/50">
                The quotes above are placeholders while we bring our Facebook reviews across.
                Tap through to read the real ones.
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-16 border-t border-deep/8 pt-10">
            <h3 className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
              Brands we&apos;ve partnered with
            </h3>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {partners.map((partner) => (
                <li key={partner.name}>
                  <PartnerBadge partner={partner} />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
