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
    'Samodus Hotels is an independent hotel at 15 Ademosu Street, Sabo, Sagamu, Ogun State. Air-conditioned rooms, on-site parking and a short drive from the Lagos–Ibadan Expressway.',

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

  // Flip to false when real data and photography are in place.
  previewMode: true,
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

export const fullAddress = () =>
  `${site.address.street}, ${site.address.area}, ${site.address.city}, ${site.address.state}, ${site.address.country}`;

export const shortAddress = () =>
  `${site.address.street}, ${site.address.area}, ${site.address.city}`;
