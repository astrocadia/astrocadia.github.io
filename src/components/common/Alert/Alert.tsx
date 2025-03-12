import { Alert as MUIAlert, AlertProps as MUIAlertProps } from '@mui/material';
import { FunctionComponent } from 'react';
import cx from 'classnames';
import './Alert.css';

export type AlertProps = MUIAlertProps;

export const Alert: FunctionComponent<AlertProps> = ({
  className,
  ...props
}) => <MUIAlert className={cx('Alert', className)} {...props} />;
