import { useMemo, type FunctionComponent } from 'react';
import type { ExhibitComponentSummary } from '../../../../app/entities/exhibitComponents';
import { getExhibitComponentConnectedStatus } from '../utils/getExhibitComponentConnectedStatus';
import { ConnectedIcon } from '../../../icons/ConnectedIcon/ConnectedIcon';

export interface ExhibitComponentConnectedIconProps
  extends Pick<ExhibitComponentSummary, 'connected' | 'connectedChangedAt'> {}

/**
 * This is just a wrapper to encapsulate the logic around configuring a ConnectedIcon
 * to a specific ExhibitComponent.
 */
export const ExhibitComponentConnectedIcon: FunctionComponent<
  ExhibitComponentConnectedIconProps
> = ({ connected, connectedChangedAt }) => {
  const status = useMemo(() => {
    return getExhibitComponentConnectedStatus(connected, connectedChangedAt);
  }, [connected, connectedChangedAt]);

  return (
    <ConnectedIcon status={status} className='ExhibitComponentConnectedIcon' />
  );
};
