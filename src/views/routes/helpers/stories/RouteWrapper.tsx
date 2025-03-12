import type { FunctionComponent, ReactNode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const RouteWrapper: FunctionComponent<Props> = ({ children }) => (
  <RouterProvider
    router={createBrowserRouter([
      {
        path: '*',
        element: children,
      },
    ])}
  />
);
