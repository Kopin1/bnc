import { event } from './event';

/**
 * The full weekend programme.
 *
 * DATES are confirmed for 2027: Friday 2 – Sunday 4 April.
 *
 * WORKSHOP CONTENT is still MIGRATION DATA. It is transcribed from the
 * organiser's official "Workshopschema-2026 FLAT.pdf" (the only place the grid
 * ever existed — it was never HTML on the old site), re-dated onto the 2027
 * weekend because that edition ran the same Fri/Sat/Sun shape. Treat every
 * teacher, title and level below as a placeholder until the 2027 grid lands.
 *
 * Transcription notes:
 *  - Rooms on the flyer are "Sal 1", "Sal 2" and "Sal 4" — there is no Sal 3.
 *  - Sal 4 has no 11:00 session on either Saturday or Sunday.
 *  - The flyer spells the same teacher "Reynaldo Salsazar" three times and
 *    "Reynaldo Salazar" once; his own profile page says Salazar, used here.
 *  - The flyer's own day headings ("Friday 31st of July") are dropped — the
 *    weekday sequence carries over to 2027, the calendar dates do not.
 *  - A few sessions list no level on the flyer; `level` is omitted for those.
 */

export type SessionCategory = 'workshop' | 'party' | 'break' | 'show' | 'dropin';
export type Level = 'Open level' | 'Intermediate' | 'Advanced';

export interface Session {
  start: string;
  end?: string;
  title: string;
  /** Teacher(s) or performer(s). Omitted for breaks. */
  artist?: string;
  room?: string;
  category: SessionCategory;
  level?: Level;
  /** Shown as a small caveat under the item. */
  note?: string;
}

export interface ScheduleDay {
  id: string;
  /** e.g. "Friday" */
  day: string;
  date: string;
  dateLabel: string;
  /** Short rhythm-of-the-day line used on the home page preview cards. */
  summary: string;
  /** Second line on the preview card. */
  subline: string;
  rooms: string[];
  sessions: Session[];
}

export const schedule: ScheduleDay[] = [
  {
    id: 'friday',
    day: 'Friday',
    date: '2027-04-02',
    dateLabel: '2 April',
    summary: 'Workshops · Drop-in classes · Opening party',
    subline: 'Two dance floors until late',
    rooms: ['Sal 1', 'Sal 2'],
    sessions: [
      { start: '16:30', end: '17:30', title: 'Bachata Fusion — Smooth Transitions', artist: 'Alberto & Lisondra', room: 'Sal 1', category: 'workshop', level: 'Intermediate' },
      { start: '16:30', end: '17:30', title: 'Timba Partnerwork', artist: 'Arturo & Linda', room: 'Sal 2', category: 'workshop', level: 'Intermediate' },
      { start: '17:40', end: '18:40', title: 'Timba Partnerwork', artist: 'Kevin & Geysa', room: 'Sal 1', category: 'workshop', level: 'Intermediate' },
      { start: '17:40', end: '18:40', title: 'Bacha Tango', artist: 'Danel & Ariana', room: 'Sal 2', category: 'workshop', level: 'Intermediate' },
      { start: '19:00', end: '21:00', title: 'Drop-in classes in Salsa & Bachata', category: 'dropin', note: 'Not included in the Full Pass' },
      { start: '21:00', end: '03:00', title: 'Opening party — two dance floors', artist: 'Bachata & Salsa Cubana', category: 'party' },
      { start: '23:00', title: 'Presentation of the international line-up', category: 'show' },
    ],
  },
  {
    id: 'saturday',
    day: 'Saturday',
    date: '2027-04-03',
    dateLabel: '3 April',
    summary: 'Full workshop day · Main party · Showtime',
    subline: 'Two dance floors until 05:00',
    rooms: ['Sal 1', 'Sal 2', 'Sal 4'],
    sessions: [
      { start: '11:00', end: '12:00', title: 'Bachata Sensual Flow', artist: 'Ezequiel & Julia', room: 'Sal 1', category: 'workshop', level: 'Intermediate' },
      { start: '11:00', end: '12:00', title: 'Timba Partnerwork', artist: 'Juliette & Linda', room: 'Sal 2', category: 'workshop', level: 'Intermediate' },
      { start: '12:10', end: '13:10', title: 'Timba Partnerwork', artist: 'Kevin & Geysa', room: 'Sal 1', category: 'workshop', level: 'Advanced' },
      { start: '12:10', end: '13:10', title: 'Bachata — Clear Leading & Responsive Following', artist: 'Alberto & Lisondra', room: 'Sal 2', category: 'workshop', level: 'Intermediate' },
      { start: '12:10', end: '13:10', title: 'Casino Paseos y Floreos', artist: 'Reynaldo Salazar', room: 'Sal 4', category: 'workshop', level: 'Intermediate' },
      { start: '13:10', end: '14:30', title: 'Lunch', category: 'break' },
      { start: '14:30', end: '15:30', title: 'Bachata Sensual', artist: 'Mario & Nia', room: 'Sal 1', category: 'workshop', level: 'Advanced' },
      { start: '14:30', end: '15:30', title: 'Timba Partnerwork', artist: 'Kevin & Geysa', room: 'Sal 2', category: 'workshop', level: 'Intermediate' },
      { start: '14:30', end: '15:30', title: 'Bachazouk', artist: 'Ezequiel & Julia', room: 'Sal 4', category: 'workshop', level: 'Intermediate' },
      { start: '15:40', end: '16:40', title: 'Cuban Ladies Style', artist: 'Juliette', room: 'Sal 1', category: 'workshop' },
      { start: '15:40', end: '16:40', title: 'Bachata Fusion', artist: 'Danel & Ariana', room: 'Sal 2', category: 'workshop', level: 'Intermediate' },
      { start: '15:40', end: '16:40', title: 'Cuban Men Style', artist: 'Arturo', room: 'Sal 4', category: 'workshop' },
      { start: '16:50', end: '17:50', title: 'Bachata Sensual', artist: 'Lorena & Marc', room: 'Sal 1', category: 'workshop', level: 'Intermediate' },
      { start: '16:50', end: '17:50', title: 'Rueda Contratiempo', artist: 'Reynaldo Salazar', room: 'Sal 2', category: 'workshop', level: 'Advanced' },
      { start: '16:50', end: '17:50', title: 'Bachata Sensual — Flow Combination', artist: 'Rodrigo & Lana', room: 'Sal 4', category: 'workshop', level: 'Advanced' },
      { start: '22:00', end: '05:00', title: 'Main party — two dance floors', artist: 'Bachata & Salsa Cubana', category: 'party' },
      { start: '24:00', title: 'Showtime with the international line-up', category: 'show' },
    ],
  },
  {
    id: 'sunday',
    day: 'Sunday',
    date: '2027-04-04',
    dateLabel: '4 April',
    summary: 'Full workshop day',
    subline: 'Final workshops and weekend closing',
    rooms: ['Sal 1', 'Sal 2', 'Sal 4'],
    sessions: [
      { start: '11:00', end: '12:00', title: 'Casino — Tricks & Dips', artist: 'Kevin & Geysa', room: 'Sal 1', category: 'workshop', level: 'Intermediate' },
      { start: '11:00', end: '12:00', title: 'Bachata Sensual', artist: 'Lorena & Marc', room: 'Sal 2', category: 'workshop', level: 'Advanced' },
      { start: '12:10', end: '13:10', title: 'Acro-Bachata', artist: 'Danel & Ariana', room: 'Sal 1', category: 'workshop', level: 'Intermediate' },
      { start: '12:10', end: '13:10', title: 'Timba Partnerwork', artist: 'Arturo & Juliette', room: 'Sal 2', category: 'workshop', level: 'Intermediate' },
      { start: '12:10', end: '13:10', title: 'Bachata — Musicality & Connection', artist: 'Rodrigo & Lana', room: 'Sal 4', category: 'workshop', level: 'Intermediate' },
      { start: '13:10', end: '14:30', title: 'Lunch', category: 'break' },
      { start: '14:30', end: '15:30', title: 'Rueda Caminando', artist: 'Reynaldo Salazar', room: 'Sal 1', category: 'workshop', level: 'Intermediate' },
      { start: '14:30', end: '15:30', title: 'Bachata Fusion — Tools & Technique', artist: 'Alberto & Lisondra', room: 'Sal 2', category: 'workshop', level: 'Intermediate' },
      { start: '14:30', end: '15:30', title: 'Afro Cuban', artist: 'Saul Perez', room: 'Sal 4', category: 'workshop', level: 'Open level' },
      { start: '15:40', end: '16:40', title: 'Bachata Ladies — Lines & Flow', artist: 'Lorena', room: 'Sal 1', category: 'workshop' },
      { start: '15:40', end: '16:40', title: 'Rueda de Casino', artist: 'Arturo Rojas', room: 'Sal 2', category: 'workshop', level: 'Intermediate' },
      { start: '15:40', end: '16:40', title: 'Bachata Men Style', artist: 'Marc', room: 'Sal 4', category: 'workshop' },
      { start: '16:50', end: '17:50', title: 'Timba con Afro-Rumba', artist: 'Reynaldo Salazar', room: 'Sal 1', category: 'workshop', level: 'Advanced' },
      { start: '16:50', end: '17:50', title: 'Bachata Sensual', artist: 'Mario & Nia', room: 'Sal 2', category: 'workshop', level: 'Advanced' },
      { start: '16:50', end: '17:50', title: 'Son Partnerwork', artist: 'Saul Perez', room: 'Sal 4', category: 'workshop', level: 'Intermediate' },
    ],
  },
];

/** Distinct workshop start slots for a day, in order — drives the grid rows. */
export function timeSlots(day: ScheduleDay): string[] {
  const seen = new Set<string>();
  for (const s of day.sessions) {
    if (s.category === 'workshop') seen.add(s.start);
  }
  return [...seen].sort();
}

/** The workshop in a given room at a given time, if any. */
export function sessionAt(day: ScheduleDay, slot: string, room: string): Session | undefined {
  return day.sessions.find((s) => s.category === 'workshop' && s.start === slot && s.room === room);
}

/** Non-workshop items (parties, shows, lunch, drop-in) in chronological order. */
export function eveningSessions(day: ScheduleDay): Session[] {
  return day.sessions.filter((s) => s.category !== 'workshop' && s.category !== 'break');
}

export function breakAfter(day: ScheduleDay, slot: string): Session | undefined {
  const slots = timeSlots(day);
  const next = slots[slots.indexOf(slot) + 1];
  if (!next) return undefined;
  return day.sessions.find((s) => s.category === 'break' && s.start >= slot && s.start <= next);
}

export const workshopCount = schedule.reduce(
  (n, d) => n + d.sessions.filter((s) => s.category === 'workshop').length,
  0,
);

export const schedulePdf = event.schedulePdf;
