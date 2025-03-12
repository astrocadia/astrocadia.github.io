import posthog from 'posthog-js';
import { type FunctionComponent, useEffect } from 'react';
import { useGetUserQuery } from '../../app/services/user';

export const PostHogInitiator: FunctionComponent = () => {
  const { data: user } = useGetUserQuery();

  useEffect(() => {
    if (user) {
      posthog.identify(`${user.id}`, { email: user.email });
    }
  }, [user]);

  return null;
};
