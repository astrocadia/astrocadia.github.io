import {
  CardActionArea as MUICardActionArea,
  CardActionAreaProps as MUICardActionAreaProps,
} from '@mui/material';
import { FunctionComponent } from 'react';

export type CardActionAreaProps = MUICardActionAreaProps;

export const CardActionArea: FunctionComponent<CardActionAreaProps> = (
  props
) => <MUICardActionArea {...props} />;
