import type { Discipline } from './artists';
import type { Level } from './schedule';

/**
 * The page uses two colour encodings that must never be confused:
 *
 *   WARM hues (pink / gold) = DISCIPLINE — what you dance
 *   COOL hues (cyan → violet) = LEVEL — how hard it is
 *
 * Nothing else in the design is cool-toned, so a cool chip always means level.
 * Discipline is drawn as a filled pill, level as outlined text plus 1–3 pips,
 * so the two also differ in *form* — and level survives greyscale printing and
 * colour-blindness through the pip count alone.
 *
 * Class strings are written out in full because Tailwind scans source text; do
 * not build them by concatenation.
 */

export interface DisciplineStyle {
  label: string;
  /** Filled pill — the strong, scannable treatment used on cards and cells. */
  pill: string;
  /** Text-only, for places where a filled pill would be too heavy. */
  text: string;
  /** Left edge marker on mobile schedule cards. */
  border: string;
  /** Legend swatch. */
  swatch: string;
}

export const disciplineStyles: Record<Discipline, DisciplineStyle> = {
  Bachata: {
    label: 'Bachata',
    pill: 'bg-bachata text-ink',
    text: 'text-bachata',
    border: 'border-bachata',
    swatch: 'bg-bachata',
  },
  'Salsa Cubana': {
    label: 'Salsa Cubana',
    pill: 'bg-cubana text-ink',
    text: 'text-cubana',
    border: 'border-cubana',
    swatch: 'bg-cubana',
  },
};

export interface LevelStyle {
  label: string;
  /** 1–3 — drawn as pips so level reads without colour. */
  rank: 1 | 2 | 3;
  text: string;
  pip: string;
  swatch: string;
}

export const levelStyles: Record<Level, LevelStyle> = {
  'Open level': {
    label: 'Open level',
    rank: 1,
    text: 'text-level-1',
    pip: 'bg-level-1',
    swatch: 'bg-level-1',
  },
  Intermediate: {
    label: 'Intermediate',
    rank: 2,
    text: 'text-level-2',
    pip: 'bg-level-2',
    swatch: 'bg-level-2',
  },
  Advanced: {
    label: 'Advanced',
    rank: 3,
    text: 'text-level-3',
    pip: 'bg-level-3',
    swatch: 'bg-level-3',
  },
};

/** Ordered for the legend — easiest first. */
export const levelOrder: Level[] = ['Open level', 'Intermediate', 'Advanced'];
export const disciplineOrder: Discipline[] = ['Bachata', 'Salsa Cubana'];
