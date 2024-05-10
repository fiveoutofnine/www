import ColormapRegistryFeatureDetail from './detail';
import { ExternalLink, Github } from 'lucide-react';

import CategoryTag from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';
import { Button } from '@/components/ui';

const ColormapRegistryFeature: React.FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[960px]:w-64"
      name="ColormapRegistry"
      description="On-chain registry"
      symbol={<Github />}
      button={
        <Button
          size="sm"
          href="https://github.com/fiveoutofnine/colormap-registry"
          rightIcon={<ExternalLink />}
          newTab
        >
          Code
        </Button>
      }
      tags={[<CategoryTag key={1} category="On-chain" />]}
    >
      <ColormapRegistryFeatureDetail />
    </FeatureDisplay>
  );
};

export default ColormapRegistryFeature;
