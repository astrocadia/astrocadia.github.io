import { describe, expect, it } from 'vitest';
import type {
  ExhibitComponentKey,
  ExhibitComponentKeyParts,
} from '../../../../app/entities/exhibitComponents';
import {
  decodeExhibitComponentKey,
  encodeExhibitComponentKey,
  isExhibitComponentKey,
} from './exhibitComponentIdUtils';

describe('exhibitComponentIdUtils', () => {
  it('getExhibitComponentKey', () => {
    const componentKeyParts: ExhibitComponentKeyParts = {
      componentId: '123',
      type: 'presence-sensor',
    };
    let result = encodeExhibitComponentKey(componentKeyParts);
    expect(result).toBe('presence-sensor_123');

    componentKeyParts.type = 'custom-hardware';
    result = encodeExhibitComponentKey(componentKeyParts);
    expect(result).toBe('custom-hardware_123');
  });

  it('isExhibitComponentKey', () => {
    expect(isExhibitComponentKey('presence-sensor_123')).toBe(true);
    expect(isExhibitComponentKey('custom-hardware_123')).toBe(true);
    expect(isExhibitComponentKey('custom-application_123')).toBe(true);
    expect(isExhibitComponentKey('os-monitor_123')).toBe(true);
    expect(isExhibitComponentKey('presence-sensor-abc')).toBe(false);
    expect(isExhibitComponentKey('custom-hardware-abc')).toBe(false);
    expect(isExhibitComponentKey('---1')).toBe(false);
    expect(isExhibitComponentKey('custom-hardware')).toBe(false);
    expect(isExhibitComponentKey('custom-hardware-1.2')).toBe(false);
    expect(isExhibitComponentKey('custom-hardware-1-2')).toBe(false);
    expect(isExhibitComponentKey('asdf-123')).toBe(false);
    expect(isExhibitComponentKey('123')).toBe(false);
  });

  it(decodeExhibitComponentKey, () => {
    expect(
      decodeExhibitComponentKey('presence-sensor_123' as ExhibitComponentKey)
    ).toEqual({ componentId: '123', type: 'presence-sensor' });
  });
});
