import BytebeatFeatureDetail from './detail';
import { KeyboardMusic } from 'lucide-react';

import FeatureDisplay from '@/components/templates/feature-display';

const BytebeatFeature: React.FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-4"
      name="Bytebeat"
      description="Music"
      symbol={<KeyboardMusic />}
    >
      <BytebeatFeatureDetail />
    </FeatureDisplay>
  );
};

export default BytebeatFeature;
