'use server';

import Image from 'next/image';
import React, { Fragment } from 'react';

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

type TerrainTileProps = JSX.IntrinsicElements['svg'] & {
  terrain:
    | 'Boreal Forest'
    | 'Desert'
    | 'Grassland'
    | 'Hills'
    | 'Marsh'
    | 'Plains'
    | 'Rain Forest'
    | 'Snow'
    | 'Temperate Forest'
    | 'Tundra'
    | 'Wetland';
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

export const TerrainTileMappingGraphic: React.FC = () => {
  return (
    <div className="flex gap-1">
      <TerrainTile terrain="Boreal Forest" />
      <TerrainTile terrain="Desert" />
      <TerrainTile terrain="Grassland" />
      <TerrainTile terrain="Hills" />
      <TerrainTile terrain="Marsh" />
      <TerrainTile terrain="Plains" />
      <TerrainTile terrain="Rain Forest" />
      <TerrainTile terrain="Snow" />
      <TerrainTile terrain="Temperate Forest" />
      <TerrainTile terrain="Tundra" />
      <TerrainTile terrain="Wetland" />
    </div>
  );
};

export const TerrainTile: React.FC<TerrainTileProps> = ({ className, terrain, ...rest }) => {
  const tilePixelSvg =
    terrain === 'Boreal Forest' ? (
      <Fragment>
        <use href="#z" fill="#307e36" />
        <use href="#y" fill="#215826" />
        <path d="M1 6h9v3H1zm4 3h1v1H5z" fill="#215826" />
        <path
          d="M4 1h3v1H4zM2 2h1v1H2zm6 0h1v1H8zM0 3h1v4H0zm3 0h1v2H3zm3 0h1v3H6zm4 0h1v4h-1zM9 4h1v1H9zM4 5h1v1H4zm4 0h1v1H8zM3 6h3v1H3zm4 0h1v1H7zM1 7h2v1H1zm6 0h1v1H7zm2 0h1v1H9zM1 8h1v1H1zm2 0h7v1H3zM2 9h1v1H2zm2 0h1v1H4zm2 0h1v1H6zm3 0h1v1H9zm-4 1h1v1H5z"
          fill="#296d2f"
        />
        <path
          d="M4 2h2v1H4zm0 1h1v1H4zm4 0h1v1H8zM2 4h1v1H2zm7 1h1v1H9zM4 6h1v2H4zm2 1h1v1H6zM5 8h1v1H5zm3 0h1v1H8z"
          fill="#338839"
        />
      </Fragment>
    ) : terrain === 'Desert' ? (
      <Fragment>
        <use href="#z" fill="#e0cd61" />
        <path
          d="M4 1h1v1H4zm2 0h1v1H6zm2 1h1v1H8zM3 3h1v1H3zm3 0h1v1H6zM1 4h1v2H1zm7 0h2v1H8zM4 5h1v1H4zm4 1h1v1H8zM5 7h1v1H5z"
          fill="#e3d271"
        />
        <use href="#y" fill="#c2b727" />
      </Fragment>
    ) : terrain === 'Grassland' ? (
      <Fragment>
        <use href="#z" fill="#76c230" />
        <path
          d="M5 1h1v1H5zM2 2h1v2H2zm5 0h1v1H7zM6 3h1v1H6zM5 4h1v1H5zm3 0h2v1H8zM1 5h1v1H1zm3 0h1v1H4zm3 0h1v1H7zM5 7h2v1H5z"
          fill="#7ccd32"
        />
        <path
          d="M3 2h1v1H3zm5 0h1v1H8zM1 3h1v2H1zm2 2h1v1H3zm3 0h1v1H6zm3 0h1v1H9zM2 6h2v1H2zm3 0h1v1H5zm3 0h1v1H8z"
          fill="#71ba2e"
        />
        <use href="#y" fill="#46741d" />
      </Fragment>
    ) : terrain === 'Hills' ? (
      <Fragment>
        <use href="#z" fill="#96ba46" />
        <use href="#y" fill="#586f2a" />
        <path d="M8 2h1v1H8zM7 3h1v1H7zM3 4h1v1H3z" fill="#8fb243" />
        <path d="M1 6h9v3H1z" fill="#8fb243" />
        <path d="M5 1h1v1H5zm2 1h1v1H7zM6 3h1v1H6zm2 1h1v1H8zM2 6h1v1H2z" fill="#9dc44a" />
        <path
          d="M3 2h1v1H3zm3 0h1v1H6zM1 3h1v1H1zm3 1h1v1H4zm5 0h1v1H9zM1 5h3v1H1zm5 0h2v1H6zM1 6h1v1H1zm3 1h2v1H4zm4 0h1v1H8zM2 8h1v1H2zm4 0h1v1H6z"
          fill="#86a940"
        />
        <path
          d="M3 3h2v1H3zm3 1h1v1H6zM4 6h2v1H4zm4 0h1v1H8zM2 7h2v1H2zm5 0h1v1H7z"
          fill="#79993a"
        />
        <path d="M5 4h1v1H5zm1 3h1v1H6z" fill="#7e9e3c" />
        <path d="M2 3h1v1H2zm6 0h1v1H8zM1 4h1v1H1zm6 0h1v1H7zm2 1h1v1H9z" fill="#739137" />
        <path
          d="M0 7h1v1H0zm10 0h1v1h-1zM1 8h1v1H1zm8 0h1v1H9zM2 9h2v1H2zm5 0h2v1H7z"
          fill="#678231"
        />
        <path d="M5 8h1v1H5zM4 9h1v1H4zm2 0h1v1H6z" fill="#4e6325" />
      </Fragment>
    ) : terrain === 'Marsh' ? (
      <Fragment>
        <use href="#z" fill="#41b344" />
        <path d="M5 2h1v1H5zM3 3h2v2H3zm3 2h1v1H6z" fill="#2d9a33" />
        <path
          d="M3 2h1v1H3zM2 3h1v1H2zm2 0h1v1H4zm3 0h1v1H7zM6 4h1v1H6zm2 0h1v1H8zM4 5h1v1H4zM3 6h1v1H3zm2 0h1v1H5z"
          fill="#2e843c"
        />
        <path d="M6 1h1v2H6zm2 1h1v1H8zM5 4h1v1H5zm2 1h1v1H7z" fill="#36a642" />
        <path
          d="M2 2h1v1H2zm4 1h1v1H6zM1 5h1v1H1zm4 0h1v1H5zm4 0h1v1H9zM5 7h1v1H5z"
          fill="#3aac3c"
        />
        <path d="M1 3h1v1H1zm1 2h2v1H2z" fill="#309e39" />
        <path d="M5 3h1v1H5zM1 4h1v1H1z" fill="#43ae4d" />
        <path d="M8 5h1v1H8z" fill="#38bd40" />
        <path d="M9 4h1v1H9z" fill="#54bf5b" />
        <use href="#y" fill="#277239" />
      </Fragment>
    ) : terrain === 'Plains' ? (
      <Fragment>
        <use href="#z" fill="#f2d020" />
        <path
          d="M5 1h2v1H5zM1 3h1v1H1zm2 0h3v1H3zm4 0h3v1H7zM1 5h2v1H1zm3 0h3v1H4zm4 0h2v2H8zM4 7h2v1H4z"
          fill="#efd658"
        />
        <use href="#y" fill="#d2b307" />
      </Fragment>
    ) : terrain === 'Rain Forest' ? (
      <Fragment>
        <use href="#z" fill="#1f8a23" />
        <use href="#y" fill="#5f4a25" />
        <path d="M4 1h1v1H4zm2 0h1v1H6zM0 3h1v2H0zm10 0h1v2h-1z" fill="#6a5329" />
        <path d="M5 1h1v1H5zM1 3h1v1H1zm8 0h1v1H9z" fill="#7f6432" />
        <path d="M2 2h1v1H2zm4 0h3v1H6zM1 4h1v1H1z" fill="#115c13" />
        <path d="M3 2h1v1H3zm4 0h1v1H7z" fill="#5f4a25" />
        <path d="M4 2h1v1H4zM2 3h1v1H2zm6 0h1v1H8zm1 1h1v1H9z" fill="#15771b" />
        <path d="M6 6h1v1H6zM1 7h7v3H1z" fill="#28af49" />
        <path
          d="M3 4h1v1H3zm3 0h1v2H6zM2 5h3v1H2zm6 0h2v4H8zM1 6h5v1H1zm0 2h1v1H1zm4 0h1v1H5zM3 9h1v1H3z"
          fill="#239e42"
        />
        <path d="M5 3h3v1H5zm2 1h1v1H7zm2 1h1v1H9z" fill="#167d1b" />
        <path d="M3 6h1v1H3zm1 1h1v1H4zm5 0h1v1H9z" fill="#1ca021" />
        <path d="M3 5h1v1H3zm4 1h1v1H7zM2 7h1v2H2zm4 0h1v1H6zm2 0h1v1H8z" fill="#29bc4f" />
        <path
          d="M0 7h1v2H0zm10 0h1v1h-1zM9 8h1v1H9zM1 9h1v1H1zm3 0h1v1H4zm4 0h1v1H8zm-6 1h2v1H2zm3 0h3v1H5z"
          fill="#16771b"
        />
        <path d="M0 5h1v2H0zm10 0h1v2h-1z" fill="#1f8a23" />
      </Fragment>
    ) : terrain === 'Snow' ? (
      <Fragment>
        <use href="#z" fill="#fff" />
        <path d="M4 2h2v1H4zM1 3h1v1H1zm6 1h2v1H7zM3 5h2v1H3zm3 2h1v1H6z" fill="#f3f3f3" />
        <use href="#y" fill="#e4e4e4" />
      </Fragment>
    ) : terrain === 'Temperate Forest' ? (
      <Fragment>
        <use href="#z" fill="#5a9e30" />
        <path d="M5 1h1v1H5zM4 2h1v1H4zm2 0h1v1H6zM1 3h2v1H1zm7 0h2v1H8z" fill="#7f6432" />
        <path d="M3 2h1v1H3zm4 0h1v1H7z" fill="#604a25" />
        <use href="#y" fill="#604a25" />
        <path
          d="M4 1h1v1H4zm2 0h1v1H6zM2 2h1v1H2zm6 0h1v1H8zM0 3h1v2H0zm10 0h1v2h-1z"
          fill="#6a5329"
        />
        <path
          d="M5 2h1v1H5zM3 3h1v1H3zm4 0h1v1H7zM1 4h1v1H1zm7 0h2v1H8zM0 5h1v2H0zm10 0h1v1h-1z"
          fill="#4f8929"
        />
        <path d="M2 4h1v1H2zm7 1h1v1H9zM1 6h9v3H1z" fill="#60a934" />
        <path d="M5 5h1v1H5zM3 6h1v1H3zm4 0h1v1H7z" fill="#4f8929" />
        <path d="M3 7h1v1H3zm4 0h2v2H7zM1 8h2v1H1zm3 0h1v1H4zm1 1h2v1H5z" fill="#6dbe3a" />
        <path d="M1 6h2v1H1zm3 0h1v1H4zm5 0h1v1H9zM5 7h1v1H5zm3 0h1v1H8z" fill="#5a9e30" />
        <path
          d="M10 6h1v2h-1zM0 7h1v2H0zm3 1h1v1H3zm6 0h1v1H9zM1 9h2v1H1zm3 0h1v1H4zm3 0h2v1H7zm-2 1h2v1H5z"
          fill="#497f27"
        />
      </Fragment>
    ) : terrain === 'Tundra' ? (
      <Fragment>
        <use href="#z" fill="#9ea686" />
        <path
          d="M5 1h1v1H5zm0 1h2v1H5zM1 3h2v1H1zm7 0h2v1H8zM4 4h1v1H4zm2 0h2v1H6zM3 5h1v1H3zm6 0h1v1H9zM5 6h1v1H5zm2 0h1v1H7z"
          fill="#7f9870"
        />
        <path
          d="M6 1h1v1H6zM3 2h1v1H3zm4 0h1v1H7zM4 3h1v1H4zM2 4h2v1H2zm3 0h1v1H5zm3 0h1v1H8zM7 5h1v1H7zM2 6h1v1H2zm4 0h1v1H6z"
          fill="#9daf92"
        />
        <path
          d="M2 2h1v1H2zm2 0h1v1H4zm4 0h1v1H8zM3 3h1v1H3zm3 0h1v1H6zM1 5h2v1H1zm4 0h1v1H5zm3 0h1v1H8zM4 7h1v1H4zm2 0h1v1H6z"
          fill="#868f69"
        />
        <use href="#y" fill="#657b59" />
      </Fragment>
    ) : terrain === 'Wetland' ? (
      <Fragment>
        <use href="#z" fill="#1d8dff" />
        <path
          d="M4 1h1v1H4zm4 1h1v1H8zM1 3h1v1H1zm2 0h1v1H3zm3 0h1v1H6zm3 0h1v1H9zM4 4h1v1H4zM2 5h1v1H2zm4 0h1v2H6zm2 0h1v1H8z"
          fill="#1d8dc1"
        />
        <path d="M5 1h1v1H5zm2 1h1v1H7zM5 4h1v1H5zm2 1h1v1H7z" fill="#1b8365" />
        <path d="M6 2h1v1H6zM3 4h1v1H3zm4 0h2v1H7zM5 6h1v1H5z" fill="#49a4ff" />
        <path d="M3 2h1v1H3z" fill="#1b88ab" />
        <path d="M5 2h1v1H5zM2 4h1v1H2z" fill="#2b9189" />
        <path d="M2 3h1v1H2zm7 1h1v1H9z" fill="#1c8871" />
        <path d="M7 3h1v1H7zM5 7h1v1H5z" fill="#1d8d7c" />
        <path d="M1 5h1v1H1z" fill="#1b8499" />
        <path d="M5 5h1v1H5z" fill="#389259" />
        <path d="M3 6h1v1H3z" fill="#1b847c" />
        <path d="M4 6h1v1H4z" fill="#399dc1" />
        <path d="M7 6h1v1H7z" fill="#1c8889" />
        <use href="#y" fill="#06c" />
      </Fragment>
    ) : (
      <Fragment>
        <use href="#z" fill="#e0cd61" />
        <path
          d="M4 1h1v1H4zm2 0h1v1H6zm2 1h1v1H8zM3 3h1v1H3zm3 0h1v1H6zM1 4h1v2H1zm7 0h2v1H8zM4 5h1v1H4zm4 1h1v1H8zM5 7h1v1H5z"
          fill="#e3d271"
        />
        <use href="#y" fill="#c2b727" />
      </Fragment>
    );

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
      {...rest}
    >
      <title>{terrain}</title>
      <desc>{terrain} pixel art tile.</desc>
      <g visibility="hidden">
        <g id="z">
          <path d="M0 2h11v5H0z" />
          <path d="M4 0h3v9H4z" />
          <path d="M2 1h7v1H2zm0 6h7v1H2z" />
        </g>
        <g id="y">
          <path d="M4 0h3v1H4zm0 8h3v1H4zM2 1h2v1H2zm5 0h2v1H7zM0 2h2v1H0zm9 0h2v1H9zM2 7h2v1H2zm5 0h2v1H7zM0 6h2v1H0zm9 0h2v1H9zM0 3h1v3H0zm10 0h1v3h-1z" />
        </g>
      </g>
      <g transform="rotate(180 12 12) translate(1 1) scale(2)">{tilePixelSvg}</g>
    </svg>
  );
};
