'use client';

import { useState } from 'react';

import clsx from 'clsx';

import { Accordion } from '@/components/ui';

const DesignAccordionFeature: React.FC = () => {
  const [scrollIsAtLeft, setScrollIsAtLeft] = useState<boolean>(true);
  const [scrollIsAtRight, setScrollIsAtRight] = useState<boolean>(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollLeft = target.scrollLeft;
    const scrollWidth = target.scrollWidth;
    const clientWidth = target.clientWidth;

    setScrollIsAtLeft(scrollLeft === 0);
    setScrollIsAtRight(scrollWidth - scrollLeft === clientWidth);
  };

  return (
    <Accordion.Root className="w-full" type="single" collapsible>
      <Accordion.Item className="not-prose" variant="container" value="accordion_feature_0">
        <Accordion.Trigger variant="container">Accordion</Accordion.Trigger>
        <Accordion.Content className="relative overflow-hidden p-0" variant="container">
          <div className="hide-scrollbar overflow-x-scroll p-3" onScroll={handleScroll}>
            <div className="w-fit whitespace-nowrap text-nowrap pr-3">
              Good Evening, “⁵⁄₉” was a 24 month sociological study conducted by Harvard University.
              We are now complete with our study. Thank you for your time.
            </div>
          </div>

          {/* Left gradient to hide overflow */}
          <div
            className={clsx(
              'pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-gray-2 transition-opacity',
              scrollIsAtLeft ? 'opacity-0' : 'opacity-100',
            )}
            aria-hidden={true}
          />
          {/* Right gradient to hide overflow */}
          <div
            className={clsx(
              'pointer-events-none absolute bottom-0 right-0 h-full w-6 bg-gradient-to-l from-gray-2 transition-opacity',
              scrollIsAtRight ? 'opacity-0' : 'opacity-100',
            )}
            aria-hidden={true}
          />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default DesignAccordionFeature;
