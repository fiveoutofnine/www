import type { ReactNode } from 'react';

export type ExternalLink = {
  name: string;
  href: string;
  icon?: ReactNode;
};

export type PageSlug = '/' | '/blog' | '/design';

export type PageExternalLink =
  | 'https://twitter.com/fiveoutofnine'
  | 'https://github.com/fiveoutofnine';

export type Page = {
  name: string;
  slug: PageSlug | PageExternalLink;
  icon: ReactNode;
};
