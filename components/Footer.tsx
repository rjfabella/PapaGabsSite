import { Img as Image } from "./Img";
import { Mail, Phone, MapPin } from "lucide-react";
import { FacebookIcon } from "./BrandIcons";
import { siteConfig } from "@/lib/site-config";

const sections = [
  { href: "#tours", label: "Tours & Rates" },
  { href: "#estimate", label: "Estimate a trip" },
  { href: "#rate-cards", label: "Download rates" },
  { href: "#gallery", label: "Gallery" },
  { href: "#experience", label: "Experiences" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-deep text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                width={64}
                height={64}
                className="h-14 w-14 rounded-full ring-2 ring-white/15"
              />
              <div>
                <p className="font-display text-lg font-semibold text-white">{siteConfig.name}</p>
                <p className="text-sm text-lagoon-light">{siteConfig.tagline}</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              A DOT-accredited, home-grown travel agency running day tours and multiday island
              adventures across Romblon province.
            </p>
          </div>

          <nav>
            <h3 className="font-display text-sm font-semibold text-white">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {sections.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="text-sm transition-colors hover:text-lagoon-light">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" strokeWidth={2.2} />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" strokeWidth={2.2} />
                <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-lagoon-light">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" strokeWidth={2.2} />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all transition-colors hover:text-lagoon-light"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <FacebookIcon className="mt-0.5 h-4 w-4 shrink-0 text-lagoon" />
                <a
                  href={siteConfig.facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-lagoon-light"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-7 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            {siteConfig.accreditations.join(" · ")} · DTI Reg. No. {siteConfig.dtiRegNo}
          </p>
        </div>
      </div>
    </footer>
  );
}
