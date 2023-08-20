import Image from 'next/image';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, FC } from 'react';

import { HoverCard } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LinkPreviewProps = ComponentPropsWithoutRef<typeof Link> & {
  src: string;
  width?: number;
  height?: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const LinkPreview: FC<LinkPreviewProps> = ({
  src,
  width = 256,
  height = 128,
  href,
  children,
  ...rest
}) => {
  const props = { href, ...rest };

  return (
    <HoverCard trigger={<Link {...props}>{children}</Link>} openDelay={300}>
      <Link {...props}>
        <Image
          className="my-0 rounded transition hover:brightness-75"
          src={src}
          width={width}
          height={height}
          alt={`Preview of ${href}`}
        />
      </Link>
    </HoverCard>
  );
};

export default LinkPreview;
