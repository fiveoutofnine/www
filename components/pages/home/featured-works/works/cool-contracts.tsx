import type { FC } from 'react';

import { ExternalLink, Github } from 'lucide-react';

import FeatureDisplayMinimal from '@/components/templates/feature-display-minimal';
import { Button } from '@/components/ui';

const CoolContractsFeature: FC = () => {
  return (
    <FeatureDisplayMinimal
      className="col-span-2 w-full min-[960px]:col-span-3"
      name="Cool contracts"
      description="Compilation of cool contracts"
      symbol={<Github />}
      button={
        <Button
          size="sm"
          rightIcon={<ExternalLink />}
          href="https://github.com/fiveoutofnine/cool-contracts"
          newTab
        >
          View
        </Button>
      }
    />
  );
};

CoolContractsFeature.displayName = 'CoolContractsFeature';

export default CoolContractsFeature;
