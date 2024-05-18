'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { base, mainnet } from 'wagmi/chains';

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

const config = createConfig(
  getDefaultConfig({
    chains: [base, mainnet],
    transports: {
      [base.id]: http(
        `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      ),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    appName: 'fiveoutofnine.com',
  }),
);

const queryClient = new QueryClient();

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
