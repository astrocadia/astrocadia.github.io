import { useCallback, useEffect, useMemo } from 'react';
import { useGetUserQuery } from '../../../app/services/user';
import {
  initializeFreshdesk,
  openFreshdeskWidget,
} from '../../../utils/support/freshdeskUtils';

export const useGumbandSupportWidget = () => {
  const { data: user } = useGetUserQuery();

  useEffect(() => {
    initializeFreshdesk();
  }, []);

  const fullName = useMemo(() => {
    const nameParts: Array<string> = [];
    if (user?.firstName) {
      nameParts.push(user.firstName);
    }
    if (user?.lastName) {
      nameParts.push(user.lastName);
    }

    return nameParts.join(' ');
  }, [user?.firstName, user?.lastName]);

  interface HandleOpenSupportTicketWindowParams {
    description?: string;
    subject?: string;
  }
  const handleOpenSupportTicketWindow = useCallback(
    (params?: HandleOpenSupportTicketWindowParams) => {
      openFreshdeskWidget({
        name: fullName,
        email: user?.email,
        description: params?.description,
        subject: params?.subject,
      });
    },
    [fullName, user?.email]
  );

  return handleOpenSupportTicketWindow;
};
