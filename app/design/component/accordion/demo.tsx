'use client';

import { Accordion } from '@/components/ui';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const ITEMS = [
  {
    trigger: 'How do you make fully on-chain music?',
    content: 'put the bytes on-chain in the right order',
  },
  { trigger: 'How do you run faster?', content: 'move your legs faster and step farther' },
  { trigger: 'How do you type faster?', content: 'type the words faster and in the right order' },
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const AccordionContainerDemo: React.FC = () => {
  return (
    <Accordion.Root type="multiple">
      {ITEMS.map(({ trigger, content }, index) => (
        <Accordion.Item
          key={index}
          className="not-prose"
          variant="container"
          value={`accordion_container_${index}`}
        >
          <Accordion.Trigger className="not-prose" variant="container">
            {trigger}
          </Accordion.Trigger>
          <Accordion.Content className="not-prose" variant="container">
            {content}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export const AccordionNormalDemo: React.FC = () => {
  return (
    <Accordion.Root type="multiple">
      {ITEMS.map(({ trigger, content }, index) => (
        <Accordion.Item
          key={index}
          className="not-prose"
          variant="normal"
          value={`accordion_normal_${index}`}
        >
          <Accordion.Trigger className="not-prose" variant="normal">
            {trigger}
          </Accordion.Trigger>
          <Accordion.Content className="not-prose" variant="normal">
            {content}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};
