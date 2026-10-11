/**
 * Guest reviews.
 *
 * Real reviews live on the Facebook page and are not fetched: this is a static
 * export with no server, and Facebook's Page Ratings API needs a page access
 * token that cannot be shipped to the browser. Entries are therefore copied in
 * by hand from siteConfig.facebookReviewsUrl.
 *
 * Until then the list below is PLACEHOLDER copy. Each entry is flagged, and the
 * section renders a visible "Placeholder" badge on it, because unflagged
 * invented testimonials on a live business site read as real customer feedback.
 * For the same reason the site publishes no Review or AggregateRating
 * structured data — fabricated review markup misleads searchers and is a
 * manual-action risk with Google. Add both only once these are real.
 *
 * To publish a real review: replace an entry, drop `placeholder`, and use the
 * guest's name as it appears publicly on the review.
 */
export type GuestReview = {
  quote: string;
  /** Name as shown publicly on the review. Generic while placeholder. */
  author: string;
  /** Which tour they went on, when known. */
  tour?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Marks sample copy so the UI can label it and nobody mistakes it for real. */
  placeholder?: boolean;
};

export const guestReviews: GuestReview[] = [
  {
    quote:
      "Sample review text — this is placeholder copy showing how a guest review will appear once the first reviews are brought over from the Facebook page.",
    author: "Guest review",
    tour: "Romblon Island Heritage Tour",
    rating: 5,
    placeholder: true,
  },
  {
    quote:
      "Sample review text — a second placeholder, here to show how two reviews sit side by side. Replace both with real reviews before relying on this section.",
    author: "Guest review",
    tour: "Sibuyan Island Adventure Tour",
    rating: 5,
    placeholder: true,
  },
];

/** True while any review on display is sample copy rather than a real one. */
export const hasPlaceholderReviews = guestReviews.some((r) => r.placeholder);
