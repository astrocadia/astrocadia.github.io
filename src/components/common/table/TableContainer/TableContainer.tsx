import { FunctionComponent } from 'react';
import cx from 'classnames';
import {
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps,
} from '@mui/material';
import './TableContainer.css';

export type TableContainerProps = MuiTableContainerProps;

export const TableContainer: FunctionComponent<TableContainerProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <MuiTableContainer className={cx('TableContainer', className)} {...rest}>
      {children}
    </MuiTableContainer>
  );
};
