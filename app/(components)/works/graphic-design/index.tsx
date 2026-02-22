import { SlidersVertical } from 'lucide-react';

import FeatureDisplay from '@/components/templates/feature-display';

const GraphicDesignFeature: React.FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 h-[33rem] w-full min-[560px]:col-span-4 min-[960px]:col-span-6"
      name="Graphic Design"
      description="Graphic design"
      symbol={<SlidersVertical />}
    >
      <div>Graphic Design</div>
    </FeatureDisplay>
  );
};

export default GraphicDesignFeature;
