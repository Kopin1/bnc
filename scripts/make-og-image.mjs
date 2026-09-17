/**
 * Generates public/images/brand/og-image.jpg from the real B&C logo.
 *
 * Why this exists: the OG image on the current Drupal site is stale — it still
 * shows the event's previous "B&K Weekend / Bachata & Kizomba" branding. Rather
 * than ship that, we compose a correct card from the brand logo and palette.
 *
 * Re-run after changing the dates:  node scripts/make-og-image.mjs
 */
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const W = 1200;
const H = 630;

// Keep in sync with src/data/event.ts
const CITY = 'STOCKHOLM, SWEDEN';
const DATES = '2 – 4 APRIL 2027';
const STRAP = 'Workshops · Two dance floors · Parties & shows';

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glow" cx="74%" cy="40%" r="64%">
      <stop offset="0%" stop-color="#5a1340"/>
      <stop offset="55%" stop-color="#2a0a21"/>
      <stop offset="100%" stop-color="#140412"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="0" width="${W}" height="7" fill="#f7be49"/>
  <text x="72" y="236" font-family="Impact, Haettenschweiler, sans-serif" font-size="78" fill="#fbf7fb">BACHATA &amp;</text>
  <text x="72" y="318" font-family="Impact, Haettenschweiler, sans-serif" font-size="78" fill="#f7be49">CUBAN WEEKEND</text>
  <text x="74" y="388" font-family="Helvetica, Arial, sans-serif" font-weight="bold" font-size="25" fill="#f073ab" letter-spacing="5">${esc(CITY)}</text>
  <text x="74" y="450" font-family="Helvetica, Arial, sans-serif" font-weight="bold" font-size="30" fill="#fbf7fb">${esc(DATES)}</text>
  <text x="74" y="510" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#c9b4c4">${esc(STRAP)}</text>
</svg>`);

const logo = await sharp(readFileSync('public/images/brand/bnc-logo.png'))
  .resize({ height: 420 })
  .toBuffer();

await sharp(bg)
  .composite([{ input: logo, top: 112, left: 762 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/images/brand/og-image.jpg');

console.log(`og-image.jpg written (${W}x${H})`);
