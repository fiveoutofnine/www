import { ChevronRight, PenTool } from 'lucide-react';

import FeatureDisplayMinimal from '@/components/templates/feature-display-minimal';
import { Button } from '@/components/ui';

const BitTwiddlingFeature: React.FC = () => {
  return (
    <FeatureDisplayMinimal
      className="col-span-2 w-full min-[960px]:col-span-3"
      name="Bit Twiddling"
      description="Basic bit manipulation"
      symbol={<PenTool />}
      button={
        <Button size="sm" rightIcon={<ChevronRight />} href="/blog/basic-bit-manipulation">
          Read
        </Button>
      }
    />
  );
};

export default BitTwiddlingFeature;
