/**
 * Photography manifest.
 *
 * Every image the site uses is a named slot. While `placeholder` is true the
 * slot renders a labelled frame, never a stock photo pretending to be the
 * hotel. To go live with real photography:
 *
 *   1. Save the photo as /public/images/<id>.jpg, landscape unless noted,
 *      at least 1600px wide for hero/room images, 1200px for the rest.
 *   2. Set `placeholder: false` and write honest alt text.
 *
 * Width/height are the intended aspect ratio; they keep layout stable (CLS).
 */

export type ImageSlot = {
  id: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  placeholder: boolean;
  category: 'exterior' | 'rooms' | 'interiors' | 'bathrooms' | 'dining' | 'guests';
};

export const images: Record<string, ImageSlot> = {
  hero: {
    id: 'hero',
    alt: 'Samodus Hotels building and entrance on Ademosu Street, Sabo, Sagamu',
    caption: 'Hotel exterior',
    width: 1600,
    height: 1000,
    placeholder: true,
    category: 'exterior',
  },
  exterior: {
    id: 'exterior',
    alt: 'Front of Samodus Hotels seen from the street',
    caption: 'Street frontage',
    width: 1200,
    height: 900,
    placeholder: true,
    category: 'exterior',
  },
  entrance: {
    id: 'entrance',
    alt: 'Main gate and entrance to Samodus Hotels',
    caption: 'Main entrance',
    width: 1200,
    height: 900,
    placeholder: true,
    category: 'exterior',
  },
  reception: {
    id: 'reception',
    alt: 'Reception desk at Samodus Hotels',
    caption: 'Reception',
    width: 1200,
    height: 900,
    placeholder: true,
    category: 'interiors',
  },
  lounge: {
    id: 'lounge',
    alt: 'Guest lounge seating area',
    caption: 'Lounge',
    width: 1200,
    height: 900,
    placeholder: true,
    category: 'interiors',
  },
  corridor: {
    id: 'corridor',
    alt: 'Corridor leading to guest rooms',
    caption: 'Guest floor',
    width: 1200,
    height: 900,
    placeholder: true,
    category: 'interiors',
  },
  'room-a-1': {
    id: 'room-a-1',
    alt: 'Bed and seating in a room of the first room type',
    width: 1600,
    height: 1067,
    placeholder: true,
    category: 'rooms',
  },
  'room-a-2': {
    id: 'room-a-2',
    alt: 'Desk and window view in a room of the first room type',
    width: 1200,
    height: 900,
    placeholder: true,
    category: 'rooms',
  },
  'room-b-1': {
    id: 'room-b-1',
    alt: 'Bed and seating in a room of the second room type',
    width: 1600,
    height: 1067,
    placeholder: true,
    category: 'rooms',
  },
  'room-b-2': {
    id: 'room-b-2',
    alt: 'Wardrobe and television in a room of the second room type',
    width: 1200,
    height: 900,
    placeholder: true,
    category: 'rooms',
  },
  'room-c-1': {
    id: 'room-c-1',
    alt: 'Bed and sitting area in a room of the third room type',
    width: 1600,
    height: 1067,
    placeholder: true,
    category: 'rooms',
  },
  'room-c-2': {
    id: 'room-c-2',
    alt: 'Sitting area in a room of the third room type',
    width: 1200,
    height: 900,
    placeholder: true,
    category: 'rooms',
  },
  bathroom: {
    id: 'bathroom',
    alt: 'En-suite bathroom with shower',
    caption: 'En-suite bathroom',
    width: 1200,
    height: 1500,
    placeholder: true,
    category: 'bathrooms',
  },
  dining: {
    id: 'dining',
    alt: 'Dining area',
    caption: 'Dining',
    width: 1200,
    height: 900,
    placeholder: true,
    category: 'dining',
  },
  parking: {
    id: 'parking',
    alt: 'On-site car park inside the hotel compound',
    caption: 'Parking inside the compound',
    width: 1200,
    height: 900,
    placeholder: true,
    category: 'exterior',
  },
  'guests-1': {
    id: 'guests-1',
    alt: 'Guests checking in at reception',
    caption: 'Check-in',
    width: 1200,
    height: 900,
    placeholder: true,
    category: 'guests',
  },
  'guests-2': {
    id: 'guests-2',
    alt: 'Guests relaxing in the lounge',
    caption: 'Lounge',
    width: 1200,
    height: 1500,
    placeholder: true,
    category: 'guests',
  },
};

export function imageSrc(slot: ImageSlot) {
  return slot.placeholder ? `/images/placeholders/${slot.id}.svg` : `/images/${slot.id}.jpg`;
}

export const img = (id: string): ImageSlot => {
  const slot = images[id];
  if (!slot) throw new Error(`Unknown image slot: ${id}`);
  return slot;
};
