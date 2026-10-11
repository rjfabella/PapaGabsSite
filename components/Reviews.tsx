import { Star, Quote, ExternalLink } from "lucide-react";
import { guestReviews, hasPlaceholderReviews, type GuestReview } from "@/lib/reviews";
import { siteConfig } from "@/lib/site-config";
import { FacebookIcon } from "./BrandIcons";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

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
      </div>
    </section>
  );
}
