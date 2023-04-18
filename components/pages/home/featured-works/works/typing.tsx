import { type ChangeEvent, type FC, useEffect, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';
import { ChevronRight, Keyboard, RotateCw } from 'lucide-react';

import FiveoutofnineAvatar from '@/components/common/fiveoutofnine-avatar';
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
  const [typedLocked, setTypedLocked] = useState<string>('');
  const [lastTypedWord, setLastTypedWord] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [timePassed, setTimePassed] = useState<number>();
  const [wpm, setWpm] = useState<number>();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const SAMPLE_TEXT = 'what do you think about this doubt life powerhouse';
  const FIVEOUTOFNINE_WPM = 297;
  const FIVEOUTOFNINE_TIME = 1.1;
  const textWords = useMemo(() => SAMPLE_TEXT.split(' '), [SAMPLE_TEXT]);
  const lastWord = useMemo(() => textWords[textWords.length - 1], [textWords]);

  // Every typed word so far.
  const typed = useMemo(
    () => `${typedLocked}${typedLocked.length > 0 ? ' ' : ''}${lastTypedWord}`,
    [typedLocked, lastTypedWord],
  );
  // In array form.
  const typedWords = useMemo(() => typed.split(' '), [typed]);
  // Number of correct characters.
  // TODO: ideally, we want to memoize the computation of this on `typedLocked`
  // and only compute this for `lastTypedWord` (then add it to the first value).
  const numCorrectChars = useMemo(() => {
    let res = typedWords.length - 1;

    for (let i = 0; i < typedWords.length; ++i) {
      const correctWord = textWords[i];
      for (let j = 0; j < correctWord.length; ++j) {
        if (typedWords[i][j] === correctWord[j]) ++res;
      }
    }

    return res;
  }, [textWords, typedWords]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // Start a new test if no typed characters.
    if (typed.length === 0) setStartTime(new Date());

    const value = e.target.value;

    // End the test if typed length of last word exceeds last word length or if
    // the last word is typed and a space is pressed.
    if (
      typedWords.length >= textWords.length &&
      (lastTypedWord.length + 1 >= lastWord.length || value.endsWith(' '))
    ) {
      setEndTime(new Date());
    }

    const currentCorrectWord = textWords[typedWords.length - 1];

    // If the last word is typed and a space is pressed, lock the typed words
    // and reset the last typed word.
    if (value.endsWith(' ') && lastTypedWord === currentCorrectWord) {
      setTypedLocked(typed);
      setLastTypedWord('');
    } else if (
      // If a typed word is more than 10 characters longer than its
      // corresponding word, disallow further typing.
      typedWords[typedWords.length - 1].length < currentCorrectWord.length + 10 ||
      value.endsWith(' ')
    ) {
      setLastTypedWord(value);
    }
  };

  // Reset test.
  const resetTest = () => {
    setTypedLocked('');
    setLastTypedWord('');
    setStartTime(undefined);
    setEndTime(undefined);
    setTimePassed(undefined);
    setWpm(undefined);
    inputRef.current?.focus();
  };

  // Timer to update WPM.
  useEffect(() => {
    if (!startTime) return;

    const setNewWpm = ({ decimals }: { decimals: number }) => {
      const multipler = 10 ** decimals;
      const currentTimePassed = (Date.now() - startTime.getTime()) / 1000;
      const currentWpm = (12 * numCorrectChars) / currentTimePassed;

      setWpm(Math.round(multipler * currentWpm) / multipler);
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
  }, [startTime, endTime, typed.length, numCorrectChars]);

  // Timer to update the time passed.
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
        {textWords.map((word, wordIndex) => {
          const currentWord = typedWords[wordIndex] || '';
          const wordAdjusted =
            word +
            (currentWord.length > word.length ? currentWord.substring(word.length) : '') +
            (wordIndex < textWords.length ? ' ' : '');

          return wordAdjusted.split('').map((char, charIndex) => {
            const charTyped = typedWords.length > wordIndex && currentWord.length > charIndex;
            const charCorrect =
              charTyped && charIndex < word.length && char === currentWord[charIndex];

            return (
              <span
                key={`${wordIndex}-${charIndex}`}
                className={charCorrect ? 'text-gray-12' : charTyped ? 'text-red-9' : 'text-gray-10'}
              >
                {char}
              </span>
            );
          });
        })}
        <textarea
          className="absolute left-0 top-0 flex h-full w-full resize-none items-start border-0 p-0 font-mono text-sm opacity-0 focus:outline-none focus:ring-0"
          value={lastTypedWord}
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
            <div className="flex items-center space-x-1">
              <FiveoutofnineAvatar size={12} />
              <div
                className={clsx(
                  'text-[0.625rem]',
                  endTime
                    ? wpm && wpm > FIVEOUTOFNINE_WPM
                      ? 'text-red-9'
                      : 'text-green-9'
                    : 'text-gray-11',
                )}
              >
                {FIVEOUTOFNINE_WPM}
              </div>
            </div>
          </div>
          {/* Time passed */}
          <div>
            <div className="text-[0.625rem] text-gray-11">Time</div>
            <div className="text-xs text-gray-12">{timePassed ? `${timePassed}s` : '–'}</div>
            <div className="flex items-center space-x-1">
              <FiveoutofnineAvatar size={12} />
              <div
                className={clsx(
                  'text-[0.625rem]',
                  endTime
                    ? timePassed && timePassed < FIVEOUTOFNINE_TIME
                      ? 'text-red-9'
                      : 'text-green-9'
                    : 'text-gray-11',
                )}
              >
                {FIVEOUTOFNINE_TIME}s
              </div>
            </div>
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
