import { Button, toast } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ToastButtonProps = {
  title?: string;
  description: string;
  intent?: 'none' | 'info' | 'success' | 'fail' | 'warning';
  action?: React.ReactElement;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ToastButton: React.FC<ToastButtonProps> = ({
  title = 'Title',
  description = 'Swipe right to remove.',
  intent,
  action,
  ...rest
}) => {
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
