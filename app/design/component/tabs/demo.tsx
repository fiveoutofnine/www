'use client';

import { Check, CircleDot, Code, GitMerge, GitPullRequestArrow } from 'lucide-react';

import { A, Code as MDXCode } from '@/components/templates/mdx';
import { CodeBlock, Tabs } from '@/components/ui';

export const TabsHorizontalDemo: React.FC<{ disabled?: boolean }> = ({ disabled = false }) => {
  return (
    <Tabs.Root
      className="rounded-lg border border-gray-6"
      orientation="horizontal"
      defaultValue="1"
    >
      <Tabs.List className="px-2">
        <Tabs.Trigger value="1" disabled={disabled}>
          Tab 1
        </Tabs.Trigger>
        <Tabs.Trigger value="2" disabled={disabled}>
          Tab 2
        </Tabs.Trigger>
        <Tabs.Trigger value="3" disabled={disabled}>
          Tab 3
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="1">Content 1</Tabs.Content>
      <Tabs.Content value="2">Content 2</Tabs.Content>
      <Tabs.Content value="3">Content 3</Tabs.Content>
    </Tabs.Root>
  );
};

export const TabsVerticalDemo: React.FC<{ disabled?: boolean }> = ({ disabled = false }) => {
  return (
    <Tabs.Root
      className="flex rounded-lg border border-gray-6 [&>[role='tabpanel']]:w-32"
      orientation="vertical"
      defaultValue="1"
    >
      <Tabs.List>
        <Tabs.Trigger value="1" disabled={disabled}>
          Tab 1
        </Tabs.Trigger>
        <Tabs.Trigger value="2" disabled={disabled}>
          Tab 2
        </Tabs.Trigger>
        <Tabs.Trigger value="3" disabled={disabled}>
          Tab 3
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="1">Content 1</Tabs.Content>
      <Tabs.Content value="2">Content 2</Tabs.Content>
      <Tabs.Content value="3">Content 3</Tabs.Content>
    </Tabs.Root>
  );
};

export const TabsIconStatDemo: React.FC = () => {
  return (
    <Tabs.Root
      className="max-w-lg grow overflow-hidden rounded-lg border border-gray-6 [&>[role='tabpanel']]:h-80"
      orientation="horizontal"
      defaultValue="1"
    >
      <Tabs.List className="px-2">
        <Tabs.Trigger value="1" icon={<Code />}>
          Code
        </Tabs.Trigger>
        <Tabs.Trigger value="2" icon={<CircleDot />}>
          Issues
        </Tabs.Trigger>
        <Tabs.Trigger value="3" icon={<GitPullRequestArrow />} stat={1}>
          Pull requests
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className="p-0" value="1">
        <CodeBlock
          className="max-h-full overflow-y-scroll border-0"
          language="sol"
          fileName="GenerateAudioOutput.s.sol"
          containerized={false}
        >
          {FIVEFIVEFIVE_SCRIPT}
        </CodeBlock>
      </Tabs.Content>
      <Tabs.Content value="2" asChild>
        <div className="flex items-center justify-center">
          <div className="flex max-w-80 grow flex-col items-center rounded-xl border border-gray-6 py-8">
            <div className="flex size-10 items-center justify-center rounded-full border border-gray-6 bg-gray-3 text-gray-11">
              <span className="flex size-5 items-center justify-center">
                <Check />
              </span>
            </div>
            <div className="mb-0.5 mt-2 text-center text-lg font-medium leading-6 text-gray-12">
              No issues
            </div>
            <div className="text-balance text-center text-sm leading-normal text-gray-11">
              It generates{' '}
              <A href="https://github.com/fiveoutofnine/555/tree/main/assets/rocky.wav">
                <MDXCode>rocky.wav</MDXCode>
              </A>{' '}
              correctly.
            </div>
          </div>
        </div>
      </Tabs.Content>
      <Tabs.Content className="p-0" value="3" asChild>
        <div className="flex flex-col p-0">
          <div className="flex h-fit w-full gap-2.5 border-b border-gray-6 bg-gray-3 px-5 py-3">
            <div className="mt-0.5 flex size-4 items-center justify-center text-[#ab7df8]">
              <GitMerge />
            </div>
            <div>
              <a
                className="text-base font-medium leading-5 text-gray-12 no-underline transition-colors hover:text-blue-9"
                href="https://github.com/fiveoutofnine/555/pull/1"
                target="_blank"
                rel="noopener noreferrer"
              >
                v0
              </a>
              <div className="mt-0.5 line-clamp-1 text-sm leading-4 text-gray-11">
                #1 by{' '}
                <A href="https://github.com/fiveoutofnine/555/issues?q=is%3Apr+author%3Afiveoutofnine">
                  fiveoutofnine
                </A>{' '}
                was merged on{' '}
                <time dateTime="2024-03-19T15:29:07Z" title="2024-03-19T15:29:07Z">
                  Mar 20
                </time>
              </div>
            </div>
          </div>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export const TabsLinkDemo: React.FC = () => {
  return (
    <Tabs.Root
      className="rounded-lg border border-gray-6"
      orientation="horizontal"
      defaultValue="1"
    >
      <Tabs.List className="px-2">
        <Tabs.Trigger className="no-underline" value="1" href="#link">
          Tab 1
        </Tabs.Trigger>
        <Tabs.Trigger className="no-underline" value="2" href="#link" newTab>
          Tab 2 (new tab)
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="1">Content 1</Tabs.Content>
      <Tabs.Content value="2">Content 2</Tabs.Content>
    </Tabs.Root>
  );
};

const FIVEFIVEFIVE_SCRIPT = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/Test.sol";
import {Base64} from "solady/utils/Base64.sol";
import {DynamicBufferLib} from "solady/utils/DynamicBufferLib.sol";
import {LibString} from "solady/utils/LibString.sol";
import {FixedPointMathLib as Math} from "solady/utils/FixedPointMathLib.sol";

import {FiveFiveFiveAudio} from "src/utils/FiveFiveFiveAudio.sol";

/// @notice A script to create and write the WAV audio file of the arrangement
/// of “Gonna Fly Now” by Bill Conti completely with smart contracts.
/// @dev You must run this script with a high \`--memory-limit\` option (e.g.
/// \`50_000_000_000\` works) and \`--via-ir\`.
contract GenerateAudioOutputScript is Script {
    using DynamicBufferLib for DynamicBufferLib.DynamicBuffer;
    using LibString for uint256;
    using Math for int256;
    using Math for uint256;

    // -------------------------------------------------------------------------
    // Constants
    // -------------------------------------------------------------------------

    /// @notice The total number of ticks for 1 cycle of the audio.
    /// @dev Note that the length of the WAV file is written into the header
    /// returned by {FiveFiveFiveAudio.getAudioWavFileHeader} to take in a
    /// maximum of \`776*2**10\` samples. To change this, update the header
    /// returned accordingly.
    uint256 internal constant TICKS_PER_CYCLE = 776 << 10;

    // -------------------------------------------------------------------------
    // Script \`run()\`
    // -------------------------------------------------------------------------

    /// @notice Calls the {FiveFiveFiveAudio} library to generate the audio data
    /// and writes the WAV file to \`./output/wav/rocky.wav\`.
    function run() public {
        DynamicBufferLib.DynamicBuffer memory buffer;

        // First, write the WAV file header.
        buffer.p(FiveFiveFiveAudio.getAudioWavFileHeader());

        // Next, we form the audio data by calling \`getSoundValueAtSample\` for
        // each sample in the range \`[0, 776*2**10)\` and write each result to
        // \`data\`.
        bytes memory data = new bytes(TICKS_PER_CYCLE);
        for (uint256 tick; tick < TICKS_PER_CYCLE; ) {
            data[tick] = bytes1(FiveFiveFiveAudio.getSoundValueAtSample(tick));

            unchecked {
                ++tick;
            }
        }

        buffer.p(data);
        vm.writeFile("./output/wav/rocky.wav", string(buffer.data));
    }
}`;
