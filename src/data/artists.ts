import type { ImageMetadata } from 'astro';

/**
 * 2027 lineup, supplied by the organisers (2026-09-24). Array order is
 * display order.
 *
 * To update the lineup: edit this array and drop a square photo into
 * `src/assets/artists/` named after the `slug`. Nothing else needs changing —
 * images are matched by slug and optimised at build time.
 */

export type Discipline = 'Bachata' | 'Salsa Cubana';

/** `teacher` appears in the artist grid; `crew` is kept for reference only. */
export type ArtistRole = 'teacher' | 'crew';

export interface Artist {
  slug: string;
  /** Display name, title-cased here and uppercased in CSS where wanted. */
  name: string;
  discipline: Discipline;
  city?: string;
  country: string;
  role: ArtistRole;
  /** Optional teaser line. Kept short — the grid is image-first. */
  descriptor?: string;
  /**
   * Long-form biography, one string per paragraph. Only 4 of 18 profiles on
   * the old site had any copy at all, so v1 does not render these — they are
   * preserved so the content is not lost when the old site goes away.
   */
  bio?: string[];
  youtubeId?: string;
  /** Larger cards in the editorial grid. Used to break up the rhythm. */
  feature?: boolean;
}

export const artists: Artist[] = [
  {
    slug: 'danel-and-ariana',
    name: 'Danel & Ariana',
    discipline: 'Bachata',
    city: 'Barcelona',
    country: 'Spain',
    role: 'teacher',
    feature: true,
  },
  {
    slug: 'ismael-and-irene',
    name: 'Ismael & Irene',
    discipline: 'Salsa Cubana',
    country: 'Cuba / Spain',
    role: 'teacher',
    feature: true,
  },
  {
    slug: 'alberto-and-lisondra',
    name: 'Alberto & Lisondra',
    discipline: 'Bachata',
    city: 'Stockholm',
    country: 'Sweden',
    role: 'teacher',
    youtubeId: 'DgK9bKg9tSk',
    feature: true,
    bio: [
      'Alberto and Lisondra are a Bachata couple based in Stockholm, teaching Bachata fusion with a focus on clear leading and responsive following.',
    ],
  },
  {
    slug: 'arturo-rojas',
    name: 'Arturo Rojas',
    discipline: 'Salsa Cubana',
    country: 'Peru / Sweden',
    role: 'teacher',
    descriptor: 'Rueda de Casino',
    youtubeId: '1Hn5dGGEF4Q',
    bio: [
      'Arturo Rojas Cortegana — professional dancer, teacher, pedagogue, choreographer and international judge. Lima, Peru / Stockholm, Sweden.',
      'Specialised in Rueda de Casino and Cuban dances, with 30 years of experience in teaching, dance and creation.',
      'Arturo is the founder and creator of "Rueda en el Parque" (2008–2012, Lima, Peru). There are now more than 40 Rueda groups in different districts and parks throughout Lima.',
      'Director of "Perú Latin Dance", the first two-time National Champions of Rueda de Casino in Peru, 2010–2011. He owns the "Salsa King Sweden" school in Stockholm, which he founded in 2017.',
    ],
  },
  {
    slug: 'julia-and-ezequiel',
    name: 'Julia & Ezequiel',
    discipline: 'Bachata',
    city: 'Stockholm',
    country: 'Sweden',
    role: 'teacher',
  },
  {
    slug: 'diasmani',
    name: 'Diasmani',
    discipline: 'Salsa Cubana',
    country: 'Cuba',
    role: 'teacher',
  },
  {
    slug: 'juliette-and-linda',
    name: 'Juliette & Linda',
    discipline: 'Salsa Cubana',
    city: 'Stockholm',
    country: 'Sweden',
    role: 'teacher',
  },
  {
    // Listed under "Artists" on the old site but filed as Bachata by mistake —
    // she is the event videographer, not a teacher, and is not in the schedule.
    slug: 'videographer-josefin-romero',
    name: 'Josefin Romero',
    discipline: 'Bachata',
    city: 'Stockholm',
    country: 'Sweden',
    role: 'crew',
    descriptor: 'Videographer',
  },
];

/** Only the people who actually teach are shown in the lineup grid. */
export const teachingArtists = artists.filter((a) => a.role === 'teacher');

/**
 * Photos live in `src/assets` so Astro can emit responsive AVIF/WebP at build
 * time. Matched to artists by filename === slug.
 */
const images = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/artists/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export function artistImage(slug: string): ImageMetadata | undefined {
  const hit = Object.entries(images).find(([path]) =>
    path.split('/').pop()?.replace(/\.[^.]+$/, '') === slug,
  );
  return hit?.[1].default;
}
