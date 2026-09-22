/**
 * Build-level switches shared by `astro.config.mjs` and the pages.
 * Plain .mjs so the Astro config (Node ESM) and .astro files can both import it.
 */

/**
 * Whether search engines may index the site.
 *
 * FALSE until the 2027 lineup, prices and schedule are confirmed — the site
 * currently shows last edition's content as placeholders and must not be
 * picked up for "Bachata Stockholm" while that is true.
 *
 * Flipping this to `true` is the whole launch step. It controls, together:
 *   - the <meta name="robots"> tag on every page      (BaseLayout.astro)
 *   - /robots.txt                                      (src/pages/robots.txt.ts)
 *   - the X-Robots-Tag response header on every path   (dist/_headers, below)
 *   - whether a sitemap is generated and advertised    (astro.config.mjs)
 *
 * Note we deliberately do NOT combine `Disallow: /` with noindex. A crawler
 * that is blocked from fetching the page never reads the noindex, so a URL
 * already known to Google (this domain currently serves the live Drupal site)
 * can linger in results with no description. Letting crawlers in to read the
 * noindex is what actually keeps it out — and drops the old pages too.
 */
export const INDEXABLE = false;

/**
 * Whether the detailed workshop timetable is shown on /program.
 *
 * FALSE while the grid is still last edition's content re-dated onto 2027
 * (see the header of src/data/schedule.ts). The evening programme — parties,
 * drop-in classes, the line-up presentation and showtime — is shown either
 * way, since those are structural to the weekend rather than per-teacher.
 *
 * The workshop data stays in place and keeps driving the counts elsewhere on
 * the site; only the rendered grid and the mobile timeline are held back. Set
 * to true once the 2027 timetable is confirmed.
 */
export const SHOW_WORKSHOP_SCHEDULE = false;
