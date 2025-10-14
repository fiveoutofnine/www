'use client';

import { Fragment, useState } from 'react';

import { FileQuestion, ListMusic } from 'lucide-react';

import { BYTEBEAT_SONGS, FIVEOUTOFNINE_BYTEBEAT_SONGS } from '@/lib/constants/bytebeat';
import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { formatValueToPrecision } from '@/lib/utils';

import { Code } from '@/components/templates/mdx';
import { Badge, Command, Drawer, IconButton, Popover, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type BytebeatFeatureComboboxProps = {
  value: (typeof BYTEBEAT_SONGS)[0] | null;
  onSelect?: (song: (typeof BYTEBEAT_SONGS)[0]) => void;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const BytebeatFeatureCombobox: React.FC<BytebeatFeatureComboboxProps> = ({ value, onSelect }) => {
  const [open, setOpen] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // `md` breakpoint.

  if (!isSmallScreen) {
    return (
      <Popover.Root open={open && !isSmallScreen} onOpenChange={setOpen}>
        <Tooltip content="Browse music" side="bottom" triggerProps={{ asChild: true }}>
          <Popover.Trigger asChild>
            <IconButton size="sm">
              <ListMusic />
            </IconButton>
          </Popover.Trigger>
        </Tooltip>
        <Popover.Content
          className="w-[16rem] rounded-lg p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <BytebeatFeatureComboboxInternal value={value} onSelect={onSelect} />
        </Popover.Content>
      </Popover.Root>
    );
  }

  return (
    <Drawer.Root open={open && isSmallScreen} onOpenChange={setOpen}>
      <Tooltip content="Browse music" side="bottom" triggerProps={{ asChild: true }}>
        <Drawer.Trigger asChild>
          <IconButton size="sm" aria-label="Browse music">
            <ListMusic />
          </IconButton>
        </Drawer.Trigger>
      </Tooltip>
      <Drawer.Content
        className="[&_[drawer-content]]:p-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <BytebeatFeatureComboboxInternal value={value} onSelect={onSelect} />
      </Drawer.Content>
    </Drawer.Root>
  );
};

const BytebeatFeatureComboboxInternal: React.FC<BytebeatFeatureComboboxProps> = ({
  value,
  onSelect,
}) => {
  return (
    <Command.Root noBorder>
      <Command.Input placeholder="Search songs…" />
      <Command.List className="max-h-[70vh] overflow-y-scroll md:h-64" tabIndex={-1}>
        <Command.Empty className="flex flex-col items-center">
          <div className="flex size-8 items-center justify-center rounded-full border border-gray-6 bg-gray-3 text-gray-11">
            <FileQuestion className="size-4" />
          </div>
          <div className="mt-1.5 text-center text-sm font-medium leading-5 text-gray-12">
            No songs found
          </div>
          <div className="text-center text-xs font-normal leading-4 text-gray-11">
            Browse more{' '}
            <a
              className="font-medium text-blue-9 hover:underline focus:rounded-sm"
              href="https://dollchan.net/bytebeat/"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </div>
        </Command.Empty>
        <Command.Group heading="⁵⁄₉'s code">
          {FIVEOUTOFNINE_BYTEBEAT_SONGS.map((song, index) => {
            const selected = song.id === value?.id;

            return (
              <Command.Item
                key={index}
                className="h-11 [&_[cmdk-item-content]]:flex [&_[cmdk-item-content]]:w-full [&_[cmdk-item-content]]:items-center [&_[cmdk-item-content]]:justify-between"
                /* We form a composite `value` identifier w/ the author's name
                 * and the song's name, so that we can search for songs via the
                 * authors' names too. */
                value={`${song.author.name}:${song.name}`}
                onSelect={() => onSelect?.(song)}
              >
                <BytebeatFeatureComboboxInternalItem song={song} selected={selected} />
              </Command.Item>
            );
          })}
        </Command.Group>
        <Command.Separator />
        <Command.Group heading="Other">
          {BYTEBEAT_SONGS.map((song, index) => {
            const selected = song.id === value?.id;

            return (
              <Command.Item
                key={index}
                className="h-11 [&_[cmdk-item-content]]:flex [&_[cmdk-item-content]]:w-full [&_[cmdk-item-content]]:items-center [&_[cmdk-item-content]]:justify-between"
                /* We form a composite `value` identifier w/ the author's name
                 * and the song's name, so that we can search for songs via the
                 * authors' names too. */
                value={`${song.author.name}:${song.name}`}
                onSelect={() => onSelect?.(song)}
              >
                <BytebeatFeatureComboboxInternalItem song={song} selected={selected} />
              </Command.Item>
            );
          })}
        </Command.Group>
      </Command.List>
    </Command.Root>
  );
};

const BytebeatFeatureComboboxInternalItem: React.FC<{
  song: (typeof BYTEBEAT_SONGS)[0];
  selected: boolean;
}> = ({ song, selected }) => {
  return (
    <Fragment>
      <div className="flex grow flex-col overflow-x-hidden text-ellipsis">
        <span className="overflow-hidden text-ellipsis text-nowrap text-sm font-medium leading-5">
          {song.original ? (
            <a
              className="w-fit p-0.5 text-blue-9 hover:underline"
              href={song.original}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
            >
              {song.name}
            </a>
          ) : (
            <span className="w-fit text-gray-12">{song.name}</span>
          )}
        </span>
        <span className="flex items-center gap-1 overflow-hidden text-ellipsis text-xs font-normal leading-4 text-gray-11">
          {song.author.link ? (
            <a
              className="w-fit p-0.5 underline decoration-dotted transition-colors hover:text-gray-12"
              href={song.author.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
            >
              {song.author.name}
            </a>
          ) : (
            <div className="w-fit">{song.author.name}</div>
          )}
          <span className="flex items-center gap-0.5 overflow-hidden text-ellipsis">
            <Code
              className="overflow-hidden text-ellipsis"
              title={`${new TextEncoder().encode(song.source).length} bytes`}
            >
              {song.source.length}c
            </Code>
            <Code className="overflow-hidden text-ellipsis" title={`${song.sampleRate}Hz`}>
              {formatValueToPrecision(song.sampleRate, 2, false)}Hz
            </Code>
          </span>
        </span>
      </div>
      {selected ? (
        <Badge className="min-w-fit" variant="outline" intent="info">
          Selected
        </Badge>
      ) : null}
    </Fragment>
  );
};

export default BytebeatFeatureCombobox;
