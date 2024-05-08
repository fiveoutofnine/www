'use client';

import { useEffect, useRef, useState } from 'react';

import { ArrowUp, ExternalLink, MessageCircle } from 'lucide-react';

import { FIVEOUTOFNINE_MESSAGES } from '@/lib/constants/on-chain-messages';

import { IconButton } from '@/components/ui';

const TxDotCoolFeatureDetail: React.FC = () => {
  const [userMessage, setUserInput] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* const result = usePrepareTransactionRequest({
    chainId: 1,
    to: process.env.NEXT_PUBLIC_FIVEOUTOFNINE_ADDRESS,
    data: `0x${userMessage
      .split('')
      .map((_, i) => userMessage.charCodeAt(i).toString(16))
      .join('')}`,
  });
  const { data, sendTransaction } = useSendTransaction({
    ...result,
    onError(error) {
      toast({
        title: 'Transaction fail',
        description: error.message,
        intent: 'fail',
      });
    },
    onSuccess(data) {
      toast({
        title: 'Transaction sent',
        description: 'Your message has been sent to fiveoutofnine.eth.',
        intent: 'info',
        action: (
          <Button
            size="sm"
            href={`https://etherscan.io/tx/${data.hash}`}
            rightIcon={<ExternalLink />}
            intent="info"
            newTab
          >
            View
          </Button>
        ),
      });
    },
  }); */
  /* const { isLoading } = useWaitForTransactionReceipt({
    hash: data ?? '0x',
    onError(error) {
      toast({
        title: 'Transaction fail',
        description: error.message,
        intent: 'fail',
        action: data ? (
          <Button
            size="sm"
            href={`https://etherscan.io/tx/${data.hash}`}
            rightIcon={<ExternalLink />}
            intent="fail"
            newTab
          >
            View
          </Button>
        ) : undefined,
      });
    },
    onSuccess(data) {
      toast({
        title: 'Message sent',
        description: 'Message sent to fiveoutonine.eth!',
        intent: 'success',
        action: data ? (
          <Button
            size="sm"
            href={`https://etherscan.io/tx/${data.transactionHash}`}
            rightIcon={<ExternalLink />}
            intent="success"
            newTab
          >
            View
          </Button>
        ) : undefined,
      });
    },
  }); */

  // Scroll messages into view on load.
  useEffect(
    () => messagesEndRef.current?.scrollIntoView({ block: 'nearest', inline: 'nearest' }),
    [],
  );

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
              href={`https://etherscan.io/tx/${message.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {message.content}
            </a>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="flex h-10 items-center px-1.5 py-1">
        <div className="relative w-full">
          <form>
            <input
              className="h-8 w-full rounded-full border border-gray-7 bg-gray-2 pl-3 pr-7 text-gray-12 transition-colors placeholder:text-gray-11 hover:border-gray-8 focus:border-blue-9 focus:outline-none"
              placeholder="Message fiveoutofnine.eth"
              aria-label="Message to fiveoutofnine.eth"
              value={userMessage}
              onChange={(e) => setUserInput(e.target.value)}
            />
            {/* Overflow gradient */}
            <div className="absolute right-7 top-1 h-6 w-8 bg-gradient-to-l from-gray-2" />
            {/* Send button */}
            <IconButton
              size="sm"
              variant="secondary"
              intent="info"
              className="absolute right-1 top-1 rounded-full"
              aria-label="Send on-chain message to fiveoutofnine.eth"
              /* disabled={userMessage.length === 0 || !sendTransaction || isLoading}
              onClick={(e) => {
                e.preventDefault();
                setUserInput('');
                sendTransaction?.();
              }} */
              type="submit"
            >
              <ArrowUp />
            </IconButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TxDotCoolFeatureDetail;
