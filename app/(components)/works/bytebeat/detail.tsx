'use client';

import { useEffect, useRef, useState } from 'react';

import { CodeBlock } from '@/components/ui';

const BytebeatFeatureDetail: React.FC = () => {
  const [source, setSource] = useState<string>('');
  const [scrollTop, setScrollTop] = useState<number>(0);
  const codeBlockRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;

    setScrollTop(target.scrollTop);
  };

  // Set the scroll amount on the code block to keep it synced w/ the
  // `textarea`.
  useEffect(() => {
    if (codeBlockRef.current) {
      codeBlockRef.current.scrollTo(0, scrollTop);
    }
  }, [scrollTop]);

  return (
    <div className="flex h-full max-h-[11.375rem]">
      <div className="relative h-full w-1/2 border-r border-gray-6 bg-gray-3">
        <CodeBlock
          className="h-full border-y-0 [&_[code-block-header]]:pl-2 [&_[code-block-line-number]]:mr-2 [&_[code-block-line]]:px-2 [&_[code-block-pre]]:py-2"
          language="js"
          fileName="Source"
          containerized={false}
          breakLines
          containerProps={{ ref: codeBlockRef }}
        >
          {source}
        </CodeBlock>
        <textarea
          className="absolute inset-0 h-full grow resize-none overflow-y-scroll whitespace-break-spaces break-all bg-transparent p-2 pl-8 pt-12 font-mono text-xs leading-5 text-transparent caret-gray-12 focus:outline-none"
          value={source}
          onChange={(value) => setSource(value.target.value)}
          onScroll={handleScroll}
          autoCapitalize=""
          autoComplete=""
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default BytebeatFeatureDetail;
