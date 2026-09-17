import { event } from './event';

/** Home-page highlight strip. Keep to five or six — this is a scan, not copy. */
export const highlights = [
  { label: 'Bachata + Salsa Cubana', detail: 'Two disciplines, one weekend' },
  { label: 'International & local artists', detail: 'Barcelona · Havana · Germany · Stockholm' },
  { label: 'Workshops all weekend', detail: 'Friday afternoon to Sunday evening' },
  { label: 'Two dance floors', detail: 'Every party night' },
  { label: 'Parties + shows', detail: 'Line-up presentation & showtime' },
  { label: 'Central Stockholm', detail: 'Adolf Fredriks Kyrkogata 13' },
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
