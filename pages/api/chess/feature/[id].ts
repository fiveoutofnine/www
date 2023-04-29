import type { NextApiRequest, NextApiResponse } from 'next';

import { BigNumber } from 'ethers';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

import { CHESS_NFT_FALLBACK, CHESS_NFTS } from '@/lib/constants/chess-nfts';
import { idSchema } from '@/lib/schemas';
import type { ChessFeature } from '@/lib/types/chess';
import { validateQuery } from '@/lib/utils';

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChessFeature>) {
  const { id } = validateQuery(idSchema, req.query);

  if (id === 0) {
    res.status(200).json(CHESS_NFT_FALLBACK);
    return;
  }

  const nft = CHESS_NFTS[id];

  // Fetch image.
  const nftMetadata = await publicClient.readContract({
    address: '0xB543F9043b387cE5B3d1F0d916E42D8eA2eBA2E0', // fiveoutofnine Chess NFT contract
    abi: [
      {
        inputs: [{ internalType: 'uint256', name: '_tokenId', type: 'uint256' }],
        name: '_tokenURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: '_tokenURI',
    args: [BigNumber.from(id)],
  });
  const image = JSON.parse(Buffer.from(nftMetadata.substring(29), 'base64').toString())[
    'animation_url'
  ].substring(22);

  res.status(200).json({
    image,
    ...nft,
  });
}
