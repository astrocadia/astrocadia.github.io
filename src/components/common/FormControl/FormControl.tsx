import {
  FormControl as MuiFormControl,
  type FormControlProps as MuiFormControlProps,
} from '@mui/material';
import cx from 'classnames';
import { type FunctionComponent } from 'react';
import './FormControl.css';

export interface FormControlProps
  extends Omit<MuiFormControlProps, 'color' | 'margin' | 'sx' | 'variant'> {
  orientation?: 'horizontal' | 'vertical';
}

export const FormControl: FunctionComponent<FormControlProps> = ({
  className,
  orientation,
  ...props
}) => (
  <MuiFormControl
    className={cx('FormControl', className, {
      FormControl__horizontal: orientation === 'horizontal',
    })}
    {...props}
  />
);
