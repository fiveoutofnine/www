import type { FC } from 'react';

import { ExternalLink, PenTool } from 'lucide-react';

import FeatureDisplayMinimal from '@/components/templates/feature-display-minimal';
import { Button } from '@/components/ui';

const BitTwiddlingFeature: FC = () => {
  return (
    <FeatureDisplayMinimal
      className="min-[960px]:col-span-3 col-span-2 w-full"
      name="Bit Twiddling"
      description="Basic bit manipulation"
      symbol={<PenTool />}
      button={
        <Button
          size="sm"
          rightIcon={<ExternalLink />}
          href="https://hackmd.io/@fiveoutofnine/Skl9eRbX9"
          newTab
        >
          Read
        </Button>
      }
    />
  );
};

BitTwiddlingFeature.displayName = 'BitTwiddlingFeature';

export default BitTwiddlingFeature;
