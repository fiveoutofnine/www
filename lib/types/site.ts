import type { ReactNode } from 'react';

/**
 * Type for an external link.
 * @param name Name describing the link.
 * @param href URL of the link.
 * @param icon Optional icon to describe/represent the link.
 */
export type ExternalLink = {
  name: string;
  href: string;
  icon?: ReactNode;
};

/**
 * Type for a page slug on [**fiveoutofnine.com**](https://fiveoutofnine.com).
 */
export type PageSlug =
  | '/'
  | '/resume'
  | '/projects'
  | '/about'
  | '/blog'
  // Design pages
  | '/design'
  | '/design/color'
  | '/design/libraries'
  // Design component pages
  | '/design/component/badge'
  | '/design/component/code-block'
  | '/design/component/button'
  | '/design/component/hover-card'
  | '/design/component/select'
  | '/design/component/toast'
  | '/design/component/tooltip';

/**
 * Type for an external page linked on [**fiveoutofnine.com**](https://kentmiguel.com),
 * intended to be part of configuration files (e.g. for the navigation bar
 * component).
 */
export type PageExternalLink = 'https://twitter.com/kmiguel10' | 'https://github.com/kmiguel10';

/**
 * Type for a page on [**fiveoutofnine.com**](https://fiveoutofnine.com),
 * intended to be part of configuration files (e.g. for the navigation bar
 * component).
 * @param name Name describing the page.
 * @param slug Slug/URL of the page.
 * @param icon Optional icon to describe/represent the page.
 */
export type Page = {
  name: string;
  slug: PageSlug | PageExternalLink;
  icon?: ReactNode;
};
