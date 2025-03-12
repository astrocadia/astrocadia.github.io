import { skipToken } from '@reduxjs/toolkit/query/react';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetWorkspaceQuery } from '../../app/services/workspace';
import { MainPanel } from '../../components/MainPanel';
import { MainPanelSkeleton } from '../../components/MainPanel/MainPanelSkeleton';
import { WorkspaceProjects } from '../../components/workspace/WorkspaceProjects/WorkspaceProjects';
import { exhaustiveGuard } from '../../utils/usefulTS';
import { isValidRequiredInteger } from '../../utils/validation';
import { NotFoundView } from '../notFound/NotFoundView';
import {
  WORKSPACE_TAB_DEFAULT,
  generateWorkspacePath,
  isWorkspaceTab,
} from '../routes/workspaceRoutePaths';

export const WorkspaceMainPanel = () => {
  const { workspaceId, tabId } = useParams();
  const navigate = useNavigate();
  const {
    data: workspace,
    isLoading: isWorkspaceLoading,
    error,
  } = useGetWorkspaceQuery(
    isValidRequiredInteger(workspaceId)
      ? { workspaceId: Number(workspaceId) }
      : skipToken
  );

  useEffect(() => {
    if (!tabId && workspaceId) {
      navigate(
        generateWorkspacePath({
          workspaceId,
          tabId: WORKSPACE_TAB_DEFAULT,
        })
      );
    }
  }, [workspaceId, navigate, tabId]);

  const isLoading = useMemo(() => isWorkspaceLoading, [isWorkspaceLoading]);

  if (!isValidRequiredInteger(workspaceId) || !isWorkspaceTab(tabId)) {
    return <NotFoundView />;
  }

  // TODO: need to investigate why not finding an exhibit returns a 400 instead of a 404.
  if (
    error &&
    'data' in error &&
    (error.status === 404 || error.status === 400)
  ) {
    return <NotFoundView />;
  }

  if (error) {
    // TODO: probably should have some sort of error screen.
    return null;
  }

  if (isLoading || !workspace || !workspace) {
    return <MainPanelSkeleton />;
  }

  let content = null;
  if (isWorkspaceTab(tabId) && workspace) {
    switch (tabId) {
      case 'projects':
        content = <WorkspaceProjects workspaceId={workspace.id} />;
        break;
      default: {
        exhaustiveGuard(tabId);
      }
    }
  }

  return (
    <MainPanel workspaceId={workspace.id} selectedTabId={tabId}>
      {content}
    </MainPanel>
  );
};
