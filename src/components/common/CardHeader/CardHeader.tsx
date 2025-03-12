import {
  CardHeader as MUICardHeader,
  type CardHeaderProps as MUICardHeaderProps,
} from '@mui/material';
import type { FunctionComponent } from 'react';

export type CardHeaderProps = Omit<
  MUICardHeaderProps,
  'disableTypography' | 'sx'
>;

export const CardHeader: FunctionComponent<CardHeaderProps> = (props) => (
  <MUICardHeader disableTypography {...props} />
);
