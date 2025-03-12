import { forwardRef } from 'react';
import cx from 'classnames';
import { Skeleton } from '../../../../../../common/Skeleton';
import './CustomHardwarePropertyArraySkeletonRow.css';

export interface CustomHardwarePropertyArraySkeletonRowProps {
  className?: string;
}

export const CustomHardwarePropertyArraySkeletonRow = forwardRef<
  HTMLDivElement,
  CustomHardwarePropertyArraySkeletonRowProps
>(({ className }, ref) => (
  <div
    className={cx('CustomHardwarePropertyArraySkeletonRow', className)}
    ref={ref}
  >
    <Skeleton className='CustomHardwarePropertyArraySkeletonRow__index' />
    <Skeleton className='CustomHardwarePropertyArraySkeletonRow__field' />
  </div>
));

CustomHardwarePropertyArraySkeletonRow.displayName =
  'CustomHardwarePropertyArraySkeletonRow';
