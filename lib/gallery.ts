/**
 * Destination photos are supplied named by location, so each slide carries the
 * real place name. Keep this list in sync with GALLERY in scripts/process-images.mjs.
 */
const galleryFiles = [
  "Romblon Island 1", "Calatrava 3", "Carabao Island 3", "Cobrador Island 2",
  "San Agustin 3", "Looc 2", "Ferrol 2", "Carabao Island 5",
  "Calatrava 1", "Cobrador Island 4", "Romblon Island 2", "San Agustin 1",
  "Ferrol 1", "Carabao Island 7", "Calatrava 4", "Cobrador Island 7",
  "Looc 3", "San Agustin 2", "Carabao Island 4", "Cobrador Island 1",
  "Romblon Island 3", "Calatrava 2", "Ferrol 3", "Carabao Island 6",
  "Cobrador Island 5", "San Agustin 4", "Looc 1", "Carabao Island 2",
  "Cobrador Island 3", "Cobrador Island 6", "Carabao Island 1",
];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Strips the trailing sequence number: "Carabao Island 3" -> "Carabao Island". */
const placeName = (s: string) => s.replace(/\s+\d+$/, "");

export const galleryPhotos = galleryFiles.map((file) => {
  const place = placeName(file);
  return {
    src: `/images/gallery/${slugify(file)}.jpg`,
    caption: place,
    alt: `Aerial view of ${place}, Romblon`,
  };
});

export const experiencePhotos: { src: string; caption: string }[] = [
  { src: "/images/experience/e-01.jpg", caption: "Market & Cook Tour" },
  { src: "/images/experience/e-02.jpg", caption: "Cliffside Dining" },
  { src: "/images/experience/e-03.jpg", caption: "Heritage & Museum Tour" },
  { src: "/images/experience/e-04.jpg", caption: "Group Island Hopping" },
  { src: "/images/experience/e-05.jpg", caption: "Boat Adventures" },
  { src: "/images/experience/e-06.jpg", caption: "Good Times Onboard" },
  { src: "/images/experience/e-07.jpg", caption: "Snorkeling & Marine Life" },
  { src: "/images/experience/e-08.jpg", caption: "Beach Landmarks" },
  { src: "/images/experience/e-09.jpg", caption: "Guided Shore Walks" },
  { src: "/images/experience/e-10.jpg", caption: "Local Food Experience" },
  { src: "/images/experience/e-11.jpg", caption: "Lighthouse Visit" },
  { src: "/images/experience/e-12.jpg", caption: "Farm & Countryside" },
  { src: "/images/experience/e-13.jpg", caption: "Scenic Boardwalks" },
  { src: "/images/experience/e-14.jpg", caption: "Cave Exploration" },
  { src: "/images/experience/e-15.jpg", caption: "Beachside Gatherings" },
  { src: "/images/experience/e-16.jpg", caption: "Island Viewpoints" },
];

/** Distinct destinations featured, for display in the gallery heading. */
export const featuredPlaces = [...new Set(galleryFiles.map(placeName))];
