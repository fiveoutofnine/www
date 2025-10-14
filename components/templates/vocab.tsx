'use client';

import { Fragment } from 'react';

import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import ClickableTooltip from '@/components/templates/clickable-tooltip';
import { Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Constants + types
// -----------------------------------------------------------------------------

const GLOSSARY = {
  'algorithmic music': {
    label: 'Algorithmic music',
    description: (
      <span>
        Bytebeat music defines a function to output a waveform value betwen 0 (silence) and 255
        given some time tick. Browse more songs{' '}
        <a
          className="inline-flex items-start text-gray-11 underline decoration-dotted transition-colors hover:text-gray-12 focus-visible:rounded-sm"
          href="https://dollchan.net/bytebeat/"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
          <ArrowUpRight className="size-2.5" />
        </a>
        .
      </span>
    ),
  },
  'on-chain music script': {
    label: 'On-chain music',
    description: (
      <span>
        The audio can be generated from the contract and played back as a WAV file with 0
        dependencies (e.g. no JavaScript or browser necessary). See{' '}
        <a
          className="inline-flex items-start text-gray-11 underline decoration-dotted transition-colors hover:text-gray-12 focus-visible:rounded-sm"
          href="https://github.com/fiveoutofnine/555/blob/c9d9af91c2cc4494e35addec2dfe11c5d3ae1e3b/script/GenerateAudioOutput.s.sol"
          target="_blank"
          rel="noopener noreferrer"
        >
          this script
        </a>
        .
      </span>
    ),
  },
  'segment data': {
    label: 'Segment data',
    description:
      'The data the registry uses to linearly interpolate the color values for R, G, and B.',
  },
};

type VocabProps = React.HTMLAttributes<HTMLSpanElement> & {
  word: keyof typeof GLOSSARY;
  type?: 'button' | 'span';
  extra?: React.ReactNode;
  clickable?: boolean;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Vocab: React.FC<VocabProps> = ({
  className,
  word,
  type = 'button',
  extra,
  clickable = true,
  children,
  ...rest
}) => {
  const MaybeClickableTooltip = clickable ? ClickableTooltip : Tooltip;

  return (
    <MaybeClickableTooltip
      className="rounded-lg p-0"
      content={
        <div className="flex flex-col">
          <div className="flex flex-col items-start p-2">
            <span className="text-sm font-medium">{GLOSSARY[word]?.label}</span>
            <span className="text-xs leading-normal text-gray-11">
              {GLOSSARY[word]?.description}
            </span>
          </div>
          {extra ? (
            <Fragment>
              <hr className="border-0.5 w-full border-gray-6" role="separator" aria-hidden />
              <div className="p-2">{extra}</div>
            </Fragment>
          ) : null}
        </div>
      }
      triggerProps={{
        className: 'focus-visible:rounded-sm',
        ...(type === 'span' ? { asChild: true } : { type: 'button' }),
      }}
      hasArrow
      inverted={false}
    >
      <span
        className={twMerge(
          clsx(
            'text-gray-11 underline decoration-dotted transition-colors hover:text-gray-12',
            type === 'span' ? 'cursor-pointer' : '',
            className,
          ),
        )}
        tabIndex={type === 'span' ? 0 : undefined}
        {...rest}
      >
        {children ?? GLOSSARY[word]?.label}
      </span>
    </MaybeClickableTooltip>
  );
};

export default Vocab;
