import { ErrorView } from '../error/ErrorView';
import { ProjectMainPanel } from '../mainPanel/ProjectMainPanel';
import { UserProtectedRoute } from './common/UserProtectedRoute';

export const projectRoutes = [
  {
    path: 'project/:projectId/:tabId?',
    element: (
      <UserProtectedRoute>
        <ProjectMainPanel />
      </UserProtectedRoute>
    ),
    errorElement: <ErrorView />,
  },
] as const;
