import { type FC, useMemo } from 'react';

import clsx from 'clsx';

/* Props */
type DesignComponentsDisplayProps = JSX.IntrinsicElements['div'] & {
  columns?: (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12)[];
};

/* Component */
const DesignComponentsDisplay: FC<DesignComponentsDisplayProps> = ({
  columns = [2, 4],
  children,
  ...rest
}) => {
  const columnClasses = useMemo(
    () =>
      columns
        .splice(0, 5)
        .map((column, index) => {
          const columnClass = `grid-cols-${column}`;

          return index === 4
            ? `2xl:${columnClass}`
            : index === 3
            ? `xl:${columnClass}`
            : index === 2
            ? `lg:${columnClass}`
            : index === 1
            ? `md:${columnClass}`
            : columnClass;
        })
        .join(' '),
    [columns],
  );

  return (
    <div
      className={clsx(
        'grid w-full gap-4 rounded-xl border border-gray-6 bg-gray-2 p-8',
        columnClasses,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default DesignComponentsDisplay;
