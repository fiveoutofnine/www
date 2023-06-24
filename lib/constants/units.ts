import type { LengthUnit } from '@/lib/types/units';

/**
 * List of length units.
 */
export const LENGTH_UNITS: LengthUnit[] = [
  { name: 'km', scalar: 1 },
  { name: 'mi', scalar: 1 / 1.609, description: '1.609km' },
  { name: 'marathons', scalar: 1 / 42.195, spaceBefore: true, description: '42.195km' },
  { name: 'm', scalar: 1e3 },
  { name: 'mm', scalar: 1e6 },
  { name: 'µm', scalar: 1e9, description: 'micrometer' },
  { name: 'nm', scalar: 1e12, description: 'nanometer' },
  { name: 'furlongs', scalar: 4.971, spaceBefore: true, description: '1/8 mile (0.201km)' },
  {
    name: 'barleycorns',
    scalar: 118100,
    spaceBefore: true,
    description: 'Length of a grain of barley (1/3in ≈ 0.847cm)',
  },
  {
    name: 'poronkusema',
    scalar: 1 / 7.5,
    spaceBefore: true,
    description: 'Distance a reindeer could travel without stopping to urinate (informally 7.5km)',
  },
  {
    name: 'beard seconds',
    scalar: 2e11,
    spaceBefore: true,
    description: 'Distance beard hair grows in one second (5nm)',
  },
  {
    name: 'megalithic yards',
    scalar: 1205.255,
    spaceBefore: true,
    description:
      'Hypothetical ancient unit of length used for the construction of megalithic structures (0.83m)',
  },
  { name: 'LA -> NYC', scalar: 1 / 3935.74, spaceBefore: true, description: '3935.74km' },
  { name: 'ICN -> NYC', scalar: 1 / 11054.58, spaceBefore: true, description: '11054.58km' },
  {
    name: 'lunar distance',
    scalar: 1 / 384398,
    spaceBefore: true,
    description: 'Average distance from the Moon to Earth (384,398km)',
  },
  {
    name: 'light seconds',
    scalar: 1 / 2.99792458e5,
    spaceBefore: true,
    description: 'Distance light travels in one second (299,792,458m)',
  },
  {
    name: 'light years',
    scalar: 1 / 5.879e12,
    spaceBefore: true,
    description: 'Distance light travels in one year (9.46Tkm)',
  },
  {
    name: 'au',
    scalar: 1 / 1.495978707e8,
    description: 'Astronomical unit, the average distance from the Sun to Earth (149.6Mkm)',
  },
  {
    name: 'parsec',
    scalar: 1 / 3.085677581491367e13,
    spaceBefore: true,
    description:
      'Distance from the Sun to an astronomical object that has a parallax angle of one arcsecond (648,000/πau ≈ 30.857Tkm)',
  },
];
