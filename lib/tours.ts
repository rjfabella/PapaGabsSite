export type RateTier = {
  "5to9": number;
  "10to14": number;
  "15to20": number;
  "21plus": number;
};

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

export const rateTierLabels: { key: keyof RateTier; label: string }[] = [
  { key: "5to9", label: "5–9 pax" },
  { key: "10to14", label: "10–14 pax" },
  { key: "15to20", label: "15–20 pax" },
  { key: "21plus", label: "21+ pax" },
];

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
  "Meals (Snack & Lunch)",
  "Transportation (Van & Boat within the Island)",
  "Entrance Fee",
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
  "Van and Boat transfer within Romblon",
  "Hotel Accommodation",
  "Entrance & Environmental Fees",
  "Meals (Breakfast, Lunch and Dinner)",
  "DOT Accredited Tour Guide",
];

export const multidayExclusions = ["Ferryboat to and from Romblon", "Personal Expenses"];
