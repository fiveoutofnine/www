'use server';

import { CHESS_NFT_FALLBACK, CHESS_NFTS } from '@/lib/constants/chess-nfts';
import { db } from '@/lib/db';
import type { ChessFeature } from '@/lib/types/chess';

export const fetchMoveAction = async (id: number): Promise<ChessFeature> => {
  if (id === 0) return CHESS_NFT_FALLBACK;

  const nft = CHESS_NFTS[id];

  // Fetch image from database.
  const fetchedNft = await db.query.chessNftMetadata.findFirst({
    columns: {
      animationUrl: true,
    },
    where: (nft, { eq }) => eq(nft.id, id),
  });

  // Technically, this should error, but we return the fallback because this
  // endpoint is just intended to display sample NFTs on the home page.
  if (!fetchedNft) return CHESS_NFT_FALLBACK;

  return {
    animationUrl: fetchedNft.animationUrl.substring(22) ?? '',
    ...nft,
  };
};
