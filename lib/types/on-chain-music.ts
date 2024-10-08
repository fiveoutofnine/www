import type { Address } from 'viem';

/**
 * Type for an on-chain song.
 * @param address Address of the on-chain song's source.
 * @param chainId Chain ID the on-chain song is deployed on.
 * @param name Name of the on-chain song.
 * @param composition Source code of the on-chain song.
 * @param filePath Relative path to the audio file of the song.
 * @param metadata Metadata of the on-chain song in the shape of
 * `{ sampleRate: number, samples: number }`.
 */
export type OnChainMusicFeature = {
  address: Address;
  chainId: number;
  name: string;
  filePath: string;
  composition: string;
  metadata: {
    sampleRate: number;
    samples: number;
  };
};
