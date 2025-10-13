'use client';

import { useCallback, useState } from 'react';

import ColormapRegistryFeatureDetailModal from './modal';
import { TooltipWithBounds, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import clsx from 'clsx';
import { LayoutGroup, motion } from 'framer-motion';
import { ArrowLeft, CaseLower, CaseUpper, Copy } from 'lucide-react';

import { COLORMAPS } from '@/lib/constants/colormaps';
import { getColormapValue } from '@/lib/utils';

import { Dropdown, IconButton, toast } from '@/components/ui';

const ColormapRegistryFeatureDetail: React.FC = () => {
  const [selected, setSelected] = useState<number>();
  const [scrollIsAtTop, setScrollIsAtTop] = useState<boolean>(true);
  const [scrollIsAtBottom, setScrollIsAtBottom] = useState<boolean>(false);

  const { containerRef, containerBounds } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });

  const { showTooltip, hideTooltip, tooltipOpen, tooltipLeft } = useTooltip<string>({
    tooltipOpen: true,
    tooltipLeft: undefined,
    // `(border_offset) + (tooltip_height + colormap_height) / 2 = -2 + (12 + 110) / 2`.
    tooltipTop: 65,
  });

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      // Coordinates should be relative to the container.
      const tooltipLeft = ('clientX' in event ? event.clientX : 0) - containerBounds.left;
      showTooltip({ tooltipLeft, tooltipTop: 65 });
    },
    [showTooltip, containerBounds],
  );

  const copyColorValue = () => {
    const position = (0xff * (tooltipLeft ?? 0)) / containerBounds.width;
    const tooltipColor = getColormapValue(COLORMAPS[selected!].data, position);
    const tooltipColorHex =
      '#' +
      tooltipColor.r.toString(16).padStart(2, '0') +
      tooltipColor.g.toString(16).padStart(2, '0') +
      tooltipColor.b.toString(16).padStart(2, '0');

    navigator.clipboard.writeText(tooltipColorHex);
    toast({
      intent: 'success',
      title: 'Copied color value to clipboard!',
      description: `${tooltipColorHex} at position ${Math.round(position)}.`,
      hasCloseButton: true,
    });
  };

  const handleScroll = (event: React.UIEvent<HTMLFieldSetElement>) => {
    const target = event.target as HTMLFieldSetElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    setScrollIsAtTop(scrollTop === 0);
    setScrollIsAtBottom(scrollHeight - scrollTop === clientHeight);
  };

  return (
    <div className="relative bg-gray-3">
      <fieldset
        id="colormap-picker"
        className="hide-scrollbar grid h-[8.875rem] grid-cols-2 gap-1 overflow-x-hidden overflow-y-scroll p-2"
        aria-label="Pick a colormap to expand"
        onScroll={handleScroll}
        tabIndex={-1}
      >
        {COLORMAPS.map((colormap, index) => {
          const position = (0xff * (tooltipLeft ?? 0)) / containerBounds.width;
          const tooltipColor = getColormapValue(colormap.data, position);
          const tooltipColorHex =
            '#' +
            tooltipColor.r.toString(16).padStart(2, '0') +
            tooltipColor.g.toString(16).padStart(2, '0') +
            tooltipColor.b.toString(16).padStart(2, '0');
          const tooltipColorIsDark = tooltipColor.r + tooltipColor.g + tooltipColor.b < 382;

          // We only sample as much as the longest array in the segment data
          // definition for efficiency.
          const sampleCount = Math.max(
            colormap.data.r.length,
            colormap.data.g.length,
            colormap.data.b.length,
          );

          const colormapPreview = `linear-gradient(to right, ${[...Array(sampleCount)]
            .map((_, j) => {
              const colorValue = getColormapValue(colormap.data, (0xff * j) / (sampleCount - 1));

              return `rgb(${colorValue.r}, ${colorValue.g}, ${colorValue.b})`;
            })
            .join(', ')})`;

          return (
            <LayoutGroup key={index}>
              <motion.button
                className="h-6 rounded border border-gray-7 hover:border-gray-8 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-9 active:brightness-110"
                onClick={() => setSelected(index)}
                style={{
                  transitionProperty: 'border-color, filter, color',
                  transitionDuration: '150ms',
                  background: colormapPreview,
                }}
                aria-label={`${colormap.name}`}
                type="button"
                layoutId={`colormap-${index}`}
                transition={{ type: 'tween', duration: 0.15 }}
                tabIndex={selected === undefined ? 0 : -1}
              />
              {selected === index ? (
                <div
                  className="absolute left-0 top-0 h-full w-full"
                  ref={containerRef}
                  onPointerMove={handlePointerMove}
                  onMouseLeave={hideTooltip}
                  onClick={copyColorValue}
                >
                  <motion.div
                    className="z-10 h-full w-full"
                    layoutId={`colormap-${index}`}
                    transition={{ type: 'tween', duration: 0.15 }}
                    style={{ background: colormapPreview }}
                  >
                    <motion.div
                      className="flex h-8 w-full items-center justify-between border-b border-gray-6 bg-gray-3 px-1.5"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 32, opacity: 1 }}
                      transition={{ type: 'spring', delay: 0.1, duration: 0.25 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <IconButton
                        size="sm"
                        onClick={() => {
                          setSelected(undefined);
                          hideTooltip();
                        }}
                      >
                        <ArrowLeft />
                      </IconButton>
                      <Dropdown.Root>
                        <Dropdown.Trigger asChild>
                          <button
                            className="flex h-[1.125rem] items-center gap-1 rounded-sm px-1.5 text-xs font-medium text-gray-12 transition-colors hover:bg-gray-5 focus-visible:bg-gray-5 data-[state=open]:bg-gray-5"
                            type="button"
                          >
                            {colormap.name}
                            <Copy className="size-2.5 text-gray-11" />
                          </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                          <Dropdown.Group>
                            <Dropdown.Label>Copy ID as</Dropdown.Label>
                            {[
                              {
                                label: 'bytes8',
                                value: colormap.hash.slice(0, 18),
                                icon: <CaseLower />,
                              },
                              {
                                label: 'bytes32',
                                value: colormap.hash,
                                icon: <CaseUpper />,
                              },
                            ].map(({ label, value, icon }) => (
                              <Dropdown.Item
                                key={label}
                                className="cursor-pointer"
                                icon={icon}
                                onClick={() => {
                                  navigator.clipboard.writeText(value);
                                  toast({
                                    intent: 'success',
                                    title: 'Copied ID to clipboard!',
                                    description: `${value}`,
                                    hasCloseButton: true,
                                  });
                                }}
                              >
                                <code className="rounded border border-gray-6 bg-gray-3 px-1 py-0.5 text-xs">
                                  {label}
                                </code>
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Group>
                        </Dropdown.Content>
                      </Dropdown.Root>
                      <ColormapRegistryFeatureDetailModal data={colormap} />
                    </motion.div>
                    {tooltipOpen && tooltipLeft !== undefined ? (
                      <>
                        <div
                          className="absolute z-10 flex h-[6.875rem] w-4 cursor-pointer justify-center"
                          style={{ transform: `translateX(${tooltipLeft - 8}px)` }}
                        >
                          <hr
                            className=" h-full w-[0.5px] transition-colors"
                            style={{
                              border: tooltipColorIsDark ? '0.5px solid #fff' : '0.5px solid #000',
                            }}
                          />
                        </div>
                        <TooltipWithBounds
                          key={Math.random()} // Needed for bounds to update correctly
                          left={tooltipLeft}
                          top={65} // `(border_offset) + (tooltip_height + colormap_height) / 2 = -2 + (12 + 110) / 2`.
                          className="pointer-events-none absolute left-0 top-0 z-10 flex h-6 flex-col items-center justify-center gap-0.5 rounded px-1.5 font-mono text-xs font-medium transition-colors"
                          style={{
                            background: tooltipColorHex,
                            color: tooltipColorIsDark ? '#fff' : '#000',
                            border: tooltipColorIsDark ? '1px solid #fff' : '1px solid #000',
                          }}
                        >
                          {tooltipColorHex.toUpperCase()}
                        </TooltipWithBounds>
                      </>
                    ) : null}
                  </motion.div>
                </div>
              ) : null}
            </LayoutGroup>
          );
        })}
      </fieldset>
      {/* Top gradient to hide overflow */}
      <div
        className={clsx(
          'pointer-events-none absolute left-0 top-0 h-6 w-full bg-gradient-to-b from-gray-3 transition-opacity',
          scrollIsAtTop || selected !== undefined ? 'opacity-0' : 'opacity-100',
        )}
        aria-hidden={true}
      />
      {/* Bottom gradient to hide overflow */}
      <div
        className={clsx(
          'pointer-events-none absolute bottom-0 left-0 h-6 w-full bg-gradient-to-t from-gray-3 transition-opacity',
          scrollIsAtBottom || selected !== undefined ? 'opacity-0' : 'opacity-100',
        )}
        aria-hidden={true}
      />
    </div>
  );
};

export default ColormapRegistryFeatureDetail;
