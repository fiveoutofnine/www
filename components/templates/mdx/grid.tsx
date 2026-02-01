import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const GridRoot: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'relative grid w-full grid-cols-1 overflow-hidden rounded-lg',
          'before:absolute before:h-full before:w-full before:rounded-lg before:border before:border-gray-6 before:content-[""]',
          className,
        ),
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

const GridCell: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...rest }) => {
  return (
    <div
      className={twMerge(clsx('border-b border-r border-gray-6 p-3', className))}
      mdx-grid-cell=""
      {...rest}
    >
      {children}
    </div>
  );
};

const GridCellTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'not-prose mb-2 whitespace-pre text-base font-semibold text-gray-12',
          '[&>*]:mb-2 [&>*]:flex [&>*]:items-center [&>*]:whitespace-pre [&>*]:text-base [&>*]:font-semibold [&>*]:text-gray-12',
          className,
        ),
      )}
      mdx-grid-cell-title=""
      {...rest}
    >
      {children}
    </div>
  );
};

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

const Grid = {
  Cell: GridCell,
  CellTitle: GridCellTitle,
  Root: GridRoot,
};

export default Grid;
