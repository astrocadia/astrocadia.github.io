import { FunctionComponent } from 'react';
import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material';
import cx from 'classnames';
import { CheckboxUncheckedIcon } from '../icons';
import './Checkbox.css';

export type CheckboxProps = MuiCheckboxProps;

export const Checkbox: FunctionComponent<CheckboxProps> = ({
  className,
  ...props
}) => {
  return (
    <MuiCheckbox
      className={cx('Checkbox', className)}
      disableRipple
      icon={<CheckboxUncheckedIcon className='Checkbox__icon' />}
      {...props}
    />
  );
};
