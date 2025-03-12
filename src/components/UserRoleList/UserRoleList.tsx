import { useMemo, type FunctionComponent } from 'react';
import classNames from 'classnames';
import { UserRoleListItem } from './UserRoleListItem';
import { List } from '../common/List';
import type { EntityUser, User, UserRole } from '../../app/services/user';
import { sortUsers } from './utils/sortUsers';
import './UserRoleList.css';

const YOUR_INFORMATION = 'Your Information' as const;
const OTHER_USERS = 'Other Users' as const;
const NO_OTHER_USERS = 'No Other Users' as const;
const INVITE_NEW_USERS_ABOVE = 'Invite new users above' as const;

interface UserRoleListProps {
  className?: string;
  users: Array<EntityUser>;
  /** Both of these represent the same data. Leaving this here for clarity. */
  currentUserId: User['id'] | EntityUser['userId'];
  onRoleChange: (userId: EntityUser['id'], role: UserRole) => void;
  onRemoveUser: (userId: EntityUser['id']) => void;
}

export const UserRoleList: FunctionComponent<UserRoleListProps> = ({
  users,
  currentUserId,
  onRemoveUser,
  onRoleChange,
  className,
}) => {
  const sortedOtherUsers = useMemo(() => {
    const filteredUsers = users.filter((user) => user.userId !== currentUserId);
    return sortUsers(filteredUsers);
  }, [users, currentUserId]);

  const currentUser = useMemo(
    () => users.find((user) => user.userId === currentUserId),
    [users, currentUserId]
  );

  return (
    <div className={classNames('UserRoleList', className)}>
      <div className='UserRoleList__currentUserSection'>
        <div className='UserRoleList__caption'>{YOUR_INFORMATION}</div>
        {currentUser && (
          <UserRoleListItem
            user={currentUser}
            currentUser
            onChange={(newRole) => onRoleChange(currentUser.id, newRole)}
          />
        )}
      </div>
      <div className='UserRoleList__otherUsersSection'>
        <div className='UserRoleList__caption'>{OTHER_USERS}</div>
        {!sortedOtherUsers.length && (
          <div className='UserRoleList__noUsers'>
            <div className='UserRoleList__body1'>{NO_OTHER_USERS}</div>
            <div className='UserRoleList__caption'>
              {INVITE_NEW_USERS_ABOVE}
            </div>
          </div>
        )}
        {sortedOtherUsers.length > 0 && (
          <List disablePadding>
            {sortedOtherUsers.map((user) => (
              <UserRoleListItem
                key={user.id}
                user={user}
                onChange={(newRole) => onRoleChange(user.id, newRole)}
                onRemove={() => onRemoveUser(user.id)}
              />
            ))}
          </List>
        )}
      </div>
    </div>
  );
};
