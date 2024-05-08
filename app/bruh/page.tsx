'use client';

import { Button, TextArea } from '@/components/ui';

export default function Page() {
  return (
    <div className="flex max-w-sm flex-col gap-4 p-4">
      <Button>Button</Button>
      <div className="flex flex-col gap-1">
        <label className="text-xs leading-4 text-gray-11">Label</label>
        <TextArea className="h-24" placeholder="Type some text..." />
      </div>
    </div>
  );
}
