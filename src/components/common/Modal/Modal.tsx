import type { FunctionComponent } from 'react';
import { ModalProps as MuiModalProps, Modal as MuiModal } from '@mui/material';
import classNames from 'classnames';

export interface ModalProps extends MuiModalProps {}

export const Modal: FunctionComponent<ModalProps> = ({
  className,
  ...props
}) => {
  return <MuiModal className={classNames('Modal', className)} {...props} />;
};
