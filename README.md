# B&C Weekend

Static site for **Bachata & Cuban Weekend**, Stockholm — **2 – 4 April 2027**.

Astro + Tailwind, static output, built for Cloudflare. Two routes: the one-page
event site at `/` and the full timetable at `/program`.

## Commands

```bash
npm install     # install
npm run dev     # dev server on http://localhost:4321
npm run build   # static build into dist/
npm run preview # serve the built output
npm run check   # TypeScript + Astro diagnostics
```

## Deploy to Cloudflare

Static output, no adapter, no server runtime.

**Cloudflare Pages / Workers Builds**

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20 or newer |

Or from the CLI:

```bash
npm run build
npx wrangler pages deploy dist
```

Before the first deploy, set `site` in `astro.config.mjs` to the production
domain — it drives canonical URLs, Open Graph URLs and `sitemap-index.xml`.

## Updating the site

Almost every routine change is a data edit. Markup should not need touching.

| To change… | Edit |
| --- | --- |
| Dates, city, venue, contact, booking URL | `src/data/event.ts` |
| Artist line-up | `src/data/artists.ts` + a photo in `src/assets/artists/` |
| DJs | `src/data/djs.ts` + a photo in `src/assets/djs/` |
| Prices and what each pass includes | `src/data/passes.ts` |
| Workshop timetable, parties, shows | `src/data/schedule.ts` |
| Highlight strip, nav, intro chips | `src/data/site.ts` |
| Instagram / social links | `event.social` in `src/data/event.ts` (header, drawer and footer all read from it) |

### Rolling over to a new year

1. Update the dates in `src/data/event.ts` (`startDate`, `endDate`,
   `dateLabel`, `dateLabelShort`, `year`).
2. Update each day's `date` and `dateLabel` in `src/data/schedule.ts`.
3. Re-run `node scripts/make-og-image.mjs` so the share card shows the new dates.
4. Replace the line-up and prices.
5. When prices are signed off, set `priceConfirmed = true` in
   `src/data/passes.ts`. Until then the page shows a "being confirmed" note and
   the schema.org markup deliberately ships **no** `offers` block, so stale
   prices never reach Google.

### The hero video

`public/video/hero.mp4` is in place and playing. The `<video>` ships with no
`src`; the sources are attached from JS so the 5.2 MB is only fetched when it
will be used — visitors who ask for reduced motion, or whose browser reports
Save-Data, get the poster frame and download no video. To swap the footage, see
`public/video/README.md`.

## How it is built

- **No UI framework.** The only client-side JavaScript is three small inline
  scripts: the mobile menu, the scroll reveal, and the sticky booking bar.
  Roughly 1 KB total, no hydration.
- **Images** live in `src/assets/` so Astro's pipeline emits responsive
  WebP with correct `width`/`height` (no layout shift). The 850 KB originals
  ship as 10–60 KB.
- **Fonts** are self-hosted through Astro's font pipeline — Archivo Black for
  display, Manrope for body. No request to Google at runtime, and fallback
  metrics are generated so there is no layout shift on swap.
- **No map embed.** The venue block shows a real map built from OpenStreetMap
  tiles at build time (`scripts/make-venue-map.mjs`) and tinted to the palette,
  with a pin on the venue and a link out to Google Maps. No third-party script,
  no cookie banner, nothing fetched at runtime. The OSM attribution is required
  by the licence.
- **Accessibility.** Semantic landmarks, a skip link, visible gold focus rings,
  a real `aria-expanded` disclosure for the mobile menu. Every text/background
  pair in the palette meets WCAG AA (the lightest is 7.4:1).
- **Motion** is one shared fade-up, disabled entirely under
  `prefers-reduced-motion`. Content is visible without JavaScript.

## Colour coding

The site carries two separate meanings in colour, and they are deliberately
kept in different halves of the wheel so they can never be read as each other:

| | Meaning | Colours | Form |
| --- | --- | --- | --- |
| **Warm** | **Discipline** — what you dance | Bachata `#F073AB`, Salsa Cubana `#F7BE49` | filled pill |
| **Cool** | **Level** — how hard it is | Open `#7FD4F5`, Intermediate `#8AA4F7`, Advanced `#BB86F8` | 1–3 pips + label |

Nothing else in the design is cool-toned, so a cool chip always means level.
The smallest hue gap between the two families is 65°, every value clears WCAG
AA on all three dark surfaces, and level is additionally encoded as a pip count
so it still reads in greyscale and for colour-blind viewers. Both scales are
explained by the `ColorKey` legend on `/program` and above the artist grid.

Because pink now *means* Bachata, it is used for nothing else — day headings,
room labels, map pins and eyebrows were all moved to gold or neutral.

Definitions live in `src/data/taxonomy.ts`; the tokens are in
`src/styles/global.css`. To restyle a discipline or level, change it in those
two places only — `DisciplineTag`, `LevelTag` and `ColorKey` all read from them.

A workshop's discipline is a property of the **class, not the teacher** (Cuban
teachers run bachata-family classes and vice versa), so it is set per session
in `src/data/schedule.ts`.

## Workshop timetable (currently hidden)

`site.config.mjs` also holds:

```js
export const SHOW_WORKSHOP_SCHEDULE = false;
```

While it is `false`, `/program` shows each day's summary plus the **evening
programme** (drop-in classes, parties, line-up presentation, showtime) and a
"timetable to be announced" note. The room-by-time grid, the mobile timeline
and the colour key are held back, and the closing note changes wording to match.

The workshop data itself stays in `src/data/schedule.ts` and still drives the
counts elsewhere on the site. Set the flag to `true` once the 2027 timetable is
confirmed and everything returns.

## Search indexing (currently OFF)

`site.config.mjs` holds one switch:

```js
export const INDEXABLE = false;
```

While it is `false` the build emits, together:

- `<meta name="robots" content="noindex, nofollow">` on every page
- `X-Robots-Tag: noindex, nofollow` on every path, via `dist/_headers`
  (Cloudflare reads this) — which also covers the PDF and images, where there
  is no HTML to carry a meta tag
- a `robots.txt` that **allows** crawling, and **no sitemap**

Crawling is allowed deliberately. `Disallow: /` would stop a crawler fetching
the page at all, so it would never read the noindex — and a URL it already
knows (this domain currently serves the live Drupal site) can sit in results
with no description. Letting crawlers in to read the noindex is what actually
keeps the site out, and clears the old pages too.

**To launch: set `INDEXABLE = true` and rebuild.** That restores the sitemap,
advertises it from `robots.txt`, and drops both the meta tag and the header.
Do it once the lineup, prices and schedule are confirmed — see below.

## Content status

Dates are confirmed for 2027. **Line-up, prices and the workshop grid are still
migration placeholders** carried over from the previous edition — see
`ASSET-INVENTORY.md` for provenance and the outstanding list.
