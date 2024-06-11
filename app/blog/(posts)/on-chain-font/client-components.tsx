'use client';

import { useEffect, useState } from 'react';

import { NFTGraphic } from './graphics';
import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { ConnectKitButton } from 'connectkit';
import { ChevronRight, ExternalLink, Wallet } from 'lucide-react';
import { zeroAddress } from 'viem';
import {
  useAccount,
  useChainId,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';

import { Button, CodeBlock, toast } from '@/components/ui';

export const MintNFT: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const chainId = useChainId();
  const { address } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { data, writeContract } = useWriteContract();
  const { isLoading } = useWaitForTransactionReceipt({ hash: data });
  const { data: owner, refetch } = useReadContract({
    address: '0x082Aa22824aEAB2fC0b448687C24589c3d9ba5A8',
    chainId: 8453,
    abi: [
      {
        name: 'ownerOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ internalType: 'uint256', name: '_id', type: 'uint256' }],
        outputs: [{ internalType: 'address', name: 'address', type: 'address' }],
      },
    ] as const,
    functionName: 'ownerOf',
    args: [BigInt(address ?? zeroAddress)],
  });

  // Set mounted.
  useEffect(() => setMounted(true), []);

  // Find Base block explorer and default to Basescan.
  const blockExplorer =
    chains.find((chain) => chain.id === 8453)?.blockExplorers?.default.url ??
    'https://basescan.org';

  return (
    <div className="flex flex-col items-center gap-2">
      <NFTGraphic address={address ?? process.env.NEXT_PUBLIC_FIVEOUTOFNINE_ADDRESS} />
      {!address || !mounted ? (
        // Connect wallet
        <ConnectKitButton.Custom>
          {({ show }) => (
            <Button
              variant="secondary"
              leftIcon={<Wallet />}
              onClick={show}
              disabled={!mounted}
              type="button"
            >
              Connect to mint
            </Button>
          )}
        </ConnectKitButton.Custom>
      ) : // The NFT is not minted if the owner is the zero address (even if
      // `owner` is `undefined` because we default to `zeroAddress` when there
      // is no address connected).
      owner && owner !== zeroAddress ? (
        // NFT minted already
        <Button
          variant="secondary"
          intent="success"
          rightIcon={<ExternalLink />}
          href={`https://opensea.io/assets/base/0x082Aa22824aEAB2fC0b448687C24589c3d9ba5A8/${BigInt(owner).toString()}`}
          newTab
        >
          View yours
        </Button>
      ) : chainId !== 8453 ? (
        // Switch chain to Base
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            switchChain({ chainId: 8453 });
          }}
          type="button"
        >
          Switch to Base
        </Button>
      ) : (
        // Mint NFT
        <Button
          variant="secondary"
          intent="info"
          disabled={isLoading}
          onClick={(e) => {
            e.preventDefault();
            writeContract(
              {
                address: '0x082Aa22824aEAB2fC0b448687C24589c3d9ba5A8',
                abi: [
                  {
                    name: 'mint',
                    type: 'function',
                    stateMutability: 'nonpayable',
                    inputs: [],
                    outputs: [],
                  },
                ] as const,
                functionName: 'mint',
              },
              {
                onError(error) {
                  toast({
                    title: 'Transaction fail',
                    description: error.message,
                    intent: 'fail',
                    hasCloseButton: true,
                  });
                },
                onSuccess(hash) {
                  toast({
                    title: 'Transaction sent',
                    description: 'Waiting for confirmation...',
                    intent: 'info',
                    action: (
                      <Button
                        size="sm"
                        href={`${blockExplorer}/tx/${hash}`}
                        rightIcon={<ExternalLink />}
                        intent="info"
                        newTab
                      >
                        View
                      </Button>
                    ),
                    hasCloseButton: true,
                  });
                },
                onSettled(data, error) {
                  if (data && error) {
                    toast({
                      title: 'Transaction fail',
                      description: error.message,
                      intent: 'fail',
                    });
                  } else if (data) {
                    toast({
                      title: 'NFT minted',
                      description: 'Your NFT has been minted!',
                      intent: 'success',
                      action: (
                        <Button
                          size="sm"
                          href={`${blockExplorer}/tx/${data}`}
                          rightIcon={<ExternalLink />}
                          intent="success"
                          newTab
                        >
                          View
                        </Button>
                      ),
                      hasCloseButton: true,
                    });
                    refetch();
                  }
                },
              },
            );
          }}
          type="button"
        >
          Mint as NFT
        </Button>
      )}
    </div>
  );
};

export const WriteGlyphsAccordion: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="-mx-4 flex flex-col md:mx-0">
      <div
        className={clsx(
          // We need the following classes to override the default styles from
          // our `<Article />` MDX component.
          // Container
          '[&_[code-block-container]]:mx-0 [&_[code-block-container]]:rounded-b-none [&_[code-block-container]]:border-x-0',
          'md:[&_[code-block-container]]:mx-0 md:[&_[code-block-container]]:rounded-b-none md:[&_[code-block-container]]:border-x',
          // Pre
          '[&_[code-block-pre]]:rounded-b-none',
          'md:[&_[code-block-pre]]:rounded-b-none',
        )}
      >
        <CodeBlock language="py" fileName="write_glyphs.py">
          {WRITE_GLYPHS_PY_SOURCE}
        </CodeBlock>
      </div>
      <Accordion.Root className="-mt-px" type="single" collapsible>
        <Accordion.Item className="not-prose border-b-0" value="0">
          <Accordion.Trigger className="not-prose group z-10 flex h-10 w-full items-center space-x-2 border-x-0 border-y border-gray-6 bg-gray-3 px-4 text-sm font-medium text-gray-11 transition-colors hover:border-gray-7 hover:bg-gray-4 hover:text-gray-12 focus:outline-none focus-visible:rounded-none focus-visible:outline focus-visible:-outline-offset-[2px] focus-visible:outline-blue-9 focus-visible:ring-0 active:bg-gray-5 data-[state='open']:text-gray-12 md:border-x md:data-[state='closed']:rounded-b-xl">
            <span className="flex size-4 items-center justify-center">
              <ChevronRight className="transition-transform group-data-[state='open']:rotate-90" />
            </span>
            <span>glyphs.txt</span>
          </Accordion.Trigger>
          <Accordion.Content
            className={clsx(
              'not-prose overflow-hidden rounded-b-none border-x-0 border-b border-t-0 border-gray-6 bg-gray-3 p-0 md:rounded-b-xl md:border-x',
              // We need the following classes to override the default styles
              // from our `<Article />` MDX component.
              // Container
              '[&_[code-block-container]]:mx-0 [&_[code-block-container]]:rounded-none [&_[code-block-container]]:border-0',
              'md:[&_[code-block-container]]:mx-0 md:[&_[code-block-container]]:rounded-none md:[&_[code-block-container]]:border-x-0',
              // Pre
              '[&_[code-block-pre]]:rounded-none',
              'md:[&_[code-block-pre]]:rounded-b-[0.6875rem] md:[&_[code-block-pre]]:rounded-t-none',
            )}
          >
            {children}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
};

const WRITE_GLYPHS_PY_SOURCE = `CHARACTERS = sorted(set("fiveoutofnine0x0123456789abcdefABCDEF"))

with open("glyphs.txt", "w") as file:
    file.write("\n".join([f"U+{str(hex(ord(char))[2:]).zfill(4).upper()}" for char in CHARACTERS]))`;
