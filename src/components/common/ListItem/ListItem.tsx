import {
  ListItem as MuiListItem,
  ListItemProps as MuiListItemProps,
} from '@mui/material';
import cx from 'classnames';
import { FunctionComponent } from 'react';

export type ListItemProps = MuiListItemProps;

export const ListItem: FunctionComponent<ListItemProps> = ({
  className,
  ...rest
}) => <MuiListItem className={cx('ListItem', className)} {...rest} />;
