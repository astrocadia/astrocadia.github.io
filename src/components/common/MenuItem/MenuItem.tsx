import {
  MenuItem as MuiMenuItem,
  type MenuItemProps as MuiMenuItemProps,
  type SvgIconProps,
} from '@mui/material';
import cx from 'classnames';
import type { FunctionComponent, ReactElement, ReactNode } from 'react';
import { ListItemIcon } from '../ListItemIcon';
import './MenuItem.css';

export interface MenuItemProps extends Omit<MuiMenuItemProps, 'disableRipple'> {
  leadingIcon?: ReactElement<SvgIconProps>;
  secondaryAction?: ReactNode;
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  children,
  className,
  leadingIcon,
  secondaryAction,
  ...props
}) => (
  <MuiMenuItem className={cx('MenuItem', className)} disableRipple {...props}>
    {leadingIcon && <ListItemIcon>{leadingIcon}</ListItemIcon>}
    {children}
    {secondaryAction}
  </MuiMenuItem>
);
