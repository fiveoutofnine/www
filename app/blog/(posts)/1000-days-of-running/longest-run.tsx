'use client';

import { useEffect, useMemo, useRef } from 'react';

import { useDistanceUnitIndexStore } from './client-components';
import { InlinePace } from './client-components';

import { LENGTH_UNITS } from '@/lib/constants/units';

const OverviewLongestRun: React.FC = () => {
  const { index } = useDistanceUnitIndexStore();
  const spanRef = useRef<HTMLSpanElement>(null);

  const unit = LENGTH_UNITS[index];
  const rawValue = 80.51; // kilometers.
  const rawTime = 20_806; // seconds (5:46:46).

  const value = useMemo(() => unit.scalar * rawValue, [rawValue, unit.scalar]);

  useEffect(() => {
    if (unit.name && spanRef.current) {
      const element = spanRef.current;
      element.classList.remove('animate-bg-pulse');
      void element.offsetWidth;
      element.classList.add('animate-bg-pulse');
    }
  }, [unit.name]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-0 text-xl font-medium tracking-tight text-white">
      <span ref={spanRef} className="leading-6">
        {value < 1e-3
          ? value.toExponential(2)
          : value < 1e9
            ? Math.round(100 * value) / 100
            : value.toExponential(2)}
      </span>
      <span className="text-xs leading-4 text-gray-11">
        <InlinePace s={rawTime / rawValue} button={false} />
      </span>
    </div>
  );
};

export default OverviewLongestRun;
