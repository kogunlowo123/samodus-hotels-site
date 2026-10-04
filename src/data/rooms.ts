/**
 * Room inventory.
 *
 * The hotel has not yet confirmed its room categories, bed types, capacities
 * or rates, so the site lists rooms as one honest offering built only from
 * what is known: air-conditioned, en-suite, with television. When the hotel
 * supplies categories, add one entry per category here; the pages adapt.
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
  /** Nightly rate in naira. null = quoted on enquiry. */
  price: number | null;
  policies: string[];
};

export const rooms: Room[] = [
  {
    slug: 'guest-rooms',
    name: 'Guest rooms',
    verified: true,
    summary: 'Air-conditioned rooms with their own bathroom and television, on a quiet residential street in Sabo.',
    description:
      'Every room at Samodus Hotels is air conditioned, has its own bathroom and a television. Tell the hotel your dates and how many people are travelling, and it will reply with the room that fits, the bed arrangement and the nightly rate. Longer stays and group bookings for ceremonies are handled the same way, directly with reception.',
    beds: 'Matched to your party when you enquire',
    sleeps: null,
    size: '',
    amenities: ['Air conditioning', 'En-suite bathroom', 'Television'],
    bathroom: 'Private, en-suite',
    images: ['room-a-1', 'room-a-2', 'room-b-1', 'room-b-2', 'room-c-1', 'room-c-2', 'bathroom'],
    price: null,
    policies: [
      'Rates and availability are confirmed directly by the hotel when you enquire.',
      'No payment is taken on this website; you settle with the hotel.',
      'Check-in and check-out times are given with your booking confirmation.',
    ],
  },
];

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);

export const formatNaira = (n: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(n);
