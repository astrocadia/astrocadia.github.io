import {
  CardContent as MUICardContent,
  CardContentProps as MUICardContentProps,
} from '@mui/material';
import cx from 'classnames';
import { FunctionComponent } from 'react';

export type CardContentProps = MUICardContentProps;

export const CardContent: FunctionComponent<CardContentProps> = ({
  className,
  ...props
}) => <MUICardContent className={cx('CardContent', className)} {...props} />;
