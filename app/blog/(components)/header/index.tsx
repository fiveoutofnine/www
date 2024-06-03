import { POSTS } from '../../posts';
import BlogHeaderCopyLinkButton from './copy-link-button';

import { H1 } from '@/components/templates/mdx';
import RelativeDate from '@/components/templates/relative-date';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type BlogHeaderProps = {
  slug: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const BlogHeader: React.FC<BlogHeaderProps> = ({ slug }) => {
  const post = POSTS.find((post) => post.slug === slug);

  // Return `null` if the post is not found.
  if (!post) return null;

  return (
    <header>
      <H1>{post.title}</H1>
      <div className="-mt-3 flex h-5 items-center text-base leading-5 text-gray-11">
        <RelativeDate date={post.date} />
        <div className="mx-1" role="separator">
          ·
        </div>
        <BlogHeaderCopyLinkButton slug={slug} />
      </div>
    </header>
  );
};

export default BlogHeader;
