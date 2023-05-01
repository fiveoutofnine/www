import type { FC } from 'react';

import BitTwiddlingFeature from './works/bit-twiddling';
import ChessFeature from './works/chess';
import ColormapRegistryFeature from './works/colormap-registry';
import TwitterThreadFeature from './works/twitter-thread';
import TxDotCoolFeature from './works/txdotcool';
import TypingFeature from './works/typing';

const FeaturedWorks: FC = () => {
  return (
    <div className="min-[960px]:grid-cols-6 min-[560px]:grid-cols-4 grid grid-cols-2 gap-4">
      <ChessFeature />
      <TxDotCoolFeature />
      <TypingFeature />
      <div className="min-[560px]:col-span-4 col-span-2 rounded-xl border border-gray-6 bg-gray-2" />
      <ColormapRegistryFeature />
      <BitTwiddlingFeature />
      <TwitterThreadFeature />
    </div>
  );
};

FeaturedWorks.displayName = 'FeaturedWorks';

export default FeaturedWorks;
