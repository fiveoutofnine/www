// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const BASE_URL = 'https://assets.fiveoutofnine.com/mp4/';
export const NUMBER_OF_VIDEOS = Number(process.env.NEXT_PUBLIC_NUMBER_OF_VIDEOS ?? '1');

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
  const offset = Math.floor(Math.random() * (NUMBER_OF_VIDEOS - 1));

  // Increment the seed to avoid the exclusion if there's only 1 video.
  if (seed === exclude && NUMBER_OF_VIDEOS > 1) seed = (seed + offset) % NUMBER_OF_VIDEOS;

  return {
    url: `${BASE_URL}${Math.min(seed, 999_999_999).toString(10).padStart(9, '0')}.mp4`,
    index: seed,
  };
};

export default getRandomMp4Url;
