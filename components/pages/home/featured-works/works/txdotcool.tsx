import { type FC, useEffect, useRef, useState } from 'react';

import { ArrowUp, ExternalLink, MessageCircle } from 'lucide-react';
import { usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from 'wagmi';

import { FIVEOUTOFNINE_MESSAGES } from '@/lib/constants/on-chain-messages';

import CategoryTag from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';
import { useToast } from '@/components/ui';
import { Button, IconButton } from '@/components/ui';

const TxDotCoolFeature: FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[960px]:w-64"
      name="tx.cool"
      description="UI/UX explorations"
      symbol={
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
        >
          <title>tx.cool</title>
          <desc>tx.cool&apos;s logo</desc>
          <path
            d="M9.625 7.455v3.267H1.359V7.455h8.266ZM2.96 4.449h4.51v11.516c0 .174.03.322.09.441a.59.59 0 0 0 .277.262c.126.054.286.081.482.081.136 0 .294-.016.474-.049a6.56 6.56 0 0 0 .408-.081l.654 3.169c-.202.06-.49.133-.866.22-.37.087-.811.145-1.323.172-1.035.054-1.903-.052-2.606-.319-.702-.272-1.23-.7-1.584-1.282-.354-.583-.526-1.312-.515-2.19V4.45Zm11.173 3.006 1.83 3.887 1.928-3.887h4.476L19 13.727 22.53 20h-4.443l-2.124-3.986L13.905 20H9.396l3.561-6.273-3.332-6.272h4.508Z"
            fill="currentColor"
          />
        </svg>
      }
      button={
        <Button size="sm" href="https://tx.cool" rightIcon={<ExternalLink />} newTab>
          Visit
        </Button>
      }
      tags={[<CategoryTag key={0} category="Web" />]}
    >
      <TxDotCoolFeatureDetail />
    </FeatureDisplay>
  );
};

const TxDotCoolFeatureDetail: FC = () => {
  const [userMessage, setUserInput] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  const { config } = usePrepareSendTransaction({
    request: {
      chainId: 1,
      to: process.env.NEXT_PUBLIC_FIVEOUTOFNINE_ADDRESS,
      data: `0x${userMessage
        .split('')
        .map((_, i) => userMessage.charCodeAt(i).toString(16))
        .join('')}`,
    },
  });
  const { data, sendTransaction } = useSendTransaction({
    ...config,
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
        intent: 'primary',
        action: (
          <Button
            size="sm"
            href={`https://etherscan.io/tx/${data.hash}`}
            rightIcon={<ExternalLink />}
            intent="primary"
            newTab
          >
            View
          </Button>
        ),
      });
    },
  });
  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
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
  });

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
            <MessageCircle className="h-4 w-4 text-gray-11" />
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
              className="flex min-h-[1.5rem] w-fit items-center rounded-xl bg-gray-7 px-2 py-1 transition-colors hover:bg-gray-8"
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
              intent="primary"
              className="absolute right-1 top-1 rounded-full"
              aria-label="Send on-chain message to fiveoutofnine.eth"
              disabled={userMessage.length === 0 || !sendTransaction || isLoading}
              onClick={(e) => {
                e.preventDefault();
                setUserInput('');
                sendTransaction?.();
              }}
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

export default TxDotCoolFeature;
