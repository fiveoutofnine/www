import { type FC, type PointerEvent, useCallback, useState } from 'react';

import { TooltipWithBounds, useTooltip, useTooltipInPortal } from '@visx/tooltip';
import clsx from 'clsx';
import { LayoutGroup, motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

import CategoryTag from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';
import { Button, IconButton } from '@/components/ui';

const ColormapRegistryFeature: FC = () => {
  return (
    <FeatureDisplay
      className="w-full md:w-64"
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

  const COLORMAPS = [
    'bg-gradient-to-r from-cyan-500 via-purple-500 via-yellow-500 to-red-500',
    'bg-blue-9',
    'bg-green-9',
    'bg-yellow-9',
    'bg-purple-9',
    'bg-pink-9',
    'bg-red-9',
    'bg-blue-9',
    'bg-green-9',
    'bg-yellow-9',
    'bg-purple-9',
    'bg-pink-9',
    'bg-red-9',
    'bg-blue-9',
    'bg-green-9',
    'bg-yellow-9',
    'bg-purple-9',
    'bg-pink-9',
  ];
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

  return (
    <div className="relative bg-gray-3">
      <fieldset className="overflow-y-scroll grid h-36 grid-cols-2 gap-1 overflow-x-hidden p-2">
        {COLORMAPS.map((colormap, index) => {
          return (
            <LayoutGroup key={index}>
              <motion.button
                className={clsx(
                  'flex h-6 items-center justify-center rounded border border-gray-7 hover:border-gray-8 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-9 active:brightness-110',
                  colormap,
                )}
                onClick={() => setSelected(index)}
                style={{
                  transitionProperty: 'border-color, filter',
                  transitionDuration: '150ms',
                }}
                layoutId={`colormap-${index}`}
                transition={{ type: 'tween', duration: 0.15 }}
              />
              {selected === index ? (
                <div
                  className="absolute left-0 top-0 h-full w-full"
                  ref={containerRef}
                  onPointerMove={handlePointerMove}
                  onMouseLeave={hideTooltip}
                >
                  <motion.div
                    className={clsx('h-full w-full', COLORMAPS[selected])}
                    layoutId={`colormap-${index}`}
                    transition={{ type: 'tween', duration: 0.15 }}
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
                      <span className="text-xs font-medium text-gray-12">Winter</span>
                      <IconButton size="sm">
                        <ExternalLink />
                      </IconButton>
                    </motion.div>
                    {tooltipOpen ? (
                      <>
                        <hr
                          className="absolute h-28 border border-gray-7"
                          style={{ transform: `translateX(${tooltipLeft}px)` }}
                        />
                        <TooltipWithBounds
                          key={Math.random()} // Needed for bounds to update correctly
                          left={tooltipLeft}
                          top={62}
                          className="flex h-8 items-center justify-center rounded-lg border border-gray-6 bg-gray-4 px-2 font-mono text-xs font-medium"
                          style={{
                            top: 0,
                            left: 0,
                            position: 'absolute',
                            pointerEvents: 'none',
                          }}
                        >
                          #{tooltipLeft?.toFixed(0)}
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
    </div>
  );
};

export default ColormapRegistryFeature;
