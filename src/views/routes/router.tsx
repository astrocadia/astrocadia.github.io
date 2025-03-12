import { createBrowserRouter } from 'react-router-dom';
import { ErrorView } from '../error/ErrorView';
import { LoadDefaultView } from '../loadDefaultView/LoadDefaultView';
import { NotFoundView } from '../notFound/NotFoundView';
import { UserProtectedRoute } from './common/UserProtectedRoute';
import { exhibitRoutes } from './exhibitRouteRoutes';
import { projectRoutes } from './projectRouteRoutes';
import { unauthenticatedRoutes } from './unauthenticatedRoutes';
import { workspaceRoutes } from './workspaceRouteRoutes';

export const router = createBrowserRouter([
  ...unauthenticatedRoutes,
  {
    path: '/',
    element: (
      <UserProtectedRoute>
        <LoadDefaultView />
      </UserProtectedRoute>
    ),
    errorElement: <ErrorView />,
  },
  ...exhibitRoutes,
  ...projectRoutes,
  ...workspaceRoutes,
  {
    path: '*',
    element: (
      <UserProtectedRoute>
        <NotFoundView />
      </UserProtectedRoute>
    ),
  },
]);
