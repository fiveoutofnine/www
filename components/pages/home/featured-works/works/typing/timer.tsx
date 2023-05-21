import { type FC, useEffect, useState } from 'react';

import clsx from 'clsx';

import FiveoutofnineAvatar from '@/components/common/fiveoutofnine-avatar';
import { Tooltip } from '@/components/ui';

/* Props */
type TypingFeatureDetailTimerProps = {
  startTime?: Date;
  endTime?: Date;
  fiveoutofnineTime: number;
};

/* Component */
const TypingFeatureDetailTimer: FC<TypingFeatureDetailTimerProps> = ({
  startTime,
  endTime,
  fiveoutofnineTime,
}) => {
  const [timePassed, setTimePassed] = useState<number>();

  // Timer to update the time passed.
  useEffect(() => {
    if (!startTime) {
      setTimePassed(undefined);
      return;
    }

    const interval = setInterval(() => {
      const timePassed = (Date.now() - startTime.getTime()) / 1000;

      setTimePassed(timePassed);
    }, 50);

    if (endTime) {
      const timePassed = (Date.now() - startTime.getTime()) / 1000;

      setTimePassed(timePassed);
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return (
    <div>
      <div className="text-[0.625rem] text-gray-11">Time</div>
      <div className="text-xs text-gray-12">{timePassed ? `${timePassed}s` : '–'}</div>
      <div className="flex items-center space-x-1">
        <FiveoutofnineAvatar size={12} />
        <Tooltip className="font-sans" content="5/9's time" side="bottom">
          <div
            className={clsx(
              'text-[0.625rem] transition-colors',
              endTime
                ? timePassed && timePassed < fiveoutofnineTime
                  ? 'text-red-9'
                  : 'text-green-9'
                : 'text-gray-11',
            )}
          >
            {fiveoutofnineTime}s
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

TypingFeatureDetailTimer.displayName = 'TypingFeatureDetailTimer';

export default TypingFeatureDetailTimer;
