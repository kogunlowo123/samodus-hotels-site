/**
 * Property-wide amenities.
 *
 * Only items the hotel has confirmed should have verified: true.
 * Unverified items are shown with an "awaiting confirmation" marker in
 * preview mode and are hidden entirely once previewMode is off.
 *
 * Sources so far: public Google Maps listing (category: Hotel) and guest
 * reviews that mention air conditioning, television subscription and a
 * generator. Nothing has yet been confirmed by the hotel directly.
 */

export type Amenity = {
  id: string;
  name: string;
  detail: string;
  verified: boolean;
};

export const amenities: Amenity[] = [
  { id: 'ac', name: 'Air-conditioned rooms', detail: 'Every guest room is air conditioned.', verified: false },
  { id: 'power', name: 'Backup power', detail: 'Generator supply during public power outages. Hours to be confirmed.', verified: false },
  { id: 'parking', name: 'Parking inside the compound', detail: 'Gated on-site parking for guests.', verified: false },
  { id: 'tv', name: 'Satellite television', detail: 'Television with a satellite subscription in each room.', verified: false },
  { id: 'reception', name: '24-hour reception', detail: 'Staffed front desk around the clock.', verified: false },
  { id: 'wifi', name: 'Wi-Fi', detail: 'Wireless internet in rooms and common areas.', verified: false },
  { id: 'dining', name: 'Food and drinks', detail: 'Meals available on site. Menu and hours to be confirmed.', verified: false },
  { id: 'security', name: 'Gated compound', detail: 'Controlled access to the property.', verified: false },
];
