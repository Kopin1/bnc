import type { ImageMetadata } from 'astro';

/**
 * The people working behind the scenes, shown in a strip at the foot of the DJ
 * section. Kept apart from `artists.ts` so they never count towards the
 * Teachers stat. Drop a square photo into `src/assets/crew/` named after the slug.
 */

export interface CrewMember {
  slug: string;
  name: string;
  /** Job title shown as the eyebrow, e.g. "Official videographer". */
  role: string;
  /** Business or brand they work under. */
  company?: string;
  /** One short line on what they do at the event. */
  blurb?: string;
  instagram?: { handle: string; href: string };
}

export const crew: CrewMember[] = [
  {
    slug: 'sara-karlstrom',
    name: 'Sara Karlström',
    role: 'Official videographer',
    company: 'SK Production',
    blurb: 'Filming the workshops, shows and parties all weekend.',
    instagram: { handle: '@skproducti.on', href: 'https://www.instagram.com/skproducti.on/' },
  },
];

const images = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/crew/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export function crewImage(slug: string): ImageMetadata | undefined {
  const hit = Object.entries(images).find(([path]) =>
    path.split('/').pop()?.replace(/\.[^.]+$/, '') === slug,
  );
  return hit?.[1].default;
}
