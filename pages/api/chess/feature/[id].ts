import type { NextApiRequest, NextApiResponse } from 'next';

import { CHESS_NFT_FALLBACK, CHESS_NFTS } from '@/lib/constants/chess-nfts';
import { db } from '@/lib/db';
import { idSchema } from '@/lib/schemas';
import type { ChessFeature } from '@/lib/types/chess';
import { validateQuery } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChessFeature>) {
  const { id } = validateQuery(idSchema, req.query);

  if (id === 0) {
    res.status(200).json(CHESS_NFT_FALLBACK);
    return;
  }

  const nft = CHESS_NFTS[id];

  // Fetch image.
  const fetchedNft = await db.query.chessNftMetadata.findFirst({
    columns: {
      animationUrl: true,
    },
    where: (nft, { eq }) => eq(nft.id, id),
  });

  if (!fetchedNft) {
    // Technically, this should error, but we return the fallback because this
    // endpoint is just intended to display sample NFTs on the home page.
    res.status(200).json(CHESS_NFT_FALLBACK);
    return;
  }

  const image = fetchedNft.animationUrl.substring(22) ?? '';

  // Cache response for 1 week, revalidate after 1 day.
  res.setHeader('cache-control', 'public, s-maxage=604800, stale-while-revalidate=86400');
  res.status(200).json({
    image,
    ...nft,
  });
}
