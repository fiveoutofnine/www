import type { FC } from 'react';

import { ExternalLink, FileLock2 } from 'lucide-react';

import FeatureDisplayMinimal from '@/components/templates/feature-display-minimal';
import { Button } from '@/components/ui';

const SecurityResearch: FC = () => {
  return (
    <FeatureDisplayMinimal
      className="col-span-2 w-full min-[960px]:col-span-3"
      name="Security Research"
      description="I join security audit contests"
      symbol={<FileLock2 />}
      button={
        /** Insert link to security audit reports */
        <Button size="sm" rightIcon={<ExternalLink />} href="https://code4rena.com/" newTab>
          View
        </Button>
      }
    />
  );
};

SecurityResearch.displayName = 'SecurityResearchFeature';

export default SecurityResearch;
