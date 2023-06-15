import { Home, Paintbrush2, PenTool } from 'lucide-react';

import type { Page } from '@/lib/types/site';

/* NavBar Pages */
export const NAVBAR_PAGES: Page[] = [
  { name: 'Home', slug: '/', icon: <Home /> },
  { name: 'Blog', slug: '/blog', icon: <PenTool /> },
  { name: 'Design', slug: '/design', icon: <Paintbrush2 /> },
];

export const DESIGN_PAGES: Page[] = [
  { name: 'Introduction', slug: '/design' },
  { name: 'Assets', slug: '/design/assets' },
  { name: 'Color', slug: '/design/color' },
  { name: 'Libraries', slug: '/design/libraries' },
];

export const DESIGN_COMPONENT_PAGES: Page[] = [
  { name: 'Badge', slug: '/design/component/badge' },
  { name: 'Button', slug: '/design/component/button' },
  { name: 'Hover Card', slug: '/design/component/hover-card' },
  { name: 'Icon Button', slug: '/design/component/icon-button' },
  { name: 'Select', slug: '/design/component/select' },
  { name: 'Toast', slug: '/design/component/toast' },
  { name: 'Tooltip', slug: '/design/component/tooltip' },
];
