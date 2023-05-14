/**
 * Type for a unit of length.
 * @param name Name of the unit.
 * @param scalar Multiplier for the unit with respect to km.
 * @param spaceBefore Whether to add a space before the unit.
 * @param description Description of the unit.
 */
export type LengthUnit = {
  name: string;
  scalar: number;
  spaceBefore?: boolean;
  description?: string;
};
