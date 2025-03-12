import { FunctionComponent } from 'react';
import cx from 'classnames';
import {
  TableCell as MuiTableCell,
  TableCellProps as MuiTableCellProps,
} from '@mui/material';
import './TableCell.css';

export type TableCellProps = MuiTableCellProps;

export const TableCell: FunctionComponent<TableCellProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <MuiTableCell
      // Defining classes here so it's easier and more consistent to override
      // in custom tables.
      classes={{
        head: 'TableCell__head',
        body: 'TableCell__body',
        footer: 'TableCell__footer',
      }}
      className={cx('TableCell', className)}
      {...rest}
    >
      {children}
    </MuiTableCell>
  );
};
