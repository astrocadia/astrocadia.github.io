import {
  DialogActions as MUIDialogActions,
  DialogActionsProps as MUIDialogActionsProps,
} from '@mui/material';
import cx from 'classnames';
import { FunctionComponent } from 'react';
import './DialogActions.css';

export type DialogActionsProps = MUIDialogActionsProps;

export const DialogActions: FunctionComponent<DialogActionsProps> = ({
  className,
  ...props
}) => (
  <MUIDialogActions className={cx('DialogActions', className)} {...props} />
);
