import type { FC } from 'react';

import BitTwiddlingFeature from './works/bit-twiddling';
import ChessFeature from './works/chess';
import ColormapRegistryFeature from './works/colormap-registry';
import TwitterThreadFeature from './works/twitter-thread';
import TypingFeature from './works/typing';

const FeaturedWorks: FC = () => {
  return (
    <div className="min-[960px]:grid-cols-6 min-[560px]:grid-cols-4 grid grid-cols-2 gap-4">
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
