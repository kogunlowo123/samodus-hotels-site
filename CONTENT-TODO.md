# Content still needed from Samodus Hotels

Everything on the live site that is not yet confirmed is marked in the page itself ("to confirm", "Photo pending", or a yellow notice). This file lists exactly what to supply and where it goes. Once all items are in, set `previewMode: false` in `src/config/site.ts` and the notices disappear.

## 1. Contact details (`src/config/site.ts`)

| Field | What to supply | Example format |
|---|---|---|
| `phone` | One number answered 24 hours | `2348012345678` (digits only, country code, no plus) |
| `whatsapp` | WhatsApp Business number | same format |
| `email` | A monitored mailbox | `stay@samodushotel.com` |
| `checkIn` / `checkOut` | Times | `14:00` / `12:00` |
| `legalName` | Registered trading name as on CAC certificate | |
| `social.instagram` / `social.facebook` | Full URLs if they exist | |

Until `phone` or `whatsapp` is set, the booking form shows the enquiry text with a copy button instead of sending it.

## 2. Rooms (`src/data/rooms.ts`)

For each real room category:

- Name (as guests know it)
- Bed: e.g. "One double bed" or "Two single beds"
- Maximum guests
- Size in square metres (optional)
- What is in the room (list)
- Bathroom: shower or bath, hot water
- Nightly rate in naira, or leave `price: null` to show "Rate on request"
- Policies: check-in/out, cancellation, children, smoking, pets
- Then set `verified: true`

Delete any of the three placeholder entries that do not correspond to a real category.

## 3. Amenities (`src/data/amenities.ts`)

Confirm or delete each of: air conditioning, backup power (and its hours), parking, satellite TV, 24-hour reception, Wi-Fi, food and drink, gated compound. Set `verified: true` on confirmed items. Add anything missing (e.g. event hall with capacity, laundry, airport pickup).

## 4. Photography (`public/images/` and `src/data/images.ts`)

Shoot in daylight, landscape, phone is fine if steady and clean. Save as JPG, at least 1600 px wide for `hero` and `room-*-1`, 1200 px for the rest. File names must match the slot ids:

| Slot id | Photograph |
|---|---|
| `hero` | Best exterior or best room, wide |
| `exterior` | Street frontage with signage |
| `entrance` | Gate and entrance |
| `reception` | Reception desk |
| `lounge` | Lounge or seating area |
| `corridor` | Corridor to rooms |
| `room-a-1`, `room-a-2` | First room type, two angles |
| `room-b-1`, `room-b-2` | Second room type |
| `room-c-1`, `room-c-2` | Third room type |
| `bathroom` | Bathroom, portrait |
| `dining` | Dining area |
| `parking` | Car park inside compound |
| `guests-1`, `guests-2` | Real guests or staff, with their written permission |

Then set `placeholder: false` on each slot.

Do not use stock photos or AI-generated people. Only photograph guests who have agreed in writing.

## 5. FAQ answers (`src/data/faqs.ts`)

Replace every "To be confirmed" with the real answer: check-in times, generator hours, payment methods, events, food.

## 6. About page (`src/pages/about.astro`)

Opening year, who runs the hotel, one or two sentences on why it exists. No superlatives.

## 7. Location page (`src/pages/location.astro`)

Gate hours, late arrival process, one or two nearby landmarks drivers recognise.

## 8. Reviews

The site links to the Google listing rather than copying quotes. If you want to quote a review on the site, get the reviewer's permission and add it with their first name only.

## 9. Domain

When the custom domain is bought, update `SITE_URL` in `render.yaml` and the Render dashboard, and the `Sitemap:` line in `public/robots.txt`.
