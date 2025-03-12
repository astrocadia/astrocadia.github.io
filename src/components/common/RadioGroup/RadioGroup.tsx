import { type FunctionComponent } from 'react';
import {
  RadioGroup as MuiRadioGroup,
  type RadioGroupProps as MuiRadioGroupProps,
} from '@mui/material';
import cx from 'classnames';

export interface RadioGroupProps extends MuiRadioGroupProps {}

export const RadioGroup: FunctionComponent<RadioGroupProps> = ({
  className,
  ...rest
}) => {
  return <MuiRadioGroup className={cx('RadioGroup', className)} {...rest} />;
};
