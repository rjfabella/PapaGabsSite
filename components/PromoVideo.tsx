"use client";

import { useState } from "react";
import { Clapperboard, Play } from "lucide-react";
import { promoVideo } from "@/lib/promo-video";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { YoutubeIcon } from "./BrandIcons";

/**
 * Click-to-load YouTube embed. Showing a plain thumbnail until the visitor
 * opts in avoids loading YouTube's player (and its trackers) on every page
 * view, and youtube-nocookie.com defers third-party cookies further until
 * playback actually starts.
 */
export function PromoVideo() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="video" className="bg-deep py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Watch"
          title="See Romblon in motion"
          description="A quick look at what's waiting for you across the province."
          icon={Clapperboard}
          tone="dark"
        />

        <Reveal delay={160}>
          <div className="relative mt-12 aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/40">
            {playing ? (
              <iframe
                src={promoVideo.embedUrl}
                title={promoVideo.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play video: ${promoVideo.title}`}
                className="group absolute inset-0 h-full w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- external YouTube thumbnail, not a local asset */}
                <img
                  src={promoVideo.thumbnail}
                  alt=""
                  className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-95"
                  loading="lazy"
                />
                <span className="absolute inset-0 bg-linear-to-t from-deep/70 via-deep/10 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-coral text-white shadow-xl shadow-coral/40 transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
                    <Play className="ml-1 h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.5} fill="currentColor" />
                  </span>
                </span>
                <span className="absolute inset-x-4 bottom-4 text-left sm:inset-x-6 sm:bottom-6">
                  <span className="line-clamp-2 font-display text-base font-semibold text-white drop-shadow sm:text-lg">
                    {promoVideo.title}
                  </span>
                </span>
              </button>
            )}
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-center text-xs text-white/55">
            <YoutubeIcon className="h-3.5 w-3.5 shrink-0" />
            <span>Video by</span>
            <a
              href={promoVideo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-lagoon-light underline decoration-lagoon-light/40 underline-offset-2 transition-colors hover:text-coral hover:decoration-coral/60"
            >
              {promoVideo.channel} on YouTube
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
