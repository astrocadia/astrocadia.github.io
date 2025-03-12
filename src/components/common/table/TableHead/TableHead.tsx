import { FunctionComponent } from 'react';
import cx from 'classnames';
import {
  TableHead as MuiTableHead,
  TableHeadProps as MuiTableHeadProps,
} from '@mui/material';

export type TableHeadProps = MuiTableHeadProps;

export const TableHead: FunctionComponent<TableHeadProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <MuiTableHead className={cx('TableHead', className)} {...rest}>
      {children}
    </MuiTableHead>
  );
};
