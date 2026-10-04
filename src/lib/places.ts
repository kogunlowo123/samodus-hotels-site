/**
 * Google Places API (New) Place Details, fetched at build time only.
 *
 * - The key never reaches the browser: this module runs inside Astro's build.
 * - Responses are cached on disk for 24 hours (.cache/places.json) so repeated
 *   builds and previews do not spend quota, and the page still renders from
 *   cache if the API is down.
 * - With no key configured, returns null and the UI shows its honest empty state.
 *
 * Set PLACES_API_KEY and GOOGLE_PLACE_ID in the Render environment. Render
 * rebuilds on each push; add a daily deploy hook if you want the rating to
 * refresh without a commit.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

export type PlaceReview = {
  author: string;
  authorUrl?: string;
  photo?: string;
  rating: number;
  relativeTime: string;
  text: string;
  translated: boolean;
  url?: string;
};

export type PlaceSummary = {
  rating: number;
  userRatingCount: number;
  reviews: PlaceReview[];
  googleMapsUri: string;
  fetchedAt: string;
};

const CACHE = path.join(process.cwd(), '.cache', 'places.json');
const TTL_MS = 24 * 60 * 60 * 1000;

async function readCache(): Promise<PlaceSummary | null> {
  try {
    return JSON.parse(await readFile(CACHE, 'utf8')) as PlaceSummary;
  } catch {
    return null;
  }
}

export async function getPlaceSummary(): Promise<PlaceSummary | null> {
  const key = process.env.PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const cached = await readCache();
  if (cached && Date.now() - Date.parse(cached.fetchedAt) < TTL_MS) return cached;
  if (!key || !placeId) return cached;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri',
      },
    });
    if (!res.ok) throw new Error(`Places API ${res.status}`);
    const j = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      googleMapsUri?: string;
      reviews?: Array<{
        rating: number;
        relativePublishTimeDescription: string;
        text?: { text: string; languageCode: string };
        originalText?: { text: string; languageCode: string };
        authorAttribution?: { displayName: string; uri?: string; photoUri?: string };
        googleMapsUri?: string;
      }>;
    };
    const summary: PlaceSummary = {
      rating: j.rating ?? 0,
      userRatingCount: j.userRatingCount ?? 0,
      googleMapsUri: j.googleMapsUri ?? '',
      fetchedAt: new Date().toISOString(),
      reviews: (j.reviews ?? []).slice(0, 5).map((r) => ({
        author: r.authorAttribution?.displayName ?? 'Google user',
        authorUrl: r.authorAttribution?.uri,
        photo: r.authorAttribution?.photoUri,
        rating: r.rating,
        relativeTime: r.relativePublishTimeDescription,
        text: r.text?.text ?? '',
        translated: !!(r.originalText && r.text && r.originalText.languageCode !== r.text.languageCode),
        url: r.googleMapsUri,
      })),
    };
    await mkdir(path.dirname(CACHE), { recursive: true });
    await writeFile(CACHE, JSON.stringify(summary, null, 2));
    return summary;
  } catch (err) {
    console.warn('[places] fetch failed, using cache if any:', (err as Error).message);
    return cached;
  }
}
