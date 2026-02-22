import WebPFeatureDetail from './detail';
import { FileImage } from 'lucide-react';

import FeatureDisplay from '@/components/templates/feature-display';

const WebPFeature: React.FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-2 min-[960px]:col-span-3"
      name="WebPs"
      description="Images I like from the Internet"
      symbol={<FileImage />}
    >
      <WebPFeatureDetail />
    </FeatureDisplay>
  );
};

export default WebPFeature;
