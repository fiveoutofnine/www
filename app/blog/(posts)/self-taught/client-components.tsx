'use client';

import { useState } from 'react';

import { View } from 'lucide-react';

import { Article } from '@/components/mdx';
import { Drawer } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type DetailModalProps = {
  title?: string;
  description?: string;
  content: React.ReactNode;
  children?: React.ReactNode;
};

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

export const DetailModal: React.FC<DetailModalProps> = ({
  title,
  description,
  content,
  children,
  ...rest
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClick = () => {
    setOpen(!open);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <span
          className="h-5 cursor-pointer rounded-sm text-gray-11 underline decoration-dotted transition-colors hover:text-gray-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-9"
          tabIndex={0}
          role="button"
          onClick={onClick}
          onKeyDown={handleKeyDown}
          {...rest}
        >
          <span className="align-baseline">{children}</span>
          {/* We require a wrapper `<span>` with `select-none` so the text is
              selectable while ensuring that the gap between the text and the
              icon is visible. */}
          <span className="select-none"> </span>
          <View className="relative top-[1.75px] inline size-4 select-none align-text-top" />
        </span>
      </Drawer.Trigger>
      <Drawer.Content className="hide-scrollbar md:max-w-[40rem] md:border-x [&_[drawer-content]]:px-0 [&_[drawer-content]]:md:px-4">
        {title ? <Drawer.Title className="pl-4 md:pl-0">{title}</Drawer.Title> : null}
        {description ? (
          <Drawer.Description className="pl-4 md:pl-0">{description}</Drawer.Description>
        ) : null}
        <Article className="max-w-3xl" fullBleedCodeBlocks>
          {content}
        </Article>
      </Drawer.Content>
    </Drawer.Root>
  );
};
