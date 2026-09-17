import { event } from './event';
import { teachingArtists } from './artists';
import { djs } from './djs';
import { schedule, workshopCount } from './schedule';

/**
 * The strip under the hero.
 *
 * This used to be six cards of adjectives — "two dance floors", "international
 * artists", "workshops, parties and shows" — which is word-for-word the hero
 * tagline, and the intro paragraph below then said it a third time. Numbers say
 * something none of those do, and take about a fifth of the height.
 *
 * Every figure is derived, so they stay true when the lineup or schedule
 * changes. Nothing here is typed by hand.
 */

/** Distinct countries across the teaching lineup and the DJs. */
const countries = new Set(
  [...teachingArtists, ...djs]
    .flatMap((p) => p.country.split('/'))
    .map((c) => c.trim())
    .filter(Boolean),
);

export const stats = [
  { value: schedule.length, label: 'Days' },
  { value: workshopCount, label: 'Workshops' },
  { value: teachingArtists.length, label: 'Teachers' },
  { value: djs.length, label: 'DJs' },
  { value: event.venue.rooms.length, label: 'Rooms' },
  { value: countries.size, label: 'Countries' },
];

/** Small factual chips used in the intro section. */
export const introFacts = ['Stockholm', 'Fri – Sun', 'Workshops', 'Two rooms', 'Parties'];

export const nav = [
  { label: 'Program', href: '/program' },
  { label: 'Artists', href: '/#artists' },
  { label: 'Passes', href: '/#passes' },
  { label: 'Venue', href: '/#venue' },
];

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  event.venue.mapsQuery,
)}`;
