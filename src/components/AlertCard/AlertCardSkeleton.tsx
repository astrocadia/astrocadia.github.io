import { FunctionComponent } from 'react';
import cx from 'classnames';
import { Card, type CardProps } from '../common/Card';
import { Skeleton } from '../common/Skeleton';
import { CardContent } from '../common/CardContent';
import './AlertCardSkeleton.css';

export interface AlertCardSkeletonProps extends CardProps {
  className?: string;
}

export const AlertCardSkeleton: FunctionComponent<AlertCardSkeletonProps> = ({
  className,
}) => {
  return (
    <Card className={cx('AlertCardSkeleton', className)}>
      <CardContent>
        <div className='AlertCard__iconContainer'>
          <Skeleton variant='circular' className='AlertCard__iconSkeleton' />
        </div>
        <div className='AlertCard__titleContainer'>
          <Skeleton className='AlertCard__titleSkeleton' />
          <Skeleton className='AlertCard__subtitleSkeleton' />
        </div>
        <Skeleton
          variant='circular'
          className='AlertCard__recipientIndicatorSkeleton'
        />
      </CardContent>
    </Card>
  );
};
