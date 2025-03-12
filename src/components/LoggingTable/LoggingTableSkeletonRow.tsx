import { forwardRef } from 'react';
import cx from 'classnames';
import { TableRow } from '../common/table/TableRow';
import { TableCell } from '../common/table/TableCell';
import { Skeleton } from '../common/Skeleton';
import './LoggingTableSkeletonRow.css';

export interface LoggingTableSkeletonRowProps {
  className?: string;
}

export const LoggingTableSkeletonRow = forwardRef<
  HTMLTableRowElement,
  LoggingTableSkeletonRowProps
>(({ className }, ref) => (
  <TableRow className={cx('LoggingTableSkeletonRow', className)} ref={ref}>
    <TableCell className='LoggingTable__logLevelCell'>
      <div className='LoggingTable__logLevelWrapper'>
        <Skeleton variant='rounded' />
      </div>
    </TableCell>
    <TableCell className='LoggingTable__componentCell'>
      <Skeleton />
    </TableCell>
    <TableCell className='LoggingTable__timestampCell'>
      <Skeleton />
    </TableCell>
    <TableCell className='LoggingTable__messageCell' colSpan={2}>
      <Skeleton />
    </TableCell>
  </TableRow>
));

LoggingTableSkeletonRow.displayName = 'LoggingTableSkeletonRow';
