# Asset inventory

Everything here was downloaded from the live Drupal site
(`https://www.bachataandcubanweekend.com`) on **17 September 2026** and is in
the repo as a **temporary placeholder**. Nothing hotlinks the old site.

## Where things live, and why

| Location | Contents | Why there |
| --- | --- | --- |
| `src/assets/artists/` | 13 artist photos | In `src/`, not `public/`, so Astro's image pipeline emits responsive WebP/AVIF at build time. This is what takes the 850 KB originals down to 10–60 KB. |
| `src/assets/djs/` | 5 DJ photos | Same. |
| `public/images/brand/` | Logo, star, OG card | Referenced by URL from `<meta>` tags and the header, so they must keep stable paths. |
| `public/favicon.ico` | Favicon | From the old theme, unchanged. |
| `reference/` | 2026 workshop grid (PDF + JPG) | Source for the transcribed schedule. **Not deployed** — it is stale and 10 MB. |

## Images

Originals were taken at full resolution, not the 250×250 teaser crops the old
site renders. Source path: `/sites/default/files/<YYYY-MM>/<name>.jpg`.

| Local file | Source filename on old site | Size |
| --- | --- | --- |
| `artists/lorena-and-marc.jpg` | `2025-10/Marc & Lorena.jpg` | 1080×1080 |
| `artists/kevin-and-geysa.jpg` | `2025-10/Kevin  & Geysa .jpg` | 1080×1080 |
| `artists/danel-and-ariana.jpg` | `2025-10/Adel & Ariana .jpg` | 1080×1080 |
| `artists/mario-and-nia.jpg` | `2025-10/Mario & Nia.jpg` | 1080×1080 |
| `artists/arturo-rojas.jpg` | `2025-10/Arturo .jpg` | 1080×1080 |
| `artists/reynaldo-salazar.jpg` | `2025-10/Reynaldo.jpg` | 1080×1080 |
| `artists/julia-and-ezequiel.jpg` | `2025-10/Julia & Ezequiel .jpg` | 1080×1080 |
| `artists/alberto-and-lisondra.jpg` | `2025-10/Alberto  & Lisondra .jpg` | 1080×1080 |
| `artists/saul-perez-valdes.jpg` | `2025-10/Saul.jpg` | 1080×1080 |
| `artists/juliette-anturi.jpg` | `2025-11/Juliette.jpg` | 1080×1080 |
| `artists/rodrigo-and-lana.jpg` | `2025-11/Rodrigo y Lana.jpg` | 1080×1080 |
| `artists/linda-bertling.jpg` | `2025-11/Linda.jpg` | 1080×1080 |
| `artists/videographer-josefin-romero.jpg` | `2026-02/JOSEFIN.jpg` | 1080×1080 |
| `djs/dj-isra.jpg` | `2025-04/ISRA_0.jpg` | 1080×1080 |
| `djs/dj-happy-feet.jpg` | `2026-02/DJ HAPPY FEET.jpg` | 1080×1080 |
| `djs/dj-bachflow.jpg` | `2026-02/DJ BACH FLOW.jpg` | 1080×1080 |
| `djs/dj-neit.jpg` | `2026-02/DJ NEIT.jpg` | 1080×1080 |
| `djs/dj-valenz.jpg` | `2026-02/DJ VALENZ.jpg` | 1080×1080 |

To swap an artist photo: drop a square JPG into `src/assets/artists/` named
after the artist's `slug` in `src/data/artists.ts`. Nothing else to change.

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

## Still needed from the owner

- [ ] Hero background video (`public/video/` — see the README there)
- [ ] Hero poster frame (`public/images/event/hero-poster.jpg`)
- [ ] Confirmed 2027 artist and DJ line-up
- [ ] Confirmed 2027 prices (then set `priceConfirmed = true` in `src/data/passes.ts`)
- [ ] The 2027 workshop grid
- [ ] Social profile links, if any (`event.social` in `src/data/event.ts`)
