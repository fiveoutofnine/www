import ImgFeatureDetail from './detail';
import { BookImage } from 'lucide-react';

import FeatureDisplay from '@/components/templates/feature-display';

const ImgFeature: React.FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-2 min-[960px]:col-span-3"
      name="Images"
      description="Images I like from the Internet"
      symbol={<BookImage />}
    >
      <ImgFeatureDetail />
    </FeatureDisplay>
  );
};

export default ImgFeature;
