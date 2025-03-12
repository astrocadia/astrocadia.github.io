import { memo, useMemo, type FunctionComponent } from 'react';
import cx from 'classnames';
import { Avatar, type AvatarProps } from '../common/Avatar';
import type { User } from '../../app/services/user';
import { stringToColorPaletteName } from './utils/color';
import './UserAvatar.css';

const PALETTE_CLASS_PREFIX = 'UserAvatar__palette__' as const;

export interface UserAvatarProps extends Omit<AvatarProps, 'src'> {
  // Picking properties from User type so we can use ExhibitUser type
  user: Pick<User, 'firstName' | 'lastName' | 'email' | 'profile_image'>;
  className?: string;
}

export const UserAvatar: FunctionComponent<UserAvatarProps> = memo(
  ({ user, className, ...rest }) => {
    const userInitial = useMemo(() => {
      const initial =
        user.firstName?.[0] || user.lastName?.[0] || user.email[0];
      return initial.toUpperCase();
    }, [user.email, user.firstName, user.lastName]);

    const fullName = useMemo(() => {
      return [user.firstName, user.lastName].filter(Boolean).join(' ');
    }, [user?.firstName, user?.lastName]);

    const paletteClass = useMemo(() => {
      const palette = stringToColorPaletteName(fullName || user.email);
      return `${PALETTE_CLASS_PREFIX}${palette}`;
    }, [fullName, user.email]);

    return (
      <Avatar
        src={user.profile_image}
        slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
        alt={fullName}
        className={cx('UserAvatar', className, paletteClass)}
        {...rest}
      >
        {userInitial}
      </Avatar>
    );
  }
);

UserAvatar.displayName = 'UserAvatar';
