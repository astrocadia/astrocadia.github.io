import {
  InputLabel as MuiInputLabel,
  type InputLabelProps as MuiInputLabelProps,
} from '@mui/material';
import cx from 'classnames';
import { type FunctionComponent } from 'react';
import './InputLabel.css';

export type InputLabelProps = Omit<
  MuiInputLabelProps,
  'color' | 'disableAnimation' | 'margin' | 'sx' | 'variant'
>;

export const InputLabel: FunctionComponent<InputLabelProps> = ({
  className,
  ...props
}) => (
  <MuiInputLabel
    className={cx('InputLabel', className)}
    disableAnimation
    {...props}
  />
);
