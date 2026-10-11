/**
 * Brands shown under the guest reviews.
 *
 * No official logo artwork has been supplied, so each entry renders a lucide
 * icon plus a wordmark rather than the real mark. Dropping a file into
 * public/images/partners/ and setting `logo` makes the component use it
 * instead — third-party logos are trademarks, so only use artwork the brand
 * has actually provided or published for this purpose.
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
  { name: "Rappler", kind: "Online news", icon: "globe" },
  { name: "Manila Bulletin", kind: "National newspaper", icon: "newspaper" },
  { name: "Sunlight Air", kind: "Airline", icon: "plane" },
];

/** True while no entry has real logo artwork. */
export const partnersAwaitingLogos = partners.every((p) => !p.logo);
