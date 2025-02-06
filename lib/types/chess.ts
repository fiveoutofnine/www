/**
 * Type for a fiveoutofnine chess NFT, an NFT deployed to
 * [`0xB543F9043b387cE5B3d1F0d916E42D8eA2eBA2E0`](https://etherscan.io/address/0xb543f9043b387ce5b3d1f0d916e42d8ea2eba2e0)
 * on Ethereum.
 * @param animationUrl Base 64 encoded HTML source of the NFT's image.
 * @param tokenId Token ID of the NFT (note: in the format of
 * `(gameId << 128) | (moveId)`).
 * @param name Name of the NFT.
 * @param txHash Transaction hash the NFT was minted in.
 * @param userMove User's move.
 * @param contractMove Contract's move.
 * @param boardAfterMove Board's state after both moves.
 */
export type ChessFeature = {
  animationUrl: string;
  tokenId: number;
  name: string;
  txHash: string;
  userMove: { from: number; to: number };
  contractMove: { from: number; to: number };
  boardAfterMove: string;
};

/**
 * Type for the metadata returned by fiveoutofnine chess NFT's (an NFT deployed
 * at
 * [`0xB543F9043b387cE5B3d1F0d916E42D8eA2eBA2E0`](https://etherscan.io/address/0xb543f9043b387ce5b3d1f0d916e42d8ea2eba2e0)
 * on Ethereum) `_tokenURI` function (internal helper function intended to
 * generate the contents of what `tokenURI` should return on-chain).
 * @param id Token ID of the NFT.
 * @param name Name of the NFT.
 * @param description Description of the NFT. In this case, it is a description
 * of the moves played by both the minter and the contract, formatted with
 * markdown.
 * @param image URL to the image of the NFT.
 * @param animation_url URL to the animation of the NFT (i.e. the ``image'').
 * @param attributes Attributes of the NFT.
 */
export type ChessNFTMetadata = {
  id: number;
  name: string;
  description: string;
  image?: string;
  animation_url: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
};
