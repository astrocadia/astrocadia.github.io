import {
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps,
} from '@mui/material';
import cx from 'classnames';
import { FunctionComponent } from 'react';

export type ListItemTextProps = MuiListItemTextProps;

export const ListItemText: FunctionComponent<ListItemTextProps> = ({
  className,
  ...props
}) => <MuiListItemText className={cx('ListItemText', className)} {...props} />;
