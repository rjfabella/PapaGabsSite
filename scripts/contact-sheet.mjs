import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC_DIRS = [
  { dir: "D:/github/PapaGabsSite/resources/images/destinations", tag: "D" },
];

const OUT_DIR =
  "D:/github/PapaGabsSite/.claude/worktrees/romblon-travel-agency-site-dce074/scratch-sheets";
fs.mkdirSync(OUT_DIR, { recursive: true });

const THUMB_W = 300;
const THUMB_H = 200;
const COLS = 4;
const PAD = 6;
const LABEL_H = 22;

async function buildSheet(files, outPath) {
  const cellW = THUMB_W + PAD * 2;
  const cellH = THUMB_H + PAD * 2 + LABEL_H;
  const rows = Math.ceil(files.length / COLS);

  const composites = [];
  for (let i = 0; i < files.length; i++) {
    const { filePath, label } = files[i];
    const x = (i % COLS) * cellW + PAD;
    const y = Math.floor(i / COLS) * cellH + PAD;

    composites.push({
      input: await sharp(filePath).resize(THUMB_W, THUMB_H, { fit: "cover" }).jpeg({ quality: 72 }).toBuffer(),
      left: x,
      top: y,
    });
    composites.push({
      input: Buffer.from(
        `<svg width="${THUMB_W}" height="${LABEL_H}"><rect width="100%" height="100%" fill="black"/><text x="3" y="15" font-size="13" fill="#fff" font-family="monospace">${label}</text></svg>`
      ),
      left: x,
      top: y + THUMB_H,
    });
  }

  await sharp({
    create: { width: cellW * COLS, height: cellH * rows, channels: 3, background: "#222" },
  })
    .composite(composites)
    .jpeg({ quality: 80 })
    .toFile(outPath);

  console.log("wrote", outPath, files.length);
}

for (const { dir, tag } of SRC_DIRS) {
  const files = fs.readdirSync(dir).filter((f) => /\.(jpg|jpeg|png)$/i.test(f)).sort();
  const items = files.map((f) => ({
    filePath: path.join(dir, f),
    label: `${tag}:${f.replace(/\.(jpg|jpeg|png)$/i, "")}`,
  }));

  const CHUNK = 16;
  for (let i = 0; i < items.length; i += CHUNK) {
    await buildSheet(items.slice(i, i + CHUNK), path.join(OUT_DIR, `${tag}-${i / CHUNK + 1}.jpg`));
  }
}
