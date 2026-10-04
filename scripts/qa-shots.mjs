/**
 * Visual QA helper. Screenshots every route at desktop and phone widths and
 * reports any element that extends past the viewport (horizontal overflow).
 * Requires `npm run preview` running on :4321.
 *   node scripts/qa-shots.mjs [outDir]
 */
import { chromium, devices } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const base = 'http://localhost:4321';
const out = process.argv[2] || path.join(process.cwd(), 'qa-shots');
await mkdir(out, { recursive: true });

const routes = ['/', '/rooms', '/rooms/guest-rooms', '/experience', '/gallery', '/location', '/about', '/contact', '/book', '/404'];
const profiles = [
  { name: 'desktop', opts: { viewport: { width: 1366, height: 900 } } },
  { name: 'phone', opts: { ...devices['Pixel 7'] } },
];

const browser = await chromium.launch();
for (const p of profiles) {
  const ctx = await browser.newContext(p.opts);
  const page = await ctx.newPage();
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: 'networkidle' });
    const over = await page.evaluate(() => {
      const w = document.documentElement.clientWidth;
      const bad = [];
      for (const el of document.querySelectorAll('body *')) {
        const b = el.getBoundingClientRect();
        if (b.width && b.right > w + 1 && getComputedStyle(el).position !== 'fixed') {
          bad.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} right=${Math.round(b.right)}`);
        }
      }
      return { scroll: document.documentElement.scrollWidth - w, bad: bad.slice(0, 6) };
    });
    const name = `${p.name}${r === '/' ? '-home' : r.replace(/\//g, '-')}.png`;
    await page.screenshot({ path: path.join(out, name), fullPage: true });
    const flag = over.scroll > 0 ? `  OVERFLOW ${over.scroll}px: ${over.bad.join(' | ')}` : '';
    console.log(`${p.name.padEnd(8)} ${r.padEnd(24)} ${name}${flag}`);
  }
  await ctx.close();
}
await browser.close();
