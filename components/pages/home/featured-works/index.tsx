import type { FC } from 'react';

import BitTwiddlingFeature from './works/bit-twiddling';
import ChessFeature from './works/chess';
import ColormapRegistryFeature from './works/colormap-registry';
import RunningFeature from './works/running';
import TwitterThreadFeature from './works/twitter-thread';
import TxDotCoolFeature from './works/txdotcool';
import TypingFeature from './works/typing';

import type { MileageLog } from '@/lib/types/running';

/* Props */
type FeaturedWorksProps = {
  mileageLogs: MileageLog[];
  runningLogs: MileageLog[];
};

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
      <TwitterThreadFeature />
    </div>
  );
};

FeaturedWorks.displayName = 'FeaturedWorks';

export default FeaturedWorks;
