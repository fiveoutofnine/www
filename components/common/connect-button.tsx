'use client';

import { ConnectKitButton } from 'connectkit';
import { Wallet } from 'lucide-react';

import { Button } from '@/components/ui';
import type { ButtonProps } from '@/components/ui/button/types';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type ConnectButtonProps = Omit<
  ButtonProps,
  'variant' | 'intent' | 'href' | 'onClick' | 'newTab' | 'type'
> & {
  variant?: Exclude<ButtonProps['variant'], 'solid'>;
  intent?: Exclude<ButtonProps['intent'], 'black' | 'white'>;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const ConnectButton: React.FC<ConnectButtonProps> = (props) => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        return (
          <Button
            leftIcon={!isConnected ? <Wallet /> : undefined}
            onClick={show}
            {...{ variant: isConnected ? 'secondary' : 'primary', intent: 'none', ...props }}
          >
            {isConnected ? (ensName ?? truncatedAddress) : 'Connect'}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
};

export default ConnectButton;
