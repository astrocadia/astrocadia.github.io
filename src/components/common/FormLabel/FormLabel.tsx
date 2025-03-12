import {
  FormLabel as MUIFormLabel,
  type FormLabelProps as MUIFormLabelProps,
} from '@mui/material';
import cx from 'classnames';
import { FunctionComponent } from 'react';
import './FormLabel.css';

export type FormLabelProps = Omit<
  MUIFormLabelProps,
  'color' | 'cx' | 'variant' | 'size'
>;

export const FormLabel: FunctionComponent<FormLabelProps> = ({
  className,
  ...props
}) => <MUIFormLabel className={cx('FormLabel', className)} {...props} />;
