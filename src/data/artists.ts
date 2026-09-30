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

export interface Artist {
  slug: string;
  /** Display name, title-cased here and uppercased in CSS where wanted. */
  name: string;
  discipline: Discipline;
  city?: string;
  country: string;
  /** Optional teaser line. Kept short — the grid is image-first. */
  descriptor?: string;
  /**
   * Long-form biography, one string per paragraph. Only 4 of 18 profiles on
   * the old site had any copy at all, so v1 does not render these — they are
   * preserved so the content is not lost when the old site goes away.
   */
  bio?: string[];
  youtubeId?: string;
}

export const artists: Artist[] = [
  {
    slug: 'danel-and-ariana',
    name: 'Danel & Ariana',
    discipline: 'Bachata',
    city: 'Barcelona',
    country: 'Spain',
  },
  {
    slug: 'ismael-and-irene',
    name: 'Ismael & Irene',
    discipline: 'Salsa Cubana',
    country: 'Cuba / Spain',
  },
  {
    slug: 'alberto-and-lisondra',
    name: 'Alberto & Lisondra',
    discipline: 'Bachata',
    city: 'Stockholm',
    country: 'Sweden',
    youtubeId: 'DgK9bKg9tSk',
    bio: [
      'Alberto and Lisondra are a Bachata couple based in Stockholm, teaching Bachata fusion with a focus on clear leading and responsive following.',
    ],
  },
  {
    slug: 'arturo-rojas',
    name: 'Arturo Rojas',
    discipline: 'Salsa Cubana',
    country: 'Peru / Sweden',
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
  },
  {
    slug: 'diasmani',
    name: 'Diasmani',
    discipline: 'Salsa Cubana',
    country: 'Cuba',
  },
  {
    slug: 'juliette-and-linda',
    name: 'Juliette & Linda',
    discipline: 'Salsa Cubana',
    city: 'Stockholm',
    country: 'Sweden',
  },
  {
    slug: 'yordano-and-agnes',
    name: 'Yordano & Agnes',
    discipline: 'Salsa Cubana',
    city: 'Oslo',
    country: 'Norway',
  },
];

/** Everyone in `artists` teaches. Event crew live in `crew.ts`. */
export const teachingArtists = artists;

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
