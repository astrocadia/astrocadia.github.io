import { generatePath } from 'react-router-dom';
import { type BaseLinkGenerationParams } from './common/routePathHelpers';

export const PROJECT_PATH = {
  tab: '/project/:projectId/:tabId?',
} as const;

// Commented out items are disabled until we have begun implementing them
export const PROJECT_TAB = {
  exhibits: 'Exhibits',
  // TODO: remove next line once the new TikTok analytics charts are complete
  analytics: 'Analytics',
  // hardware: 'Hardware',
  // users: 'Users',
  comparison: 'Compare Exhibits',
} as const;

export type ProjectTab = keyof typeof PROJECT_TAB;

export const PROJECT_TAB_DEFAULT: ProjectTab = 'exhibits';

// Commented out items are disabled until we have begun implementing them
export const PROJECT_TAB_ORDER: Array<ProjectTab> = [
  'exhibits',
  // 'hardware',
  // 'users',
  'comparison',
];

export const isProjectTab = (tab: string | undefined): tab is ProjectTab =>
  !!tab && PROJECT_TAB[tab as ProjectTab] !== undefined;

export interface ProjectPathParams extends BaseLinkGenerationParams {
  projectId: string;
  tabId?: ProjectTab;
}

export const generateProjectPath = ({
  projectId,
  tabId = PROJECT_TAB_DEFAULT,
}: ProjectPathParams): string =>
  generatePath(PROJECT_PATH.tab, { projectId, tabId });
