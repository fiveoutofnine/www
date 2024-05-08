'use client';

import { TextArea } from '@/components/ui';

export default function Page() {
  return (
    <div className="max-w-lg p-8">
      <TextArea placeholder="Type some text..." resizable />
    </div>
  );
}
