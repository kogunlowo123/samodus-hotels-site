/**
 * Generates the QR code for the reception review card.
 *   node scripts/make-qr.mjs
 * Target URL comes from src/config/site.ts (write-review link when a place ID
 * is configured, otherwise the Google Maps listing).
 */
import QRCode from 'qrcode';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const { writeReviewUrl } = await import(pathToFileURL(path.resolve('src/config/site.ts')).href);
const url = writeReviewUrl();
const opts = { margin: 2, color: { dark: '#1b2440', light: '#ffffff' }, errorCorrectionLevel: 'M' };
await QRCode.toFile(path.resolve('public/qr-review.png'), url, { ...opts, width: 900 });
await QRCode.toFile(path.resolve('public/qr-review.svg'), url, { ...opts, type: 'svg' });
console.log('QR written for', url);
