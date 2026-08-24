"use client";

import { Img as Image } from "./Img";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MessengerIcon } from "./BrandIcons";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "#tours", label: "Tours & Rates" },
  { href: "#rate-cards", label: "Rate Cards" },
  { href: "#gallery", label: "Gallery" },
  { href: "#experience", label: "Experiences" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(1, y / height) : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-deep/90 backdrop-blur-xl shadow-lg shadow-deep/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link href="#home" className="group flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              width={72}
              height={72}
              priority
              className={`rounded-full ring-2 ring-white/25 transition-all duration-500 group-hover:ring-lagoon-light/60 ${
                scrolled ? "h-11 w-11" : "h-14 w-14"
              }`}
            />
            <span className="font-display text-base font-semibold leading-tight tracking-tight text-white sm:text-lg">
              Papagabs
              <span className="hidden font-normal text-white/70 sm:inline"> Travel &amp; Tours</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.facebookMessengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-coral/25 transition-all hover:bg-coral-dark hover:shadow-coral/40 sm:inline-flex"
            >
              <MessengerIcon className="h-4 w-4" />
              Chat with us
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-full p-2.5 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Reading progress */}
      <div className="h-0.5 w-full bg-white/10">
        <div
          className="h-full bg-linear-to-r from-lagoon to-coral transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {open && (
        <div className="animate-fade-in border-t border-white/10 bg-deep/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href={siteConfig.facebookMessengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-coral px-4 py-3.5 text-base font-semibold text-white"
            >
              <MessengerIcon className="h-5 w-5" />
              Chat with us on Messenger
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
