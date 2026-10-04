/**
 * Single source of truth for business facts.
 *
 * Anything marked PENDING is not yet confirmed by Samodus Hotels.
 * The UI treats empty strings as "not yet available" and hides or
 * softens the related call to action instead of showing fake data.
 */

export const site = {
  name: 'Samodus Hotels',
  legalName: 'Samodus Hotels', // PENDING: confirm registered trading name
  tagline: 'A quiet place to stay in Sabo, Sagamu',
  description:
    'Samodus Hotels is an independent hotel at 15 Ademosu Street, Sabo, Sagamu, Ogun State. Air-conditioned en-suite rooms a short drive from the Lagos–Ibadan Expressway. Book direct.',

  address: {
    street: '15 Ademosu Street',
    area: 'Sabo',
    city: 'Sagamu',
    state: 'Ogun State',
    postalCode: '121102',
    country: 'Nigeria',
    countryCode: 'NG',
  },

  geo: { lat: 6.842347, lng: 3.6355217 },

  // Public Google Maps listing (verified to exist on 4 Oct 2026).
  mapsUrl: 'https://maps.google.com/?cid=1250600010553895656',
  // PENDING: Google Place ID (starts with "ChIJ"). Enables the direct
  // write-a-review link and the Places API rating. Empty = fall back to the listing.
  placeId: '',
  mapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=6.842347,3.6355217',
  mapsReviewsUrl: 'https://maps.google.com/?cid=1250600010553895656',

  // PENDING: hotel to supply. Leave empty until confirmed.
  // Format: international, digits only, e.g. "2348012345678".
  phone: '',
  whatsapp: '',
  email: '',

  // PENDING: confirm with hotel.
  checkIn: '',
  checkOut: '',

  social: {
    instagram: '',
    facebook: '',
  },

  // Google integrations. Fill from your own Google screens; never share account passwords.
  google: {
    // GA4 Measurement ID, e.g. "G-XXXXXXXXXX" (Analytics → Admin → Data streams → Web).
    ga4MeasurementId: '',
    // Search Console HTML-tag verification token (the content="" value of the meta tag).
    searchConsoleToken: '',
  },

  // Preview notices and pending badges are off. Unverified items are simply not shown.
  previewMode: false,
};

export const hasPhone = () => site.phone.length > 0;
export const hasWhatsApp = () => site.whatsapp.length > 0;
export const hasEmail = () => site.email.length > 0;

export const telHref = () => (hasPhone() ? `tel:+${site.phone}` : '/contact');

export function whatsappHref(message?: string) {
  if (!hasWhatsApp()) return '/contact';
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Direct "write a review" link when the place ID is known, else the listing. */
export const writeReviewUrl = () =>
  site.placeId ? `https://search.google.com/local/writereview?placeid=${site.placeId}` : site.mapsUrl;

export const fullAddress = () =>
  `${site.address.street}, ${site.address.area}, ${site.address.city}, ${site.address.state}, ${site.address.country}`;

export const shortAddress = () =>
  `${site.address.street}, ${site.address.area}, ${site.address.city}`;
