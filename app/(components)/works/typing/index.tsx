import TypingFeatureDetail from './detail';
import { ExternalLink, Keyboard } from 'lucide-react';

import CategoryTag from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';
import { Button } from '@/components/ui';

const TypingFeature: React.FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-4 min-[960px]:col-span-2 min-[960px]:w-64"
      name="Typing"
      description="I type fast (try racing me)"
      symbol={<Keyboard />}
      button={
        <Button
          size="sm"
          href="https://x.com/fiveoutofnine/status/1557037492830089217"
          rightIcon={<ExternalLink />}
          newTab
        >
          Watch
        </Button>
      }
      tags={[<CategoryTag key={0} category="Web" />]}
    >
      <TypingFeatureDetail seed={Math.random()} />
    </FeatureDisplay>
  );
};

export default TypingFeature;
