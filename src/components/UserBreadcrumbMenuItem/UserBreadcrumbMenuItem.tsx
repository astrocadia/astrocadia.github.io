import { type FunctionComponent } from 'react';
import cx from 'classnames';
import { MenuItem, type MenuItemProps } from '../common/MenuItem';
import { GroupIcon } from '../common/icons';
import { ListItemText } from '../common/ListItemText';

const LABEL = 'Users' as const;

export interface UserBreadcrumbMenuItemProps extends MenuItemProps {}

export const UserBreadcrumbMenuItem: FunctionComponent<
  UserBreadcrumbMenuItemProps
> = ({ className, ...rest }) => {
  return (
    <div className={cx('UserBreadcrumbMenuItem', className)}>
      <MenuItem leadingIcon={<GroupIcon fontSize='small' />} {...rest}>
        <ListItemText primary={LABEL} />
      </MenuItem>
    </div>
  );
};
