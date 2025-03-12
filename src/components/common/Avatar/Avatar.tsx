import {
  Avatar as MuiAvatar,
  AvatarProps as MuiAvatarProps,
} from '@mui/material';
import cx from 'classnames';
import { FunctionComponent } from 'react';

export type AvatarProps = MuiAvatarProps;

export const Avatar: FunctionComponent<AvatarProps> = ({
  className,
  ...props
}) => <MuiAvatar className={cx('Avatar', className)} {...props} />;
