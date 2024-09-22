import OnChainMusicFeatureDetail from './detail';
import { FileAudio } from 'lucide-react';

import CategoryTag from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';

const OnChainMusicFeature: React.FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[960px]:w-64"
      name="On-chain music"
      description="0 dependency audio"
      symbol={<FileAudio />}
      tags={[<CategoryTag key={1} category="On-chain" />]}
    >
      <OnChainMusicFeatureDetail />
    </FeatureDisplay>
  );
};

export default OnChainMusicFeature;
