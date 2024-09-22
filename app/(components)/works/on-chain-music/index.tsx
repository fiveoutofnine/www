import OnChainMusicFeatureDetail from './detail';

import CategoryTag from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';

const OnChainMusicFeature: React.FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[960px]:w-64"
      name="On-chain music"
      description="Fully on-chain audio"
      symbol={null}
      tags={[<CategoryTag key={1} category="On-chain" />]}
    >
      <OnChainMusicFeatureDetail />
    </FeatureDisplay>
  );
};

export default OnChainMusicFeature;
