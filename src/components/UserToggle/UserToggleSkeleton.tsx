import { FunctionComponent } from 'react';
import cx from 'classnames';
import { Skeleton } from '../common/Skeleton';
import './UserToggleSkeleton.css';

export interface UserToggleSkeletonProps {
  className?: string;
  isCurrentUser?: boolean;
}

export const UserToggleSkeleton: FunctionComponent<UserToggleSkeletonProps> = ({
  className,
  isCurrentUser = false,
}) => {
  return (
    <div
      className={cx('UserToggle', 'UserToggleSkeleton', className, {
        UserToggle__currentUser: isCurrentUser,
      })}
    >
      <div className='UserToggle__userDetailsContainer'>
        <Skeleton
          variant='circular'
          className='UserToggleSkeleton__avatarSkeleton'
        />
        <div className='UserToggle__labelContainer'>
          <Skeleton
            variant='rounded'
            className='UserToggleSkeleton__labelSkeleton'
          />
          <Skeleton className='UserToggleSkeleton__captionSkeleton' />
        </div>
      </div>
      <Skeleton
        variant='circular'
        className='UserToggleSkeleton__toggleSwitchSkeleton'
      />
    </div>
  );
};
