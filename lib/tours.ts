/**
 * Two rate structures run side by side.
 *
 * The standard published rates band groups as 5-9 / 10-14 / 15-20 / 21+. The
 * promo sheet (valid to December 2026) uses 2-5 / 6-9 / 10-19 / 20+ instead,
 * and starts at 2 pax rather than 5. The bands are therefore data rather than
 * hardcoded, so a package carries whichever set applies to it.
 */
export type RateBand<K extends string> = {
  key: K;
  /** Full label, e.g. "10-14 pax". */
  label: string;
  /** Compact label for the rate grid on a card. */
  short: string;
  /** Lowest group size this band covers; bands are ordered ascending. */
  minPax: number;
};

export type StandardTierKey = "5to9" | "10to14" | "15to20" | "21plus";
export type PromoTierKey = "2to5" | "6to9" | "10to19" | "20plus";

export type RateTier = Record<StandardTierKey, number>;
export type PromoRates = Record<PromoTierKey, number>;

export const standardBands: RateBand<StandardTierKey>[] = [
  { key: "5to9", label: "5-9 pax", short: "5-9", minPax: 5 },
  { key: "10to14", label: "10-14 pax", short: "10-14", minPax: 10 },
  { key: "15to20", label: "15-20 pax", short: "15-20", minPax: 15 },
  { key: "21plus", label: "21+ pax", short: "21+", minPax: 21 },
];

export const promoBands: RateBand<PromoTierKey>[] = [
  { key: "2to5", label: "2-5 pax", short: "2-5", minPax: 2 },
  { key: "6to9", label: "6-9 pax", short: "6-9", minPax: 6 },
  { key: "10to19", label: "10-19 pax", short: "10-19", minPax: 10 },
  { key: "20plus", label: "20+ pax", short: "20+", minPax: 20 },
];

/** Picks the band a group size falls into. Bands must be ordered ascending. */
export function bandFor<K extends string>(bands: RateBand<K>[], pax: number): K {
  let match = bands[0];
  for (const b of bands) if (pax >= b.minPax) match = b;
  return match.key;
}

export type DayTour = {
  slug: string;
  name: string;
  location: string;
  highlights: string[];
  rates: RateTier;
  image: string;
  addOn?: { label: string; rates: RateTier };
};

export type MultidayTour = {
  slug: string;
  name: string;
  duration: string;
  rates: RateTier;
  image: string;
  addOn?: { label: string; rates: RateTier };
};

export const dayTours: DayTour[] = [
  {
    slug: "odiongan",
    name: "Odiongan",
    location: "Choose any 2 destinations",
    highlights: [
      "Libertad Mangrove",
      "Tuburan Busay Falls",
      "Aspire Farm",
      "Town Tour (Café / Spa / Market & Cook)",
    ],
    rates: { "5to9": 4999, "10to14": 4749, "15to20": 4499, "21plus": 4249 },
    image: "/images/packages/odiongan.jpg",
  },
  {
    slug: "calatrava",
    name: "Calatrava",
    location: "Island Hopping",
    highlights: ["Lapus-Lapus", "Guindawahan Island", "Tinagong Dagat"],
    rates: { "5to9": 4499, "10to14": 3999, "15to20": 3599, "21plus": 3199 },
    image: "/images/packages/calatrava.jpg",
    addOn: {
      label: "Optional: Blue Hole",
      rates: { "5to9": 1500, "10to14": 1500, "15to20": 1500, "21plus": 1500 },
    },
  },
  {
    slug: "ferrol",
    name: "Ferrol",
    location: "Deep & Dive, Snorkeling",
    highlights: ["Deep & Dive", "Snorkeling"],
    rates: { "5to9": 4399, "10to14": 3999, "15to20": 3599, "21plus": 3199 },
    image: "/images/packages/ferrol.jpg",
  },
  {
    slug: "looc",
    name: "Looc",
    location: "Heritage Tour, Deep & Dive",
    highlights: ["Heritage Tour", "Deep & Dive"],
    rates: { "5to9": 4399, "10to14": 3999, "15to20": 3599, "21plus": 3199 },
    image: "/images/packages/looc.jpg",
  },
];

export const dayTourInclusions = [
  "Van transfer",
  "Entrance Fees",
  "Environmental Fees",
  "Meals (Lunch)",
];

export const multidayTours: MultidayTour[] = [
  {
    slug: "sibuyan",
    name: "Sibuyan Tour",
    duration: "2 Days & 1 Night",
    rates: { "5to9": 14999, "10to14": 13999, "15to20": 12999, "21plus": 11999 },
    image: "/images/packages/sibuyan.jpg",
  },
  {
    slug: "romblon",
    name: "Romblon Tour",
    duration: "2 Days & 1 Night",
    rates: { "5to9": 13999, "10to14": 12999, "15to20": 11999, "21plus": 10999 },
    image: "/images/packages/romblon.jpg",
  },
  {
    slug: "tablas",
    name: "Tablas Tour",
    duration: "2 Days & 1 Night",
    rates: { "5to9": 13999, "10to14": 12999, "15to20": 11999, "21plus": 10999 },
    image: "/images/packages/tablas.jpg",
  },
  {
    slug: "boracay-carabao",
    name: "Boracay to Carabao",
    duration: "2 Days & 1 Night",
    rates: { "5to9": 7999, "10to14": 6999, "15to20": 5999, "21plus": 4999 },
    image: "/images/packages/boracay-carabao.jpg",
    addOn: {
      label: "Add on: Party Boat",
      rates: { "5to9": 3000, "10to14": 2000, "15to20": 1000, "21plus": 750 },
    },
  },
  {
    slug: "ferrol-looc-stafe",
    name: "Ferrol – Looc – Sta. Fe",
    duration: "2 Days & 1 Night",
    rates: { "5to9": 7999, "10to14": 6999, "15to20": 5999, "21plus": 4999 },
    image: "/images/packages/ferrol-looc-stafe.jpg",
  },
  {
    slug: "odiongan-calatrava-sanagustin",
    name: "Odiongan – Calatrava – San Agustin",
    duration: "2 Days & 1 Night",
    rates: { "5to9": 8999, "10to14": 7999, "15to20": 6999, "21plus": 5999 },
    image: "/images/packages/odiongan-calatrava-sanagustin.jpg",
  },
];

export const multidayInclusions = [
  "Hotel Accommodation",
  "Van and Boat transfer within Romblon",
  "Entrance Fees",
  "Environmental Fees",
  "Meals (Breakfast, Lunch & Dinner)",
  "DOT Accredited Tour Guide",
];

export const multidayExclusions = ["Ferryboat to and from Romblon", "Personal Expenses"];

/**
 * Promo lineup, from "Promo Rates until December 2026".
 *
 * This REPLACES the standard multiday lineup above while `promo.active` is
 * true; the standard tours are kept so the site reverts by flipping that one
 * flag when the offer ends. Expiry is deliberately NOT computed from the
 * current date: this is a static export, so a date check would only re-evaluate
 * on the next rebuild and could leave expired rates live indefinitely.
 */
export const promo = {
  active: true,
  endsOn: "31 December 2026",
  label: "Promo rate",
  note: "Limited-time promo rates, valid until 31 December 2026.",
};

export type PromoPackage = {
  slug: string;
  name: string;
  /** Islands covered, shown under the name on the multi-island packages. */
  subtitle?: string;
  duration: string;
  rates: PromoRates;
  /** The sheet labels these "Highlights" on single-island tours and
   *  "Destinations" on the multi-island ones. */
  listLabel: "Highlights" | "Destinations";
  highlights: string[];
  note?: string;
  image: string;
};

export const promoPackages: PromoPackage[] = [
  {
    slug: "sibuyan-adventure",
    name: "Sibuyan Island Adventure Tour",
    duration: "2D/1N",
    rates: { "2to5": 10000, "6to9": 8000, "10to19": 6000, "20plus": 4000 },
    listLabel: "Highlights",
    highlights: [
      "Cresta de Gallo Island",
      "Cantingas River",
      "Mt. Guiting-Guiting Viewpoints",
      "Local cultural experiences",
    ],
    image: "/images/packages/sibuyan.jpg",
  },
  {
    slug: "romblon-heritage",
    name: "Romblon Island Heritage Tour",
    duration: "2D/1N",
    rates: { "2to5": 10000, "6to9": 8000, "10to19": 6000, "20plus": 4000 },
    listLabel: "Highlights",
    highlights: [
      "Bonbon Beach",
      "Island hopping: Cobrador Island",
      "Island hopping: Takot Reef",
      "Heritage Town Tour experience",
    ],
    image: "/images/packages/romblon.jpg",
  },
  {
    slug: "tablas-discovery",
    name: "Tablas Island Discovery Tour",
    duration: "2D/1N",
    rates: { "2to5": 10000, "6to9": 8000, "10to19": 6000, "20plus": 4000 },
    listLabel: "Highlights",
    highlights: [
      "Binucot Beach",
      "Bel-At Point",
      "Looc Bay Marine Sanctuary",
      "Tablas countryside tour",
    ],
    image: "/images/packages/tablas.jpg",
  },
  {
    slug: "tri-island-explorer",
    name: "Tri-Island Explorer Tour",
    subtitle: "Sibuyan, Romblon & Tablas",
    duration: "5D/4N",
    rates: { "2to5": 27000, "6to9": 24000, "10to19": 22000, "20plus": 20000 },
    listLabel: "Destinations",
    highlights: ["Sibuyan Island", "Romblon Island", "Tablas Island"],
    note: "Perfect for travellers who want to experience the three main islands of Romblon Province.",
    image: "/images/packages/tri-island-explorer.jpg",
  },
  {
    slug: "four-island-ultimate",
    name: "Four-Island Ultimate Adventure",
    subtitle: "Sibuyan, Romblon, Tablas & Carabao Island",
    duration: "6D/5N",
    rates: { "2to5": 30000, "6to9": 28000, "10to19": 26000, "20plus": 24000 },
    listLabel: "Destinations",
    highlights: ["Sibuyan Island", "Romblon Island", "Tablas Island", "Carabao Island"],
    note: "Perfect for guests seeking the complete Romblon island-hopping experience.",
    image: "/images/packages/four-island-ultimate.jpg",
  },
];

/** Promo sheet inclusions, as printed on the rate poster. */
export const promoInclusions = [
  "Transportation",
  "Accommodation",
  "Island Tours",
  "Tour Guide Assistance",
  "Entrance Fees (subject to package details)",
];

/** Multiday add-on, from Brochure Page 2. Charged per boat, not per person. */
export const partyBoatAddOn = { label: "Add on: Party Boat", price: 5000, per: "group" } as const;
