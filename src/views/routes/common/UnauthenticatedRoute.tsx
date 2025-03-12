import { type FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import { useGetUserQuery } from '../../../app/services/user';
import { NotFoundView } from '../../notFound/NotFoundView';
import { type ProtectedRouteProps } from './routePathHelpers';

export const UnauthenticatedRoute: FunctionComponent<ProtectedRouteProps> = ({
  children,
}) => {
  const { data: user, isLoading } = useGetUserQuery();

  if (!isLoading) {
    if (!user) {
      // we are done loading and there is no user, so render the children
      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <>{children}</> || <Outlet />;
    }

    // user is found, but they shouldn't be here.'
    return <NotFoundView />;
  }

  // Probably need some kind of loading spinner / skeleton here
  return null;
};
