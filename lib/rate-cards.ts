export type RateCard = {
  title: string;
  blurb: string;
  /** Full-size image served from public/ */
  file: string;
  /** Lighter thumbnail for the on-page preview */
  preview: string;
  /** Filename the browser saves it as */
  downloadAs: string;
};

export const rateCards: RateCard[] = [
  {
    title: "Promo Rates until December 2026",
    blurb: "Limited-time island packages — Sibuyan, Romblon, Tablas and the multi-island tours.",
    file: "/images/downloads/papagabs-promo-rates-2026.jpg",
    preview: "/images/downloads/preview-promo-rates-2026.jpg",
    downloadAs: "Papagabs-Promo-Rates-until-December-2026.jpg",
  },
  {
    title: "Day Tour Rates",
    blurb: "Odiongan, Calatrava, Ferrol and Looc activity tours, with inclusions.",
    file: "/images/downloads/papagabs-day-tour-rates.jpg",
    preview: "/images/downloads/preview-day-tour-rates.jpg",
    downloadAs: "Papagabs-Day-Tour-Rates.jpg",
  },
  {
    title: "Multiday Package Rates",
    blurb: "Sibuyan, Romblon, Tablas, Carabao and combined island packages.",
    file: "/images/downloads/papagabs-multiday-package-rates.jpg",
    preview: "/images/downloads/preview-multiday-package-rates.jpg",
    downloadAs: "Papagabs-Multiday-Package-Rates.jpg",
  },
];
