import {
  Drawer as MUIDrawer,
  DrawerProps as MUIDrawerProps,
} from '@mui/material';
import { FunctionComponent } from 'react';

export type DrawerProps = MUIDrawerProps;

export const Drawer: FunctionComponent<DrawerProps> = (props) => (
  <MUIDrawer {...props} />
);
