/**
 * Type defining a city.
 * @param name The name of the city.
 * @param country The country the city is in.
 * @param latitude The latitude of the city.
 * @param longitude The longitude of the city.
 */
export type City = {
  name: string;
  country: {
    name: string;
    code: string;
  };
  latitude: number;
  longitude: number;
};
