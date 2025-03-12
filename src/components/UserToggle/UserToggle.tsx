import { useCallback, useMemo, type FunctionComponent } from 'react';
import cx from 'classnames';
import type { EntityUser, User } from '../../app/services/user';
import {
  ToggleSwitch,
  type ToggleSwitchProps,
} from '../common/ToggleSwitch/ToggleSwitch';
import { UserAvatar } from '../UserAvatar';
import { getUserFullName } from '../UserRoleList/utils/sortUsers';
import { Tooltip } from '../common/Tooltip';
import { UserToggleSkeleton } from './UserToggleSkeleton'; // Import the new skeleton component
import './UserToggle.css';

export const YOU_LABEL = ' (you)' as const;

export interface UserToggleProps {
  className?: string;
  isCurrentUser?: boolean;
  loading?: boolean;
  onChange: (value: boolean) => void;
  user: EntityUser | User;
  value: boolean;
}

export const UserToggle: FunctionComponent<UserToggleProps> = ({
  className,
  user,
  isCurrentUser,
  value,
  onChange,
  loading = false,
}) => {
  const labels: {
    label: string;
    caption?: string;
  } = useMemo(() => {
    const fullName = getUserFullName(user);
    const label = `${fullName || user.email}`;
    const caption = fullName ? user.email : undefined;

    return { label, caption };
  }, [user]);

  const labelSuffix = useMemo(() => {
    return isCurrentUser ? YOU_LABEL : '';
  }, [isCurrentUser]);

  const toggleSwitchSize: ToggleSwitchProps['size'] = useMemo(() => {
    return isCurrentUser ? 'medium' : 'small';
  }, [isCurrentUser]);

  const handleChange = useCallback(() => {
    onChange(!value);
  }, [onChange, value]);

  if (loading) {
    return (
      <UserToggleSkeleton className={className} isCurrentUser={isCurrentUser} />
    );
  }

  return (
    <div
      className={cx('UserToggle', className, {
        UserToggle__selected: value,
        UserToggle__currentUser: isCurrentUser,
      })}
    >
      <div className='UserToggle__userDetailsContainer'>
        <UserAvatar user={user} />
        <div className='UserToggle__labelContainer'>
          <Tooltip title={labels.label}>
            <div className='UserToggle__labelWrapper'>
              <div className='UserToggle__label'>{labels.label}</div>
              {labelSuffix && (
                <div className='UserToggle__labelSuffix'>{labelSuffix}</div>
              )}
            </div>
          </Tooltip>
          {labels.caption && (
            <Tooltip title={labels.caption}>
              <div className='UserToggle__caption'>{labels.caption}</div>
            </Tooltip>
          )}
        </div>
      </div>
      <ToggleSwitch
        checked={value}
        onChange={handleChange}
        size={toggleSwitchSize}
      />
    </div>
  );
};
