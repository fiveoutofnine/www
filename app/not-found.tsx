import type { Metadata } from 'next';

import ErrorLayout from '@/components/layouts/error';

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: '404',
  description: 'Page not found.',
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function NotFound() {
  return <ErrorLayout statusCode={404} />;
}
