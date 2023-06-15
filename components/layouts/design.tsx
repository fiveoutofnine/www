import type { FC, ReactNode } from 'react';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';

/* Props */
type DesignLayoutProps = {
  children?: ReactNode;
};

/* Component */
const DesignLayout: FC<DesignLayoutProps> = ({ children }) => {
  return (
    <BaseLayout name="Design" pageSlug="/design">
      <ContainerLayout>
        <article className="prose dark:prose-invert">{children}</article>
      </ContainerLayout>
    </BaseLayout>
  );
};

export default DesignLayout;
