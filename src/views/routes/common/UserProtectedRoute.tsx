import { type FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../../../app/services/user';
import { LoginView } from '../../login/LoginView';
import { type ProtectedRouteProps } from './routePathHelpers';

export const UserProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
  children,
}) => {
  const { data: user, isLoading } = useGetUserQuery();

  if (user) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</> || <Outlet />;
  }

  if (isLoading) {
    // Probably need some kind of loading spinner / skeleton here
    return null;
  }

  // Not loading (aka checking if user exists) and no user, so redirect to login
  return <LoginView />;
};
