import { type FC, type PointerEvent, type UIEvent, useCallback, useState } from 'react';

import { TooltipWithBounds, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import clsx from 'clsx';
import { LayoutGroup, motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

import { COLORMAPS } from '@/lib/constants/colormaps';
import { getColormapValue } from '@/lib/utils';

import CategoryTag from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';
import { Button, IconButton } from '@/components/ui';

const ColormapRegistryFeature: FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[960px]:w-64"
      name="ColormapRegistry"
      description="On-chain registry"
      symbol={<Github />}
      button={
        <Button
          size="sm"
          href="https://github.com/fiveoutofnine/colormap-registry"
          rightIcon={<ExternalLink />}
          newTab
        >
          Open
        </Button>
      }
      tags={[<CategoryTag key={1} category="On-chain" />]}
    >
      <ColormapRegistryFeatureDetail />
    </FeatureDisplay>
  );
};

const ColormapRegistryFeatureDetail: FC = () => {
  const [selected, setSelected] = useState<number>();
  const [scrollIsAtTop, setScrollIsAtTop] = useState<boolean>(true);
  const [scrollIsAtBottom, setScrollIsAtBottom] = useState<boolean>(false);

  const { containerRef, containerBounds } = useTooltipInPortal({
    scroll: true,
    detectBounds: true,
  });

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipLeft = 0,
  } = useTooltip<string>({ tooltipOpen: true, tooltipLeft: 0, tooltipTop: 62 });

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      // Coordinates should be relative to the container
      const containerX = ('clientX' in event ? event.clientX : 0) - containerBounds.left;
      showTooltip({ tooltipLeft: containerX, tooltipTop: 62 });
    },
    [showTooltip, containerBounds],
  );

  const handleScroll = (event: UIEvent<HTMLFieldSetElement>) => {
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
        className="grid h-[8.875rem] grid-cols-2 gap-1 overflow-x-hidden overflow-y-scroll p-2"
        onScroll={handleScroll}
        tabIndex={-1}
      >
        {COLORMAPS.map((colormap, index) => {
          const tooltipColor = getColormapValue(
            colormap.data,
            (0xff * tooltipLeft) / containerBounds.width,
          );
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
                aria-label={`Expand ${colormap.name} colormap`}
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
                >
                  <motion.div
                    className="z-10 h-full w-full"
                    layoutId={`colormap-${index}`}
                    transition={{ type: 'tween', duration: 0.15 }}
                    style={{ background: colormapPreview }}
                  >
                    <motion.div
                      className="flex h-8 w-full items-center justify-between border-b border-gray-6 bg-gray-3 px-1"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 32, opacity: 1 }}
                      transition={{ type: 'spring', delay: 0.1, duration: 0.25 }}
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
                      <span className="text-xs font-medium text-gray-12">{colormap.name}</span>
                      <IconButton
                        size="sm"
                        href={`https://etherscan.io/tx/${colormap.addedTxHash}`}
                        newTab
                      >
                        <ExternalLink />
                      </IconButton>
                    </motion.div>
                    {tooltipOpen ? (
                      <>
                        <hr
                          className="absolute z-10 h-[6.875rem] transition-colors"
                          style={{
                            border: tooltipColorIsDark ? '0.5px solid #fff' : '0.5px solid #000',
                            transform: `translateX(${tooltipLeft}px)`,
                          }}
                        />
                        <TooltipWithBounds
                          key={Math.random()} // Needed for bounds to update correctly
                          left={tooltipLeft}
                          top={62}
                          className="z-10 flex h-6 items-center justify-center rounded px-1.5 font-mono text-xs font-medium transition-colors"
                          style={{
                            top: 0,
                            left: 0,
                            position: 'absolute',
                            pointerEvents: 'none',
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
          'pointer-events-none absolute left-0 top-0 h-6 w-full bg-gradient-to-b from-gray-3 to-transparent transition-opacity',
          scrollIsAtTop || selected !== undefined ? 'opacity-0' : 'opacity-100',
        )}
      />
      {/* Bottom gradient to hide overflow */}
      <div
        className={clsx(
          'pointer-events-none absolute bottom-0 left-0 h-6 w-full bg-gradient-to-t from-gray-3 to-transparent transition-opacity',
          scrollIsAtBottom || selected !== undefined ? 'opacity-0' : 'opacity-100',
        )}
      />
    </div>
  );
};

export default ColormapRegistryFeature;
