'use client';

import { useEffect, useMemo, useRef } from 'react';

import { useDistanceUnitIndexStore } from './client-components';

import { LENGTH_UNITS } from '@/lib/constants/units';

const OverviewLongestRun: React.FC = () => {
  const { index } = useDistanceUnitIndexStore();
  const spanRef1 = useRef<HTMLSpanElement>(null);
  const spanRef2 = useRef<HTMLSpanElement>(null);

  const unit = LENGTH_UNITS[index];
  const rawValue = 80.51; // kilometers.
  const rawTime = 20_806; // seconds (5:46:46).

  const [value, time] = useMemo(
    () => [unit.scalar * rawValue, rawTime / (unit.scalar * rawValue)],
    [rawValue, rawTime, unit.scalar],
  );

  const timeString = useMemo(() => {
    if (time < 60) {
      return time < 1e-3 ? `${time.toExponential(2)}s` : `${time.toFixed(3)}s`;
    }
    if (time < 3_600) {
      // 1 hour
      return `${(time / 60).toFixed(0)}:${(time % 60).toFixed(0).toString().padStart(2, '0')}`;
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
    if (unit.name && spanRef1.current) {
      const element = spanRef1.current;
      element.classList.remove('animate-bg-pulse');
      void element.offsetWidth;
      element.classList.add('animate-bg-pulse');
    }
    if (unit.name && spanRef2.current) {
      const element = spanRef2.current;
      element.classList.remove('animate-bg-pulse');
      void element.offsetWidth;
      element.classList.add('animate-bg-pulse');
    }
  }, [unit.name]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-0 text-xl font-medium tracking-tight text-white">
      <span ref={spanRef1} className="leading-6">
        {value < 1e-3
          ? value.toExponential(2)
          : value < 1e9
            ? Math.round(100 * value) / 100
            : value.toExponential(2)}
      </span>
      <span ref={spanRef2} className="text-xs leading-4 text-gray-11">
        {timeString}/{unit.name}
      </span>
    </div>
  );
};

export default OverviewLongestRun;
