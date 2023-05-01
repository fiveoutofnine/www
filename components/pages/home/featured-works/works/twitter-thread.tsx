import type { FC } from 'react';

import { ExternalLink, Twitter } from 'lucide-react';

import FeatureDisplayMinimal from '@/components/templates/feature-display-minimal';
import { Button } from '@/components/ui';

const TwitterThreadFeature: FC = () => {
  return (
    <FeatureDisplayMinimal
      className="col-span-2 w-full lg:col-span-3"
      name="Bit shiftoooor"
      description="Thread on bitshiftooor things"
      symbol={<Twitter />}
      button={
        <Button size="sm" rightIcon={<ExternalLink />} newTab>
          Read
        </Button>
      }
    />
  );
};

TwitterThreadFeature.displayName = 'TwitterThreadFeature';

export default TwitterThreadFeature;
