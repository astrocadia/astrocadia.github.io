import { FunctionComponent } from 'react';
import cx from 'classnames';
import { Table as MuiTable, TableProps as MuiTableProps } from '@mui/material';
import './Table.css';

export interface TableProps extends MuiTableProps {}

export const Table: FunctionComponent<TableProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <MuiTable className={cx('Table', className)} {...rest}>
      {children}
    </MuiTable>
  );
};
