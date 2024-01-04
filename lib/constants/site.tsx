import { FileText, FolderKanban, Ghost, Home, PenLine } from 'lucide-react';

import type { Page } from '@/lib/types/site';

/**
 * Pages displayed on [**fiveoutofnine.com**](https://fiveoutofnine.com)'s
 * navigation bar.
 */
export const NAVBAR_PAGES: Page[] = [
  { name: 'Home', slug: '/', icon: <Home /> },
  { name: 'Resume', slug: '/resume', icon: <FileText /> },
  { name: 'Projects', slug: '/projects', icon: <FolderKanban /> },
  { name: 'About Me', slug: '/about', icon: <Ghost /> },
  { name: 'Blog', slug: '/blog', icon: <PenLine /> },
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
  { name: 'Badge', slug: '/design/component/badge' },
  { name: 'Button', slug: '/design/component/button' },
  { name: 'Code Block', slug: '/design/component/code-block' },
  { name: 'Hover Card', slug: '/design/component/hover-card' },
  { name: 'Select', slug: '/design/component/select' },
  { name: 'Toast', slug: '/design/component/toast' },
  { name: 'Tooltip', slug: '/design/component/tooltip' },
];
