import type { FC } from 'react';

import BitTwiddlingFeature from './works/bit-twiddling';
import ChessFeature from './works/chess';
import ColormapRegistryFeature from './works/colormap-registry';
import TwitterThreadFeature from './works/twitter-thread';
import TypingFeature from './works/typing';

const FeaturedWorks: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
      <ChessFeature />
      <ColormapRegistryFeature />
      <TypingFeature />
      <BitTwiddlingFeature />
      <TwitterThreadFeature />
    </div>
  );
};

FeaturedWorks.displayName = 'FeaturedWorks';

export default FeaturedWorks;
