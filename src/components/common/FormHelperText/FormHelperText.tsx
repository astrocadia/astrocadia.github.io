import {
  FormHelperText as MuiFormHelperText,
  type FormHelperTextProps as MuiFormHelperTextProps,
} from '@mui/material';
import cx from 'classnames';
import type { FunctionComponent } from 'react';
import './FormHelperText.css';

export type FormHelperTextProps = Omit<
  MuiFormHelperTextProps,
  'filled' | 'margin' | 'sx' | 'variant'
>;

export const FormHelperText: FunctionComponent<FormHelperTextProps> = ({
  className,
  ...props
}) => (
  <MuiFormHelperText className={cx('FormHelperText', className)} {...props} />
);
