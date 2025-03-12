import {
  Skeleton as MuiSkeleton,
  type SkeletonProps as MuiSkeletonProps,
} from '@mui/material';
import cx from 'classnames';
import type { FunctionComponent } from 'react';
import './Skeleton.css';

export type SkeletonProps = Omit<MuiSkeletonProps, 'sx'>;

export const Skeleton: FunctionComponent<SkeletonProps> = ({
  className,
  ...props
}) => <MuiSkeleton className={cx('Skeleton', className)} {...props} />;
