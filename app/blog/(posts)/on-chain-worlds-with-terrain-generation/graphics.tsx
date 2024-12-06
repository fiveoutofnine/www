'use server';

import Image from 'next/image';

import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

import LogoIcon from '@/components/common/logo-icon';
import { A } from '@/components/templates/mdx';

// -----------------------------------------------------------------------------
// Client
// -----------------------------------------------------------------------------

const client = createPublicClient({
  chain: base,
  transport: http(),
});

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type GolfBase2NFTProps = {
  id?: bigint;
  fallback?: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const GolfBase2NFT: React.FC<GolfBase2NFTProps> = async ({
  id = 2n,
  fallback = '/static/blog/on-chain-worlds-with-terrain-generation/golf-base-2.svg',
}) => {
  const tokenURI: { name: string; image: string } = await client
    .readContract({
      // Curta Golf v0.0.2 contract on Base.
      address: '0x8cCd70b1B74eA505dbA39d2D11C3aB6a2CB14A8c',
      abi: [
        {
          inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
          name: 'tokenURI',
          outputs: [{ internalType: 'string', name: '', type: 'string' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      functionName: 'tokenURI',
      args: [id],
    })
    .then((value) => {
      // `.slice(29)` removes the `data:application/json;base64,` data URI
      // prefix.
      const json = JSON.parse(Buffer.from(value.slice(29), 'base64').toString());

      return { name: json['name'], image: json['image_data'] };
    })
    // Catch the error and return fallback.
    .catch(() => ({ name: `Curta Golf King #${id.toString()}`, image: fallback }));

  return (
    // We use 552px as the responsive breakpoint to transition over when there's
    // 32px (same as the top container's `y`-padding) `x`-padding in addition to
    // article container's 16px `x`-padding: 452 + 2 * (16 + 32) = 552.
    <div className="w-full rounded-none border-gray-6 bg-none py-0 min-[552px]:rounded-xl min-[552px]:border min-[552px]:bg-gray-2 min-[552px]:py-8">
      <div className="-mx-4 flex flex-col overflow-hidden border-y border-gray-6 bg-gray-2 min-[552px]:mx-auto min-[552px]:max-w-fit min-[552px]:rounded-lg min-[552px]:border-x">
        <Image
          className="mx-auto my-0 w-full min-[552px]:w-[456px]"
          src={tokenURI.image}
          alt={`${tokenURI.name} NFT on Base.`}
          width={456}
          height={456}
        />
        <div className="flex w-full gap-1.5 border-t border-gray-6 bg-gray-3 px-4 py-1.5 text-sm leading-5 min-[552px]:px-3">
          <span className="pt-0.5 text-gray-11">
            <LogoIcon.Base className="size-4" />
          </span>
          <A href={`https://curta.wtf/golf/${id.toString()}`}>{tokenURI.name}</A>
        </div>
      </div>
    </div>
  );
};
