'use client';

import { useState } from 'react';

import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { ChevronRight, Shuffle } from 'lucide-react';
import { encodeAbiParameters, hexToBigInt, keccak256 } from 'viem';

import { Button, CodeBlock } from '@/components/ui';

export const HyphenNFT: React.FC<{ defaultSeed: bigint }> = ({ defaultSeed }) => {
  const [seed, setSeed] = useState<bigint>(defaultSeed);

  // ---------------------------------------------------------------------------
  // Constants
  // ---------------------------------------------------------------------------

  const HEADS_LEFT = '|[({';
  const HEADS_RIGHT = '|])}';
  const EYES = '"#$\'*+-.0=OTX^oxz';
  // eslint-disable-next-line quotes
  const HATS = " !#$%&'*+-.=@^~";
  const ARMS_LEFT = '/<~J2';
  const ARMS_RIGHT = '\\>~L7';
  const BODIES_LEFT = '[({';
  const BODIES_RIGHT = '])}';
  const CHESTS = '  :*=.';
  const LEGS_LEFT = '|/|/';
  const LEGS_RIGHT = '||\\\\';
  const BACKGROUNDS = '#*+-/=\\|.';
  const CHAIN_REVERSED = 'NIAHC';
  const COLORS = hexToBigInt('0xa9bfd700ad43ed0000ba7300fe63ff0000c9ff00ff8633000080ff00fe0000');
  const COLOR_CLASSES = 'stuvwxyz';

  // ---------------------------------------------------------------------------
  // Trait selection
  // ---------------------------------------------------------------------------

  const traits = {
    head: 0,
    eye: 0,
    hat: 0,
    arm: 0,
    body: 0,
    chest: 0,
    leg: 0,
    background: 0,
    chaosBg: false,
    intensity: 0,
    inverted: false,
    color: 0,
  };

  // Hash the seed to randomize the results.
  let seedHash = hexToBigInt(keccak256(encodeAbiParameters([{ type: 'uint256' }], [seed])));

  // Select traits.
  traits.head = Number(seedHash & BigInt(3));
  seedHash >>= BigInt(2);
  traits.eye = Number(seedHash % BigInt(17));
  seedHash >>= BigInt(5);
  traits.hat = Number(
    (seedHash & BigInt(3)) === BigInt(0)
      ? BigInt(0)
      : BigInt(1) + ((seedHash >> BigInt(2)) % BigInt(14)),
  );
  seedHash >>= BigInt(6);
  traits.arm = Number(seedHash % BigInt(5));
  seedHash >>= BigInt(3);
  traits.body = Number(seedHash % BigInt(3));
  seedHash >>= BigInt(2);
  traits.chest = Number(
    (seedHash & BigInt(1)) === BigInt(0)
      ? BigInt(0)
      : BigInt(1) + ((seedHash >> BigInt(1)) % BigInt(5)),
  );
  seedHash >>= BigInt(4);
  traits.leg = Number(seedHash & BigInt(3));
  seedHash >>= BigInt(2);
  traits.background = Number(seedHash % BigInt(9));
  seedHash >>= BigInt(4);
  traits.chaosBg = (seedHash & BigInt(3)) === BigInt(0);
  seedHash >>= BigInt(2);
  traits.intensity = Number(
    (seedHash & BigInt(3)) === BigInt(0)
      ? BigInt(50) + ((seedHash >> BigInt(2)) % BigInt(151))
      : BigInt(252),
  );
  seedHash >>= BigInt(10);
  traits.inverted = (seedHash & BigInt(7)) === BigInt(0);
  seedHash >>= BigInt(3);
  traits.color = Number(seedHash & BigInt(7));

  // Hash the seed again.
  seedHash = hexToBigInt(keccak256(encodeAbiParameters([{ type: 'uint256' }], [seedHash])));

  // ---------------------------------------------------------------------------
  // Construct SVG
  // ---------------------------------------------------------------------------

  // Construct glyphs bitmap.
  const bitmap =
    hexToBigInt('0x1FFFFFFFFFFFFFFFFFFFFFFFFF07FFFE4FFFFC9FFFFFFFFFFFFFFFFFFFFFFFFF') ^
    ((BigInt(traits.hat > 0) << BigInt(172)) | (BigInt(traits.chest > 0) << BigInt(126)));

  // Construct background bitmap.
  const bgBitmapBits = new Array(253);
  let bgBitmap = BigInt(0);
  for (let i = 0; i < traits.intensity; ++i) {
    bgBitmapBits[i] = 1;
  }
  if (traits.intensity < 252) {
    // Shuffle `bgBitmapBits` using the seed with the Fisher-Yates algorithm.
    for (let i = 252; i !== 0; --i) {
      const j = Number(seedHash % BigInt(i + 1));
      [bgBitmapBits[i], bgBitmapBits[j]] = [bgBitmapBits[j], bgBitmapBits[i]];
      seedHash >>= BigInt(8);
      // Hash the seed again if we run out of entropy.
      if ((i & 31) === 0) {
        seedHash = hexToBigInt(keccak256(encodeAbiParameters([{ type: 'uint256' }], [seedHash])));
      }
    }
  }
  for (let i = 0; i < 253; ++i) {
    bgBitmap <<= BigInt(1);
    bgBitmap |= BigInt(bgBitmapBits[i] ?? 0);
  }

  // Hash the seed again.
  seedHash = hexToBigInt(keccak256(encodeAbiParameters([{ type: 'uint256' }], [seedHash])));

  // Construct glyph text.
  let bgStr = '';
  let charStr = `  ${traits.hat !== 5 ? HATS[traits.hat] : '&'}${traits.hat !== 0 ? '' : ' '}  \n`;
  for (let i = 252; i !== 0; --i) {
    const col = i % 23;

    if (i === 252) bgStr += 'O';
    else if (i === 251) bgStr += 'N';
    else if (i < 5) bgStr += CHAIN_REVERSED[i];
    else if (((bitmap >> BigInt(i)) & BigInt(1)) === BigInt(0)) {
      bgStr += ' ';

      if (i === 151) {
        charStr +=
          HEADS_LEFT[traits.head] +
          EYES[traits.eye] +
          '-' +
          EYES[traits.eye] +
          HEADS_RIGHT[traits.head] +
          '\n';
      } else if (i === 128) {
        charStr +=
          (traits.arm !== 1 ? ARMS_LEFT[traits.arm] : '<') +
          BODIES_LEFT[traits.body] +
          CHESTS[traits.chest] +
          BODIES_RIGHT[traits.body] +
          (traits.arm !== 1 ? ARMS_RIGHT[traits.arm] : '>') +
          '\n';
      } else if (i === 105) {
        charStr += `_${LEGS_LEFT[traits.leg]} ${LEGS_RIGHT[traits.leg]}_`;
      }
    } else if (((bgBitmap >> BigInt(i)) & BigInt(1)) !== BigInt(0)) {
      bgStr += BACKGROUNDS[traits.chaosBg ? Number(seedHash % BigInt(9)) : traits.background];
      seedHash = hexToBigInt(keccak256(encodeAbiParameters([{ type: 'uint256' }], [seedHash])));
    } else {
      bgStr += ' ';
    }

    if (col === 0) bgStr += '\n';
  }
  const colorHexString = `#${((COLORS >> (BigInt(traits.color) << BigInt(5))) & hexToBigInt('0xFFFFFF')).toString(16).padStart(6, '0')}`;

  return (
    <div className="-mx-4 flex flex-col md:mx-0">
      <div className="flex flex-col items-center justify-center gap-2 border-t border-gray-6 bg-gray-2 py-8 md:rounded-t-xl md:border-x">
        <div className="flex flex-col items-center gap-1">
          <div className="overflow-hidden rounded-lg border border-gray-6">
            <svg
              width="256"
              height="256"
              viewBox="0 0 600 600"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
            >
              <title>Adopt-a-Hyphen mock</title>
              <desc>A mock Adopt-a-Hyphen NFT with the seed {seed.toString()}.</desc>
              <style>
                {`@font-face {
                    font-family: adopt-a-hyphen--A;
                    src: url(data:font/woff2;utf-8;base64,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)
                  }
                  .adopt-a-hyphen--pre {
                    font-family: adopt-a-hyphen--A;
                    font-size: 32px;
                    text-align: center;
                    margin: 0;
                    letter-spacing: 0.945px;
                    line-height:51px;
                  }
                  @supports (color: color(display-p3 1 1 1)) {
                    .adopt-a-hyphen--z { color: oklch(79.59% 0.042 250.64) !important }
                    .adopt-a-hyphen--y { color: oklch(60.59% 0.306 309.33) !important }
                    .adopt-a-hyphen--x { color: oklch(69.45% 0.219 157.46) !important }
                    .adopt-a-hyphen--w { color: oklch(75.22% 0.277 327.48) !important }
                    .adopt-a-hyphen--v { color: oklch(77.86% 0.16 226.017) !important }
                    .adopt-a-hyphen--u { color: oklch(74.3% 0.213 50.613) !important }
                    .adopt-a-hyphen--t { color: oklch(61.52% 0.224 256.099) !important }
                    .adopt-a-hyphen--s { color: oklch(62.61% 0.282 29.234) !important }
                  }`}
              </style>
              <path
                className={
                  traits.inverted ? `adopt-a-hyphen--${COLOR_CLASSES[traits.color]}` : undefined
                }
                d="M0 0h600v600H0z"
                fill={traits.inverted ? colorHexString : '#FFF'}
              />
              <foreignObject x="32" y="20" width="536" height="561">
                <pre
                  className="adopt-a-hyphen--pre not-prose"
                  style={{ color: 'rgba(0,0,0,0.05)' }}
                >
                  {bgStr}N
                </pre>
              </foreignObject>
              <foreignObject x="32" y="173" width="536" height="204">
                <pre
                  className={clsx(
                    'not-prose adopt-a-hyphen--pre',
                    traits.inverted ? '' : `adopt-a-hyphen--${COLOR_CLASSES[traits.color]}`,
                  )}
                  style={{ color: traits.inverted ? '#FFF' : colorHexString }}
                >
                  {charStr}
                </pre>
              </foreignObject>
            </svg>
          </div>
          <div
            key={seed.toString()}
            className=" animate-bg-pulse font-mono text-xs font-normal text-gray-11"
          >
            {seed.toString(16)}
          </div>
        </div>
        <Button
          rightIcon={<Shuffle />}
          onClick={() => setSeed(BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)))}
        >
          Randomize
        </Button>
      </div>
      <Accordion.Root className="-mt-px" type="single" defaultValue="0" collapsible>
        <Accordion.Item className="not-prose border-b-0" value="0">
          <Accordion.Trigger className="not-prose group z-10 flex h-10 w-full items-center space-x-2 border-x-0 border-y border-gray-6 bg-gray-3 px-4 text-sm font-medium text-gray-11 transition-colors hover:border-gray-7 hover:bg-gray-4 hover:text-gray-12 focus:outline-none focus-visible:rounded-none focus-visible:outline focus-visible:-outline-offset-[2px] focus-visible:outline-blue-9 focus-visible:ring-0 active:bg-gray-5 data-[state='open']:text-gray-12 md:border-x md:data-[state='closed']:rounded-b-xl">
            <span className="flex size-4 items-center justify-center">
              <ChevronRight className="transition-transform group-data-[state='open']:rotate-90" />
            </span>
            <span>Traits</span>
          </Accordion.Trigger>
          <Accordion.Content
            className={clsx(
              'not-prose overflow-hidden rounded-b-none border-x-0 border-b border-t-0 border-gray-6 bg-gray-3 p-0 md:rounded-b-xl md:border-x',
              // We need the following classes to override the default styles
              // from our `<Article />` MDX component.
              // Container
              '[&_[code-block-container]]:mx-0 [&_[code-block-container]]:rounded-none [&_[code-block-container]]:border-0',
              'md:[&_[code-block-container]]:mx-0 md:[&_[code-block-container]]:rounded-none md:[&_[code-block-container]]:border-x-0',
              // Pre
              '[&_[code-block-pre]]:rounded-none',
              'md:[&_[code-block-pre]]:rounded-b-[0.6875rem] md:[&_[code-block-pre]]:rounded-t-none',
            )}
          >
            <CodeBlock language="tsx" showLineNumbers={false}>
              {JSON.stringify(traits, null, 2)}
            </CodeBlock>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};
