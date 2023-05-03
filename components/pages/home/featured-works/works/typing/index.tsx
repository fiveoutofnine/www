import { type ChangeEvent, type FC, useEffect, useMemo, useRef, useState } from 'react';

import TypingFeatureDetailTimer from './timer';
import clsx from 'clsx';
import { ChevronRight, ExternalLink, Keyboard, RotateCw } from 'lucide-react';

import { SHORT_QUOTES } from '@/lib/constants/typing';

import FiveoutofnineAvatar from '@/components/common/fiveoutofnine-avatar';
import CategoryTag from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';
import { Button, IconButton } from '@/components/ui';

const TypingFeature: FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-4 min-[960px]:col-span-2 min-[960px]:w-64"
      name="Typing"
      description="I type fast (try racing me)"
      symbol={<Keyboard />}
      button={
        <Button
          size="sm"
          href="https://twitter.com/fiveoutofnine/status/1557037492830089217"
          rightIcon={<ExternalLink />}
          newTab
        >
          Watch
        </Button>
      }
      tags={[<CategoryTag key={0} category="Web" />]}
    >
      <TypingFeatureDetail />
    </FeatureDisplay>
  );
};

const TypingFeatureDetail: FC = () => {
  const [quote, setQuote] = useState<(typeof SHORT_QUOTES)[0]>(SHORT_QUOTES[0]);
  const [typedLocked, setTypedLocked] = useState<string>('');
  const [typedPending, setTypedPending] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [wpm, setWpm] = useState<number>();
  const [inputIsFocused, setInputIsFocused] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const lastCharTypedRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const textWords = useMemo(() => quote.text.split(' '), [quote.text]);
  const lastWord = useMemo(() => textWords[textWords.length - 1], [textWords]);

  // Every typed word so far.
  const typed = useMemo(
    () => `${typedLocked}${typedLocked.length > 0 ? ' ' : ''}${typedPending}`,
    [typedLocked, typedPending],
  );
  // In array form.
  const typedWords = useMemo(() => typed.split(' '), [typed]);
  // Number of correct characters.
  // TODO: ideally, we want to memoize the computation of this on `typedLocked`
  // and only compute this for `typedPending` (then add it to the first value).
  const numCorrectChars = useMemo(() => {
    let res = typedWords.length - 1;

    for (let i = 0; i < typedWords.length; ++i) {
      const correctWord = i < textWords.length ? textWords[i] : '';
      for (let j = 0; j < correctWord.length; ++j) {
        if (typedWords[i][j] === correctWord[j]) ++res;
      }
    }

    return res;
  }, [textWords, typedWords]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if ((typed.length === 0 && value === ' ') || (typed.endsWith(' ') && value.endsWith(' ')))
      return;

    // Start a new test if no typed characters.
    if (typed.length === 0) setStartTime(new Date());

    // End the test if typed length of last word exceeds last word length or if
    // the last word is typed and a space is pressed.
    if (
      typedWords.length >= textWords.length &&
      (typedWords[typedWords.length - 1].length + 1 >= lastWord.length || value.endsWith(' '))
    ) {
      setEndTime(new Date());
    }

    const currentCorrectWord = textWords[typedWords.length - 1];

    // If the last word is typed and a space is pressed, lock the typed words
    // and reset the last typed word.
    if (value.endsWith(' ') && typedPending === currentCorrectWord) {
      setTypedLocked(typed);
      setTypedPending('');
    } else if (
      // If a typed word is more than 10 characters longer than its
      // corresponding word, disallow further typing.
      typedWords[typedWords.length - 1].length < currentCorrectWord.length + 10 ||
      value.endsWith(' ')
    ) {
      setTypedPending(value);
    }
  };

  // Randomly select a test.
  const getRandomQuote = () => {
    return SHORT_QUOTES[Math.floor(Math.random() * SHORT_QUOTES.length)];
  };

  // Reset test.
  const resetTest = () => {
    setTypedLocked('');
    setTypedPending('');
    setStartTime(undefined);
    setEndTime(undefined);
    setWpm(undefined);
    setInputIsFocused(false);
    inputRef.current?.focus();
  };

  // Randomly select a quote that isn't the current one.
  const changeQuote = () => {
    let newQuote = getRandomQuote();
    while (newQuote.text === quote.text) newQuote = getRandomQuote();
    setQuote(newQuote);
    resetTest();
  };

  // Randomize text on page load.
  useEffect(() => setQuote(getRandomQuote()), []);

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

  // Identify nodes for rendering the user caret.
  const wrapperNode = wrapperRef.current?.getBoundingClientRect();
  const lastCharTypedNode = lastCharTypedRef.current?.getBoundingClientRect();

  const userCaretLeft =
    wrapperNode && lastCharTypedNode && typed.length > 0
      ? lastCharTypedNode.left - wrapperNode.left + lastCharTypedNode.width
      : 0;
  const userCaretTop =
    wrapperNode && lastCharTypedNode && typed.length > 0
      ? lastCharTypedNode.top - wrapperNode.top
      : 2;

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-2 bg-gray-3 p-2">
      {/* Typing input */}
      <div className="relative h-full w-full font-mono text-sm" ref={wrapperRef}>
        {textWords.map((word, wordIndex) => {
          const currentWord = typedWords[wordIndex] || '';
          const wordAdjusted = `${word}${
            currentWord.length > word.length ? currentWord.substring(word.length) : ''
          }${wordIndex < textWords.length - 1 ? ' ' : ''}`;

          return wordAdjusted.split('').map((char, charIndex) => {
            const charTyped = typedWords.length > wordIndex && currentWord.length > charIndex;
            const charCorrect =
              charTyped && charIndex < word.length && char === currentWord[charIndex];
            const lastCharTyped =
              (typedWords.length - 1 === wordIndex &&
                (currentWord.length > word.length
                  ? charIndex === currentWord.length - 1
                  : charIndex === typedWords[typedWords.length - 1].length - 1)) ||
              (typedWords.length - 2 === wordIndex && wordAdjusted.endsWith(' '));

            return (
              <span
                key={`${wordIndex}-${charIndex}`}
                className={
                  charCorrect ? 'text-gray-12' : charTyped ? 'text-red-9 underline' : 'text-gray-10'
                }
                ref={lastCharTyped ? lastCharTypedRef : undefined}
              >
                {char}
              </span>
            );
          });
        })}

        {/* User caret */}
        <div
          className="absolute left-0 top-0 transition-all"
          style={{
            opacity: !endTime && inputIsFocused ? 100 : 0,
            transform: `translate(${userCaretLeft}px, ${userCaretTop}px)`,
          }}
        >
          <div className="h-4 w-[1.5px] animate-pulse rounded-full bg-gray-11" />
        </div>

        {/* Input */}
        <textarea
          className="absolute left-0 top-0 flex h-full w-full resize-none items-start border-0 p-0 font-mono text-sm opacity-0 focus:outline-none focus:ring-0"
          value={typedPending}
          ref={inputRef}
          onChange={onChange}
          onFocus={() => setInputIsFocused(true)}
          onBlur={() => setInputIsFocused(false)}
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
                  'text-[0.625rem] transition-colors',
                  endTime
                    ? wpm && wpm > quote.wpm
                      ? 'text-red-9'
                      : 'text-green-9'
                    : 'text-gray-11',
                )}
              >
                {quote.wpm}
              </div>
            </div>
          </div>
          {/* Time passed */}
          <TypingFeatureDetailTimer
            startTime={startTime}
            endTime={endTime}
            fiveoutofnineTime={quote.time}
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-1">
          <IconButton size="sm" disabled={typed.length === 0} onClick={resetTest}>
            <RotateCw />
          </IconButton>
          <IconButton size="sm" onClick={changeQuote}>
            <ChevronRight />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

TypingFeature.displayName = 'TypingFeature';

export default TypingFeature;
