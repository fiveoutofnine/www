import { type FC, useEffect, useRef, useState } from 'react';

import { ArrowUp, ExternalLink, MessageCircle } from 'lucide-react';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';

import { FIVEOUTOFNINE_MESSAGES } from '@/lib/constants/on-chain-messages';

import CategoryTag from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';
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
        <Button size="sm" href="https://tx.cool" rightIcon={<ExternalLink />} newTab disabled>
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
  const { config } = usePrepareSendTransaction({
    request: {
      to: process.env.NEXT_PUBLIC_FIVEOUTOFNINE_ADDRESS,
      data: `0x${userMessage
        .split('')
        .map((_, i) => userMessage.charCodeAt(i).toString(16))
        .join('')}`,
    },
  });
  const { /* data, isLoading, isSuccess, */ sendTransaction } = useSendTransaction(config);

  // Scroll messages into view on load.
  useEffect(() => messagesEndRef.current?.scrollIntoView(), []);

  return (
    <div className="flex h-full flex-col bg-gray-3">
      {/* Header */}
      <div className="flex h-8 items-center justify-between border-b border-gray-6 bg-gray-3/50 px-1.5 backdrop-blur-xl">
        <div className="flex items-center space-x-1">
          <MessageCircle className="h-4 w-4 text-gray-11" />
          <div className="text-xs font-medium text-gray-12">fiveoutofnine.eth</div>
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
      <div className="h-[4.375rem] space-y-1 overflow-y-scroll px-2 pt-2 text-xs text-gray-12">
        {FIVEOUTOFNINE_MESSAGES.map((message) => (
          <a
            key={message.txHash}
            className="flex h-6 w-fit items-center rounded-full bg-gray-7 px-2 transition-colors hover:bg-gray-8"
            href={`https://etherscan.io/tx/${message.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {message.content}
          </a>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="flex h-10 items-center px-1.5 py-1">
        <div className="relative w-full">
          <form>
            <input
              className="h-8 w-full rounded-full border border-gray-7 bg-gray-2 pl-3 pr-1 text-xs text-gray-12 transition-colors placeholder:text-gray-11 hover:border-gray-8 focus:border-blue-9 focus:outline-none"
              placeholder="Message fiveoutofnine.eth"
              aria-label="Message to fiveoutofnine.eth"
              value={userMessage}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <IconButton
              size="sm"
              variant="secondary"
              intent="primary"
              className="absolute right-1 top-1 rounded-full"
              aria-label="Send on-chain message to fiveoutofnine.eth"
              disabled={!sendTransaction}
              onClick={(e) => {
                e.preventDefault();
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
