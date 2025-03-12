import {
  CircularProgress as MUICircularProgress,
  type CircularProgressProps as MUICircularProgressProps,
} from '@mui/material';
import type { FunctionComponent } from 'react';
import cx from 'classnames';
import './CircularProgress.css';

export type CircularProgressProps = MUICircularProgressProps;

export const CircularProgress: FunctionComponent<CircularProgressProps> = ({
  'aria-label': ariaLabel = 'Loading',
  className,
  ...props
}) => (
  <MUICircularProgress
    aria-label={ariaLabel}
    className={cx('CircularProgress', className)}
    {...props}
  />
);
