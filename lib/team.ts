/**
 * Team and guest photos, shown as a small grid near the foot of the page.
 * Keep this list in sync with TEAM in scripts/process-images.mjs.
 *
 * Captions stay deliberately generic: the source files are named only
 * "team*"/"guests*", so naming individuals would mean guessing at who is in
 * each frame. Swap in real names once they are known.
 */
export type TeamPhoto = { src: string; alt: string; kind: "team" | "guests" };

export const teamPhotos: TeamPhoto[] = [
  { src: "/images/team/team1.jpg", alt: "The Papagabs Travel and Tours team", kind: "team" },
  { src: "/images/team/team2.jpg", alt: "Papagabs guides on tour in Romblon", kind: "team" },
  { src: "/images/team/team3.jpg", alt: "Papagabs team preparing for a tour", kind: "team" },
  { src: "/images/team/guests1.jpg", alt: "Guests on a Papagabs island hopping tour", kind: "guests" },
  { src: "/images/team/guest2.jpg", alt: "Guests exploring Romblon with Papagabs", kind: "guests" },
  { src: "/images/team/guests3.jpg", alt: "Guests enjoying a day tour in Romblon", kind: "guests" },
  { src: "/images/team/guests4.jpg", alt: "Guests at the beach on a Papagabs tour", kind: "guests" },
];
