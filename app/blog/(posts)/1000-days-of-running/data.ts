import type { MileageLog } from '@/lib/types/running';

export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'KR', name: 'South Korea' },
  { code: 'IT', name: 'Italy' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'CN', name: 'China' },
  { code: 'FR', name: 'France' },
  { code: 'IS', name: 'Iceland' },
  { code: 'JP', name: 'Japan' },
  { code: 'GB', name: 'United Kingdom' },
];

export const MONTHLY_MILEAGE: (MileageLog & { days: number })[] = [
  // 2022
  { time: new Date('2022-09-01'), value: 685.7757, days: 30 },
  { time: new Date('2022-10-01'), value: 698.61804, days: 31 },
  { time: new Date('2022-11-01'), value: 687.8886, days: 30 },
  { time: new Date('2022-12-01'), value: 673.43207, days: 31 },
  // 2023
  { time: new Date('2023-01-01'), value: 670.3743, days: 31 },
  { time: new Date('2023-02-01'), value: 544.521, days: 28 },
  { time: new Date('2023-03-01'), value: 729.9626, days: 31 },
  { time: new Date('2023-04-01'), value: 673.5663, days: 30 },
  { time: new Date('2023-05-01'), value: 716.849, days: 31 },
  { time: new Date('2023-06-01'), value: 705.95544, days: 30 },
  { time: new Date('2023-07-01'), value: 813.2008, days: 31 },
  { time: new Date('2023-08-01'), value: 771.5247, days: 31 },
  { time: new Date('2023-09-01'), value: 793.1405, days: 30 },
  { time: new Date('2023-10-01'), value: 802.4439, days: 31 },
  { time: new Date('2023-11-01'), value: 753.8913, days: 30 },
  { time: new Date('2023-12-01'), value: 729.46564, days: 31 },
  // 2024
  { time: new Date('2024-01-01'), value: 782.70404, days: 31 },
  { time: new Date('2024-02-01'), value: 763.62164, days: 29 },
  { time: new Date('2024-03-01'), value: 773.0453, days: 31 },
  { time: new Date('2024-04-01'), value: 755.29974, days: 30 },
  { time: new Date('2024-05-01'), value: 811.59924, days: 31 },
  { time: new Date('2024-06-01'), value: 819.7487, days: 30 },
  { time: new Date('2024-07-01'), value: 737.1611, days: 31 },
  { time: new Date('2024-08-01'), value: 726.8284, days: 31 },
  { time: new Date('2024-09-01'), value: 777.9433, days: 30 },
  { time: new Date('2024-10-01'), value: 690.89124, days: 31 },
  { time: new Date('2024-11-01'), value: 749.5857, days: 30 },
  { time: new Date('2024-12-01'), value: 714.5059, days: 31 },
  // 2025
  { time: new Date('2025-01-01'), value: 754.1428, days: 31 },
  { time: new Date('2025-02-01'), value: 688.38165, days: 28 },
  { time: new Date('2025-03-01'), value: 775.67444, days: 31 },
  { time: new Date('2025-04-01'), value: 595.4449, days: 30 },
  { time: new Date('2025-05-01'), value: 515.3703, days: 26 },
];
