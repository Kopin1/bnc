/** Icons available in `SocialIcon.astro`. */
export type SocialIconName = 'instagram' | 'facebook' | 'youtube';

export interface SocialLink {
  label: string;
  /** Optional @handle, shown next to the label in the footer. */
  handle?: string;
  href: string;
  icon: SocialIconName;
}

/**
 * Single source of truth for the event itself.
 *
 * MIGRATION DATA — mirrored from the current Drupal site (fetched 2026-09-17).
 * Everything here is last-year/placeholder content until the organiser
 * confirms the next edition. Update this file first when the event rolls over.
 */

export const event = {
  name: 'Bachata & Cuban Weekend',
  shortName: 'B&C Weekend',
  tagline: 'Two dance floors. International artists. Workshops, parties and shows.',
  descriptor: 'Bachata & Salsa Cubana',

  city: 'Stockholm',
  country: 'Sweden',

  /**
   * ISO dates drive both the visible copy and the schema.org markup.
   * CONFIRMED by the organiser for the 2027 edition: Fri 2 – Sun 4 April 2027.
   */
  startDate: '2027-04-02',
  endDate: '2027-04-04',
  /** Pre-formatted for display so we never ship a locale surprise. */
  dateLabel: '2 – 4 April 2027',
  dateLabelShort: '2 – 4 Apr 2027',
  year: 2027,

  venue: {
    name: 'Stockholm Salsa Dance',
    street: 'Adolf Fredriks Kyrkogata 13',
    postalCode: '111 37',
    city: 'Stockholm',
    country: 'Sweden',
    /** Used for the "Open in Maps" link — no embedded map script. */
    mapsQuery: 'Stockholm Salsa Dance, Adolf Fredriks Kyrkogata 13, 111 37 Stockholm',
    /** Rooms as they appear on the official schedule (there is no Sal 3). */
    rooms: ['Sal 1', 'Sal 2', 'Sal 4'],
  },

  organizer: {
    name: 'Stockholm Salsa Dance AB',
    url: 'https://www.stockholmsalsadance.com',
  },

  contact: {
    email: 'info@stockholmsalsadance.com',
  },

  /** Tickster shop currently linked from the live site. Replace when reissued. */
  bookingUrl: 'https://secure.tickster.com/kd54lz707huxke8',

  /**
   * Printable workshop grid. The organiser's 2026 PDF is NOT linked here — it
   * shows the old July dates and would contradict the page. Put the 2027 grid
   * in `public/` and set this to its path to bring the download button back.
   * (The 2026 original is kept out of the build in `reference/`.)
   */
  schedulePdf: null as string | null,

  /**
   * Hero background video (supplied 17 Sep 2026). 1280x720, ~21s, H.264,
   * no audio track — it is played muted and never unmuted.
   *
   * Plays at every screen size, phones included — it is 5.2 MB and that is a
   * deliberate call. It still does not load for visitors who ask for reduced
   * motion, or whose browser reports Save-Data; those two get the poster frame
   * and download no video. See HeroVideo.astro.
   *
   * Add a `.webm` here if one is ever produced — smaller where supported, and
   * the browser picks the first source it can play.
   */
  heroVideo: {
    enabled: true,
    poster: '/images/event/hero-poster.jpg',
    sources: [{ src: '/video/hero.mp4', type: 'video/mp4' }],
  },

  /**
   * Social profiles. Rendered in the header, the mobile drawer and the footer.
   * Add an entry here and it appears in all three — see `SocialIcon.astro` for
   * the available `icon` names.
   */
  social: [
    {
      label: 'Instagram',
      handle: '@bachataandcubanweekend',
      href: 'https://www.instagram.com/bachataandcubanweekend/',
      icon: 'instagram',
    },
  ] as SocialLink[],
} as const;

export const siteMeta = {
  title: `${event.name} ${event.year} — ${event.city}`,
  description:
    'Bachata & Cuban Weekend brings three days of Bachata and Salsa Cubana to central Stockholm: ' +
    'workshops with international instructors, two dance floors, DJs, shows and social dancing.',
  ogImage: '/images/brand/og-image.jpg',
  locale: 'en',
} as const;
