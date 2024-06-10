'use client';

import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

import { CodeBlock } from '@/components/ui';

export const WriteGlyphsAccordion: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="-mx-4 flex flex-col md:mx-0">
      <div
        className={clsx(
          // We need the following classes to override the default styles from
          // our `<Article />` MDX component.
          // Container
          '[&_[code-block-container]]:mx-0 [&_[code-block-container]]:rounded-b-none [&_[code-block-container]]:border-x-0',
          'md:[&_[code-block-container]]:mx-0 md:[&_[code-block-container]]:rounded-b-none md:[&_[code-block-container]]:border-x',
          // Pre
          '[&_[code-block-pre]]:rounded-b-none',
          'md:[&_[code-block-pre]]:rounded-b-none',
        )}
      >
        <CodeBlock language="py" fileName="write_glyphs.py">
          {WRITE_GLYPHS_PY_SOURCE}
        </CodeBlock>
      </div>
      <Accordion.Root className="-mt-px" type="single" collapsible>
        <Accordion.Item className="not-prose border-b-0" value="0">
          <Accordion.Trigger className="not-prose group z-10 flex h-10 w-full items-center space-x-2 border-x-0 border-y border-gray-6 bg-gray-3 px-4 text-sm font-medium text-gray-11 transition-colors hover:border-gray-7 hover:bg-gray-4 hover:text-gray-12 focus:outline-none focus-visible:rounded-none focus-visible:outline focus-visible:-outline-offset-[2px] focus-visible:outline-blue-9 focus-visible:ring-0 active:bg-gray-5 data-[state='open']:text-gray-12 md:border-x md:data-[state='closed']:rounded-b-xl">
            <span className="flex size-4 items-center justify-center">
              <ChevronRight className="transition-transform group-data-[state='open']:rotate-90" />
            </span>
            <span>glyphs.txt</span>
          </Accordion.Trigger>
          <Accordion.Content
            className={clsx(
              'not-prose overflow-hidden rounded-b-xl border-x-0 border-b border-t-0 border-gray-6 p-0 md:border-x',
              // We need the following classes to override the default styles
              // from our `<Article />` MDX component.
              // Container
              '[&_[code-block-container]]:mx-0 [&_[code-block-container]]:rounded-none [&_[code-block-container]]:border-0',
              'md:[&_[code-block-container]]:mx-0 md:[&_[code-block-container]]:rounded-none md:[&_[code-block-container]]:border-x-0',
              // Pre
              '[&_[code-block-pre]]:rounded-none',
              'md:[&_[code-block-pre]]:rounded-b-none',
            )}
          >
            {children}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};

export const WRITE_GLYPHS_PY_SOURCE = `CHARACTERS = sorted(set("fiveoutofnine0x0123456789abcdefABCDEF"))

with open("glyphs.txt", "w") as file:
    file.write("\n".join([f"U+{str(hex(ord(char))[2:]).zfill(4).upper()}" for char in CHARACTERS]))`;
