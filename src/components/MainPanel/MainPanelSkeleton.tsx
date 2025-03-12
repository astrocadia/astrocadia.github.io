import { AppBreadcrumbSkeleton } from '../AppBreadcrumb/AppBreadcrumbSkeleton';
import { CircularProgress } from '../common/CircularProgress';
import './MainPanelSkeleton.css';

export const MainPanelSkeleton = () => (
  <div className='MainPanelSkeleton'>
    <AppBreadcrumbSkeleton />
    <div className='MainPanelSkeleton__contentWrapper'>
      <CircularProgress
        size='2rem'
        thickness={3}
        className='MainPanelSkeleton__spinner'
      />
    </div>
  </div>
);
