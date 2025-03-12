import { FunctionComponent } from 'react';
import cx from 'classnames';
import {
  TableBody as MuiTableBody,
  TableBodyProps as MuiTableBodyProps,
} from '@mui/material';

export type TableBodyProps = MuiTableBodyProps;

export const TableBody: FunctionComponent<TableBodyProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <MuiTableBody className={cx('TableBody', className)} {...rest}>
      {children}
    </MuiTableBody>
  );
};
