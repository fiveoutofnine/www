import { type NextRequest, NextResponse } from 'next/server';

// import redis from '@/lib/services/redis';
import { POSTS } from '@/app/blog/posts';

export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const slug = url.searchParams.get('slug')?.toLowerCase();

  // Return error if missing field.
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  // Return error if the post does not exist.
  if (!POSTS.find((post) => post.slug === slug)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  // Hash IP.
  const ip = request.ip;
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
  const hash = Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  // Update post view count.
  const id = encodeURIComponent(slug);
  const views = 0;
  //const views = await redis.hincrby('blog:views', id, 1);

  return NextResponse.json({ id, views, hash }, { status: 200 });
}
