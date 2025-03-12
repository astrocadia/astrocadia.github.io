import { type FunctionComponent } from 'react';
import { EntityCardSkeleton } from '../../../EntityCard';
import { Skeleton } from '../../../common/Skeleton';
import './ExhibitComponentCardSkeleton.css';

export const ExhibitComponentCardSkeleton: FunctionComponent = () => (
  <EntityCardSkeleton className='ExhibitComponentCardSkeleton'>
    <div className='ExhibitComponentCardSkeleton__content'>
      <Skeleton
        variant='rectangular'
        className='ExhibitComponentCardSkeleton__icon'
      />
      <Skeleton
        variant='rounded'
        className='ExhibitComponentCardSkeleton__label'
      />
    </div>
  </EntityCardSkeleton>
);
