'use client';

import blockie from 'ethereum-blockies-base64';
import { ChevronFirst, Play } from 'lucide-react';

import { ButtonGroup, IconButton, Table, Tooltip } from '@/components/ui';

const OnChainMusicFeatureDetail: React.FC = () => {
  return (
    <div className="hide-scrollbar relative flex h-[8.875rem] flex-col bg-gray-3">
      {/* Songs */}
      <Table.Root className="hide-scrollbar relative grow overflow-y-scroll border-y-0 [&_[table-cell]]:px-1 [&_[table-cell]]:first:pl-1.5 [&_[table-cell]]:last:pr-1.5">
        <Table.Header>
          <Table.Row className="border-gray-6 last:border-b [&_[table-head]]:sticky [&_[table-head]]:top-0 [&_[table-head]]:h-6 [&_[table-head]]:bg-gray-3 [&_[table-head]]:px-1 [&_[table-head]]:font-normal [&_[table-head]]:first:pl-1.5 [&_[table-head]]:last:pr-1.5">
            <Table.Head>Song</Table.Head>
            <Table.Head>Time</Table.Head>
            <Table.Head>Chain</Table.Head>
            <Table.Head className="text-right">Composition</Table.Head>
          </Table.Row>
          {/* <Table.Row>
            <Table.Head className="sticky top-[23px] h-[2px] bg-gray-6" colSpan={4} />
          </Table.Row> */}
        </Table.Header>
        <Table.Body>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Table.Row
              key={i}
              id={`on-chain-music-feature-song-${i}`}
              className="focus:outline-none focus-visible:-outline-offset-2 focus-visible:outline-blue-9 [&_[table-cell]]:group-[.table--body]:py-0"
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
              <Table.Cell className="h-6">
                <div className="flex items-center gap-1.5">
                  <div className="size-4 min-w-4 overflow-hidden rounded-sm border border-gray-6">
                    <img src={blockie('0x123')} alt="0x123" className="h-full w-full" />
                  </div>
                  <div className="text-xs leading-4 text-gray-12">rocky</div>
                </div>
              </Table.Cell>
              <Table.Cell className="h-6 font-mono text-xs">
                0<span className="text-gray-11">:</span>28
              </Table.Cell>
              <Table.Cell className="h-6 font-mono text-xs">8453</Table.Cell>
              <Table.Cell className="h-6 text-right text-xs">
                <button className="text-xs text-gray-11 underline decoration-dotted transition-colors hover:text-gray-12 focus:rounded-sm">
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
