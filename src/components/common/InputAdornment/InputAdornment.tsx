import {
  InputAdornment as MuiInputAdornment,
  type InputAdornmentProps as MuiInputAdornmentProps,
} from '@mui/material';
import cx from 'classnames';
import { type FunctionComponent } from 'react';
import './InputAdornment.css';

export type InputAdornmentProps = Omit<
  MuiInputAdornmentProps,
  'sx' | 'variant'
>;

export const InputAdornment: FunctionComponent<InputAdornmentProps> = ({
  className,
  ...props
}) => (
  <MuiInputAdornment className={cx('InputAdornment', className)} {...props} />
);
