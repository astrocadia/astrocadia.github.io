import {
  Divider as MuiDivider,
  DividerProps as MuiDividerProps,
} from '@mui/material';
import { FunctionComponent } from 'react';

export type DividerProps = MuiDividerProps;

export const Divider: FunctionComponent<DividerProps> = (props) => (
  <MuiDivider {...props} />
);
