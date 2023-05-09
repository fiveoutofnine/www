import type { LengthUnit } from '@/lib/types/units';

export const LENGTH_UNITS: LengthUnit[] = [
  { name: 'km', scalar: 1 },
  { name: 'mi', scalar: 1 / 1.609 },
  { name: 'marathons', scalar: 1 / 42.195, spaceBefore: true },
  { name: 'm', scalar: 1e3 },
  { name: 'mm', scalar: 1e6 },
  { name: 'µm', scalar: 1e9 },
  { name: 'nm', scalar: 1e12 },
  { name: 'furlongs', scalar: 4.971, spaceBefore: true },
  { name: 'barleycorns', scalar: 118100, spaceBefore: true },
  { name: 'poronkusema', scalar: 1 / 7.5, spaceBefore: true },
  { name: 'beard seconds', scalar: 2e11, spaceBefore: true },
  { name: 'metalithic yards', scalar: 1205.255, spaceBefore: true },
  { name: 'LA -> NYC', scalar: 1 / 3935.74, spaceBefore: true },
  { name: 'ICN -> NYC', scalar: 1 / 11054.58, spaceBefore: true },
  { name: 'lunar distance', scalar: 1 / 384398, spaceBefore: true },
  { name: 'light years', scalar: 1 / 5.879e12, spaceBefore: true },
  { name: 'siriometers', scalar: 1 / 9.295e14, spaceBefore: true },
];
