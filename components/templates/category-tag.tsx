import type { FC } from 'react';

import { Badge } from '@/components/ui';
import type { BadgeProps } from '@/components/ui/badge/types';

/* Props */
type CategoryTagProps = Omit<BadgeProps, 'variant' | 'intent'> & {
  category: 'NFT' | 'Writing' | 'Web' | 'Onchain';
};

/* Component */
const CategoryTag: FC<CategoryTagProps> = ({ size, category, ...rest }) => {
  const CATEGORY_TO_COLORS: Record<typeof category, string> = {
    NFT: 'orange',
    Onchain: 'warning',
    Writing: 'success',
    Web: 'primary',
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Badge size={size} variant="secondary" intent={CATEGORY_TO_COLORS[category]} {...rest}>
      {category}
    </Badge>
  );
};

CategoryTag.displayName = 'CategoryTag';

export default CategoryTag;
