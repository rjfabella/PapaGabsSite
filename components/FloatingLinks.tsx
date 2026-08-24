"use client";

import { Img as Image } from "./Img";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { MessengerIcon } from "./BrandIcons";
import { siteConfig } from "@/lib/site-config";

const badges = [
  {
    href: siteConfig.dotUrl,
    src: "/images/logos/dot.svg",
    label: "Department of Tourism — accredited operator",
    alt: "Department of Tourism",
  },
  {
    href: siteConfig.romblonTourismUrl,
    src: "/images/logos/romblon-tourism.png",
    label: "Romblon Tourism on Facebook",
    alt: "Romblon Tourism",
  },
];

export function FloatingLinks() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-2.5 sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-deep/85 text-white shadow-lg backdrop-blur transition-all duration-300 hover:bg-deep ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
      </button>

      {badges.map((b) => (
        <a
          key={b.src}
          href={b.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={b.label}
          title={b.label}
          className="group relative block h-12 w-12 overflow-hidden rounded-full shadow-lg ring-1 ring-black/5 transition-transform duration-300 hover:scale-110 sm:h-[52px] sm:w-[52px]"
        >
          <Image
            src={b.src}
            alt={b.alt}
            fill
            priority
            sizes="52px"
            className="scale-[1.02] object-cover"
          />
        </a>
      ))}

      <a
        href={siteConfig.facebookMessengerUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on Messenger"
        title="Chat with us on Messenger"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-xl shadow-coral/30 transition-all duration-300 hover:scale-110 hover:bg-coral-dark sm:h-16 sm:w-16"
      >
        <span className="absolute inset-0 rounded-full bg-coral/40 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-0" />
        <MessengerIcon className="relative h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
}
