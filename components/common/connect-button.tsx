import type { FC } from 'react';

import { ConnectButton as RainbowConnect } from '@rainbow-me/rainbowkit';
import { Network, Wallet } from 'lucide-react';

import { Button } from '@/components/ui';

/* Props */
type ConnectButtonProps = {
  className?: string;
};

/* Component */
const ConnectButton: FC<ConnectButtonProps> = ({ className }) => {
  return (
    <RainbowConnect.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            className={className}
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    variant="primary"
                    intent="none"
                    onClick={openConnectModal}
                    leftIcon={<Wallet />}
                    type="button"
                  >
                    Connect
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    variant="secondary"
                    intent="fail"
                    onClick={openChainModal}
                    leftIcon={<Network />}
                    type="button"
                  >
                    Switch network
                  </Button>
                );
              }

              return (
                <Button
                  variant="secondary"
                  intent="none"
                  onClick={openAccountModal}
                  leftIcon={<Wallet />}
                  type="button"
                >
                  {account.displayName}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnect.Custom>
  );
};

ConnectButton.displayName = 'ConnectButton';

export default ConnectButton;
