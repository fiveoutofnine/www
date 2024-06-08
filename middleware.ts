import { type NextRequest } from 'next/server';

import redis from '@/lib/services/redis';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Update view count for `/blog` paths.
  if (url.pathname.startsWith('/blog/')) {
    // Don't log views outside of production.
    if (process.env.NODE_ENV !== 'production') return;

    const slug = url.pathname.split('/').pop();
    if (slug) {
      const id = encodeURIComponent(slug);

      await redis.hincrby('blog:views', id, 1);
    }
  }
}
