import { Outlet } from 'react-router-dom';
import { AppBreadcrumb } from '../../components/AppBreadcrumb';

// TODO: Using random workspaceId and projectId for now
/**
 * @deprecated
 */
export const RootWorkspace = () => (
  <>
    <AppBreadcrumb workspaceId={1} projectId={2} exhibitId={3} />
    <Outlet />
  </>
);
