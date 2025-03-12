import {
  ListItemIcon as MuiListItemIcon,
  ListItemIconProps as MuiListItemIconProps,
} from '@mui/material';
import { FunctionComponent } from 'react';

export type ListItemIconProps = MuiListItemIconProps;

export const ListItemIcon: FunctionComponent<ListItemIconProps> = (props) => (
  <MuiListItemIcon {...props} />
);
