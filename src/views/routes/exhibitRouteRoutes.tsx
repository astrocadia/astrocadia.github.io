import { redirect, type RouteObject } from 'react-router-dom';
import { ErrorView } from '../error/ErrorView';
import { ExhibitMainPanel } from '../mainPanel/ExhibitMainPanel';
import { UserProtectedRoute } from './common/UserProtectedRoute';
import {
  EXHIBIT_PATH,
  EXHIBIT_REDIRECT_PATH,
  generateExhibitPath,
} from './exhibitRoutePaths';

export const exhibitRoutes: Array<RouteObject> = [
  {
    path: EXHIBIT_PATH.coplanarSubpage,
    element: (
      <UserProtectedRoute>
        <ExhibitMainPanel />
      </UserProtectedRoute>
    ),
    errorElement: <ErrorView />,
  },
  {
    path: EXHIBIT_PATH.coplanar,
    element: (
      <UserProtectedRoute>
        <ExhibitMainPanel />
      </UserProtectedRoute>
    ),
    errorElement: <ErrorView />,
  },
  // Set up redirect to handle metrics rename incase people have it bookmarked
  {
    path: EXHIBIT_REDIRECT_PATH.metrics,
    loader: ({ params }) => {
      if (params.exhibitId) {
        return redirect(
          generateExhibitPath({
            exhibitId: params.exhibitId,
            tabId: 'analytics',
          })
        );
      }
      return redirect('/');
    },
    errorElement: <ErrorView />,
  },
  {
    path: EXHIBIT_PATH.tab,
    element: (
      <UserProtectedRoute>
        <ExhibitMainPanel />
      </UserProtectedRoute>
    ),
    errorElement: <ErrorView />,
  },
] as const;
