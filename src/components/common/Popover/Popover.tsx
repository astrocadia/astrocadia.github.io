import {
  Popover as MuiPopover,
  type PopoverProps as MuiPopoverProps,
} from '@mui/material';
import { type FunctionComponent } from 'react';
import cx from 'classnames';
import './Popover.css';

export type PopoverProps = Omit<MuiPopoverProps, 'sx'>;

export const Popover: FunctionComponent<PopoverProps> = ({
  className,
  ...rest
}) => <MuiPopover className={cx('Popover', className)} {...rest} />;
