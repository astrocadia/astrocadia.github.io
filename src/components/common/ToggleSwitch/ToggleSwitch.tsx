import {
  Switch as MuiSwitch,
  type SwitchProps as MuiSwitchProps,
} from '@mui/material';

import { type FunctionComponent } from 'react';
import cx from 'classnames';
import './ToggleSwitch.css';

export interface ToggleSwitchProps
  extends Omit<MuiSwitchProps, 'sx' | 'variant' | 'size' | 'icon'> {
  size?: 'small' | 'medium';
}

export const ToggleSwitch: FunctionComponent<ToggleSwitchProps> = ({
  className,
  size = 'medium',
  checkedIcon,
  ...rest
}) => (
  <MuiSwitch
    size={size}
    className={cx(
      'ToggleSwitch',
      { ToggleSwitch__small: size === 'small' },
      className
    )}
    disableRipple
    checkedIcon={
      // This wrapper is necessary to apply certain fill colors
      <span className='MuiSwitch-thumb'>{checkedIcon}</span>
    }
    {...rest}
  />
);
