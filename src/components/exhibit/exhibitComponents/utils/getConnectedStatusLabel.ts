import { ExhibitComponentSummary } from '../../../../app/entities/exhibitComponents';

export const getConnectedStatusLabel = (
  connected: ExhibitComponentSummary['connected'],
  elapsedTimeString: string | null
) => {
  if (elapsedTimeString === null) {
    return connected ? 'Connected' : 'No connection established';
  }
  return connected
    ? `Connected for ${elapsedTimeString}`
    : `Last connected ${elapsedTimeString} ago`;
};
