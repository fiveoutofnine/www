// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const BASE_URL = 'https://assets.fiveoutofnine.com/mp4/';
export const NUMBER_OF_VIDEOS = 4;

// -----------------------------------------------------------------------------
// Function
// -----------------------------------------------------------------------------

/**
 * Get a random MP4 URL from the list of curated videos.
 * @param exclude Optional index to exclude from the random selection. Only used
 * when there's more than 1 MP4 video (i.e. `NUMBER_OF_VIDEOS > 1`).
 * @returns The URL of a random MP4 video.
 */
const getRandomMp4Url = (exclude?: number) => {
  let seed = Math.floor(Math.random() * NUMBER_OF_VIDEOS);

  // Increase the seed by 1 to avoid the exclusion if there's only 1 MP4 video.
  if (seed === exclude && NUMBER_OF_VIDEOS > 1) seed = (seed + 1) % NUMBER_OF_VIDEOS;

  return {
    url: `${BASE_URL}${seed.toString(16).padStart(8, '0')}.mp4`,
    index: seed,
  };
};

export default getRandomMp4Url;
