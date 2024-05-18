import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from '.';

// -----------------------------------------------------------------------------
// Component props
// -----------------------------------------------------------------------------

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

export type TableRootProps = React.HTMLAttributes<HTMLTableElement> & {
  containerClassName?: string;
};

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement> & {
  isSubComponent?: boolean;
};

// -----------------------------------------------------------------------------
// Composition
// -----------------------------------------------------------------------------

export type TableComposition = {
  Body: typeof TableBody;
  Caption: typeof TableCaption;
  Cell: typeof TableCell;
  Footer: typeof TableFooter;
  Head: typeof TableHead;
  Header: typeof TableHeader;
  Root: typeof TableRoot;
  Row: typeof TableRow;
};
