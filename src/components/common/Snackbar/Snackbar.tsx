import { type FunctionComponent } from 'react';
import {
  Snackbar as MuiSnackbar,
  type SnackbarProps as MuiSnackbarProps,
} from '@mui/material';
import cx from 'classnames';

export interface SnackbarProps extends MuiSnackbarProps {}

/** @link https://mui.com/material-ui/react-snackbar */
export const Snackbar: FunctionComponent<SnackbarProps> = ({
  className,
  ...rest
}) => {
  return <MuiSnackbar className={cx('Snackbar', className)} {...rest} />;
};
