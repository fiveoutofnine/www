import { NextResponse } from 'next/server';

import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

import { db } from '@/lib/db';
import { chessNftMetadata } from '@/lib/db/schema';
import { idSchema } from '@/lib/schemas';
import type { ChessNFTMetadata } from '@/lib/types/chess';
import { validateQuery } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Clients
// -----------------------------------------------------------------------------

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// -----------------------------------------------------------------------------
// API
// -----------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = validateQuery(idSchema, await params);

  // First, attempt to fetch the metadata from the database.
  const nft = await db.query.chessNftMetadata.findFirst({
    where: (nft, { eq }) => eq(nft.id, id),
  });

  let metadata: ChessNFTMetadata;
  // If the NFT is not found in the database, then attempt to fetch the metadata
  // from Ethereum via the `_tokenURI` function.
  if (!nft) {
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
        // `.slice(29)` removes the `data:application/json;base64,` data URI
        // prefix.
        Buffer.from(tokenURI.substring(29), 'base64').toString(),
      ) as Omit<ChessNFTMetadata, 'image'>;

      metadata = {
        id,
        name: tokenURIParsed.name,
        description: tokenURIParsed.description,
        animation_url: tokenURIParsed.animation_url,
        attributes: tokenURIParsed.attributes,
      };
    } catch (err) {
      return NextResponse.json(
        { name: 'Not found', message: 'Token is nonexistent.' },
        { status: 404 },
      );
    }

    // Insert into database.
    await db
      .insert(chessNftMetadata)
      .values({
        id: metadata.id,
        name: metadata.name,
        description: metadata.description,
        animationUrl: metadata.animation_url,
        attributes: metadata.attributes,
      })
      .onConflictDoUpdate({
        target: chessNftMetadata.id,
        set: {
          name: metadata.name,
          description: metadata.description,
          animationUrl: metadata.animation_url,
          attributes: metadata.attributes,
        },
      });
  } else {
    metadata = {
      id,
      name: nft.name,
      description: nft.description,
      image: nft.image ?? undefined,
      animation_url: nft.animationUrl,
      attributes: nft.attributes as { trait_type: string; value: string }[],
    };
  }

  // Overwrite `animation_url` to proxied version on our server to accomodate
  // marketplaces' CSPs.
  metadata.animation_url = `https://fiveoutofnine.com/api/chess/asset/${id}`;

  return NextResponse.json(metadata, {
    headers: {
      // Cache response for 30 days.
      'Cache-Control': 'public, s-maxage=2592000',
    },
  });
}
