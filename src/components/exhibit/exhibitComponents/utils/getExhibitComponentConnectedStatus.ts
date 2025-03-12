import type { ExhibitComponentSummary } from '../../../../app/entities/exhibitComponents';
import { CONNECTED_STATUS } from '../../../icons/ConnectedIcon';

export const getExhibitComponentConnectedStatus = (
  connected: ExhibitComponentSummary['connected'],
  connectedChangedAt: ExhibitComponentSummary['connectedChangedAt']
) => {
  if (connected) {
    return CONNECTED_STATUS.CONNECTED;
  }

  if (connectedChangedAt === null) {
    return CONNECTED_STATUS.NEVER_CONNECTED;
  }

  return CONNECTED_STATUS.DISCONNECTED;
};
