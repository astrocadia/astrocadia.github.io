import { forwardRef } from 'react';
import cx from 'classnames';
import {
  TableRow as MuiTableRow,
  TableRowProps as MuiTableRowProps,
} from '@mui/material';

export type TableRowProps = MuiTableRowProps;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <MuiTableRow className={cx('TableRow', className)} ref={ref} {...rest}>
        {children}
      </MuiTableRow>
    );
  }
);

TableRow.displayName = 'TableRow';
