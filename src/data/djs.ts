import type { ImageMetadata } from 'astro';
import type { Discipline } from './artists';

/**
 * 2027 DJ lineup, supplied by the organisers (2026-09-24). Array order is
 * display order. The old site had a dedicated /djs route; here they are a
 * section of the home page instead. Drop photos into `src/assets/djs/` named after the slug.
 */

export interface Dj {
  slug: string;
  name: string;
  discipline: Discipline;
  city?: string;
  /** Not rendered in the DJ grid; kept where known. */
  country?: string;
  bio?: string[];
  youtubeId?: string;
}

export const djs: Dj[] = [
  {
    slug: 'dj-isra',
    name: 'DJ Isra',
    discipline: 'Salsa Cubana',
    city: 'Havana',
    country: 'Cuba',
    youtubeId: 'zESm3dl7TPg',
    bio: [
      'DJ Isra was born in Cuba and has been moving the Latin crowd in Sweden for over six years with his Cuban sound. With his sense for mixing classic Cuban salsa with timba and cubaton, he has played at several international festivals alongside artists such as Gente de Zona, Los Van Van, Los 4, Habana D’Primera and Maykel Blanco y su Salsa Mayor.',
    ],
  },
  { slug: 'dj-poggy', name: 'DJ Poggy', discipline: 'Bachata' },
  { slug: 'dj-dlux', name: 'DJ D’Lux', discipline: 'Bachata' },
  { slug: 'dj-aura', name: 'DJ Aura', discipline: 'Bachata' },
  { slug: 'dj-neit', name: 'DJ Neit', discipline: 'Bachata', city: 'Stockholm', country: 'Sweden' },
  { slug: 'dj-bachflow', name: 'DJ BachFlow', discipline: 'Bachata', city: 'Stockholm', country: 'Sweden' },
  { slug: 'dj-valenz', name: 'DJ Valenz', discipline: 'Bachata', city: 'Stockholm', country: 'Sweden' },
];

const images = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/djs/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export function djImage(slug: string): ImageMetadata | undefined {
  const hit = Object.entries(images).find(([path]) =>
    path.split('/').pop()?.replace(/\.[^.]+$/, '') === slug,
  );
  return hit?.[1].default;
}
