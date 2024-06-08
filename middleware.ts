import { type NextRequest } from 'next/server';

import { Redis } from '@upstash/redis';

const redis = new Redis({ url: process.env.UPSTASH_URL, token: process.env.UPSTASH_TOKEN });

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
