/**
 * Type defining a bytebeat song.
 * @param source Bytebeat source of the song, i.e. the function to take in a
 * time tick `t` and output a waveform value in `[0, 255]`.
 * @param sampleRate The number of samples to process per second.
 * @param name The name of the song.
 * @param author The author of the song (name and link).
 * @param original The original source of the song.
 */
export type BytebeatSong = {
  name: string;
  author: {
    name: string;
    link?: string;
  };
  source: string;
  sampleRate: number;
  original?: string;
};
