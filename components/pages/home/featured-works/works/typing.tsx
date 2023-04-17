import type { FC } from 'react';

import { ChevronRight, Keyboard } from 'lucide-react';

import FeatureDisplay from '@/components/templates/feature-display';
import { Button } from '@/components/ui';

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
      hi
    </FeatureDisplay>
  );
};

TypingFeature.displayName = 'TypingFeature';

export default TypingFeature;
