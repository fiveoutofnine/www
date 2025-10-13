'use client';

import { Accordion } from '@/components/ui';

const DesignAccordionFeature: React.FC = () => {
  return (
    <Accordion.Root className="w-full" type="single" collapsible>
      <Accordion.Item className="not-prose" variant="container" value="accordion_feature_0">
        <Accordion.Trigger variant="container">Accordion</Accordion.Trigger>
        <Accordion.Content className="relative overflow-hidden p-0" variant="container">
          <div
            className="hide-scrollbar overflow-x-scroll p-3"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 0.75rem, black calc(100% - 0.75rem), transparent)',
              maskImage:
                'linear-gradient(to right, transparent, black 0.75rem, black calc(100% - 0.75rem), transparent)',
            }}
          >
            <div className="w-fit whitespace-nowrap text-nowrap pr-3">
              Good Evening, “⁵⁄₉” was a 24 month sociological study conducted by Harvard University.
              We are now complete with our study. Thank you for your time.
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default DesignAccordionFeature;
