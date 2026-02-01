'use client';

import { Button, toast } from '@/components/ui';
import type { ToastProps } from '@/components/ui/toast/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ToastButtonProps = ToastProps & {
  children?: React.ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ToastButton: React.FC<ToastButtonProps> = ({ children, intent, ...toastPropsRest }) => {
  const toastProps: ToastProps = {
    intent: intent || 'info',
    title: toastPropsRest.title || 'Title',
    description: toastPropsRest.description || 'Some short description.',
    hasCloseButton: toastPropsRest.hasCloseButton || true,
    ...toastPropsRest,
  };

  return (
    <Button intent={intent} onClick={() => toast({ ...toastProps })}>
      {children}
    </Button>
  );
};

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

ToastButton.displayName = 'ToastButton';

export default ToastButton;
