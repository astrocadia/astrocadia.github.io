import cx from 'classnames';
import { Skeleton } from '../common/Skeleton';
import './EntityCardSkeleton.css';

export interface EntityCardSkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export const EntityCardSkeleton: React.FunctionComponent<
  EntityCardSkeletonProps
> = ({ className, children }) => (
  <div className={cx('EntityCardSkeleton', className)}>
    <Skeleton className='EntityCardSkeleton__banner' variant='rectangular' />
    <div className='EntityCardSkeleton__content'>
      <div className='EntityCardSkeleton__header'>
        <Skeleton
          className='EntityCardSkeleton__headerText'
          variant='rounded'
        />
      </div>
      {children}
    </div>
  </div>
);
