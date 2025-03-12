import { useMemo, type FunctionComponent } from 'react';
import classNames from 'classnames';
import {
  UserSelectWithRemove,
  type UserSelectWithRemoveProps,
} from '../UserSelectWithRemove';
import { ListItem } from '../common/ListItem';
import { ListItemAvatar } from '../common/ListItemAvatar';
import { ListItemText } from '../common/ListItemText';
import { UserAvatar } from '../UserAvatar';
import type { EntityUser } from '../../app/services/user';
import './UserRoleListItem.css';

const YOU_SUFFIX = ' (you)' as const;

export interface UserRoleListItemProps {
  user: EntityUser;
  currentUser?: boolean;
  onChange: UserSelectWithRemoveProps['onChange'];
  onRemove?: (user: EntityUser) => void;
  className?: string;
}

export const UserRoleListItem: FunctionComponent<UserRoleListItemProps> = ({
  user,
  currentUser,
  onChange,
  onRemove,
  className,
}) => {
  const userFullName = useMemo(() => {
    return [user.firstName, user.lastName].filter(Boolean).join(' ');
  }, [user.firstName, user.lastName]);

  const displayName = useMemo(() => {
    const suffix = currentUser ? YOU_SUFFIX : '';
    return userFullName ? `${userFullName}${suffix}` : `${user.email}${suffix}`;
  }, [currentUser, userFullName, user.email]);

  const handleDelete = useMemo(
    () => (onRemove ? () => onRemove(user) : undefined),
    [onRemove, user]
  );

  return (
    <ListItem
      className={classNames('UserRoleListItem', className)}
      disablePadding
    >
      <div className='UserRoleListItem__personalDetails'>
        <ListItemAvatar>
          <UserAvatar user={user} alt={`${userFullName} Avatar`} />
        </ListItemAvatar>
        <ListItemText primary={displayName} secondary={user.email} />
      </div>
      <UserSelectWithRemove
        value={user.role}
        onChange={onChange}
        onDelete={handleDelete}
      />
    </ListItem>
  );
};
