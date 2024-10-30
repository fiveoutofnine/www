import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type FeatureDisplayMinimalProps = {
  className?: string;
  name: string;
  description: string;
  symbol: React.ReactNode;
  button: React.ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const FeatureDisplayMinimal: React.FC<FeatureDisplayMinimalProps> = ({
  className,
  name,
  description,
  symbol,
  button,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'flex h-[4.5rem] items-center justify-between rounded-xl border border-gray-6 bg-gray-2 px-4',
          className,
        ),
      )}
    >
      <div className="flex items-center">
        {/* Symbol */}
        <div className="flex size-10 min-w-10 items-center justify-center rounded border border-gray-6 bg-gray-3 p-2 text-gray-11">
          <div className="flex size-6 items-center justify-center">{symbol}</div>
        </div>
        {/* Name + description */}
        <div className="ml-2.5 mr-2">
          <div className="line-clamp-1 text-ellipsis font-medium text-gray-12">{name}</div>
          <div className="line-clamp-1 text-ellipsis text-sm text-gray-11">{description}</div>
        </div>
      </div>

      {/* Button */}
      {button}
    </div>
  );
};

export default FeatureDisplayMinimal;
