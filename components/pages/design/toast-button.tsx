import type { FC, ReactElement } from 'react';

import { Button, useToast } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ToastButtonProps = {
  title?: string;
  description: string;
  intent?: 'none' | 'primary' | 'success' | 'fail' | 'warning';
  action?: ReactElement;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ToastButton: FC<ToastButtonProps> = ({
  title = 'Title',
  description = 'Swipe right to remove.',
  intent,
  action,
  ...rest
}) => {
  const { toast } = useToast();
  return (
    <Button
      intent={intent}
      onClick={() => toast({ title, description, intent, action })}
      {...rest}
    />
  );
};

ToastButton.displayName = 'ToastButton';

export default ToastButton;
