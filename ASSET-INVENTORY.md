# Asset inventory

Everything here was downloaded from the live Drupal site
(`https://www.bachataandcubanweekend.com`) on **17 September 2026** and is in
the repo as a **temporary placeholder**. Nothing hotlinks the old site.

## Where things live, and why

| Location | Contents | Why there |
| --- | --- | --- |
| `src/assets/artists/` | 8 artist photos | In `src/`, not `public/`, so Astro's image pipeline emits responsive WebP/AVIF at build time. This is what takes the 850 KB originals down to 10–60 KB. |
| `src/assets/djs/` | 7 DJ photos | Same. |
| `public/images/brand/` | Logo, star, OG card | Referenced by URL from `<meta>` tags and the header, so they must keep stable paths. |
| `public/favicon.ico` | Favicon | From the old theme, unchanged. |
| `reference/` | 2026 workshop grid (PDF + JPG) | Source for the transcribed schedule. **Not deployed** — it is stale and 10 MB. |

## Images

Originals were taken at full resolution, not the 250×250 teaser crops the old
site renders. Source path: `/sites/default/files/<YYYY-MM>/<name>.jpg`.

| Local file | Source filename on old site | Size |
| --- | --- | --- |
| `artists/danel-and-ariana.jpg` | 2027 lineup folder (`danel & Ariana.jpg`) | 1080×1080 |
| `artists/ismael-and-irene.jpg` | 2027 lineup folder (`Ismael & Irene.jpg`) | 1080×1080 |
| `artists/alberto-and-lisondra.jpg` | 2027 lineup folder (`Alberto & Lisondra.jpg`) | 1080×1080 |
| `artists/arturo-rojas.jpg` | 2027 lineup folder (`Arturo Rojas.jpg`) | 1080×1080 |
| `artists/julia-and-ezequiel.jpg` | 2027 lineup folder (`julia & ezequiel.jpg`) | 1080×1080 |
| `artists/diasmani.jpg` | 2027 lineup folder (`Diasmani.jpg`) | 1080×1080 |
| `artists/juliette-and-linda.jpg` | 2027 lineup folder (`Juliette & Linda.jpg`) | 1080×1080 |
| `artists/videographer-josefin-romero.jpg` | Old site `2026-02/JOSEFIN.jpg` | 1080×1080 |
| `djs/dj-isra.jpg` | 2027 DJ folder (`DJ ISRA.jpg`) | 1080×1080 |
| `djs/dj-poggy.jpg` | 2027 DJ folder (`DJ POGGY.jpg`) | 1080×1080 |
| `djs/dj-dlux.jpg` | 2027 DJ folder (`DJ DLUX.jpg`) | 1080×1080 |
| `djs/dj-aura.jpg` | 2027 DJ folder (`DJ AURA.jpg`) | 1080×1080 |
| `djs/dj-neit.jpg` | 2027 DJ folder (`DJ NEIT.jpg`) | 1080×1080 |
| `djs/dj-bachflow.jpg` | 2027 DJ folder (`DJ BACH FLOW.jpg`) | 1080×1080 |
| `djs/dj-valenz.jpg` | 2027 DJ folder (`DJ VALENZ.jpg`) | 1080×1080 |

The lineup photos were supplied by the organisers on 24 Sep 2026
(`B&C WEEKEND 2027 ARTISTER HEMSIDA` / `DJs HEMSIDA`) and replace the
old-site originals. Only the videographer photo still comes from the old site.

To swap an artist photo: drop a square JPG into `src/assets/artists/` named
after the artist's `slug` in `src/data/artists.ts`. Nothing else to change.

## Photography supplied by the owner

| Local file | Source | Size | Used for |
| --- | --- | --- | --- |
| `src/assets/event/stockholm-skyline.jpg` | Supplied 17 Sep 2026 (`stockholm2.jpg`) | 2500×1045 | "The Weekend" intro background |
| `src/assets/event/workshop-floor.jpg` | Supplied 17 Sep 2026 (`DSC00017.jpg`) | 2250×1500 | `/program` hero background |
| `src/assets/event/lineup-group.jpg` | Supplied 17 Sep 2026 (`ANTURI.jpg`) | 2250×1500 | "Ready for the weekend?" CTA background |

These did **not** come from the old site — the owner supplied them directly.

Both event photos carry a "Dance Vida" photographer watermark near the bottom
edge, which `object-cover` may crop depending on viewport. Worth confirming the
photographer credit is handled elsewhere if that matters contractually.

### Generated: `src/assets/event/venue-map.png`

Not a photo — built by `scripts/make-venue-map.mjs` from OpenStreetMap tiles,
centred on the venue's geocoded coordinates (59.3370456, 18.0595751) and
recoloured to the aubergine/gold palette. Regenerate with:

```bash
node scripts/make-venue-map.mjs
```

We render a static map rather than embedding Google/Mapbox so there is no
third-party script, no cookie-consent banner and nothing to fetch at runtime.
**The "© OpenStreetMap contributors" credit in `VenueSection.astro` is required
by the ODbL licence — do not remove it.**

How it is handled (see `src/components/IntroSection.astro`):

- **Desktop** — full-bleed background, `brightness(0.5) saturate(0.78)` with a
  graduated aubergine scrim. Measured against the rendered page, the brightest
  background pixel under the copy gives bone **8.2:1** and gold **5.1:1**, both
  clear of WCAG AA.
- **Mobile** — the same `<img>` becomes a wide band under the copy instead.
  A 2.4:1 panorama cropped to a ~730px-tall phone section showed only the
  middle 22% blown up and read as a black rectangle, so on small screens it is
  shown as a panorama at near-full brightness with no text over it.
- One `<img>` repositioned with responsive classes, so it downloads once:
  32 KB at 640w, 79 KB at 1024w, 169 KB at 1600w.

If you replace it, keep a wide aspect (roughly 2:1 or wider) — the desktop
treatment assumes a letterbox crop.

## Brand

| File | Source | Note |
| --- | --- | --- |
| `brand/bnc-logo.png` | `/themes/bnktheme/bnc_logo_web.png` | 677×725 transparent PNG, current B&C mark. Good quality, reusable as-is. |
| `brand/star.png` | `/themes/bnktheme/assets/star.png` | 15×14 decorative dot. Not currently used. |
| `favicon.ico` | `/themes/bnktheme/favicon.ico` | Unchanged. |
| `brand/og-image.jpg` | **regenerated, not downloaded** | See below. |

### The OG image was rebuilt on purpose

The old site's social share image (`/themes/bnktheme/bnk_og_image.jpg`) still
shows the event's **previous branding — "B&K Weekend / Bachata & Kizomba"**.
Every link shared from that site advertises the wrong event name. We did not
migrate it.

`public/images/brand/og-image.jpg` is generated instead by
`scripts/make-og-image.mjs`, which composes the current B&C logo with the brand
palette and the confirmed dates. Re-run it whenever the dates change:

```bash
node scripts/make-og-image.mjs
```

## Colour palette provenance

The palette in `src/styles/global.css` is taken from the real brand, not
invented:

- `#F073AB` (pink) and `#F7BE49` (gold) — sampled from the official 2026
  workshop-schedule artwork.
- `#18021F`, `#150917`, `#48064E`, `#62036D`, `#C89400`, `#EAC66E`, `#FFF4E5`,
  `#FBF7FB` — read out of the old Drupal theme stylesheet.

## Hero video

| File | Source | Detail |
| --- | --- | --- |
| `public/video/hero.mp4` | Supplied 17 Sep 2026 (`bnc-hero-video.mp4`) | 1280×720, 20.9s, H.264, no audio, 5.2 MB |
| `public/images/event/hero-poster.jpg` | Frame 1 of the above | 1600×900, 105 KB |

Loading behaviour and how to replace it: `public/video/README.md`.
The footage carries a "ROMEROPRODUCTION" watermark on the right edge and a B&C
logo bottom-left, both from the original export.

## Still needed from the owner

- [ ] Confirmed 2027 artist and DJ line-up
- [ ] Confirmed 2027 prices (then set `priceConfirmed = true` in `src/data/passes.ts`)
- [ ] The 2027 workshop grid
- [ ] Social profile links, if any (`event.social` in `src/data/event.ts`)
