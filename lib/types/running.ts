/**
 * Type for a log entry for a day's mileage.
 * @param time Start date of the log entry.
 * @param value Mileage for the day (in km).
 */
export type MileageLog = {
  time: Date;
  value: number;
};
