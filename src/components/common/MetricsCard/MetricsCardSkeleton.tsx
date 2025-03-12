import cx from 'classnames';
import { type FunctionComponent } from 'react';
import { Card } from '../Card';
import { Skeleton } from '../Skeleton';
import './MetricsCardSkeleton.css';
import { type MetricsCardVariant } from './common/metricsCard';

export interface MetricsCardSkeletonProps {
  className?: string;
  variant?: MetricsCardVariant;
}

export const MetricsCardSkeleton: FunctionComponent<
  MetricsCardSkeletonProps
> = ({ className, variant = 'numerical' }) => (
  <Card
    className={cx(
      'MetricsCardSkeleton',
      `MetricsCardSkeleton__${variant}`,
      className
    )}
  >
    <div className='MetricsCardSkeleton__headingWrapper'>
      <Skeleton className='MetricsCardSkeleton__title' variant='text' />
      <Skeleton className='MetricsCardSkeleton__subtitle' variant='text' />
    </div>
    <Skeleton className='MetricsCardSkeleton__value' variant='text' />
  </Card>
);
