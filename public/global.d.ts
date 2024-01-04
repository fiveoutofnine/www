import type { ReactNode } from 'react';

import { Database as DB } from '@/lib/database.types';
import { PageSlug } from '@/lib/types/site';
// eslint-disable-next-line prettier/prettier
import type { ReactNode } from 'react';

declare global {
  type Database = DB;
  type MonthlyData = {
    date: string;
    value: number;
    year: number;
  };

  /**
   * Type for a log entry for a day's mileage.
   * @param date Start date of the log entry.
   * @param value Mileage for the day (in km).
   */
  type MileageLog = {
    date: string;
    value: number;
  };

  /**
   * Type for a unit of length.
   * @param name Name of the unit.
   * @param scalar Multiplier for the unit with respect to km.
   * @param spaceBefore Whether to add a space before the unit.
   * @param description Description of the unit.
   */
  type LengthUnit = {
    name: string;
    scalar: number;
    spaceBefore?: boolean;
    description?: string;
  };

  type NavBarProps = {
    selected?: PageSlug;
  };

  type BaseLayoutProps = {
    pageSlug?: PageSlug;
    children?: ReactNode;
  };
}
