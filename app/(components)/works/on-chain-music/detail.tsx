'use client';

import Image from 'next/image';
import { useState } from 'react';

import blockie from 'ethereum-blockies-base64';
import { ChevronFirst, Play } from 'lucide-react';

import { ON_CHAIN_SONGS } from '@/lib/constants/on-chain-music';

import { ButtonGroup, IconButton, Table, Tooltip } from '@/components/ui';

const OnChainMusicFeatureDetail: React.FC = () => {
  const [song, setSong] = useState<number>();
  const [scrollIsAtTop, setScrollIsAtTop] = useState<boolean>(true);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollTop = target.scrollTop;

    setScrollIsAtTop(scrollTop === 0);
  };

  return (
    <div className="relative flex h-[8.875rem] flex-col bg-gray-3">
      {/* Songs */}
      <Table.Root
        className="border-y-0"
        containerProps={{
          className: 'hide-scrollbar grow relative overflow-y-scroll',
          onScroll: handleScroll,
        }}
      >
        <Table.Header className="[&_[table-head-separator]]:bg-gray-6 [&_th:first-child]:pl-[1.625rem] [&_th:last-child]:pr-1.5 [&_th]:px-1">
          <Table.Row className="[&_th]:sticky [&_th]:top-0 [&_th]:h-6 [&_th]:font-normal">
            <Table.Head>Song</Table.Head>
            <Table.Head>Time</Table.Head>
            <Table.Head>Chain</Table.Head>
            <Table.Head className="text-right">Composition</Table.Head>
          </Table.Row>
          {!scrollIsAtTop ? (
            <Table.Row role="separator">
              <Table.Head
                className="sticky top-[1.4375rem] h-[2px] animate-in fade-in"
                table-head-separator=""
                colSpan={4}
              />
            </Table.Row>
          ) : null}
        </Table.Header>
        <Table.Body className="text-xs [&_td:first-child]:pl-1.5 [&_td:last-child]:pr-1.5 [&_td]:h-6 [&_td]:px-1 [&_td]:py-0">
          {ON_CHAIN_SONGS.map(({ address, chainId, name, length }, i) => (
            <Table.Row
              key={i}
              id={`on-chain-music-feature-song-${i}`}
              className="group text-gray-12 hover:bg-gray-4 focus:outline-none data-[state=selected]:bg-blue-5 data-[state=selected]:text-blue-12"
              data-state={song === i ? 'selected' : undefined}
              onClick={() => setSong(i)}
              onFocus={() => setSong(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp' && i > 0) {
                  document.getElementById(`on-chain-music-feature-song-${i - 1}`)?.focus();
                }
                if (e.key === 'ArrowDown') {
                  document.getElementById(`on-chain-music-feature-song-${i + 1}`)?.focus();
                }
              }}
              tabIndex={1}
            >
              <Table.Cell>
                <div className="flex items-center gap-1">
                  <Tooltip
                    content="address"
                    side="top"
                    align="start"
                    triggerProps={{ className: 'rounded-sm' }}
                  >
                    <Image
                      className="size-4 min-w-4 rounded-sm border border-gray-7 hover:border-gray-8 group-data-[state=selected]:border-blue-7 group-data-[state=selected]:hover:border-blue-8"
                      src={blockie(address)}
                      alt={`Ethereum blocky identicon for ${address}`}
                      width={16}
                      height={16}
                    />
                  </Tooltip>
                  <div className="leading-4">{name}</div>
                </div>
              </Table.Cell>
              <Table.Cell className="font-mono">
                {Math.floor(Math.round(length) / 60)}
                <span className="text-gray-11 group-data-[state=selected]:text-blue-11">:</span>
                {(Math.round(length) % 60).toString().padStart(2, '0')}
              </Table.Cell>
              <Table.Cell className="font-mono">{chainId}</Table.Cell>
              <Table.Cell className="text-right">
                <button className="text-gray-11 underline decoration-dotted transition-colors hover:text-gray-12 focus:rounded-sm group-data-[state=selected]:text-blue-11 group-data-[state=selected]:hover:text-blue-12">
                  View
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* Player */}
      <div className="flex min-h-8 w-full items-center border-t border-gray-6 px-1.5">
        <ButtonGroup>
          <Tooltip content="Replay" side="top" align="start" triggerProps={{ asChild: true }}>
            <IconButton size="sm">
              <ChevronFirst />
            </IconButton>
          </Tooltip>
          <Tooltip content="Play" side="top" triggerProps={{ asChild: true }}>
            <IconButton size="sm">
              <Play />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default OnChainMusicFeatureDetail;
