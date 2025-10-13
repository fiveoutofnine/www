'use client';

import { useState } from 'react';

import clsx from 'clsx';
import { Fingerprint } from 'lucide-react';

import { COLORMAPS } from '@/lib/constants/colormaps';
import { useMediaQuery } from '@/lib/hooks/use-media-query';

import { Badge, CodeBlock, Dialog, Drawer, IconButton, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const SEGMENT_DATA_DEFINITION =
  'The data the registry uses to linearly interpolate the color values for R, G, and B.';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ColormapRegistryFeatureDetailModal = {
  data: (typeof COLORMAPS)[number];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const ColormapRegistryFeatureDetailModal: React.FC<ColormapRegistryFeatureDetailModal> = ({
  data,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const isSmallScreen = useMediaQuery('(max-width: 768px)'); // `md` breakpoint.

  if (!isSmallScreen) {
    return (
      <Dialog.Root open={open && !isSmallScreen} onOpenChange={setOpen}>
        <Tooltip content="View definition" align="end" triggerProps={{ asChild: true }} inverted>
          <Dialog.Trigger asChild>
            <IconButton size="sm">
              <Fingerprint />
            </IconButton>
          </Dialog.Trigger>
        </Tooltip>
        {/* Prevent the tooltip from getting focused upon dialog open/close. */}
        <Dialog.Content
          className="flex flex-col"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title>{data.name}</Dialog.Title>
          <Dialog.Description>
            The{' '}
            <Tooltip
              content={SEGMENT_DATA_DEFINITION}
              side="bottom"
              align="start"
              inverted
              inPortal
              triggerProps={{
                className:
                  'text-gray-11 rounded-sm underline decoration-dotted transition-colors hover:text-gray-12 data-[state="instant-open"]:text-gray-12 data-[state="delayed-open"]:text-gray-12',
              }}
              defaultOpen={false}
            >
              segment data
            </Tooltip>{' '}
            definition for the colormap.
          </Dialog.Description>
          <ColormapRegistryFeatureDetailModalCodeBlock data={data} isSmallScreen={isSmallScreen} />
          <Dialog.Footer className="flex flex-wrap items-center gap-1">
            <Badge variant="outline" intent="fail">
              {data.data.r.length} red
            </Badge>
            <Badge variant="outline" intent="success">
              {data.data.g.length} green
            </Badge>
            <Badge variant="outline" intent="info">
              {data.data.b.length} blue
            </Badge>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
    );
  }

  return (
    <Drawer.Root open={open && isSmallScreen} onOpenChange={setOpen}>
      <Tooltip content="View definition" align="end" triggerProps={{ asChild: true }} inverted>
        <Drawer.Trigger asChild>
          <IconButton size="sm">
            <Fingerprint />
          </IconButton>
        </Drawer.Trigger>
      </Tooltip>
      {/* Prevent the tooltip from getting focused upon drawer open/close. */}
      <Drawer.Content
        className="[&_[drawer-content]]:flex [&_[drawer-content]]:flex-col"
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <Drawer.Title>{data.name}</Drawer.Title>
        <Drawer.Description>
          The{' '}
          <Tooltip
            content={SEGMENT_DATA_DEFINITION}
            side="bottom"
            inverted
            inPortal
            triggerProps={{
              className:
                'text-gray-11 rounded-sm underline decoration-dotted transition-colors hover:text-gray-12 data-[state="instant-open"]:text-gray-12 data-[state="delayed-open"]:text-gray-12',
            }}
          >
            segment data
          </Tooltip>{' '}
          definition for the colormap.
        </Drawer.Description>
        <ColormapRegistryFeatureDetailModalCodeBlock data={data} isSmallScreen={isSmallScreen} />
        <Drawer.Footer className="flex flex-wrap items-center gap-1">
          <Badge variant="outline" intent="fail">
            {data.data.r.length} red
          </Badge>
          <Badge variant="outline" intent="success">
            {data.data.g.length} green
          </Badge>
          <Badge variant="outline" intent="info">
            {data.data.b.length} blue
          </Badge>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer.Root>
  );
};

const ColormapRegistryFeatureDetailModalCodeBlock: React.FC<{
  data: (typeof COLORMAPS)[number];
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
      language="ts"
      fileName={data.name}
      showLineNumbers={false}
      containerized={false}
    >{`const data = ${JSON.stringify(data.data, null, 2)};`}</CodeBlock>
  );
};

export default ColormapRegistryFeatureDetailModal;
