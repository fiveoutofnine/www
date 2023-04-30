import type { FC } from 'react';

import BitTwiddlingFeature from './works/bit-twiddling';
import ChessFeature from './works/chess';
import ColormapRegistryFeature from './works/colormap-registry';
import TwitterThreadFeature from './works/twitter-thread';
import TypingFeature from './works/typing';

const FeaturedWorks: FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <ChessFeature />
        <TypingFeature />
      </div>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <ColormapRegistryFeature />
      </div>
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <BitTwiddlingFeature />
        <TwitterThreadFeature />
      </div>
    </div>
  );
};

FeaturedWorks.displayName = 'FeaturedWorks';

export default FeaturedWorks;
