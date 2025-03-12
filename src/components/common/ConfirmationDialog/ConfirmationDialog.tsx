import cx from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  type DialogProps,
} from '../Dialog';
import { Button, type ButtonProps } from '../buttons';
import './ConfirmationDialog.css';

export interface ConfirmationDialogProps {
  AcceptButtonProps?: Omit<ButtonProps, 'onClick'>;
  acceptText?: string;
  CancelButtonProps?: Omit<ButtonProps, 'onClick'>;
  cancelText?: string;
  className?: string;
  children?: ReactNode;
  DialogProps?: Omit<DialogProps, 'children' | 'onClose' | 'open'>;
  onAccept: () => void;
  onCancel: () => void;
  onClose: () => void;
  open: boolean;
  title?: string;
}

export const ConfirmationDialog: FunctionComponent<ConfirmationDialogProps> = ({
  AcceptButtonProps = {},
  acceptText = 'Accept',
  CancelButtonProps = {},
  cancelText = 'Cancel',
  className,
  children = 'Are you sure you want to proceed?',
  DialogProps = {},
  onClose,
  onAccept,
  onCancel,
  open,
  title = 'Confirmation',
}) => {
  return (
    <Dialog
      className={cx('ExhibitSettingsDialog', className)}
      open={open}
      onClose={onClose}
      {...DialogProps}
    >
      <DialogTitle title={title} />
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant='primary' onClick={onCancel} {...CancelButtonProps}>
          {cancelText}
        </Button>
        <Button variant='secondary' onClick={onAccept} {...AcceptButtonProps}>
          {acceptText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
