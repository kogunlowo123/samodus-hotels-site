/**
 * Room inventory.
 *
 * Samodus Hotels has not yet confirmed its room categories, bed types,
 * capacities, prices or policies. The three entries below are structural
 * placeholders so the owner can see exactly what the finished page needs.
 * While `verified` is false the UI shows an "awaiting confirmation" notice,
 * hides pricing, and never states capacity as fact.
 *
 * To publish real rooms: rename, fill every field, set verified: true.
 */

export type Room = {
  slug: string;
  name: string;
  verified: boolean;
  summary: string;
  description: string;
  beds: string;
  sleeps: number | null;
  size: string;
  amenities: string[];
  bathroom: string;
  images: string[];
  /** Nightly rate in naira. null = not published. */
  price: number | null;
  policies: string[];
};

export const rooms: Room[] = [
  {
    slug: 'room-type-one',
    name: 'Room type one',
    verified: false,
    summary: 'Placeholder for the hotel’s entry-level room. Name, bed and rate to be confirmed.',
    description:
      'This entry is a placeholder. Once Samodus Hotels confirms the room name, bed configuration, capacity and what is included, this text will describe the room plainly: what the bed is, where the window faces, what is in the bathroom, and what a guest can expect on arrival.',
    beds: 'To be confirmed',
    sleeps: null,
    size: '',
    amenities: ['Air conditioning', 'En-suite bathroom', 'Television'],
    bathroom: 'En-suite, details to be confirmed',
    images: ['room-a-1', 'room-a-2', 'bathroom'],
    price: null,
    policies: [],
  },
  {
    slug: 'room-type-two',
    name: 'Room type two',
    verified: false,
    summary: 'Placeholder for the hotel’s mid-range room. Name, bed and rate to be confirmed.',
    description:
      'This entry is a placeholder. It will describe the second room category in plain terms once the hotel confirms its details.',
    beds: 'To be confirmed',
    sleeps: null,
    size: '',
    amenities: ['Air conditioning', 'En-suite bathroom', 'Television', 'Work desk'],
    bathroom: 'En-suite, details to be confirmed',
    images: ['room-b-1', 'room-b-2', 'bathroom'],
    price: null,
    policies: [],
  },
  {
    slug: 'room-type-three',
    name: 'Room type three',
    verified: false,
    summary: 'Placeholder for the hotel’s largest room. Name, bed and rate to be confirmed.',
    description:
      'This entry is a placeholder. It will describe the largest room category in plain terms once the hotel confirms its details.',
    beds: 'To be confirmed',
    sleeps: null,
    size: '',
    amenities: ['Air conditioning', 'En-suite bathroom', 'Television', 'Sitting area'],
    bathroom: 'En-suite, details to be confirmed',
    images: ['room-c-1', 'room-c-2', 'bathroom'],
    price: null,
    policies: [],
  },
];

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);

export const formatNaira = (n: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);
