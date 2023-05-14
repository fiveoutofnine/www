/**
 * Type for a log entry for a day's mileage.
 * @param date Start date of the log entry.
 * @param value Mileage for the day (in km).
 */
export type MileageLog = {
  date: string;
  value: number;
};
