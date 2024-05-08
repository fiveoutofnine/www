'use client';

import { Button, toast } from '@/components/ui';

export default function Page() {
  return (
    <Button
      intent="info"
      onClick={() =>
        toast({
          title: 'Title',
          description: 'Some short description.',
          action: {
            label: 'Action',
            onClick: () => {},
          },
          hasCloseButton: true,
        })
      }
    >
      Toast
    </Button>
  );
}
