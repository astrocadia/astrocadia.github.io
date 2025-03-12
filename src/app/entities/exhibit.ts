import type { ObjectValues } from '../../utils/usefulTS';

export type OpMode = 'Off' | 'On';

export const EXHIBIT_HEALTH_STATE = {
  NO_CONNECTIONS: 'NO_CONNECTIONS',
  SOME_CONNECTIONS_OK: 'SOME_CONNECTIONS_OK',
  ALL_CONNECTIONS_OK: 'ALL_CONNECTIONS_OK',
} as const;

export type ExhibitHealthState = ObjectValues<typeof EXHIBIT_HEALTH_STATE>;

export interface ExhibitSummary {
  id: number;
  name: string;
  opMode: OpMode | null;
  online: boolean;
  healthState: ExhibitHealthState;
  totalNumberComponents: number;
  numberDisconnectedComponents: number;
}

export interface Exhibit extends ExhibitSummary {
  siteId: number;
  mqttPath: string;
  lastOnlineChange: string;
  sdkVersion: string | null;
  leaderId?: number;
  // TODO: remove when added to summary
  manifestLocked: boolean;
  // TODO: look to remove from query
  siteName: string;
  organizationId: number;
  organizationName: string;
  createdAt: string;
  timeZone?: string;
}
