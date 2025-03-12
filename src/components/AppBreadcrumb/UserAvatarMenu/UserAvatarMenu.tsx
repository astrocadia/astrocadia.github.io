import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Logout from '@mui/icons-material/Logout';
import { ListItemAvatar } from '@mui/material';
import cx from 'classnames';
import type { FunctionComponent } from 'react';
import { useCallback, useMemo } from 'react';
import { useGetUserQuery } from '../../../app/services/user';
import { useAppDispatch } from '../../../app/store';
import { logout } from '../../../utils/logout';
import { Avatar } from '../../common/Avatar';
import { Divider } from '../../common/Divider';
import { ListItem } from '../../common/ListItem';
import { ListItemIcon } from '../../common/ListItemIcon';
import { ListItemText } from '../../common/ListItemText';
import { Menu } from '../../common/Menu';
import { MenuItem } from '../../common/MenuItem';
import { useGumbandSupportWidget } from '../../common/hooks/useGumbandSupportWidget';
import { useMenu } from '../../common/hooks/useMenu';
import { BreadcrumbWrapper } from '../common/BreadcrumbWrapper';
import { UserAvatar } from '../../UserAvatar';
import './UserAvatarMenu.css';

export const UserAvatarMenu: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { data: user } = useGetUserQuery();
  const { anchorEl, open, handleOpenMenu, handleCloseMenu } = useMenu();
  const onOpenSupportTicketWindow = useGumbandSupportWidget();

  const fullName = useMemo(() => {
    const nameParts: Array<string> = [];
    if (user?.firstName) {
      nameParts.push(user.firstName);
    }
    if (user?.lastName) {
      nameParts.push(user.lastName);
    }

    return nameParts.join(' ');
  }, [user?.firstName, user?.lastName]);

  const handleOnOpenSupportTicketWindow = useCallback(() => {
    onOpenSupportTicketWindow();
  }, [onOpenSupportTicketWindow]);

  const handleLogout = useCallback(() => {
    logout(dispatch);
  }, [dispatch]);

  const avatar = useMemo(
    // Returning an Avatar if no user just so we have something to click on
    () => (user ? <UserAvatar user={user} /> : <Avatar />),
    [user]
  );

  return (
    <>
      <BreadcrumbWrapper
        aria-label='User menu'
        className={cx('UserAvatarMenu', open && 'UserAvatarMenu__open')}
        onClick={handleOpenMenu}
        selected={open}
      >
        {avatar}
        <ChevronRightIcon className='UserAvatarMenu__openIndicator' />
      </BreadcrumbWrapper>
      <Menu
        anchorEl={anchorEl}
        id='user-menu'
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        MenuListProps={{ autoFocusItem: false }}
      >
        <ListItem>
          <ListItemAvatar>{avatar}</ListItemAvatar>
          <ListItemText primary={fullName} secondary={user?.email} />
        </ListItem>
        <MenuItem onClick={handleOnOpenSupportTicketWindow}>
          <ListItemIcon>
            <HelpOutlineIcon fontSize='small' />
          </ListItemIcon>
          Submit a Ticket
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
};
