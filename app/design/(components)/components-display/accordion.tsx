'use client';

import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';

import { CodeBlock } from '@/components/ui';
import type { CodeBlockProps } from '@/components/ui/code-block/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type DesignComponentsDisplayAccordionProps = Pick<CodeBlockProps, 'highlightLines'> & {
  code: string;
  sourceInitiallyDisplayed?: boolean;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const DesignComponentsDisplayAccordion: React.FC<DesignComponentsDisplayAccordionProps> = ({
  highlightLines,
  code,
  sourceInitiallyDisplayed = false,
}) => {
  return (
    <Accordion.Root
      type="single"
      defaultValue={sourceInitiallyDisplayed ? 'source-code' : undefined}
      collapsible
    >
      <Accordion.Item value="source-code">
        <Accordion.Trigger className="group z-10 flex h-10 w-full items-center space-x-2 border border-gray-6 bg-gray-3 px-4 text-sm font-medium text-gray-11 transition-colors hover:border-gray-7 hover:bg-gray-4 hover:text-gray-12 focus:outline-none focus-visible:rounded-none focus-visible:outline focus-visible:-outline-offset-[2px] focus-visible:outline-blue-9 focus-visible:ring-0 active:bg-gray-5 data-[state='closed']:rounded-b-xl data-[state='open']:text-gray-12">
          <span className="flex size-4 items-center justify-center">
            <ChevronRight className="transition-transform group-data-[state='open']:rotate-90" />
          </span>
          <span>View source</span>
        </Accordion.Trigger>
        <Accordion.Content
          className={clsx(
            'max-w-full border-gray-6',
            // We need the following classes to override the default styles from
            // our `<Article />` MDX component.
            // Container
            '[&_[code-block-container]]:mx-0 [&_[code-block-container]]:rounded-b-xl [&_[code-block-container]]:border-x',
            'md:[&_[code-block-container]]:mx-0 md:[&_[code-block-container]]:rounded-t-none md:[&_[code-block-container]]:border-x',
            // Pre
            '[&_[code-block-pre]]:rounded-none',
            'md:[&_[code-block-pre]]:rounded-b-xl',
          )}
        >
          <CodeBlock
            className="border-t-0"
            language="tsx"
            highlightLines={highlightLines}
            roundedTop={false}
          >
            {code}
          </CodeBlock>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default DesignComponentsDisplayAccordion;
