'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { ON_CHAIN_SONGS } from '@/lib/constants/on-chain-music';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { formatValueToPrecision } from '@/lib/utils';

import { Badge, CodeBlock, Drawer, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type OnChainMusicFeatureDetailModalProps = {
  data: (typeof ON_CHAIN_SONGS)[number];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const OnChainMusicFeatureDetailModal: React.FC<OnChainMusicFeatureDetailModalProps> = ({
  data,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // `md` breakpoint.

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <button className="text-gray-11 underline decoration-dotted transition-colors hover:text-gray-12 focus:rounded-sm group-data-[state=selected]:text-blue-11 group-data-[state=selected]:hover:text-blue-12">
          View
        </button>
      </Drawer.Trigger>
      {/* Prevent the tooltip from getting focused upon drawer open/close. */}
      <Drawer.Content
        className="[&_[drawer-content]]:flex [&_[drawer-content]]:flex-col"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <Drawer.Title>{data.name}</Drawer.Title>
        <Drawer.Description>
          The deployed contract to{' '}
          <Tooltip
            content={
              <span>
                The audio can be generated from the contract and played back as a WAV file with 0
                dependencies (e.g. no JavaScript or browser necessary). See{' '}
                <a
                  className="font-medium text-blue-9 hover:underline"
                  href="https://github.com/fiveoutofnine/555/blob/c9d9af91c2cc4494e35addec2dfe11c5d3ae1e3b/script/GenerateAudioOutput.s.sol"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this script
                </a>
                .
              </span>
            }
            side="bottom"
            inverted
            inPortal
            triggerProps={{
              className:
                'text-gray-11 rounded-sm underline decoration-dotted transition-colors hover:text-gray-12 data-[state="instant-open"]:text-gray-12 data-[state="delayed-open"]:text-gray-12',
            }}
          >
            read the audio file from
          </Tooltip>
          .
        </Drawer.Description>
        <OnChainMusicFeatureDetailModalCodeBlock data={data} isSmallScreen={isSmallScreen} />
        <Drawer.Footer className="flex flex-wrap items-center gap-1 sm:justify-start">
          <Badge variant="outline" intent="none" title={`${data.metadata.sampleRate} Hz`}>
            {Math.round(data.metadata.sampleRate / 1000)} kHz
          </Badge>
          <Badge variant="outline" intent="none" title={`${data.metadata.samples} samples`}>
            {formatValueToPrecision(data.metadata.samples, 3, false)} samples
          </Badge>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
};

const OnChainMusicFeatureDetailModalCodeBlock: React.FC<{
  data: (typeof ON_CHAIN_SONGS)[number];
  isSmallScreen: boolean;
}> = ({ data, isSmallScreen }) => {
  return (
    <CodeBlock
      className={clsx(
        'h-fit grow overflow-y-scroll border-b-0',
        isSmallScreen
          ? '-mx-4 sm:-mx-4 [&_[code-block-header]]:pl-4'
          : 'sm:-mx-5 [&_[code-block-header]]:pl-5 [&_[code-block-line]]:px-5',
      )}
      language="sol"
      fileName={data.name}
      containerized={false}
    >
      {data.composition}
    </CodeBlock>
  );
};

export default OnChainMusicFeatureDetailModal;
