export type ChessFeature = {
  image: string;
  tokenId: number;
  txHash: string;
  userMove: { from: number; to: number };
  contractMove: { from: number; to: number };
  boardAfterMove: string;
};
