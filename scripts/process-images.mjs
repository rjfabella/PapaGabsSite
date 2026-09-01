import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolved from this file so the script writes into whichever checkout it is
// run from. It previously hardcoded an absolute path into a git worktree, so
// regenerated images landed outside the repo and never reached public/.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const RES = `${ROOT}/resources`;
const DEST_DIR = `${RES}/images/destinations`;
const TOUR_DIR = `${RES}/images/tours`;
const LOGO_SRC = `${RES}/Papagabs logo 300pixels.png`;
const DOT_LOGO_SRC = `${RES}/DOT logo.svg`;
const ROMBLON_TOURISM_LOGO_SRC = `${RES}/Romblon Tourism Logo`;
const OUT_ROOT = `${ROOT}/public/images`;

const d = (name) => path.join(DEST_DIR, `${name}.jpg`);
const t = (name) => path.join(TOUR_DIR, `Copy of ${name}.jpg`);

const slug = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Destination photos are supplied already named by location, so gallery
 * captions and package imagery can be matched to the real place rather
 * than guessed at.
 */
const GALLERY = [
  "Romblon Island 1", "Calatrava 3", "Carabao Island 3", "Cobrador Island 2",
  "San Agustin 3", "Looc 2", "Ferrol 2", "Carabao Island 5",
  "Calatrava 1", "Cobrador Island 4", "Romblon Island 2", "San Agustin 1",
  "Ferrol 1", "Carabao Island 7", "Calatrava 4", "Cobrador Island 7",
  "Looc 3", "San Agustin 2", "Carabao Island 4", "Cobrador Island 1",
  "Romblon Island 3", "Calatrava 2", "Ferrol 3", "Carabao Island 6",
  "Cobrador Island 5", "San Agustin 4", "Looc 1", "Carabao Island 2",
  "Cobrador Island 3", "Cobrador Island 6", "Carabao Island 1",
];

// People/activity shots from the tour archive.
const EXPERIENCE = [
  "CLM05346", "DSC05966", "DSC09937", "DSC01220", "DSC04915", "CLM06167",
  "DSC04644", "DSC01080", "DSC05273", "CLM05300", "DSC01380", "DSC05701",
  "DSC04256", "DSC06099", "DSC01449", "DSC05603",
];

/**
 * Package artwork. Every entry below uses a photo of a location the package
 * actually visits — Calatrava, Ferrol, Looc and San Agustin are all on Tablas
 * Island, so a Tablas tour is legitimately illustrated by any of them.
 * NOTE: no Sibuyan photos were supplied, so that package falls back to a
 * tour-archive shot; swap it once Sibuyan imagery is available.
 */
const PACKAGE_IMAGES = [
  { out: "odiongan", src: t("DSC05701") }, // farm & countryside — Odiongan day tour
  { out: "calatrava", src: d("Calatrava 3") },
  { out: "ferrol", src: d("Ferrol 1") },
  { out: "looc", src: d("Looc 1") }, // Looc Bay marine sanctuary
  { out: "sibuyan", src: t("DSC05291") }, // placeholder — awaiting Sibuyan photos
  { out: "romblon", src: d("Romblon Island 2") },
  { out: "tablas", src: d("San Agustin 2") },
  { out: "boracay-carabao", src: d("Carabao Island 4") },
  { out: "ferrol-looc-stafe", src: d("Ferrol 2") },
  { out: "odiongan-calatrava-sanagustin", src: d("San Agustin 3") },
];

const HERO_SRC = d("Carabao Island 3");
const OG_SRC = d("Romblon Island 1");

/**
 * Team and guest photos. Supplied as a mix of landscape and portrait, so the
 * grid crops them to a common ratio rather than showing them at native size.
 */
const TEAM_DIR = `${RES}/images/team and guests`;
const TEAM = ["team1", "team2", "team3", "guests1", "guest2", "guests3", "guests4"];

/**
 * Downloadable rate cards. The originals are ~2.5MB PNGs of photographic
 * posters, so they re-encode to JPEG at a fraction of the size with no visible
 * loss. Full size keeps the native 1024x1536 so the tables stay readable when
 * zoomed or printed; a lighter preview is used for the on-page thumbnail.
 */
const POSTERS = [
  {
    src: `${RES}/images/posters/Published Rate for Day Tours.png`,
    out: "day-tour-rates",
  },
  {
    src: `${RES}/images/posters/Published rates for multi packages.png`,
    out: "multiday-package-rates",
  },
];

const jobs = [
  { src: HERO_SRC, out: "hero/hero-main.jpg", w: 2400, q: 82 },

  ...GALLERY.map((name) => ({
    src: d(name),
    out: `gallery/${slug(name)}.jpg`,
    w: 1200,
    q: 74,
  })),

  ...EXPERIENCE.map((name, i) => ({
    src: t(name),
    out: `experience/e-${String(i + 1).padStart(2, "0")}.jpg`,
    w: 900,
    q: 74,
  })),

  ...PACKAGE_IMAGES.map((p) => ({ src: p.src, out: `packages/${p.out}.jpg`, w: 1200, q: 80 })),

  ...TEAM.map((name) => ({
    src: path.join(TEAM_DIR, `${name}.jpg`),
    out: `team/${name}.jpg`,
    w: 900,
    q: 78,
  })),

  ...POSTERS.flatMap((p) => [
    { src: p.src, out: `downloads/papagabs-${p.out}.jpg`, w: 1024, q: 92 },
    { src: p.src, out: `downloads/preview-${p.out}.jpg`, w: 560, q: 78 },
  ]),

  { src: t("CLM05125"), out: "about/fleet.jpg", w: 1400, q: 80 },
];

async function run() {
  let missing = 0;
  for (const job of jobs) {
    const outPath = path.join(OUT_ROOT, job.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    if (!fs.existsSync(job.src)) {
      console.error("MISSING SOURCE:", job.src);
      missing++;
      continue;
    }
    await sharp(job.src)
      .rotate()
      .resize({ width: job.w, withoutEnlargement: true })
      .jpeg({ quality: job.q, mozjpeg: true })
      .toFile(outPath);
  }
  console.log(`ok: ${jobs.length - missing}/${jobs.length} photos`);

  await sharp(LOGO_SRC)
    .resize({ width: 512 })
    .png({ quality: 90 })
    .toFile(path.join(OUT_ROOT, "logo.png"));
  console.log("ok: logo.png");

  // Accreditation badges — trimmed so artwork reaches the badge edge
  const logosDir = path.join(OUT_ROOT, "logos");
  fs.mkdirSync(logosDir, { recursive: true });

  fs.copyFileSync(DOT_LOGO_SRC, path.join(logosDir, "dot.svg"));
  console.log("ok: logos/dot.svg");

  await sharp(ROMBLON_TOURISM_LOGO_SRC)
    .trim({ background: "#ffffff", threshold: 12 })
    .resize({ width: 320, height: 320, fit: "cover" })
    .png({ quality: 92 })
    .toFile(path.join(logosDir, "romblon-tourism.png"));
  console.log("ok: logos/romblon-tourism.png");

  await sharp(OG_SRC)
    .resize({ width: 1200, height: 630, fit: "cover" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT_ROOT, "og.jpg"));
  console.log("ok: og.jpg");

  if (missing) {
    console.error(`\n${missing} source file(s) missing — see MISSING SOURCE lines above.`);
    process.exit(1);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
