/**
 * Generates labelled SVG placeholder frames for every image slot that is
 * still marked placeholder: true. Run with:  node scripts/make-placeholders.mjs
 * (Node 22.6+ strips the TypeScript types from images.ts at import time.)
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const { images } = await import(pathToFileURL(path.join(here, '..', 'src', 'data', 'images.ts')).href);
const outDir = path.join(here, '..', 'public', 'images', 'placeholders');
await mkdir(outDir, { recursive: true });

const names = { a: 'one', b: 'two', c: 'three' };
const titleCase = (s) =>
  s
    .replace(/^room-([abc])-(\d)$/, (_, t, n) => `Room type ${names[t]}, photo ${n}`)
    .replace(/-/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase());

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

let count = 0;
for (const slot of Object.values(images)) {
  if (!slot.placeholder) continue;
  const { id, width: w, height: h } = slot;
  const label = esc(slot.caption || titleCase(id));
  const fs = Math.round(Math.min(w, h) / 14);
  const fsSmall = Math.round(fs * 0.42);
  const inset = Math.round(Math.min(w, h) * 0.05);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}: photograph pending">
<defs><pattern id="h" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="28" stroke="#cfd6e0" stroke-width="1"/></pattern></defs>
<rect width="${w}" height="${h}" fill="#e2e7ee"/>
<rect width="${w}" height="${h}" fill="url(#h)"/>
<rect x="${inset}" y="${inset}" width="${w - 2 * inset}" height="${h - 2 * inset}" fill="none" stroke="#1b2440" stroke-opacity="0.25" stroke-width="2"/>
<text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${fs}" fill="#1b2440">${label}</text>
<text x="50%" y="${Math.round(h / 2 + fs * 0.95)}" text-anchor="middle" dominant-baseline="middle" font-family="system-ui, Arial, sans-serif" font-size="${fsSmall}" fill="#5b6472">Photograph pending</text>
</svg>
`;
  await writeFile(path.join(outDir, `${id}.svg`), svg, 'utf8');
  count++;
}
console.log(`Wrote ${count} placeholder frames to ${path.relative(process.cwd(), outDir)}`);
