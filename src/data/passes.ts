import { event } from './event';

/**
 * MIGRATION DATA — prices copied from /registration-and-prices on the current
 * site (2026-09-17). These are NOT confirmed next-edition prices.
 *
 * `priceConfirmed` gates the schema.org `offers` block: while it is false the
 * structured data ships without prices, so we never publish stale money to
 * Google. Flip it to true once the organiser signs off.
 */

export const priceConfirmed: boolean = false;
export const currency = 'SEK';

export interface Pass {
  id: string;
  name: string;
  price: number;
  /** One-line summary shown under the price. */
  summary: string;
  /** Bullet list of what the pass covers. */
  includes: string[];
  /** Things a buyer could reasonably assume are included but are not. */
  excludes?: string[];
  featured?: boolean;
  bookingUrl?: string;
}

/** The two headline passes — these get the large cards. */
export const mainPasses: Pass[] = [
  {
    id: 'full-pass',
    name: 'Full Pass',
    price: 1500,
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
