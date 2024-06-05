'use client';

import { usePathname } from 'next/navigation';

import { easeOut, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Link } from 'lucide-react';

import { IconButton, toast } from '@/components/ui';

import { POSTS } from '@/app/blog/posts';

const BlogNavBar: React.FC = () => {
  // Determine which blog post is being viewed.
  const pathname = usePathname() ?? '';
  const slug = pathname.split('/').pop() ?? '';
  const post = POSTS.find((post) => post.slug === slug);
  const title = post?.title ?? 'Post';
  const date = post?.date;

  // ---------------------------------------------------------------------------
  // Subtitle animation
  // ---------------------------------------------------------------------------

  const { scrollY } = useScroll();
  const scrollProgress = useTransform(() =>
    easeOut(Math.min(40, Math.max(0, scrollY.get() - 24)) / 40),
  );
  const heightProgress = useTransform(() => 48);
  const opacityProgress = useTransform(() => 1);
  const marginBottomProgress = useTransform(() => -24);
  const translateYProgress = useTransform(() => -48 * (1 - scrollProgress.get()));

  // If there is no post found, return early with a spacer.
  if (!post) return <div className="mb-6" aria-hidden={true} />;

  return (
    <motion.div
      className="pointer-events-auto sticky top-12 z-[99] flex h-12 w-full items-center border-b border-gray-6 bg-white px-4 dark:bg-black md:hidden"
      style={{
        height: heightProgress,
        opacity: opacityProgress,
        marginBottom: marginBottomProgress,
        translateY: translateYProgress,
      }}
    >
      <IconButton
        className="min-w-8"
        variant="outline"
        href="/blog"
        aria-label="Navigate to all blog posts."
      >
        <ArrowLeft />
      </IconButton>
      <div className="hide-scrollbar relative grow overflow-x-scroll">
        <div className="hide-scrollbar flex h-8 grow flex-col justify-center gap-0.5 overflow-x-scroll text-nowrap px-4">
          {date ? (
            <time
              className="sticky left-0 text-[10px] leading-3 text-gray-11"
              dateTime={date.toISOString()}
              title={date.toLocaleString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
              })}
            >
              {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </time>
          ) : null}
          <div className="flex text-ellipsis text-sm font-medium leading-[1.125rem] text-gray-12">
            {title}
            {/* We need this to make the horizontal scroll extend all the way. */}
            <div className="h-full w-4 min-w-4" aria-hidden={true} />
          </div>
        </div>
        {/* Left gradient to hide overflow */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-8 w-4 bg-gradient-to-r from-black"
          aria-hidden={true}
        />
        {/* Right gradient to hide overflow */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-8 w-4 bg-gradient-to-l from-black"
          aria-hidden={true}
        />
      </div>
      <IconButton
        className="min-w-8"
        variant="primary"
        aria-label="Copy link to clipboard."
        onClick={() => {
          navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://fiveoutofnine.com'}${pathname}`,
          );
          toast({
            intent: 'info',
            title: 'Copied to clipboard',
            description: 'URL copied to clipboard.',
          });
        }}
      >
        <Link />
      </IconButton>
    </motion.div>
  );
};

export default BlogNavBar;
