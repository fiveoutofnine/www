'use client';

import { ConnectKitButton } from 'connectkit';

import { Button } from '@/components/ui';
import { ButtonProps } from '@/components/ui/button/types';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type ConnectButtonProps = Omit<ButtonProps, 'href' | 'onClick'>;

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const ConnectButton: React.FC<ConnectButtonProps> = (props) => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <Button onClick={show} {...{ variant: 'secondary', ...props }}>
            {isConnected ? ensName ?? truncatedAddress : 'Connect'}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectButton;
