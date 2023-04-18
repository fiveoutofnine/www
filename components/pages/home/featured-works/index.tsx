import type { FC } from 'react';

import BitTwiddlingFeature from './works/bit-twiddling';
import TwitterThreadFeature from './works/twitter-thread';
import TypingFeature from './works/typing';

const FeaturedWorks: FC = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <TypingFeature />
      </div>
      {/* <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0"></div> */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <BitTwiddlingFeature />
        <TwitterThreadFeature />
      </div>
    </div>
  );
};

FeaturedWorks.displayName = 'FeaturedWorks';

export default FeaturedWorks;
