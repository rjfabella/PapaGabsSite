import { MapPin, Phone, Mail, ShieldCheck, Send } from "lucide-react";
import { FacebookIcon, MessengerIcon } from "./BrandIcons";
import { siteConfig } from "@/lib/site-config";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.mapsQuery
  )}&output=embed`;

  const details = [
    { icon: MapPin, label: "Address", value: siteConfig.address, href: null },
    { icon: Phone, label: "Phone", value: siteConfig.phoneDisplay, href: `tel:${siteConfig.phone}` },
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-sand py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-lagoon/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get in touch"
          title="Plan your Romblon adventure"
          description="Send us your preferred dates and group size, and we'll help you build the perfect itinerary."
          icon={Send}
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <Reveal>
              <a
                href={siteConfig.facebookMessengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl bg-coral px-6 py-5 text-white shadow-xl shadow-coral/25 transition-all hover:bg-coral-dark hover:shadow-coral/40"
              >
                <span className="rounded-xl bg-white/20 p-3">
                  <MessengerIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-base font-semibold">
                    Chat with us on Messenger
                  </span>
                  <span className="block text-sm text-white/80">Fastest way to reach us</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={80}>
              <a
                href={siteConfig.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-deep/8 bg-white px-6 py-5 transition-all hover:border-lagoon/30 hover:shadow-lg"
              >
                <span className="rounded-xl bg-lagoon/10 p-3 text-lagoon-dark">
                  <FacebookIcon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-base font-semibold text-deep">
                    Follow us on Facebook
                  </span>
                  <span className="block text-sm text-ink/55">Latest tours and photos</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={140}>
              <dl className="space-y-1 rounded-2xl border border-deep/8 bg-white/70 p-6 backdrop-blur">
                {details.map((d) => (
                  <div key={d.label} className="flex gap-4 py-3">
                    <span className="mt-0.5 rounded-lg bg-foam p-2 text-lagoon-dark">
                      <d.icon className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink/45">
                        {d.label}
                      </dt>
                      <dd className="mt-0.5 text-sm text-ink/80">
                        {d.href ? (
                          <a href={d.href} className="transition-colors hover:text-lagoon-dark">
                            {d.value}
                          </a>
                        ) : (
                          d.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}

                <div className="flex gap-4 border-t border-deep/8 py-3 pt-4">
                  <span className="mt-0.5 rounded-lg bg-foam p-2 text-palm">
                    <ShieldCheck className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink/45">
                      Accreditation
                    </dt>
                    <dd className="mt-0.5 text-sm text-ink/80">
                      {siteConfig.accreditations.join(" · ")} · DTI Reg. No. {siteConfig.dtiRegNo}
                    </dd>
                  </div>
                </div>
              </dl>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="h-full overflow-hidden rounded-3xl border border-deep/8 shadow-xl shadow-deep/5">
              <iframe
                title="Papagabs Travel and Tours location on Google Maps"
                src={mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 420 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
