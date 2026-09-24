import { event } from './event';

/**
 * The Full Pass uses the confirmed 2027 price tiers (supplied 2026-09-24). The
 * other prices were copied from /registration-and-prices on the old site
 * (2026-09-17) and are NOT confirmed next-edition prices.
 *
 * `priceConfirmed` gates the schema.org `offers` block: while it is false the
 * structured data ships without prices, so we never publish stale money to
 * Google. Flip it to true once the organiser signs off.
 */

export const priceConfirmed: boolean = false;
export const currency = 'SEK';

/**
 * One step of a price that rises over time. Tiers are listed in order, and the
 * one that applies is the first whose `lastDay` has not passed yet.
 */
export interface PriceTier {
  price: number;
  /**
   * Last day this price applies, inclusive, as `YYYY-MM-DD` in Stockholm time.
   * Leave it off the final tier.
   */
  lastDay?: string;
}

interface PassBase {
  id: string;
  name: string;
  /** One-line summary shown under the price. */
  summary: string;
  /** Bullet list of what the pass covers. */
  includes: string[];
  /** Things a buyer could reasonably assume are included but are not. */
  excludes?: string[];
  featured?: boolean;
  bookingUrl?: string;
}

/** A pass has either one fixed `price` or a list of dated `tiers`. */
export type Pass = PassBase & ({ price: number; tiers?: never } | { tiers: PriceTier[]; price?: never });

/** The two headline passes — these get the large cards. */
export const mainPasses: Pass[] = [
  {
    id: 'full-pass',
    name: 'Full Pass',
    tiers: [
      { price: 1000, lastDay: '2026-11-30' },
      { price: 1400, lastDay: '2027-01-31' },
      { price: 1600 },
    ],
    summary: 'Workshops & parties',
    includes: [
      'All workshops, Friday to Sunday',
      'Friday party — two dance floors',
      'Saturday party — two dance floors',
      'Artist presentation & showtime',
    ],
    // Stated explicitly on the current /program page.
    excludes: ['Friday 19:00–21:00 drop-in classes'],
    featured: true,
  },
  {
    id: 'day-pass',
    name: 'Day Pass',
    price: 1000,
    summary: 'Workshops & 1 party',
    includes: ['All workshops on one day', 'One party of your choice', 'Two dance floors that night'],
  },
];

/** Smaller à la carte tickets. */
export const singleTickets: Pass[] = [
  {
    id: 'single-workshop',
    name: 'Single Workshop',
    price: 300,
    summary: 'One 60-minute workshop',
    includes: ['Any single workshop on the schedule'],
  },
  {
    id: 'party-friday',
    name: 'Friday Party',
    price: 200,
    summary: '21:00 – 03:00',
    includes: ['Two dance floors', 'Presentation of the international line-up'],
  },
  {
    id: 'party-saturday',
    name: 'Saturday Party',
    price: 250,
    summary: '22:00 – 05:00',
    includes: ['Two dance floors', 'Showtime with the international line-up'],
  },
];

export const allPasses = [...mainPasses, ...singleTickets];

export function bookingUrlFor(pass: Pass): string {
  return pass.bookingUrl ?? event.bookingUrl;
}

export function formatPrice(price: number): string {
  return `${price.toLocaleString('sv-SE')} ${currency}`;
}

/** Today in Stockholm as `YYYY-MM-DD`, the same format `lastDay` uses. */
export function stockholmToday(now = new Date()): string {
  return now.toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' });
}

export function tiersFor(pass: Pass): PriceTier[] {
  return pass.tiers ?? [{ price: pass.price }];
}

/** The tier in force on `day`, and the one after it if there is one. */
export function tierOn(tiers: PriceTier[], day = stockholmToday()) {
  // ISO dates compare correctly as strings, so no timezone maths is needed.
  const i = tiers.findIndex((t) => !t.lastDay || day <= t.lastDay);
  const at = i === -1 ? tiers.length - 1 : i;
  return { current: tiers[at], next: tiers[at + 1] as PriceTier | undefined };
}

export function priceOn(pass: Pass, day = stockholmToday()): number {
  return tierOn(tiersFor(pass), day).current.price;
}

/** "Until 30 November, then 1 400 SEK" — or nothing once the final tier applies. */
export function tierNote(tiers: PriceTier[], day = stockholmToday()): string | undefined {
  const { current, next } = tierOn(tiers, day);
  if (!current.lastDay || !next) return undefined;
  const until = new Date(`${current.lastDay}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });
  return `Until ${until}, then ${formatPrice(next.price)}`;
}
