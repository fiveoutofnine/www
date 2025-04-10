// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const BASE_URL = 'https://assets.fiveoutofnine.com/webp/';
const NUMBER_OF_IMAGES = 10;

// -----------------------------------------------------------------------------
// Function
// -----------------------------------------------------------------------------

/**
 * Get a random image URL from the list of curated images.
 * @param exclude Optional index to exclude from the random selection. Only used
 * when there's more than 1 image (i.e. `NUMBER_OF_IMAGES > 1`).
 * @returns The URL of a random image.
 */
const getRandomWebPUrl = (exclude?: number) => {
  let seed = Math.floor(Math.random() * NUMBER_OF_IMAGES);
  const offset = Math.floor(Math.random() * (NUMBER_OF_IMAGES - 1));

  // Increment the seed to avoid the exclusion if there's only 1 photo.
  if (seed === exclude && NUMBER_OF_IMAGES > 1) seed = (seed + offset) % NUMBER_OF_IMAGES;

  return {
    url: `${BASE_URL}${Math.min(seed, 999_999_999).toString(10).padStart(9, '0')}.webp`,
    index: seed,
  };
};

export default getRandomWebPUrl;
