import { useEffect, useMemo, useRef } from 'react';

import { useDistanceUnitIndexStore } from './client-components';

import { LENGTH_UNITS } from '@/lib/constants/units';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type OverviewTotalDistanceProps = {
  ranDistance: number;
  totalDistance: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const OverviewTotalDistance: React.FC<OverviewTotalDistanceProps> = ({
  ranDistance,
  totalDistance,
}) => {
  const { index } = useDistanceUnitIndexStore();
  const spanRef1 = useRef<HTMLSpanElement>(null);
  const spanRef2 = useRef<HTMLSpanElement>(null);

  const unit = LENGTH_UNITS[index];
  const ranPercentage = (ranDistance / totalDistance) * 100;

  const [value, unitName] = useMemo(
    () => [(unit.scalar * totalDistance) / 1000, `${unit.spaceBefore ? ' ' : ''}${unit.name}`],
    [totalDistance, unit.name, unit.spaceBefore, unit.scalar],
  );

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
    <div
      className="relative flex h-full w-full flex-col items-center justify-center gap-0 text-xl font-medium tracking-tight text-white"
      style={{
        backgroundImage: `linear-gradient(to right, #198CD9 0% ${ranPercentage}%, #78BE20 ${ranPercentage}% 100%)`,
      }}
    >
      <span ref={spanRef1} className="leading-6">
        {value < 1e-3
          ? value.toExponential(2)
          : value < 1e9
            ? Math.round(100 * value) / 100
            : value.toExponential(2)}
      </span>
      <span ref={spanRef2} className="text-sm leading-4">
        {unitName} total
      </span>
      <span
        className="leading-2 absolute left-[3px] flex w-2 items-center justify-center font-mono text-[8px] font-normal text-white opacity-50 bg-blend-multiply"
        style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}
      >
        {`${ranPercentage.toFixed(4)}% ran`}
      </span>
    </div>
  );
};

export default OverviewTotalDistance;
