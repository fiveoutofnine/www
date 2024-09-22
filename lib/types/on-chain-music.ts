import type { Address } from 'viem';

/**
 * Type for an on-chain song.
 * @param address Address of the on-chain song's source.
 * @param chainId Chain ID the on-chain song is deployed on.
 * @param name Name of the on-chain song.
 * @param length Length of the on-chain song (in seconds).
 * @param composition Source code of the on-chain song.
 */
export type OnChainMusicFeature = {
  address: Address;
  chainId: number;
  name: string;
  length: number;
  composition: string;
};
