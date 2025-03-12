import {
  ListItemSecondaryAction as MuiListItemSecondaryAction,
  type ListItemSecondaryActionProps as MuiListItemSecondaryActionProps,
} from '@mui/material';
import type { FunctionComponent } from 'react';

export type ListItemSecondaryActionProps = Omit<
  MuiListItemSecondaryActionProps,
  'sx'
>;

export const ListItemSecondaryAction: FunctionComponent<
  ListItemSecondaryActionProps
> = (props) => <MuiListItemSecondaryAction {...props} />;
