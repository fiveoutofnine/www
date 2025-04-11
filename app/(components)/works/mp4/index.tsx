import Mp4FeatureDetail from './detail';
import { Videotape } from 'lucide-react';

import FeatureDisplay from '@/components/templates/feature-display';

const Mp4Feature: React.FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-2 min-[960px]:col-span-3"
      name="MP4s"
      description="Videos I like from the Internet"
      symbol={<Videotape />}
    >
      <Mp4FeatureDetail />
    </FeatureDisplay>
  );
};

export default Mp4Feature;
