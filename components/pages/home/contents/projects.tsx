import type { FC } from 'react';

import { ExternalLink, Hammer } from 'lucide-react';

import FeatureDisplayMinimal from '@/components/templates/feature-display-minimal';
import { Button } from '@/components/ui';

const Projects: FC = () => {
  return (
    <FeatureDisplayMinimal
      className="col-span-2 w-full min-[960px]:col-span-3"
      name="Projects"
      description="Apps I've built"
      symbol={<Hammer />}
      button={
        <Button size="sm" rightIcon={<ExternalLink />} href="/projects" newTab>
          View
        </Button>
      }
    />
  );
};

Projects.displayName = 'Projects';

export default Projects;
