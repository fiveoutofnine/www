/**
 * Type for a fiveoutofnine chess NFT, an NFT deployed to
 * [`0xB543F9043b387cE5B3d1F0d916E42D8eA2eBA2E0`](https://etherscan.io/address/0xb543f9043b387ce5b3d1f0d916e42d8ea2eba2e0)
 * on Ethereum.
 * @param image Base 64 encoded HTML source of the NFT's image.
 * @param tokenId Token ID of the NFT (note: in the format of
 * `(gameId << 128) | (moveId)`).
 * @param name Name of the NFT.
 * @param txHash Transaction hash the NFT was minted in.
 * @param userMove User's move.
 * @param contractMove Contract's move.
 * @param boardAfterMove Board's state after both moves.
 */
export type ChessFeature = {
  image: string;
  tokenId: number;
  name: string;
  txHash: string;
  userMove: { from: number; to: number };
  contractMove: { from: number; to: number };
  boardAfterMove: string;
};
