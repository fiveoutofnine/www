'use client';

import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { ConnectKitButton } from 'connectkit';
import { ArrowUp, ExternalLink, MessageCircle, Wallet } from 'lucide-react';
import {
  useAccount,
  useChainId,
  useSendTransaction,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from 'wagmi';

import ChainIcon from '@/components/common/chain-icon';
import { Badge, Button, Dropdown, IconButton, toast, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

/**
 * On-chain messages
 * [`0xA85572Cd96f1643458f17340b6f0D6549Af482F5`](https://etherscan.io/address/0xA85572Cd96f1643458f17340b6f0D6549Af482F5)
 * (fiveoutofnine.eth) signed to itself on Ethereum.
 */
/* eslint-disable prettier/prettier */
const FIVEOUTOFNINE_MESSAGES = [
  { content: 'what\'s up I\'m 5/9', txHash: '0x6f4760c765e4c8be8f770e8a7e76310cd4ddda401a4eda6f4dac93ec768f8d76' },
  { content: 'send me messages', txHash: '0x2ea7a28b99903556811918fdf84104b72d0d572910220cfef78bb56de6470e41' },
  { content: 'or ETH', txHash: '0x4f1f8421221336e5a62bf2687f9db85c49bee06a3a25b1a6e3e79c72bb02caec' },
];

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const TxDotCoolFeatureDetail: React.FC = () => {
  const [userMessage, setUserInput] = useState<string>('');
  const { address } = useAccount();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data, sendTransaction } = useSendTransaction();

  const { isLoading } = useWaitForTransactionReceipt({ hash: data });

  // Scroll messages into view on load.
  useEffect(
    () => messagesEndRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' }),
    [],
  );

  // Default to `etherscan.io` for block explorer.
  const blockExplorer =
    chains.find((chain) => chain.id === chainId)?.blockExplorers?.default.url ??
    'https://etherscan.io';

  return (
    <div className="flex h-full flex-col bg-gray-3 text-xs">
      <div
        className="hide-scrollbar h-[6.375rem] overflow-y-scroll text-xs text-gray-12"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="sticky top-0 flex h-8 items-center justify-between border-b border-gray-6 bg-gray-3 px-1.5">
          <div className="flex items-center space-x-1">
            <MessageCircle className="size-4 text-gray-11" />
            <div className="font-medium text-gray-12">fiveoutofnine.eth</div>
          </div>
          <IconButton
            size="sm"
            href={`https://etherscan.io/address/${process.env.NEXT_PUBLIC_FIVEOUTOFNINE_ADDRESS}`}
            newTab
          >
            <ExternalLink />
          </IconButton>
        </div>
        {/* Chat */}
        <div className="space-y-1 px-2 pt-2">
          {FIVEOUTOFNINE_MESSAGES.map((message) => (
            <a
              key={message.txHash}
              className="flex min-h-[1.5rem] w-fit items-center rounded-xl bg-gray-7 px-2 py-1 text-gray-12 transition-colors hover:bg-gray-8"
              /* Note: these messages are all on Ethereum. */
              href={`https://etherscan.io/tx/${message.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {message.content}
            </a>
          ))}
          <div ref={messagesEndRef} aria-hidden={true} />
        </div>
      </div>

      {/* Message input */}
      <div className="flex h-10 items-center gap-1 px-1.5 py-1">
        <div className="relative grow">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              className={clsx(
                'h-8 w-full rounded-full border border-gray-7 bg-gray-2 pr-7 text-gray-12 transition-all placeholder:text-gray-11 hover:border-gray-8 focus:border-blue-9 focus:outline-none',
                address ? 'pl-7' : 'pl-3',
              )}
              type="text"
              name="user-message"
              placeholder="Message fiveoutofnine.eth"
              aria-label="Message to fiveoutofnine.eth"
              value={userMessage}
              onChange={(e) => setUserInput(e.target.value)}
              autoComplete="off"
            />
            {/* Overflow gradient */}
            <div
              className="pointer-events-none absolute right-7 top-1 h-6 w-8 bg-gradient-to-l from-gray-2"
              aria-hidden={true}
            />

            {/* Chain selector */}
            {address ? (
              // Only display if address is connected.
              <Dropdown.Root>
                <Tooltip content="Switch chains" align='start' triggerProps={{ asChild: true }} inverted>
                  <Dropdown.Trigger asChild>
                    <IconButton
                      size="sm"
                      variant="ghost"
                      intent="none"
                      className="absolute left-1 top-1 rounded-full animate-in fade-in slide-in-from-left"
                      type="button"
                    >
                      <ChainIcon className="animate-in fade-in zoom-in" id={chainId} />
                    </IconButton>
                  </Dropdown.Trigger>
                </Tooltip>
                <Dropdown.Content className="w-52">
                  <Dropdown.Group>
                    <Dropdown.Label>Send message on</Dropdown.Label>
                    {chains
                      .toSorted((a, b) => a.id - b.id)
                      .map((chain) => {
                        const selected = chainId === chain.id;

                        return (
                          <Dropdown.Item key={chain.id} asChild>
                            <Button
                              className={clsx(
                                'mb-1 w-full cursor-pointer last:mb-0 [&_[button-content]]:grow-[3] [&_[button-content]]:text-left [&_[button-right-icon]]:w-fit',
                                selected ? 'bg-gray-5 text-gray-12' : '',
                              )}
                              variant="ghost"
                              leftIcon={<ChainIcon id={chain.id} />}
                              rightIcon={
                                selected ? (
                                  <Badge variant="outline" intent="info">
                                    Selected
                                  </Badge>
                                ) : undefined
                              }
                              onClick={() => switchChain({ chainId: chain.id })}
                              disabled={selected}
                            >
                              {chain.name}
                            </Button>
                          </Dropdown.Item>
                        );
                      })}
                  </Dropdown.Group>
                </Dropdown.Content>
              </Dropdown.Root>
            ) : null}

            {!address ? (
              // Connect wallet
              <ConnectKitButton.Custom>
                {({ show }) => (
                  <Tooltip content="Connect wallet" triggerProps={{ asChild: true }} inverted>
                    <IconButton
                      size="sm"
                      variant="secondary"
                      intent="none"
                      className="absolute right-1 top-1 rounded-full"
                      onClick={show}
                      type="submit"
                    >
                      <Wallet />
                    </IconButton>
                  </Tooltip>
                )}
              </ConnectKitButton.Custom>
            ) : (
              // Send message
              <IconButton
                size="sm"
                variant="secondary"
                intent="info"
                className="absolute right-1 top-1 rounded-full"
                aria-label="Send on-chain message to fiveoutofnine.eth"
                disabled={userMessage.length === 0 || isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  sendTransaction(
                    {
                      chainId,
                      to: process.env.NEXT_PUBLIC_FIVEOUTOFNINE_ADDRESS,
                      data: `0x${userMessage
                        .split('')
                        .map((_, i) => userMessage.charCodeAt(i).toString(16))
                        .join('')}`,
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
                          description: 'Your message has been sent to fiveoutofnine.eth.',
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
                        setUserInput('');
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
                            title: 'Message sent',
                            description: 'Message sent to fiveoutonine.eth!',
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
                        }
                      },
                    },
                  );
                }}
                type="submit"
              >
                <ArrowUp />
              </IconButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default TxDotCoolFeatureDetail;
