import { generatePath } from 'react-router-dom';
import { BaseLinkGenerationParams } from './common/routePathHelpers';

export const WORKSPACE_PATH = {
  tab: '/workspace/:workspaceId/:tabId?',
} as const;

export const WORKSPACE_TAB = {
  projects: 'Projects',
} as const;

export type WorkspaceTab = keyof typeof WORKSPACE_TAB;
export const WORKSPACE_TAB_DEFAULT: WorkspaceTab = 'projects';

export const isWorkspaceTab = (tab: string | undefined): tab is WorkspaceTab =>
  !!tab && WORKSPACE_TAB[tab as WorkspaceTab] !== undefined;

export interface WorkspacePathParams extends BaseLinkGenerationParams {
  workspaceId: string;
  tabId?: WorkspaceTab;
}

export const generateWorkspacePath = ({
  workspaceId,
  tabId = WORKSPACE_TAB_DEFAULT,
}: WorkspacePathParams): string =>
  generatePath(WORKSPACE_PATH.tab, { workspaceId, tabId });
