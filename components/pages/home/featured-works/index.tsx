import type { FC } from 'react';

import AboutMe from '../contents/about-me';
import GetInTouch from '../contents/get-in-touch';
import Projects from '../contents/projects';
import Running from '../contents/running/running';
import SecurityResearch from '../contents/security-research';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const FeaturedWorks: FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 min-[560px]:grid-cols-4 min-[960px]:grid-cols-6">
      <AboutMe />
      <GetInTouch />
      <SecurityResearch />
      <Projects />
      <Running />
      {/* <RunningFeature mileageLogs={mileageLogs} runningLogs={runningLogs} /> */}
    </div>
  );
};

FeaturedWorks.displayName = 'FeaturedWorks';

export default FeaturedWorks;
