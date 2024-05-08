'use client';

import { Button, Popover } from '@/components/ui';

export default function Page() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Open</Button>
      </Popover.Trigger>
      <Popover.Content className="max-w-[15rem]" hasArrow>
        Hello this is a popover with some additional information about something
      </Popover.Content>
    </Popover.Root>
  );
}
