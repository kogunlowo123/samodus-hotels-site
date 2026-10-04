/**
 * Builds the default Open Graph image and the apple-touch-icon from SVG.
 * Run: node scripts/make-og.mjs
 */
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(here, '..', 'public');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#1b2440"/>
<rect x="72" y="72" width="1056" height="486" fill="none" stroke="#ffffff" stroke-opacity="0.25" stroke-width="2"/>
<text x="120" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="84" fill="#ffffff">Samodus Hotels</text>
<text x="120" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-style="italic" fill="#e9dcc6">15 Ademosu Street, Sabo, Sagamu</text>
<text x="120" y="470" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#c9d0dd">Ogun State, Nigeria</text>
<rect x="120" y="500" width="120" height="6" fill="#8a5a1e"/>
</svg>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
<rect width="64" height="64" fill="#1b2440"/>
<text x="32" y="44" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="40" fill="#ffffff">S</text>
</svg>`;

await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(path.join(pub, 'og-default.png'));
await sharp(Buffer.from(icon)).resize(180, 180).png().toFile(path.join(pub, 'apple-touch-icon.png'));
console.log('Wrote og-default.png and apple-touch-icon.png');
