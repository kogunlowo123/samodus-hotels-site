# Samodus Hotels website

Static site for Samodus Hotels, 15 Ademosu Street, Sabo, Sagamu, Ogun State, Nigeria.

Built with Astro (static output), no client framework, self-hosted fonts, no analytics or trackers. Deployed on Render as a static site.

## Commands

```bash
npm install
npm run dev          # local dev server
npm run build        # astro check + production build to dist/
npm run preview      # serve dist/ on http://localhost:4321
npm run test:install # one-time: install Playwright Chromium
npm test             # Playwright smoke + accessibility tests (desktop + mobile)
node scripts/make-placeholders.mjs   # regenerate placeholder frames
node scripts/make-og.mjs             # regenerate OG image and touch icon
```

## Where things live

| Path | Purpose |
|---|---|
| `src/config/site.ts` | Business facts: name, address, phone, WhatsApp, email, preview mode |
| `src/data/rooms.ts` | Room inventory with `verified` flags |
| `src/data/amenities.ts` | Property amenities with `verified` flags |
| `src/data/faqs.ts` | FAQ content |
| `src/data/images.ts` | Photography manifest (slot ids, alt text, placeholder flags) |
| `src/styles/global.css` | Design tokens and shared components |
| `src/layouts/Base.astro` | HTML shell, SEO tags, JSON-LD, header, footer |
| `src/components/` | Header, Footer, Figure, RoomCard, Gallery, InquiryForm, MapLoader, Faq, StickyBar, PreviewNotice, PageHead |
| `src/pages/` | Routes |
| `public/images/` | Real photographs go here, named by slot id |
| `tests/` | Playwright tests |
| `CONTENT-TODO.md` | What the hotel still has to supply |

## Deploying

The repo contains `render.yaml`. On Render: New → Blueprint → select this repo. Render builds with `npm ci && npm run build` and serves `dist/`. Set `SITE_URL` to the live URL (used for canonical links and the sitemap).

## Content honesty rules

- Nothing marked unverified is presented as fact.
- No stock photography stands in for the hotel.
- No reviews are copied or invented; the site links to Google.
- No prices are shown until the hotel confirms them.
