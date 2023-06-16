import type { FC, ReactNode } from 'react';

import type { PageSlug } from '@/lib/types/site';

import NavBar from '@/components/common/nav-bar';
import SeoBase, { type SeoBaseProps } from '@/components/templates/seo-base';

/* Props */
type BaseLayoutProps = SeoBaseProps & {
  pageSlug?: PageSlug;
  children?: ReactNode;
};

/* Component */
const BaseLayout: FC<BaseLayoutProps> = ({ title, subtitle, pageSlug, children }) => {
  return (
    <>
      <SeoBase title={title} subtitle={subtitle} />
      <NavBar selected={pageSlug} />
      <main className="relative flex grow flex-col">{children}</main>
    </>
  );
};

BaseLayout.displayName = 'BaseLayout';

export default BaseLayout;
