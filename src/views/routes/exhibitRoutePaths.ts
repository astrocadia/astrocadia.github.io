import { generatePath } from 'react-router-dom';
import { type BaseLinkGenerationParams } from './common/routePathHelpers';

export const EXHIBIT_REDIRECT_PATH = {
  metrics: '/exhibit/:exhibitId/metrics',
} as const;

export const EXHIBIT_PATH = {
  coplanarSubpage: '/exhibit/:exhibitId/:tabId/:coplanarId/:subpageId?',
  coplanar: '/exhibit/:exhibitId/:tabId/:coplanarId?',
  tab: '/exhibit/:exhibitId/:tabId?',
} as const;

// Commented out items are disabled until we have begun implementing them
export const EXHIBIT_TAB = {
  status: 'Status',
  settings: 'Settings',
  controls: 'Controls',
  schedule: 'Schedule',
  analytics: 'Analytics',
  files: 'Files',
  components: 'Components',
  logs: 'Logs',
} as const;

export type ExhibitTab = keyof typeof EXHIBIT_TAB;

export const EXHIBIT_TAB_DEFAULT: ExhibitTab = 'status';

export const EXHIBIT_TAB_ORDER: Array<ExhibitTab> = [
  'status',
  'controls',
  'settings',
  'files',
  'schedule',
  'analytics',
  'logs',
  'components',
];

export const isExhibitTab = (tab: string | undefined): tab is ExhibitTab =>
  !!tab && EXHIBIT_TAB[tab as ExhibitTab] !== undefined;

export interface ExhibitPathParams extends BaseLinkGenerationParams {
  exhibitId: string | number;
  tabId?: ExhibitTab;
  coplanarId?: string;
  subpageId?: string;
}

export const generateExhibitPath = ({
  exhibitId: exhibitIdParam,
  tabId = EXHIBIT_TAB_DEFAULT,
  coplanarId,
  subpageId,
}: ExhibitPathParams): string => {
  const exhibitId = String(exhibitIdParam);

  if (coplanarId && subpageId) {
    return generatePath(EXHIBIT_PATH.coplanarSubpage, {
      exhibitId,
      tabId,
      coplanarId,
      subpageId,
    });
  }
  return generatePath(EXHIBIT_PATH.coplanar, {
    exhibitId,
    tabId,
    coplanarId: coplanarId || null,
  });
};
