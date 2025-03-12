import { type FunctionComponent } from 'react';
import { EntityCardSkeleton } from '../../EntityCard';
import { Skeleton } from '../../common/Skeleton';
import './ExhibitCardSkeleton.css';

export const ExhibitCardSkeleton: FunctionComponent = () => (
  <EntityCardSkeleton className='ExhibitCardSkeleton'>
    <div className='ExhibitCardSkeleton__healthState'>
      <Skeleton
        className='ExhibitCardSkeleton__healthStateIcon'
        variant='rectangular'
      />
      <Skeleton
        className='ExhibitCardSkeleton__healthStateText'
        variant='rectangular'
      />
    </div>
  </EntityCardSkeleton>
);
