/**
 * Converts source JPGs into responsive WebP sets plus a tiny blurred LQIP.
 *   node scripts/process-stock.mjs <srcDir>
 * Output: public/images/stock/<name>-{640,1024,1600,2400}.webp and a manifest
 * at src/data/stock-manifest.json with intrinsic size and LQIP data URI.
 */
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const src = process.argv[2];
if (!src) throw new Error('usage: node scripts/process-stock.mjs <srcDir>');
const out = path.join('public', 'images', 'stock');
await mkdir(out, { recursive: true });
const widths = [640, 1024, 1600, 2400];
const manifest = {};

for (const f of (await readdir(src)).filter((n) => /\.(jpe?g|png)$/i.test(n))) {
  const name = f.replace(/\.[^.]+$/, '');
  const img = sharp(path.join(src, f)).rotate();
  const meta = await img.metadata();
  for (const w of widths) {
    if (w > meta.width) continue;
    await img.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: 74, effort: 5 }).toFile(path.join(out, `${name}-${w}.webp`));
  }
  const lqip = await img.clone().resize({ width: 24 }).blur(1).webp({ quality: 40 }).toBuffer();
  manifest[name] = {
    width: meta.width,
    height: meta.height,
    widths: widths.filter((w) => w <= meta.width),
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  };
  console.log(`${name}: ${meta.width}x${meta.height}`);
}
await writeFile(path.join('src', 'data', 'stock-manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`manifest: ${Object.keys(manifest).length} images`);
