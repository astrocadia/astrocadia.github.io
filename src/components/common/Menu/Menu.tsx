import { Menu as MUIMenu, type MenuProps as MUIMenuProps } from '@mui/material';
import cx from 'classnames';
import type { FunctionComponent } from 'react';
import './Menu.css';

export type MenuProps = MUIMenuProps;

export const Menu: FunctionComponent<MenuProps> = ({ className, ...props }) => (
  <MUIMenu className={cx('Menu', className)} {...props} />
);
