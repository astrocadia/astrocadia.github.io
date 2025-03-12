import { type FunctionComponent } from 'react';
import { EntityCardSkeleton } from '../../EntityCard';
import { Skeleton } from '../../common/Skeleton';
import './ProjectCardSkeleton.css';

export const ProjectCardSkeleton: FunctionComponent = () => (
  <EntityCardSkeleton className='ProjectCardSkeleton'>
    <Skeleton className='ProjectCardSkeleton__exhibitCount' />
  </EntityCardSkeleton>
);
