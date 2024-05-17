'use client';

import { useState } from 'react';

import clsx from 'clsx';
import { Check, Copy } from 'lucide-react';

import { toast, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ColorScaleSampleProps = {
  scale: string | number | symbol;
  color: string;
  index: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ColorScaleSample: React.FC<ColorScaleSampleProps> = ({ scale, index, color }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <Tooltip content={`${index + 1}: ${color}`} triggerProps={{ asChild: true }} inverted>
      <button
        id={`${String(scale)}-${index}`}
        className={clsx(
          'flex h-12 w-full items-center justify-center border border-gray-7 hover:z-10 hover:border-gray-8 focus:z-10 focus-visible:rounded focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-9 active:brightness-110',
          index === 0 ? 'rounded-l' : index === 11 ? 'rounded-r' : '',
        )}
        style={{
          transitionProperty: 'border-color, filter, color',
          transitionDuration: '150ms',
          background: color,
        }}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(color);
            toast({
              title: 'Copied to clipboard',
              description: `${String(scale)}${index + 1} - ${color}`,
              intent: 'success',
              hasCloseButton: true,
            });
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch (err) {
            toast({ title: 'Failed to copy to clipboard', description: color, intent: 'fail' });
          }
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' && index > 0) {
            document.getElementById(`${String(scale)}-${index - 1}`)?.focus();
          }
          if (e.key === 'ArrowRight') {
            document.getElementById(`${String(scale)}-${index + 1}`)?.focus();
          }
        }}
        aria-label={`Copy "${color}" to clipboard`}
        type="button"
        tabIndex={0}
      >
        {!copied && hovering ? (
          <Copy
            className={clsx(
              'size-4 duration-150 animate-in fade-in',
              index > 7 ? 'text-gray-1' : 'text-gray-12',
            )}
          />
        ) : null}
        {copied ? (
          <Check
            className={clsx(
              'size-4 duration-300 animate-in fade-in zoom-in',
              index > 7 ? 'text-gray-1' : 'text-gray-12',
            )}
          />
        ) : null}
      </button>
    </Tooltip>
  );
};

export default ColorScaleSample;
