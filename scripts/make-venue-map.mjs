/**
 * Builds a static map of the venue from OpenStreetMap tiles.
 *
 * Why build-time rather than an embed: a Google/Mapbox iframe means a
 * third-party script, cookies (and therefore a consent banner) and a chunk of
 * runtime cost, for what is a decorative "here is where it is". This fetches
 * the tiles once, tints them to the brand palette and ships a single image.
 *
 * Re-run if the venue changes:  node scripts/make-venue-map.mjs
 *
 * OpenStreetMap data is ODbL — the "© OpenStreetMap contributors" credit
 * rendered in VenueSection.astro is required, do not remove it.
 */
import sharp from 'sharp';

// Adolf Fredriks Kyrkogata 13, 111 37 Stockholm (geocoded via Nominatim).
const LAT = 59.3370456;
const LON = 18.0595751;
const ZOOM = 16;
const OUT_W = 1200;
const OUT_H = 900;
const TILE = 256;
const UA = 'bnc-weekend-static-site-build/1.0 (one-off map render)';

const n = 2 ** ZOOM;
const globalX = ((LON + 180) / 360) * n * TILE;
const latRad = (LAT * Math.PI) / 180;
const globalY =
  ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n * TILE;

// Pixel window centred on the venue, then the tiles that cover it.
const left = Math.round(globalX - OUT_W / 2);
const top = Math.round(globalY - OUT_H / 2);
const tileX0 = Math.floor(left / TILE);
const tileY0 = Math.floor(top / TILE);
const tileX1 = Math.floor((left + OUT_W) / TILE);
const tileY1 = Math.floor((top + OUT_H) / TILE);

const jobs = [];
for (let tx = tileX0; tx <= tileX1; tx++) {
  for (let ty = tileY0; ty <= tileY1; ty++) {
    jobs.push({ tx, ty });
  }
}
console.log(`fetching ${jobs.length} tiles at z${ZOOM}…`);

const tiles = [];
for (const { tx, ty } of jobs) {
  const res = await fetch(`https://tile.openstreetmap.org/${ZOOM}/${tx}/${ty}.png`, {
    headers: { 'User-Agent': UA },
  });
  if (!res.ok) throw new Error(`tile ${tx}/${ty}: HTTP ${res.status}`);
  tiles.push({
    input: Buffer.from(await res.arrayBuffer()),
    left: tx * TILE - left,
    top: ty * TILE - top,
  });
  await new Promise((r) => setTimeout(r, 120)); // be polite to the tile server
}

const stitched = await sharp({
  create: { width: OUT_W, height: OUT_H, channels: 3, background: '#ffffff' },
})
  .composite(tiles)
  .png()
  .toBuffer();

// Dark, on-palette map. Rather than fight libvips blend modes, do the colour
// mapping explicitly: take the tile luminance, invert it so streets read light
// against dark ground, then ramp that from aubergine up to brand gold.
const GROUND = [26, 5, 24]; // --color-aubergine
const STREET = [247, 190, 73]; // --color-gold

const { data, info } = await sharp(stitched)
  .grayscale()
  .raw()
  .toBuffer({ resolveWithObject: true });

const out = Buffer.alloc(info.width * info.height * 3);
for (let i = 0, o = 0; i < data.length; i += info.channels, o += 3) {
  // invert, then gamma-curve so only real streets/labels come up bright
  const t = Math.pow(1 - data[i] / 255, 1.45);
  out[o] = Math.round(GROUND[0] + (STREET[0] - GROUND[0]) * t);
  out[o + 1] = Math.round(GROUND[1] + (STREET[1] - GROUND[1]) * t);
  out[o + 2] = Math.round(GROUND[2] + (STREET[2] - GROUND[2]) * t);
}

await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } })
  .png({ compressionLevel: 9 })
  .toFile('src/assets/event/venue-map.png');

console.log(`venue-map.png written (${OUT_W}x${OUT_H}); venue sits at the exact centre`);
