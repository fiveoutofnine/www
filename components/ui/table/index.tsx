import { forwardRef } from 'react';

import {
  tableBodyStyles,
  tableCaptionStyles,
  tableCellStyles,
  tableFooterStyles,
  tableHeaderStyles,
  tableHeadStyles,
  tableRootStyles,
  tableRowStyles,
} from './styles';
import type {
  TableBodyProps,
  TableCaptionProps,
  TableCellProps,
  TableComposition,
  TableFooterProps,
  TableHeaderProps,
  TableHeadProps,
  TableRootProps,
  TableRowProps,
} from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...rest }, ref) => (
    <tbody
      ref={ref}
      className={twMerge(clsx(tableBodyStyles, className))}
      table-body=""
      {...rest}
    />
  ),
);

export const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...rest }, ref) => (
    <caption
      ref={ref}
      className={twMerge(clsx(tableCaptionStyles, className))}
      table-caption=""
      {...rest}
    />
  ),
);

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...rest }, ref) => (
    <td ref={ref} className={twMerge(clsx(tableCellStyles, className))} table-cell="" {...rest} />
  ),
);

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...rest }, ref) => (
    <tfoot
      ref={ref}
      className={twMerge(clsx(tableFooterStyles, className))}
      table-footer=""
      {...rest}
    />
  ),
);

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...rest }, ref) => (
    <th ref={ref} className={twMerge(clsx(tableHeadStyles, className))} table-head="" {...rest} />
  ),
);

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...rest }, ref) => (
    <thead
      ref={ref}
      className={twMerge(clsx(tableHeaderStyles, className))}
      table-header=""
      {...rest}
    />
  ),
);

export const TableRoot = forwardRef<HTMLTableElement, TableRootProps>(
  ({ className, containerClassName, ...rest }, ref) => (
    <div className={twMerge(clsx('relative w-full overflow-auto', containerClassName))}>
      <table ref={ref} className={twMerge(clsx(tableRootStyles, className))} {...rest} />
    </div>
  ),
);

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, isSubComponent = false, ...rest }, ref) => (
    <tr
      ref={ref}
      className={twMerge(clsx(tableRowStyles, className))}
      table-row=""
      data-subcomponent={isSubComponent}
      {...rest}
    />
  ),
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

TableRoot.displayName = 'TableRoot';
TableBody.displayName = 'TableBody';
TableCaption.displayName = 'TableCaption';
TableCell.displayName = 'TableCell';
TableFooter.displayName = 'TableFooter';
TableHead.displayName = 'TableHead';
TableHeader.displayName = 'TableHeader';
TableRow.displayName = 'TableRow';

const Table: TableComposition = {
  Body: TableBody,
  Caption: TableCaption,
  Cell: TableCell,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Root: TableRoot,
  Row: TableRow,
};

export default Table;
