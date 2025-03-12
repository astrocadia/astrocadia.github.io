import { ErrorView } from '../error/ErrorView';
import { WorkspaceMainPanel } from '../mainPanel/WorkspaceMainPanel';
import { UserProtectedRoute } from './common/UserProtectedRoute';
import { WORKSPACE_PATH } from './workspaceRoutePaths';

export const workspaceRoutes = [
  {
    path: WORKSPACE_PATH.tab,
    element: (
      <UserProtectedRoute>
        <WorkspaceMainPanel />
      </UserProtectedRoute>
    ),
    errorElement: <ErrorView />,
  },
] as const;
