import { Footprints } from 'lucide-react';

import FeatureDisplay from '@/components/templates/feature-display';

const RunningFeature: React.FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-4"
      name="Running"
      description="I run a lot"
      symbol={<Footprints />}
    >
      null
    </FeatureDisplay>
  );
};

export default RunningFeature;
