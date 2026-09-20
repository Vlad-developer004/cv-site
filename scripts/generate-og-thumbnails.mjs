// Regenerates the small JPEG thumbnails under public/projects/og/ used by
// src/app/[locale]/projects/[slug]/opengraph-image.tsx. Run this after
// replacing any file in public/projects/*.png so the OG image function keeps
// embedding a ~20-40KB JPEG instead of the full source screenshot.
//
// Usage: node scripts/generate-og-thumbnails.mjs

import sharp from 'sharp';

// Keep in sync with PROJECT_IDS in src/lib/project-visuals.ts.
const PROJECT_IDS = ['bus-tickets', 'shop', 'rechtsform', 'jarvis', 'paper-trader'];

const WIDTH = 1072;
const HEIGHT = 344;
const QUALITY = 76;

for (const id of PROJECT_IDS) {
  const src = `public/projects/${id}.png`;
  const out = `public/projects/og/${id}.jpg`;
  await sharp(src).resize(WIDTH, HEIGHT, { fit: 'cover', position: 'top' }).jpeg({ quality: QUALITY }).toFile(out);
  console.log(`${id} -> ${out}`);
}
