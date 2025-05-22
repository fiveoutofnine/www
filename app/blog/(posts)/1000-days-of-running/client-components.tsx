'use client';

import { useMemo } from 'react';

import clsx from 'clsx';
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

const useDistanceUnitIndexStore = create<DistanceUnitIndexState>((set) => ({
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

export const InlineDistance: React.FC<{ m: number }> = ({ m }) => {
  const { index, inc, reset } = useDistanceUnitIndexStore();

  const unit = LENGTH_UNITS[index];

  const [value, unitName] = useMemo(
    () => [(unit.scalar * m) / 1000, `${unit.spaceBefore ? ' ' : ''}${unit.name}`],
    [m, unit.name, unit.spaceBefore, unit.scalar],
  );

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
        className="h-5 cursor-pointer rounded-sm text-gray-11 underline decoration-dotted transition-colors hover:text-gray-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-9"
        tabIndex={0}
        role="button"
        onClick={inc}
        onDoubleClick={reset}
        onKeyDown={handleKeyDown}
      >
        {value < 1e9 ? Math.round(100 * value) / 100 : value.toExponential(2)}
        {unitName}
      </span>
    </Tooltip>
  );
};
