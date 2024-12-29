import { type NextRequest } from 'next/server';

import fs from 'fs';
import path from 'path';

import { POSTS } from '@/app/blog/posts';

export async function GET(request: NextRequest) {
  // Get base URL from request.
  const url = new URL(request.nextUrl);
  const baseUrl = `${url.protocol}//${url.host}`;

  // Generate RSS XML.
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss
    version="2.0" 
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
  >
    <channel>
      <title>5/9 Blog</title>
      <link>${baseUrl}/blog</link>
      <description>Writing by fiveoutofnine.</description>
      <language>en-US</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>
      <image>
        <url>${baseUrl}/static/og/blog.png</url>
        <title>5/9 Blog</title>
        <link>${baseUrl}/blog</link>
      </image>
      ${POSTS.map((post) => {
        // Try to read description from MDX file by parsing for
        // `export const metadata = getBlogPageMetadata({ description: ...})`.
        let description;
        try {
          const mdxPath = path.join(process.cwd(), 'app/blog/(posts)', post.slug, 'page.mdx');
          const mdxContent = fs.readFileSync(mdxPath, 'utf8');
          const metadataMatch = mdxContent.match(
            /export const metadata = getBlogPageMetadata\({[\s\S]*?description: ["'](.+?)["']/,
          );
          if (metadataMatch) {
            description = metadataMatch[1];
          }
        } catch (error) {
          // Silently fail if file can't be read or metadata not found.
        }

        return `
      <item>
        <title>${post.title}</title>
        <link>${baseUrl}/blog/${post.slug}</link>
        <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
        <dc:creator>fiveoutofnine</dc:creator>
        <pubDate>${post.date.toUTCString()}</pubDate>${
          description ? `\n      <description>${description}</description>` : ''
        }
      </item>`;
      }).join('')}
    </channel>
  </rss>`;

  // Return RSS feed.
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
