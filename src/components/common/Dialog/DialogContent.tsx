import {
  DialogContent as MUIDialogContent,
  DialogContentProps as MUIDialogContentProps,
} from '@mui/material';
import cx from 'classnames';
import { FunctionComponent } from 'react';
import './DialogContent.css';

export type DialogContentProps = MUIDialogContentProps;

export const DialogContent: FunctionComponent<DialogContentProps> = ({
  className,
  ...props
}) => (
  <MUIDialogContent className={cx('DialogContent', className)} {...props} />
);
