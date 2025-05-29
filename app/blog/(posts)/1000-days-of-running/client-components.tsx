'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import OverviewAreaChart from './area-chart';
import OverviewBarChart from './bar-chart';
import { COUNTRIES } from './data';
import OverviewLongestRun from './longest-run';
import OverviewRandomGlobalPath from './random-global-path';
import OverviewScatterPlot from './scatter-plot';
import OverviewTotalDistance from './total-distance';
import BoringAvatar from 'boring-avatars';
import clsx from 'clsx';
import Flags from 'country-flag-icons/react/3x2';
import { twMerge } from 'tailwind-merge';
import { create } from 'zustand';

import { LENGTH_UNITS } from '@/lib/constants/units';

import { Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface DistanceUnitIndexState {
  index: number;
  inc: () => void;
  reset: () => void;
}

export const useDistanceUnitIndexStore = create<DistanceUnitIndexState>((set) => ({
  index: 0,
  inc: () =>
    set((state: DistanceUnitIndexState) => ({
      index: (state.index + 1) % LENGTH_UNITS.length,
    })),
  reset: () => set({ index: 0 }),
}));

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

export const InlineDistance: React.FC<{ className?: string; m: number }> = ({ className, m }) => {
  const { index, inc, reset } = useDistanceUnitIndexStore();
  const spanRef = useRef<HTMLSpanElement>(null);

  const unit = LENGTH_UNITS[index];

  const [value, unitName] = useMemo(
    () => [(unit.scalar * m) / 1000, `${unit.spaceBefore ? ' ' : ''}${unit.name}`],
    [m, unit.name, unit.spaceBefore, unit.scalar],
  );

  useEffect(() => {
    if (unit.name && spanRef.current) {
      const element = spanRef.current;
      element.classList.remove('animate-bg-pulse');
      void element.offsetWidth;
      element.classList.add('animate-bg-pulse');
    }
  }, [unit.name]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inc();
    }
  };

  return (
    <Tooltip
      className="p-0"
      content={
        <div className="flex flex-col items-center">
          {unit.description ? (
            <div className="w-full px-2 py-1 text-center">{unit.description}</div>
          ) : null}
          <div
            className={clsx(
              'w-full px-2 py-1 text-center',
              unit.description ? 'border-t border-gray-6 text-xs text-gray-11' : 'text-xs',
            )}
          >
            Click to change units
            <br />
            Double-click to reset
          </div>
        </div>
      }
      triggerProps={{ asChild: true }}
      inverted={false}
    >
      <span
        ref={spanRef}
        className={twMerge(
          clsx(
            'h-5 cursor-pointer rounded-none text-gray-11 underline decoration-dotted transition-colors hover:text-gray-12 focus:outline-none focus:outline-offset-0 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-blue-9',
            className,
          ),
        )}
        tabIndex={0}
        role="button"
        onClick={inc}
        onDoubleClick={reset}
        onKeyDown={handleKeyDown}
      >
        {value < 1e-3
          ? value.toExponential(2)
          : value < 1e9
            ? Math.round(100 * value) / 100
            : value.toExponential(2)}
        {unitName}
      </span>
    </Tooltip>
  );
};

export const InlinePace: React.FC<{ className?: string; s: number; button?: boolean }> = ({
  className,
  s,
  button = true,
}) => {
  const { index, inc, reset } = useDistanceUnitIndexStore();
  const spanRef = useRef<HTMLSpanElement>(null);

  const unit = LENGTH_UNITS[index];

  const time = useMemo(() => s / unit.scalar, [s, unit.scalar]);

  const timeString = useMemo(() => {
    if (time < 60) {
      return time < 1e-3 ? `${time.toExponential(2)}s` : `${time.toFixed(3)}s`;
    }
    if (time < 3_600) {
      // 1 hour
      return `${Math.floor(time / 60)}:${(time % 60).toFixed(0).toString().padStart(2, '0')}`;
    }
    if (time < 36_000) {
      // 10 hours
      return `${Math.floor(time / 3600)}:${Math.floor((time % 3600) / 60)
        .toString()
        .padStart(2, '0')}:${(time % 60).toFixed(0).toString().padStart(2, '0')}`;
    }
    if (time < 360_000) {
      // 100 hours
      return `${(time / 3600).toFixed(1)} hours`;
    }
    if (time < 86_400_000) {
      // 1000 days
      return `${(time / 86_400).toFixed(1)} days`;
    }

    const years = time / 31_536_000;
    return years < 1e9 ? `(${years.toExponential(1)})y` : `${years.toFixed(1)}y`;
  }, [time]);

  useEffect(() => {
    if (unit.name && spanRef.current) {
      const element = spanRef.current;
      element.classList.remove('animate-bg-pulse');
      void element.offsetWidth;
      element.classList.add('animate-bg-pulse');
    }
  }, [unit.name]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inc();
    }
  };

  if (!button) {
    return (
      <span ref={spanRef} className={className}>
        {timeString}/{unit.name}
      </span>
    );
  }

  return (
    <Tooltip
      className="p-0"
      content={
        <div className="flex flex-col items-center">
          {unit.description ? (
            <div className="w-full px-2 py-1 text-center">{unit.description}</div>
          ) : null}
          <div
            className={clsx(
              'w-full px-2 py-1 text-center',
              unit.description ? 'border-t border-gray-6 text-xs text-gray-11' : 'text-xs',
            )}
          >
            Click to change units
            <br />
            Double-click to reset
          </div>
        </div>
      }
      triggerProps={{ asChild: true }}
      inverted={false}
    >
      <span
        ref={spanRef}
        className={twMerge(
          clsx(
            'h-5 cursor-pointer rounded-none text-gray-11 underline decoration-dotted transition-colors hover:text-gray-12 focus:outline-none focus:outline-offset-0 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-blue-9',
            className,
          ),
        )}
        tabIndex={0}
        role="button"
        onClick={inc}
        onDoubleClick={reset}
        onKeyDown={handleKeyDown}
      >
        {timeString}/{unit.name}
      </span>
    </Tooltip>
  );
};

export const Overview: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.outerWidth < 640) {
        setScale((window.outerWidth - 32) / 608);
      } else {
        setScale(1);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="grid aspect-[608/450] w-full grid-cols-4 grid-rows-3 gap-1.5">
        <div className="col-span-1 row-span-1 flex h-full flex-col gap-1.5">
          <div className="flex h-full rounded-xl border border-gray-6 bg-gray-2" />
          <div className="flex h-full rounded-xl border border-gray-6 bg-gray-2" />
        </div>
        <div className="col-span-1 row-span-1 flex h-full rounded-xl border border-gray-6 bg-gray-2" />
        <div className="col-span-2 row-span-1 flex h-full rounded-xl border border-gray-6 bg-gray-2" />
        <div className="col-span-1 row-span-1 flex h-full rounded-xl border border-gray-6 bg-gray-2" />
        <div className="col-span-2 row-span-1 flex h-full rounded-xl border border-gray-6 bg-gray-2" />
        <div className="col-span-1 row-span-1 flex h-full rounded-xl border border-gray-6 bg-gray-2" />
        <div className="col-span-2 row-span-1 flex h-full rounded-xl border border-gray-6 bg-gray-2" />
        <div className="col-span-2 row-span-1 flex h-full rounded-xl border border-gray-6 bg-gray-2" />
      </div>
    );

  return (
    <div
      className="flex max-w-[100vw] items-center justify-center"
      style={{ width: scale * 608, height: scale * 450 }}
    >
      <div style={{ transform: `scale(${scale})` }}>
        {/* We want to ensure the 1×1 items are square:
         * (146px * 3 + 6px * 2) = 450px = 28.125rem */}
        <div className="grid h-[28.125rem] w-[38rem] grid-cols-4 grid-rows-3 gap-1.5">
          <div className="col-span-1 row-span-1 grid h-full grid-rows-2 gap-1.5">
            <div className="flex h-full items-center justify-center overflow-hidden rounded-xl border border-gray-6 bg-gray-2">
              <OverviewTotalDistance ranDistance={18_779_010} totalDistance={24_001_620} />
            </div>
            <div className="flex h-full items-center justify-center overflow-hidden rounded-xl border border-gray-6 bg-gray-2">
              <OverviewLongestRun />
            </div>
          </div>
          <div className="col-span-1 row-span-1 flex h-full justify-center rounded-xl border border-gray-6 bg-gray-2 p-1.5 text-xs font-medium tracking-tight text-white">
            <OverviewRandomGlobalPath totalDistance={24_001_620} />
          </div>
          <div className="relative col-span-2 row-span-1 h-full overflow-hidden rounded-xl border border-gray-6 bg-gray-2">
            <OverviewBarChart />
          </div>
          <div className="col-span-1 row-span-1 flex h-full flex-col justify-between rounded-xl border border-gray-6 bg-gray-2">
            <div className="grid grid-cols-3 gap-1 px-2 pt-2">
              {COUNTRIES.map((country) => {
                const Flag = Flags[country.code as keyof typeof Flags];

                return (
                  <Tooltip
                    key={country.code}
                    content={country.name}
                    triggerProps={{ className: 'rounded-md pr-[2px] -mr-[2px]' }}
                  >
                    <Flag className="rounded-md border border-gray-7 transition-colors hover:border-gray-8" />
                  </Tooltip>
                );
              })}
            </div>
            <div className="w-full pb-1.5 text-center text-lg font-medium leading-normal tracking-tight text-white">
              {COUNTRIES.length} countries
            </div>
          </div>
          <div className="relative col-span-2 row-span-1 flex h-full items-center justify-center overflow-hidden rounded-xl border border-gray-6">
            <div
              className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-red-9"
              aria-hidden={true}
            >
              <BoringAvatar size={301} name="@cited" variant="marble" square />
            </div>
            <span className="z-20 text-center text-2xl font-semibold leading-tight tracking-tight text-white">
              1000 Days of
              <br />
              Running Every Day
            </span>
          </div>
          <div
            className="col-span-1 row-span-1 flex h-full justify-center rounded-xl border border-gray-6 bg-gray-2 p-1.5 text-base font-medium tracking-tight text-white"
            style={{
              // eslint-disable-next-line
              backgroundImage: "url('/static/blog/1000-days-of-running/pegasus41.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            29 shoes
          </div>
          <div className="relative col-span-2 row-span-1 h-full overflow-hidden rounded-xl border border-gray-6 bg-gray-2">
            <OverviewScatterPlot />
          </div>
          <div className="relative col-span-2 row-span-1 h-full overflow-hidden rounded-xl border border-gray-6 bg-gray-2">
            <OverviewAreaChart />
          </div>
        </div>
      </div>
    </div>
  );
};
