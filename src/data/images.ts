/**
 * Photography manifest.
 *
 * Every image the site uses is a named slot with one of three kinds:
 *
 *   placeholder  labelled grey frame, nothing else
 *   stock        licensed representative image (Unsplash License), shown with a
 *                small "Representative image" caption and credited in
 *                /public/images/CREDITS.md and on the Gallery page
 *   real         the hotel's own photograph
 *
 * To replace a stock or placeholder slot with a real photo:
 *   1. Save it as /public/images/<id>.jpg (landscape unless noted, 1600px+ wide).
 *   2. Set kind: 'real' and write honest alt text. The caption and credit
 *      disappear automatically.
 *
 * Stock files live in /public/images/stock/<id>-{640,1024,1600,2400}.webp,
 * produced by scripts/process-stock.mjs, with sizes and LQIP in stock-manifest.json.
 */
import stockManifest from './stock-manifest.json' with { type: 'json' };

export type ImageKind = 'placeholder' | 'stock' | 'real';

export type Credit = {
  author: string;
  authorUrl: string;
  sourceUrl: string;
  source: 'Unsplash';
  license: 'Unsplash License';
  downloaded: string; // YYYY-MM-DD
};

export type ImageSlot = {
  id: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  kind: ImageKind;
  category: 'exterior' | 'rooms' | 'interiors' | 'bathrooms' | 'dining' | 'guests';
  credit?: Credit;
};

type Manifest = Record<string, { width: number; height: number; widths: number[]; lqip: string }>;
const manifest = stockManifest as Manifest;

const U = (slug: string) => `https://unsplash.com/photos/${slug}`;
const P = (handle: string) => `https://unsplash.com/@${handle}`;
const D = '2026-10-04';

function stock(
  id: string,
  alt: string,
  category: ImageSlot['category'],
  credit: { author: string; handle: string; slug: string },
  caption?: string,
): ImageSlot {
  const m = manifest[id];
  if (!m) throw new Error(`No processed stock image for slot "${id}". Run scripts/process-stock.mjs.`);
  return {
    id,
    alt,
    caption,
    width: m.width,
    height: m.height,
    kind: 'stock',
    category,
    credit: {
      author: credit.author,
      authorUrl: P(credit.handle),
      sourceUrl: U(credit.slug),
      source: 'Unsplash',
      license: 'Unsplash License',
      downloaded: D,
    },
  };
}

function placeholder(id: string, alt: string, category: ImageSlot['category'], width: number, height: number, caption?: string): ImageSlot {
  return { id, alt, caption, width, height, kind: 'placeholder', category };
}

export const images: Record<string, ImageSlot> = {
  // Exterior slots stay as placeholders: a stock building would read as "this is our building".
  hero: stock(
    'room-a-1',
    'Representative image: a hotel room with a bed, desk, chairs and a television',
    'rooms',
    { author: 'Aquilion Property', handle: 'aquilionproperty', slug: 'a-hotel-room-with-a-bed-desk-chairs-and-a-television-1EJXSLUfqU0' },
    'Representative image',
  ),
  exterior: placeholder('exterior', 'Front of Samodus Hotels seen from the street', 'exterior', 1200, 900, 'Street frontage'),
  entrance: placeholder('entrance', 'Main gate and entrance to Samodus Hotels', 'exterior', 1200, 900, 'Main entrance'),
  parking: placeholder('parking', 'On-site car park inside the hotel compound', 'exterior', 1200, 900, 'Parking inside the compound'),

  reception: stock('reception', 'Representative image: hotel reception desk with wooden furniture and seating', 'interiors', { author: 'Neon Wang', handle: 'neonwangphotography', slug: 'hotel-reception-desk-with-modern-wooden-furniture-and-seating-kfnWOD1Tbp8' }, 'Reception'),
  lounge: stock('lounge', 'Representative image: chairs and table near a window', 'interiors', { author: 'Trac Vu', handle: 'tracminhvu', slug: 'black-and-gray-chairs-and-table-near-glass-window-vi59jclwSko' }, 'Lounge'),
  corridor: stock('corridor', 'Representative image: a hallway with doors', 'interiors', { author: 'Tao Yuan', handle: 'peek_a_boo_who', slug: 'a-hallway-with-doors-4Vanfy8_jbw' }, 'Guest floor'),

  'room-a-1': stock('room-a-1', 'Representative image: a hotel room with a bed, desk, chairs and a television', 'rooms', { author: 'Aquilion Property', handle: 'aquilionproperty', slug: 'a-hotel-room-with-a-bed-desk-chairs-and-a-television-1EJXSLUfqU0' }),
  'room-a-2': stock('room-a-2', 'Representative image: a hotel room with a bed and a desk', 'rooms', { author: 'sidath vimukthi', handle: 'sidathkc', slug: 'a-hotel-room-with-a-bed-and-a-desk-xZKEqleFdnk' }),
  'room-b-1': stock('room-b-1', 'Representative image: a hotel room with a large bed and a flat screen TV', 'rooms', { author: 'ikhbale', handle: 'ikhbale', slug: 'a-hotel-room-with-a-large-bed-and-a-flat-screen-tv-xMbzmWROWxE' }),
  'room-b-2': stock('room-b-2', 'Representative image: a hotel room with a sofa, desk, television and curtains', 'rooms', { author: 'Rakib Khan', handle: 'rakibkhulna', slug: 'hotel-room-with-sofa-and-television-iFJBtZFUYcY' }),
  'room-c-1': stock('room-c-1', 'Representative image: a bedroom with two beds and a balcony', 'rooms', { author: 'Ish Consul', handle: 'ishconsul', slug: 'a-bedroom-with-two-beds-and-a-balcony-ccKvfKSKH-k' }),
  'room-c-2': stock('room-c-2', 'Representative image: a hotel bedroom with a large bed and warm lighting', 'rooms', { author: 'Jazmin Wong', handle: 'jazziwong', slug: 'cozy-hotel-bedroom-with-a-large-bed-and-warm-lighting-TFXCpP5V3Ds' }),

  bathroom: stock('bathroom', 'Representative image: a bathroom with tiled walls and a shower', 'bathrooms', { author: 'Mayur Roxan', handle: 'mayurroxanphotography', slug: 'a-bathroom-with-tiled-walls-and-a-shower-su0bkpknYpU' }, 'En-suite bathroom'),
  dining: stock('dining', 'Representative image: a restaurant interior with set tables and chairs', 'dining', { author: 'R. G', handle: 'bored_mongoose', slug: 'a-modern-restaurant-interior-with-set-tables-and-chairs-IjYu7Qv6aSE' }, 'Dining'),

  // People are never represented by stock photography.
  'guests-1': placeholder('guests-1', 'Guests checking in at reception', 'guests', 1200, 900, 'Check-in'),
  'guests-2': placeholder('guests-2', 'Guests relaxing in the lounge', 'guests', 1200, 1500, 'Lounge'),
};

/** Largest single URL for a slot (used by the lightbox and Open Graph). */
export function imageSrc(slot: ImageSlot) {
  if (slot.kind === 'placeholder') return `/images/placeholders/${slot.id}.svg`;
  if (slot.kind === 'stock') {
    const m = manifest[slot.id];
    const w = m.widths[Math.min(2, m.widths.length - 1)];
    return `/images/stock/${slot.id}-${w}.webp`;
  }
  return `/images/${slot.id}.jpg`;
}

/** Responsive candidates for stock slots; undefined for others. */
export function imageSrcset(slot: ImageSlot) {
  if (slot.kind !== 'stock') return undefined;
  return manifest[slot.id].widths.map((w) => `/images/stock/${slot.id}-${w}.webp ${w}w`).join(', ');
}

export function imageLqip(slot: ImageSlot) {
  return slot.kind === 'stock' ? manifest[slot.id].lqip : undefined;
}

export const img = (id: string): ImageSlot => {
  const slot = images[id];
  if (!slot) throw new Error(`Unknown image slot: ${id}`);
  return slot;
};

export const credits = () =>
  Object.values(images)
    .filter((s) => s.kind === 'stock' && s.credit)
    .filter((s, i, arr) => arr.findIndex((t) => t.credit!.sourceUrl === s.credit!.sourceUrl) === i);
