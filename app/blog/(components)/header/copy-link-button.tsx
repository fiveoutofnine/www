'use client';

import { toast } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type BlogHeaderCopyLinkButtonProps = {
  slug: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const BlogHeaderCopyLinkButton: React.FC<BlogHeaderCopyLinkButtonProps> = ({ slug }) => {
  return (
    <button
      className="flex h-5 items-center justify-center rounded text-gray-11 underline decoration-dotted transition-colors hover:text-gray-12"
      onClick={() => {
        navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://fiveoutofnine.com'}/blog/${slug}`,
        );
        toast({
          intent: 'info',
          title: 'Copied to clipboard',
          description: 'URL copied to clipboard.',
        });
      }}
    >
      Copy link
    </button>
  );
};

export default BlogHeaderCopyLinkButton;
