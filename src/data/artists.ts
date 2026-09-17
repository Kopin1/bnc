import type { ImageMetadata } from 'astro';

/**
 * MIGRATION DATA — lineup scraped from the current Drupal site (2026-09-17).
 * Names, disciplines and origins are last-edition placeholders.
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
    slug: 'lorena-and-marc',
    name: 'Lorena & Marc',
    discipline: 'Bachata',
    city: 'Barcelona',
    country: 'Spain',
    role: 'teacher',
    youtubeId: 'BKY-X1yy4zQ',
    feature: true,
  },
  {
    slug: 'kevin-and-geysa',
    name: 'Kevin & Geysa',
    discipline: 'Salsa Cubana',
    city: 'Barcelona',
    country: 'Spain / Cuba',
    role: 'teacher',
    youtubeId: '1B0-CWSriIE',
    feature: true,
    bio: [
      'Geysa Martínez (Havana, Cuba). Since she was little she knew that her vocation was dance, beginning at nine years old in the world of entertainment, going through ballet, modern and Afro-contemporary dance, popular and traditional Cuban dances and different styles of dances and cultures that make her a dancer with many registers.',
      'With professional training, graduated in 2009 at the Alejo Carpentier Havana Provincial School in the specialty of Classical Ballet and later in 2015 with the title of Dancer of Musical Shows at the Cuban Institute of Music and Ministry of Culture of Havana.',
      'She has worked in important Cuban companies such as Havana Queens Company, Teatro America Ballet, Rakatan Ballet and Cuban Television Ballet, and has been part of national and international projects and festivals in Turkey, Germany, Spain, Hungary, Singapore, Switzerland and France.',
      'She currently resides in Barcelona where she opened her own dance school together with her partner Kevin Cano, called HaBarna Dance Studio.',
    ],
  },
  {
    slug: 'danel-and-ariana',
    name: 'Danel & Ariana',
    discipline: 'Bachata',
    city: 'Barcelona',
    country: 'Spain',
    role: 'teacher',
  },
  {
    slug: 'mario-and-nia',
    name: 'Mario & Nia',
    discipline: 'Bachata',
    city: 'Barcelona',
    country: 'Spain',
    role: 'teacher',
    youtubeId: 'pLxf1HC_dEU',
  },
  {
    slug: 'alberto-and-lisondra',
    name: 'Alberto & Lisondra',
    discipline: 'Bachata',
    city: 'Stockholm',
    country: 'Sweden',
    role: 'teacher',
    youtubeId: 'DgK9bKg9tSk',
    bio: [
      'Alberto and Lisondra are a Bachata couple based in Stockholm, teaching Bachata fusion with a focus on clear leading and responsive following.',
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
    slug: 'rodrigo-and-lana',
    name: 'Rodrigo & Lana',
    discipline: 'Bachata',
    city: 'Stockholm',
    country: 'Sweden',
    role: 'teacher',
  },
  {
    slug: 'arturo-rojas',
    name: 'Arturo Rojas',
    discipline: 'Salsa Cubana',
    city: 'Stockholm',
    country: 'Sweden',
    role: 'teacher',
    descriptor: 'Rueda de Casino',
    youtubeId: '1Hn5dGGEF4Q',
    feature: true,
    bio: [
      'Arturo Rojas Cortegana — professional dancer, teacher, pedagogue, choreographer and international judge. Lima, Peru / Stockholm, Sweden.',
      'Specialised in Rueda de Casino and Cuban dances, with 30 years of experience in teaching, dance and creation.',
      'Arturo is the founder and creator of "Rueda en el Parque" (2008–2012, Lima, Peru). There are now more than 40 Rueda groups in different districts and parks throughout Lima.',
      'Director of "Perú Latin Dance", the first two-time National Champions of Rueda de Casino in Peru, 2010–2011. He owns the "Salsa King Sweden" school in Stockholm, which he founded in 2017.',
    ],
  },
  {
    slug: 'reynaldo-salazar',
    name: 'Reynaldo Salazar',
    discipline: 'Salsa Cubana',
    country: 'Germany',
    role: 'teacher',
    descriptor: 'Timba & Rueda',
  },
  {
    slug: 'saul-perez-valdes',
    name: 'Saul Perez Valdes',
    discipline: 'Salsa Cubana',
    city: 'Stockholm',
    country: 'Sweden',
    role: 'teacher',
    descriptor: 'Afro Cuban & Son',
  },
  {
    slug: 'juliette-anturi',
    name: 'Juliette Anturi',
    discipline: 'Salsa Cubana',
    city: 'Stockholm',
    country: 'Sweden',
    role: 'teacher',
    youtubeId: 'SPhP7p5_JOk',
  },
  {
    slug: 'linda-bertling',
    name: 'Linda Bertling',
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
