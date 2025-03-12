import {
  Select as MuiSelect,
  type SelectProps as MuiSelectProps,
} from '@mui/material';
import cx from 'classnames';
import { type FunctionComponent } from 'react';
import { ChevronIcon } from '../icons';
import './Select.css';

export type SelectProps = Omit<MuiSelectProps, 'color' | 'sx' | 'variant'>;

export const Select: FunctionComponent<SelectProps> = ({
  className,
  MenuProps = {},
  IconComponent = ChevronIcon,
  ...props
}) => (
  <MuiSelect
    className={cx('Select', className)}
    IconComponent={IconComponent}
    MenuProps={{
      ...MenuProps,
      className: cx('Select__Menu', MenuProps.className),
    }}
    {...props}
  />
);
