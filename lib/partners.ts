/**
 * Brands shown under the guest reviews.
 *
 * Artwork is supplied in resources/logos/ and processed by
 * scripts/process-images.mjs, which trims each mark before sizing it to a
 * common height — the Manila Bulletin source is a square with the artwork in
 * a thin band, so untrimmed it would render far smaller than the others.
 *
 * `icon` is the fallback for an entry with no artwork yet; it is unused while
 * every brand has a logo.
 *
 * `url` is intentionally unset: linking a brand's homepage from a partner
 * badge implies an endorsement they have not given. Set it to the specific
 * article or partnership page when there is one.
 */
export type Partner = {
  name: string;
  /** What the relationship actually is, shown under the name. */
  kind: string;
  /** Icon key, mapped to a lucide icon in the component. */
  icon: "globe" | "newspaper" | "plane";
  /** Path under public/ to real logo artwork, once available. */
  logo?: string;
  url?: string;
};

export const partners: Partner[] = [
  {
    name: "Rappler",
    kind: "Online news",
    icon: "globe",
    logo: "/images/partners/rappler.png",
  },
  {
    name: "Manila Bulletin",
    kind: "National newspaper",
    icon: "newspaper",
    logo: "/images/partners/manila-bulletin.png",
  },
  {
    name: "Sunlight Air",
    kind: "Airline",
    icon: "plane",
    logo: "/images/partners/sunlight-air.png",
  },
];
