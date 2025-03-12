import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListWorkspacesQuery } from '../../app/services/workspace';
import { MainPanelSkeleton } from '../../components/MainPanel/MainPanelSkeleton';
import { LOCAL_STORAGE_KEY, LocalStorage } from '../../utils/LocalStorage';
import { sortCompareObjectByStringField } from '../../utils/sort';
import { RequestInviteView } from '../requestInvite/RequestInviteView';
import { generateWorkspacePath } from '../routes/workspaceRoutePaths';

export const LoadDefaultView: FunctionComponent = () => {
  const navigate = useNavigate();
  const { data: workspaces, isLoading } = useListWorkspacesQuery();

  useEffect(() => {
    const oauthRedirect = LocalStorage.getItem(LOCAL_STORAGE_KEY.OAuthRedirect);

    if (oauthRedirect) {
      LocalStorage.removeItem(LOCAL_STORAGE_KEY.OAuthRedirect);
      navigate(oauthRedirect);
      return;
    }

    if (workspaces?.length) {
      const defaultWorkspace = [...workspaces].sort(
        sortCompareObjectByStringField('name')
      )[0];

      navigate(
        generateWorkspacePath({ workspaceId: defaultWorkspace.id.toString() })
      );
    }
  }, [navigate, workspaces]);

  if (isLoading) {
    return <MainPanelSkeleton />;
  }

  // This view should only be seen by users who log in with Google, but have not yet been invited
  return <RequestInviteView />;
};
