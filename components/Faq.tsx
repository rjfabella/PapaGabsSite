"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "@/lib/faqs";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={index * 60}>
      <div
        className={`overflow-hidden rounded-2xl border transition-colors ${
          open ? "border-lagoon/35 bg-white" : "border-deep/8 bg-white/60"
        }`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        >
          <span className="font-display text-base font-semibold text-deep">{q}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-lagoon transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            strokeWidth={2.5}
          />
        </button>

        <div
          className={`grid transition-all duration-300 ease-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <p className="px-5 pb-5 text-sm leading-relaxed text-ink/70">{a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-foam py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Good to know"
          title="Frequently asked questions"
          icon={HelpCircle}
        />

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
