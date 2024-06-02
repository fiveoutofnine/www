import { Home, Paintbrush2, PenTool } from 'lucide-react';

import type { Page } from '@/lib/types/site';

/**
 * Pages displayed on [**fiveoutofnine.com**](https://fiveoutofnine.com)'s
 * navigation bar.
 */
export const NAVBAR_PAGES: Page[] = [
  { name: 'Home', slug: '/', icon: <Home /> },
  { name: 'Blog', slug: '/blog', icon: <PenTool /> },
  { name: 'Design', slug: '/design', icon: <Paintbrush2 /> },
];

/**
 * Foundational doc pages displayed on
 * [**fiveoutofnine.com/design**](https://fiveoutofnine.com/design)'s navigation
 * bar.
 */
export const DESIGN_PAGES: Page[] = [
  { name: 'Introduction', slug: '/design' },
  { name: 'Color', slug: '/design/color' },
  { name: 'Libraries', slug: '/design/libraries' },
];

/**
 * Component doc pages displayed on
 * [**fiveoutofnine.com/design**](https://fiveoutofnine.com/design)'s navigation
 * bar.
 */
export const DESIGN_COMPONENT_PAGES: Page[] = [
  { name: 'Accordion', slug: '/design/component/accordion' },
  { name: 'Avatar', slug: '/design/component/avatar' },
  { name: 'Badge', slug: '/design/component/badge' },
  { name: 'Button', slug: '/design/component/button' },
  { name: 'Checkbox', slug: '/design/component/checkbox' },
  { name: 'Code Block', slug: '/design/component/code-block' },
  { name: 'Hover Card', slug: '/design/component/hover-card' },
  { name: 'Input', slug: '/design/component/input' },
  { name: 'Radio', slug: '/design/component/radio' },
  { name: 'Select', slug: '/design/component/select' },
  { name: 'Switch', slug: '/design/component/switch' },
  { name: 'Text Area', slug: '/design/component/text-area' },
  { name: 'Toast', slug: '/design/component/toast' },
  { name: 'Tooltip', slug: '/design/component/tooltip' },
];
