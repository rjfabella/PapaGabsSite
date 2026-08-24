import { BadgeCheck, Bus, UtensilsCrossed, Ticket, BedDouble, Users } from "lucide-react";
import { Reveal } from "./Reveal";

// Every item here is drawn from the published rate sheet's inclusions.
const highlights = [
  {
    icon: BadgeCheck,
    title: "DOT-accredited guides",
    body: "Every multiday package is led by a Department of Tourism accredited tour guide.",
  },
  {
    icon: Bus,
    title: "Transfers handled",
    body: "Van and boat transfers within Romblon are included — no separate booking needed.",
  },
  {
    icon: UtensilsCrossed,
    title: "Meals included",
    body: "Snack and lunch on day tours; breakfast, lunch and dinner on multiday packages.",
  },
  {
    icon: Ticket,
    title: "Fees covered",
    body: "Entrance and environmental fees are already built into the published rates.",
  },
  {
    icon: BedDouble,
    title: "Accommodation sorted",
    body: "Hotel accommodation is arranged for you as part of every multiday package.",
  },
  {
    icon: Users,
    title: "Better rates for groups",
    body: "Per-person pricing drops as your group grows, from 5 pax all the way to 21 and above.",
  },
];

export function Highlights() {
  return (
    <section id="highlights" className="relative bg-sand py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="group h-full rounded-2xl border border-deep/8 bg-white/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-lagoon/30 hover:bg-white hover:shadow-xl hover:shadow-lagoon/10">
                <div className="inline-flex rounded-xl bg-lagoon/10 p-3 text-lagoon-dark transition-colors group-hover:bg-lagoon group-hover:text-white">
                  <item.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-deep">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
