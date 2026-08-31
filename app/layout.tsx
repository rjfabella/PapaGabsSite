import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { faqs } from "@/lib/faqs";
import { dayTours, multidayTours } from "@/lib/tours";
import { assetUrl } from "@/lib/asset";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "DOT-accredited travel agency in Odiongan, Romblon, Philippines. Budget-friendly island hopping, unexplored beaches and multiday tour packages across Tablas, Sibuyan and Carabao.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} | Romblon Island Hopping & Budget Tour Packages`,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  alternates: { canonical: "/" },
  keywords: [
    // Target queries: Philippines, travel, Romblon, island hopping,
    // unexplored beaches, budget travel.
    "Romblon Philippines",
    "Romblon travel agency",
    "Romblon tour package",
    "island hopping Philippines",
    "island hopping Romblon",
    "unexplored beaches Philippines",
    "hidden beaches Romblon",
    "budget travel Philippines",
    "budget tour package Romblon",
    "Odiongan Romblon tours",
    "Tablas Island tour",
    "Sibuyan Island tour",
    "Carabao Island tour",
    "DOT accredited travel agency Romblon",
  ],
  category: "travel",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  // Metadata icons don't get basePath applied automatically either.
  icons: { icon: assetUrl("/images/logo.png"), apple: assetUrl("/images/logo.png") },
  openGraph: {
    type: "website",
    url: siteConfig.siteUrl,
    title: `${siteConfig.name} | Romblon Island Hopping & Budget Tour Packages`,
    description,
    siteName: siteConfig.name,
    locale: "en_PH",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Romblon Island Hopping & Budget Tour Packages`,
    description,
    images: ["/images/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#06303f",
};

// Structured data helps this show up properly in local search results.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${siteConfig.siteUrl}/#organization`,
      name: siteConfig.name,
      description,
      url: siteConfig.siteUrl,
      image: `${siteConfig.siteUrl}/images/og.jpg`,
      logo: `${siteConfig.siteUrl}/images/logo.png`,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      sameAs: [siteConfig.facebookPageUrl],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sitio Baito, Brgy. Poctoy",
        addressLocality: "Odiongan",
        addressRegion: "Romblon",
        addressCountry: "PH",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Romblon, Philippines" },
        { "@type": "Country", name: "Philippines" },
      ],
      knowsAbout: [
        "Island hopping in Romblon",
        "Unexplored beaches in the Philippines",
        "Budget travel in the Philippines",
        "Tablas Island travel",
        "Sibuyan Island travel",
        "Carabao Island travel",
      ],
      // Built from the published rate sheet in lib/tours.ts. The advertised
      // figure is the largest-group (cheapest) tier, which is what "from"
      // pricing means here — never a number we made up.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Romblon tour packages",
        itemListElement: [
          ...dayTours.map((t) => ({
            "@type": "Offer",
            name: `${t.name} day tour`,
            price: t.rates["21plus"],
            priceCurrency: "PHP",
            itemOffered: {
              "@type": "TouristTrip",
              name: `${t.name} day tour`,
              description: t.highlights.join(", "),
            },
          })),
          ...multidayTours.map((t) => ({
            "@type": "Offer",
            name: t.name,
            price: t.rates["21plus"],
            priceCurrency: "PHP",
            itemOffered: {
              "@type": "TouristTrip",
              name: t.name,
              description: `${t.duration} package in Romblon, Philippines.`,
            },
          })),
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.siteUrl}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-PH"
      className={`${outfit.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans">
        {/* Scroll-reveal starts hidden; without JS it would never un-hide. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        {/*
          If the page isn't being painted (background tab, crawler, prerenderer),
          requestAnimationFrame never runs and neither does IntersectionObserver —
          which would leave every revealed section stuck at opacity 0. Detect that
          and fall back to showing content unanimated.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var p=false;try{requestAnimationFrame(function(){p=true})}catch(e){}
setTimeout(function(){if(!p)document.documentElement.classList.add("reveal-fallback")},1200)})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
