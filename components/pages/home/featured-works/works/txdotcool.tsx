import type { FC } from 'react';

import { ExternalLink } from 'lucide-react';

import CategoryTag from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';
import { Button } from '@/components/ui';

const TxDotCoolFeature: FC = () => {
  return (
    <FeatureDisplay
      className="min-[960px]:w-64 col-span-2 w-full"
      name="tx.cool"
      description="UI/UX explorations"
      symbol={
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
        >
          <title>tx.cool</title>
          <desc>tx.cool&apos;s logo</desc>
          <path
            d="M9.625 7.455v3.267H1.359V7.455h8.266ZM2.96 4.449h4.51v11.516c0 .174.03.322.09.441a.59.59 0 0 0 .277.262c.126.054.286.081.482.081.136 0 .294-.016.474-.049a6.56 6.56 0 0 0 .408-.081l.654 3.169c-.202.06-.49.133-.866.22-.37.087-.811.145-1.323.172-1.035.054-1.903-.052-2.606-.319-.702-.272-1.23-.7-1.584-1.282-.354-.583-.526-1.312-.515-2.19V4.45Zm11.173 3.006 1.83 3.887 1.928-3.887h4.476L19 13.727 22.53 20h-4.443l-2.124-3.986L13.905 20H9.396l3.561-6.273-3.332-6.272h4.508Z"
            fill="currentColor"
          />
        </svg>
      }
      button={
        <Button size="sm" href="/chess" rightIcon={<ExternalLink />} disabled>
          Visit
        </Button>
      }
      tags={[<CategoryTag key={0} category="Web" />]}
    >
      <TxDotCoolFeatureDetail />
    </FeatureDisplay>
  );
};

const TxDotCoolFeatureDetail: FC = () => {
  return <div></div>;
};

export default TxDotCoolFeature;
