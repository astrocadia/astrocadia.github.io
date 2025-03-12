import {
  ListItemAvatar as MuiListItemAvatar,
  ListItemAvatarProps as MuiListItemAvatarProps,
} from '@mui/material';
import cx from 'classnames';
import { FunctionComponent } from 'react';

export type ListItemAvatarProps = MuiListItemAvatarProps;

export const ListItemAvatar: FunctionComponent<ListItemAvatarProps> = ({
  className,
  ...props
}) => (
  <MuiListItemAvatar className={cx('ListItemAvatar', className)} {...props} />
);
