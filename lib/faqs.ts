import { siteConfig } from "./site-config";

// Answers are drawn from the published rate sheet. Anything not covered there is
// deliberately routed to a direct enquiry rather than guessed at.
export const faqs = [
  {
    q: "What is included in the published rates?",
    a: "Day tours include meals (snack and lunch), transportation by van and boat within the island, and entrance fees. Multiday packages include van and boat transfers within Romblon, hotel accommodation, entrance and environmental fees, meals (breakfast, lunch and dinner), and a DOT-accredited tour guide.",
  },
  {
    q: "What is not included?",
    a: "Ferry fares to and from Romblon are not included, and neither are personal expenses. You would arrange your own travel into the province, and we take care of everything once you arrive.",
  },
  {
    q: "How does group pricing work?",
    a: "Rates are quoted per person and step down as the group grows, with tiers for 5–9, 10–14, 15–20, and 21 or more travellers. The larger your group, the lower the per-person rate on most packages.",
  },
  {
    q: "Can you accommodate fewer than 5 people?",
    a: "The published rate sheet starts at 5 travellers. For smaller groups, message us directly and we will work out what is possible for your dates.",
  },
  {
    q: "How long are the multiday packages?",
    a: "The multiday packages on this page are run as 2 days and 1 night. If you would like a longer or customised itinerary, send us a message and we can build one around your schedule.",
  },
  {
    q: "How do I book a tour?",
    a: `Send us a message on Messenger, or reach us by phone at ${siteConfig.phoneDisplay} or by email at ${siteConfig.email}. Let us know your preferred dates, group size and the package you are interested in, and we will confirm availability.`,
  },
  {
    q: "Are you an accredited operator?",
    a: `Yes. Papagabs Travel and Tours is accredited by the Department of Tourism and PPA TAPPS, and registered with the DTI under registration number ${siteConfig.dtiRegNo}.`,
  },
];
