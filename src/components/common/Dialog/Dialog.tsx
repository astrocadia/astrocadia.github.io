import {
  Dialog as MUIDialog,
  DialogProps as MUIDialogProps,
} from '@mui/material';
import cx from 'classnames';
import { FunctionComponent } from 'react';
import { useMobileMediaQuery } from '../hooks/useMobileMediaQuery';
import './Dialog.css';

export interface DialogProps extends Omit<MUIDialogProps, 'PaperProps'> {
  PaperProps?: Omit<MUIDialogProps['PaperProps'], 'elevation'>;
}

export const Dialog: FunctionComponent<DialogProps> = ({
  className,
  fullScreen,
  PaperProps,
  ...props
}) => {
  const mobile = useMobileMediaQuery();

  return (
    <MUIDialog
      className={cx('Dialog', className)}
      fullScreen={fullScreen || mobile}
      PaperProps={{ ...PaperProps, elevation: 0 }}
      {...props}
    />
  );
};
