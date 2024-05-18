import { Box } from 'lucide-react';

import LogoIcon from '@/components/common/logo-icon';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ChainIconProps = Omit<React.SVGProps<SVGSVGElement>, 'id'> & {
  id: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ChainIcon: React.FC<ChainIconProps> = ({ id, ...rest }) => {
  if (id === 1) return <LogoIcon.Ethereum {...rest} />;
  else if (id === 8453) return <LogoIcon.Base {...rest} />;

  // Default to a box if the chain is not supported.
  return <Box {...rest} />;
};

export default ChainIcon;
