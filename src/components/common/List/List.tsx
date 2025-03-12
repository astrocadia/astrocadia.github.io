import { List as MuiList, type ListProps as MuiListProps } from '@mui/material';
import { type FunctionComponent } from 'react';

export type ListProps = MuiListProps;

export const List: FunctionComponent<ListProps> = ({ ...rest }) => (
  <MuiList {...rest} />
);
