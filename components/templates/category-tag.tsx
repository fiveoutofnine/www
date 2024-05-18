import { Badge } from '@/components/ui';
import type { BadgeProps } from '@/components/ui/badge/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type CategoryTagProps = Omit<BadgeProps, 'variant' | 'intent'> & {
  category: 'NFT' | 'Writing' | 'Web' | 'On-chain';
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CategoryTag: React.FC<CategoryTagProps> = ({ size, category, ...rest }) => {
  const CATEGORY_TO_COLORS: Record<typeof category, string> = {
    NFT: 'orange',
    'On-chain': 'warning',
    Writing: 'success',
    Web: 'info',
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Badge size={size} variant="secondary" intent={CATEGORY_TO_COLORS[category]} {...rest}>
      {category}
    </Badge>
  );
};

export default CategoryTag;
