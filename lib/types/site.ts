/**
 * Type for an external link.
 * @param name Name describing the link.
 * @param href URL of the link.
 * @param icon Optional icon to describe/represent the link.
 */
export type ExternalLink = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

/**
 * Type for a page slug on [**fiveoutofnine.com**](https://fiveoutofnine.com).
 */
export type PageSlug =
  | '/'
  | '/blog'
  // Design pages
  | '/design'
  | '/design/color'
  | '/design/libraries'
  // Design component pages
  | '/design/component/accordion'
  | '/design/component/avatar'
  | '/design/component/badge'
  | '/design/component/checkbox'
  | '/design/component/code-block'
  | '/design/component/button'
  | '/design/component/hover-card'
  | '/design/component/input'
  | '/design/component/radio'
  | '/design/component/select'
  | '/design/component/switch'
  | '/design/component/text-area'
  | '/design/component/toast'
  | '/design/component/tooltip';

/**
 * Type for an external page linked on [**fiveoutofnine.com**](https://fiveoutofnine.com),
 * intended to be part of configuration files (e.g. for the navigation bar
 * component).
 */
export type PageExternalLink = 'https://x.com/fiveoutofnine' | 'https://github.com/fiveoutofnine';

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
  icon?: React.ReactNode;
};
