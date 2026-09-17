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

### Adding the hero video

See `public/video/README.md`. Drop in `hero.mp4` / `hero.webm`, add a poster
frame, then set `heroVideo.enabled = true` in `src/data/event.ts`. The hero is
designed to look finished without it.

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
- **No map embed.** The venue block is a drawn placemark that links out to
  Google Maps — no third-party script, no cookie banner.
- **Accessibility.** Semantic landmarks, a skip link, visible gold focus rings,
  a real `aria-expanded` disclosure for the mobile menu. Every text/background
  pair in the palette meets WCAG AA (the lightest is 7.4:1).
- **Motion** is one shared fade-up, disabled entirely under
  `prefers-reduced-motion`. Content is visible without JavaScript.

## Content status

Dates are confirmed for 2027. **Line-up, prices and the workshop grid are still
migration placeholders** carried over from the previous edition — see
`ASSET-INVENTORY.md` for provenance and the outstanding list.
