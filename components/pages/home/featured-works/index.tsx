import type { FC } from 'react';

import AboutMe from '../contents/about-me';
import BitTwiddlingFeature from './works/bit-twiddling';
import ChessFeature from './works/chess';
import ColormapRegistryFeature from './works/colormap-registry';
import CoolContractsFeature from './works/cool-contracts';
import RunningFeature from './works/running';
import TxDotCoolFeature from './works/txdotcool';
import TypingFeature from './works/typing';

import type { MileageLog } from '@/lib/types/running';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type FeaturedWorksProps = {
  mileageLogs: MileageLog[];
  runningLogs: MileageLog[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const FeaturedWorks: FC<FeaturedWorksProps> = ({ mileageLogs, runningLogs }) => {
  return (
    <div className="grid grid-cols-2 gap-4 min-[560px]:grid-cols-4 min-[960px]:grid-cols-6">
      <AboutMe />
      {/* <ChessFeature />
      <TxDotCoolFeature />
      <TypingFeature /> */}
      <RunningFeature mileageLogs={mileageLogs} runningLogs={runningLogs} />
      {/* <ColormapRegistryFeature />
      <BitTwiddlingFeature />
      <CoolContractsFeature /> */}
    </div>
  );
};

FeaturedWorks.displayName = 'FeaturedWorks';

export default FeaturedWorks;
