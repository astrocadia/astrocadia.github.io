import { type FunctionComponent } from 'react';
import {
  FormControlLabel as MuiFormControlLabel,
  type FormControlLabelProps as MuiFormControlLabelProps,
} from '@mui/material';
import cx from 'classnames';
import './FormControlLabel.css';

export interface FormControlLabelProps extends MuiFormControlLabelProps {}

export const FormControlLabel: FunctionComponent<FormControlLabelProps> = ({
  className,
  ...rest
}) => {
  return (
    <MuiFormControlLabel
      className={cx('FormControlLabel', className)}
      {...rest}
    />
  );
};
