import type { FC, ReactNode } from 'react';

import NavBar from '@/components/common/nav-bar';
import SeoBase, { type SeoBaseProps } from '@/components/templates/seo-base';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type BaseLayoutProps = SeoBaseProps & {
  children?: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const BaseLayout: FC<BaseLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <>
      <SeoBase title={title} subtitle={subtitle} />
      <NavBar />
      <main className="relative flex grow flex-col">{children}</main>
    </>
  );
};

BaseLayout.displayName = 'BaseLayout';

export default BaseLayout;
