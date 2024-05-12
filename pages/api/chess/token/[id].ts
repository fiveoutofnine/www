import type { NextApiRequest, NextApiResponse } from 'next';

import type { Database } from '@/generated/database.types';
import { createClient } from '@supabase/supabase-js';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

import { idSchema } from '@/lib/schemas';
import type { ChessNFTMetadata } from '@/lib/types/chess';
import { validateQuery } from '@/lib/utils';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<(ChessNFTMetadata & { image?: string }) | Error>,
) {
  const { id } = validateQuery(idSchema, req.query);

  // First, attempt to fetch the metadata from Supabase.
  const { data, status, error } = await supabaseAdmin
    .from('chess_nft_metadata')
    .select('*')
    .eq('id', id)
    .returns<ChessNFTMetadata[]>();

  let metadata: ChessNFTMetadata & { image?: string };
  // If there is an error, or if the data is empty, or if there is no data,
  // then attempt to fetch the metadata from Ethereum via the `_tokenURI`
  // function.
  if ((error && status !== 406) || (data && data.length === 0) || !data) {
    try {
      // Fetch metadata.
      const tokenURI = (await publicClient.readContract({
        // fiveoutofnine Chess NFT contract
        address: '0xB543F9043b387cE5B3d1F0d916E42D8eA2eBA2E0',
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
        args: [BigInt(id)],
      })) as string;
      const tokenURIParsed = JSON.parse(
        Buffer.from(tokenURI.substring(29), 'base64').toString(),
      ) as ChessNFTMetadata;

      metadata = {
        id,
        name: tokenURIParsed.name,
        description: tokenURIParsed.description,
        animation_url: tokenURIParsed.animation_url,
        attributes: tokenURIParsed.attributes,
      };
    } catch (err) {
      res.status(404).json({ name: 'Not found', message: 'Token is nonexistent.' });
      return;
    }

    // Insert into Supabase.
    const { error: upsertError } = await supabaseAdmin.from('chess_nft_metadata').upsert(metadata);
    if (upsertError) {
      res.status(500).json({ name: 'Internal server error', message: 'Something went wrong.' });
      return;
    }
  } else {
    metadata = data[0];
  }

  // Overwrite `animation_url` to proxied version on our server to accomodate
  // marketplaces' CSPs.
  metadata.animation_url = `https://fiveoutofnine.com/api/chess/asset/${id}`;

  // Check if image preview has been uploaded to Supabase storage.
  const { data: imageData, error: imageError } = await supabaseAdmin.storage
    .from('public')
    .download(`chess_nft_images/${id}.png`);

  // If the image preview has been uploaded, then add it to the metadata.
  if (!imageError && imageData) {
    const { data: image } = await supabaseAdmin.storage
      .from('chess_nft_images')
      .getPublicUrl(`${id}.png`);

    metadata.image = image.publicUrl;
  }

  // Cache response for 30 days.
  res.setHeader('cache-control', 'public, s-maxage=2592000');
  res.status(200).json(metadata);
}
