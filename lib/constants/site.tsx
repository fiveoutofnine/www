import { File, Home } from 'lucide-react';

import type { Page } from '@/lib/types/site';

/* NavBar Pages */
export const NAVBAR_PAGES: Page[] = [
  { name: 'Home', slug: '/', icon: <Home /> },
  { name: 'Blog', slug: '/blog', icon: <File /> },
  { name: 'Design', slug: '/design', icon: <Home /> },
];
