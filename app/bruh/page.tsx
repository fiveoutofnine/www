'use client';

import { Switch } from '@/components/ui';

export default function Page() {
  return (
    <div className="p-8">
      <div className="flex items-center gap-2">
        <Switch />
        <label className="text-sm font-medium text-gray-11">lmaoo</label>
      </div>
      <Switch disabled />
    </div>
  );
}
