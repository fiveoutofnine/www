import type { ReactNode } from 'react';

export type ExternalLink = {
  name: string;
  href: string;
  icon?: ReactNode;
};

export type PageSlug =
  | '/'
  | '/blog'
  // Design pages
  | '/design'
  | '/design/assets'
  | '/design/color'
  | '/design/libraries'
  // Design component pages
  | '/design/component/badge'
  | '/design/component/button'
  | '/design/component/hover-card'
  | '/design/component/icon-button'
  | '/design/component/select'
  | '/design/component/toast'
  | '/design/component/tooltip';

export type PageExternalLink =
  | 'https://twitter.com/fiveoutofnine'
  | 'https://github.com/fiveoutofnine';

export type Page = {
  name: string;
  slug: PageSlug | PageExternalLink;
  icon?: ReactNode;
};
