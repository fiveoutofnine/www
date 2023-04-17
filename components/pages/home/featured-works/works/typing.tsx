import { type ChangeEvent, type FC, useEffect, useRef, useState } from 'react';

import { ChevronRight, Keyboard, RotateCw } from 'lucide-react';

import FeatureDisplay from '@/components/templates/feature-display';
import { Button, IconButton } from '@/components/ui';

const TypingFeature: FC = () => {
  return (
    <FeatureDisplay
      className="w-full md:w-64"
      name="Typing"
      description="I type fast (try racing me)"
      symbol={<Keyboard />}
      button={
        <Button size="sm" href="/typing" rightIcon={<ChevronRight />} disabled>
          Race me
        </Button>
      }
    >
      <TypingFeatureDetail />
    </FeatureDisplay>
  );
};

const TypingFeatureDetail: FC = () => {
  const [typed, setTyped] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [timePassed, setTimePassed] = useState<number>();
  const [wpm, setWpm] = useState<string>();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const SAMPLE_TEXT =
    'You are what you are and you are where you are by changing what goes into your mind.';

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (typed.length === 0) setStartTime(new Date());
    if (e.target.value.length === SAMPLE_TEXT.length) setEndTime(new Date());
    setTyped(e.target.value);
  };

  const resetTest = () => {
    setTyped('');
    setStartTime(undefined);
    setEndTime(undefined);
    setTimePassed(undefined);
    setWpm(undefined);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!startTime) return;

    const setNewWpm = ({ decimals }: { decimals: number }) => {
      const multipler = 10 ** decimals;
      const currentTimePassed = (Date.now() - startTime.getTime()) / 1000;
      const currentWpm = (12 * typed.length) / currentTimePassed;

      setWpm(String(Math.round(multipler * currentWpm) / multipler));
    };

    setNewWpm({ decimals: 0 });

    const interval = setInterval(() => {
      setNewWpm({ decimals: 0 });
    }, 500);

    if (endTime) {
      setNewWpm({ decimals: 1 });
      clearInterval(interval);
      return;
    }

    return () => clearInterval(interval);
  }, [startTime, endTime, typed.length]);

  useEffect(() => {
    if (!startTime) return;

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
    <div className="flex h-full w-full flex-col justify-between bg-gray-3 p-2">
      {/* Typing input */}
      <div className="relative w-full font-mono text-sm">
        {SAMPLE_TEXT.split('').map((char, index) => {
          const charTyped = typed.length > index;
          const charCorrect = charTyped && char === typed[index];

          return (
            <span
              key={index}
              className={charCorrect ? 'text-gray-12' : charTyped ? 'text-red-9' : 'text-gray-10'}
            >
              {char}
            </span>
          );
        })}
        <textarea
          className="absolute left-0 top-0 flex h-full w-full resize-none items-start border-0 p-0 font-mono text-sm text-blue-9 opacity-25 focus:outline-none focus:ring-0"
          value={typed}
          ref={inputRef}
          onChange={onChange}
          disabled={!!endTime}
          aria-label="Race against 5/9"
        />
      </div>

      {/* Summary + buttons */}
      <div className="flex items-end justify-between">
        {/* Summary */}
        <div className="flex space-x-4 font-mono">
          {/* WPM */}
          <div>
            <div className="text-[0.625rem] text-gray-11">WPM</div>
            <div className="text-xs text-gray-12">{wpm ?? '–'}</div>
          </div>
          {/* Time passed */}
          <div>
            <div className="text-[0.625rem] text-gray-11">Time</div>
            <div className="text-xs text-gray-12">{timePassed ?? '–'}</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-1">
          <IconButton size="sm" disabled={!timePassed} onClick={resetTest}>
            <RotateCw />
          </IconButton>
          <IconButton size="sm">
            <ChevronRight />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

TypingFeature.displayName = 'TypingFeature';

export default TypingFeature;
