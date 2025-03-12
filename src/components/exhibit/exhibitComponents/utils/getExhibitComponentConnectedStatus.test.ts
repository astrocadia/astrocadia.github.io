import { describe, it, expect } from 'vitest';
import { getExhibitComponentConnectedStatus } from './getExhibitComponentConnectedStatus';
import { CONNECTED_STATUS } from '../../../icons/ConnectedIcon/ConnectedIcon';

const date = '2024-06-20T04:12:11.426Z' as const;

describe('getExhibitComponentConnectedStatus', () => {
  it('should return "never-connected" if connected is false and connectedChangedAt is null', () => {
    const connected = false;
    const connectedChangedAt = null;
    const result = getExhibitComponentConnectedStatus(
      connected,
      connectedChangedAt
    );
    expect(result).toBe(CONNECTED_STATUS.NEVER_CONNECTED);
  });

  it('should return "connected" if connected is true and connectedChangedAt is not null', () => {
    const connected = true;
    const connectedChangedAt = date;
    const result = getExhibitComponentConnectedStatus(
      connected,
      connectedChangedAt
    );
    expect(result).toBe(CONNECTED_STATUS.CONNECTED);
  });

  it('should return "disconnected" if connected is false and connectedChangedAt is not null', () => {
    const connected = false;
    const connectedChangedAt = date;
    const result = getExhibitComponentConnectedStatus(
      connected,
      connectedChangedAt
    );
    expect(result).toBe(CONNECTED_STATUS.DISCONNECTED);
  });
});
