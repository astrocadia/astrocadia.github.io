import { type FunctionComponent } from 'react';
import {
  Radio as MuiRadio,
  type RadioProps as MuiRadioProps,
} from '@mui/material';
import cx from 'classnames';
import './Radio.css';

export interface RadioProps extends MuiRadioProps {}

export const Radio: FunctionComponent<RadioProps> = ({
  className,
  disableTouchRipple = true,
  ...rest
}) => {
  return (
    <MuiRadio
      className={cx('Radio', className)}
      disableTouchRipple={disableTouchRipple}
      {...rest}
    />
  );
};
