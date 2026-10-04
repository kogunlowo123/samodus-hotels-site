/**
 * Property-wide amenities.
 *
 * Only items with public evidence are listed as verified and shown:
 * guests' own Google reviews of this listing refer to air conditioning, a
 * television subscription and a generator. Everything else (Wi-Fi, meals,
 * parking, 24-hour desk) is left out until the hotel confirms it, rather
 * than shown with a caveat.
 */

export type Amenity = {
  id: string;
  name: string;
  detail: string;
  verified: boolean;
};

export const amenities: Amenity[] = [
  { id: 'ac', name: 'Air-conditioned rooms', detail: 'Every guest room is air conditioned.', verified: true },
  { id: 'power', name: 'Generator backup', detail: 'Generator supply when the public grid is down.', verified: true },
  { id: 'tv', name: 'Television', detail: 'Television with a satellite subscription in each room.', verified: true },
  { id: 'wifi', name: 'Wi-Fi', detail: 'Wireless internet in rooms and common areas.', verified: false },
  { id: 'dining', name: 'Food and drinks', detail: 'Meals available on site.', verified: false },
  { id: 'parking', name: 'Parking', detail: 'On-site parking for guests.', verified: false },
  { id: 'reception', name: '24-hour reception', detail: 'Staffed front desk around the clock.', verified: false },
];
