// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const BASE_URL = 'https://assets.fiveoutofnine.com/img/';
const NUMBER_OF_IMAGES = 2;

const IMG_URLS = ['/static/og/home.png', '/static/og/blog.png'];

// -----------------------------------------------------------------------------
// Function
// -----------------------------------------------------------------------------

/**
 * Get a random image URL from the list of curated images.
 * @param exclude Optional index to exclude from the random selection. Only used
 * when there's more than 1 image (i.e. `NUMBER_OF_IMAGES > 1`).
 * @returns The URL of a random image.
 */
const getRandomImgUrl = (exclude?: number) => {
  let seed = Math.floor(Math.random() * NUMBER_OF_IMAGES);

  // Increase the seed by 1 to avoid the exclusion if there's only 1 MP4 video.
  if (seed === exclude && NUMBER_OF_IMAGES > 1) seed = (seed + 1) % NUMBER_OF_IMAGES;

  return {
    url: IMG_URLS[seed % 2],
    wip: `${BASE_URL}${seed.toString(16).padStart(8, '0')}.jpg`,
    index: seed,
  };
};

export default getRandomImgUrl;
