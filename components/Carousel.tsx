"use client";

import { Img as Image } from "./Img";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

export type Slide = {
  src: string;
  alt?: string;
  caption?: string;
};

type CarouselProps = {
  slides: Slide[];
  /** Tailwind aspect class for each slide, e.g. "aspect-4/3". */
  aspect?: string;
  /** Slide width classes controlling how many are visible per breakpoint. */
  itemWidth?: string;
  /** Enables click-to-zoom lightbox. */
  lightbox?: boolean;
  label: string;
};

export function Carousel({
  slides,
  aspect = "aspect-4/3",
  itemWidth = "w-[82%] sm:w-[46%] lg:w-[31.5%]",
  lightbox = true,
  label,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState<number | null>(null);

  const updateBounds = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);

    // Track which slide is nearest the left edge, for the dot indicator.
    const child = el.children[0] as HTMLElement | undefined;
    if (child) {
      const step = child.offsetWidth + 16; // slide width + gap-4
      setActive(Math.round(el.scrollLeft / step));
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    updateBounds();
    el.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", updateBounds);
    return () => {
      el.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", updateBounds);
    };
  }, [updateBounds]);

  function scrollByPage(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  }

  // Lightbox keyboard controls
  useEffect(() => {
    if (zoomed === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setZoomed(null);
      if (e.key === "ArrowRight") setZoomed((i) => (i === null ? i : (i + 1) % slides.length));
      if (e.key === "ArrowLeft")
        setZoomed((i) => (i === null ? i : (i - 1 + slides.length) % slides.length));
    }

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoomed, slides.length]);

  const pages = Math.max(1, Math.ceil(slides.length / 3));

  return (
    <>
      <div className="relative">
        <div
          ref={trackRef}
          role="region"
          aria-label={label}
          tabIndex={0}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-lagoon/50"
        >
          {slides.map((slide, i) => (
            <div key={slide.src} className={`${itemWidth} shrink-0 snap-start`}>
              <div
                className={`group relative ${aspect} overflow-hidden rounded-2xl bg-deep/5 shadow-sm`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt ?? slide.caption ?? ""}
                  fill
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 82vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {slide.caption && (
                  <>
                    <div className="absolute inset-0 bg-linear-to-t from-deep/80 via-transparent to-transparent" />
                    <p className="absolute inset-x-4 bottom-3 font-display text-sm font-semibold text-white drop-shadow">
                      {slide.caption}
                    </p>
                  </>
                )}

                {lightbox && (
                  <button
                    type="button"
                    onClick={() => setZoomed(i)}
                    aria-label={`View photo ${i + 1} larger`}
                    className="absolute inset-0 flex items-center justify-center bg-deep/0 transition-colors hover:bg-deep/25 focus:outline-none focus-visible:bg-deep/25"
                  >
                    <span className="rounded-full bg-white/90 p-2.5 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                      <Expand className="h-4 w-4 text-deep" strokeWidth={2.5} />
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Arrows — hidden on touch-first widths where swiping is natural */}
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          disabled={atStart}
          aria-label="Previous photos"
          className="absolute -left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-deep/10 bg-white p-3 text-deep shadow-lg transition-all hover:bg-deep hover:text-white disabled:pointer-events-none disabled:opacity-0 lg:block"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          disabled={atEnd}
          aria-label="Next photos"
          className="absolute -right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-deep/10 bg-white p-3 text-deep shadow-lg transition-all hover:bg-deep hover:text-white disabled:pointer-events-none disabled:opacity-0 lg:block"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Progress dots */}
      <div className="mt-5 flex justify-center gap-1.5">
        {Array.from({ length: pages }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              Math.floor(active / 3) === i ? "w-6 bg-lagoon" : "w-1.5 bg-deep/20"
            }`}
          />
        ))}
      </div>

      {/* Lightbox */}
      {zoomed !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setZoomed(null)}
          className="animate-fade-in fixed inset-0 z-100 flex items-center justify-center bg-deep/95 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={() => setZoomed(null)}
            aria-label="Close viewer"
            className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25"
          >
            <X className="h-5 w-5" strokeWidth={2.5} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed((i) => (i === null ? i : (i - 1 + slides.length) % slides.length));
            }}
            aria-label="Previous photo"
            className="absolute left-3 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
          </button>

          <figure
            onClick={(e) => e.stopPropagation()}
            className="animate-pop-in relative max-h-[85vh] w-full max-w-5xl"
          >
            <div className="relative aspect-3/2 w-full">
              <Image
                src={slides[zoomed].src}
                alt={slides[zoomed].alt ?? slides[zoomed].caption ?? ""}
                fill
                sizes="90vw"
                className="rounded-2xl object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-white/60">
              {slides[zoomed].caption ?? `Photo ${zoomed + 1} of ${slides.length}`}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed((i) => (i === null ? i : (i + 1) % slides.length));
            }}
            aria-label="Next photo"
            className="absolute right-3 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/25 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </>
  );
}
