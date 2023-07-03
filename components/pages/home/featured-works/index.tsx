import dynamic from 'next/dynamic';
import { FC } from 'react';

import type { MileageLog } from '@/lib/types/running';

/* Props */
type FeaturedWorksProps = {
  mileageLogs: MileageLog[];
  runningLogs: MileageLog[];
};

/* Dynamic Imports */
const BitTwiddlingFeature = dynamic(() => import('./works/bit-twiddling'));
const ChessFeature = dynamic(() => import('./works/chess') as never);
const ColormapRegistryFeature = dynamic(() => import('./works/colormap-registry'));
const CoolContractsFeature = dynamic(() => import('./works/cool-contracts'));
const RunningFeature = dynamic(() => import('./works/running'));
const TxDotCoolFeature = dynamic(() => import('./works/txdotcool'));
const TypingFeature = dynamic(() => import('./works/typing'));

/* Component */
const FeaturedWorks: FC<FeaturedWorksProps> = ({ mileageLogs, runningLogs }) => {
  return (
    <div className="grid grid-cols-2 gap-4 min-[560px]:grid-cols-4 min-[960px]:grid-cols-6">
      <ChessFeature />
      <TxDotCoolFeature />
      <TypingFeature />
      <RunningFeature mileageLogs={mileageLogs} runningLogs={runningLogs} />
      <ColormapRegistryFeature />
      <BitTwiddlingFeature />
      <CoolContractsFeature />
    </div>
  );
};

FeaturedWorks.displayName = 'FeaturedWorks';

export default FeaturedWorks;
