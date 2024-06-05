import { calloutIconContainerVariants, calloutIconVariants, calloutVariants } from './styles';
import type { CalloutProps } from './types';
import clsx from 'clsx';
import { AlertCircle, CheckCircle2, Info, Lightbulb, XCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Callout: React.FC<CalloutProps> = ({
  className,
  size = 'md',
  intent = 'info',
  icon,
  children,
}) => {
  const Icon = icon
    ? icon
    : intent === 'info'
      ? Info
      : intent === 'success'
        ? CheckCircle2
        : intent === 'fail'
          ? XCircle
          : intent === 'warning'
            ? AlertCircle
            : Lightbulb;

  return (
    <div className={twMerge(clsx(calloutVariants({ size, intent }), className))} mdx-callout="">
      <span className={calloutIconContainerVariants({ size })}>
        <Icon className={calloutIconVariants({ size, intent })} />
      </span>
      <span mdx-callout-content="">{children}</span>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Callout.displayName = 'Callout';

export default Callout;
