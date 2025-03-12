import { describe, it, expect } from 'vitest';
import {
  validateSchedulingModePayload,
  isSchedulingCoplanarMode,
  encodeScheduleCoplanarId,
  decodeScheduleCoplanarId,
  isValidScheduleCoplanarId,
} from './coplanarId'; // Adjust the import path accordingly
import { SCHEDULING_COPLANAR_MODE } from '../schedulingCoplanar/common/coplanarMode';

describe('validateSchedulingMode', () => {
  it('should validate NEW mode with undefined payload', () => {
    expect(
      validateSchedulingModePayload(SCHEDULING_COPLANAR_MODE.NEW, undefined)
    ).toBe(true);
  });

  it('should invalidate NEW mode with a defined payload', () => {
    expect(
      validateSchedulingModePayload(SCHEDULING_COPLANAR_MODE.NEW, '123')
    ).toBe(false);
  });

  it('should validate EDIT mode with a valid integer string payload', () => {
    expect(
      validateSchedulingModePayload(SCHEDULING_COPLANAR_MODE.EDIT, '123')
    ).toBe(true);
  });

  it('should invalidate EDIT mode with a non-integer payload', () => {
    expect(
      validateSchedulingModePayload(SCHEDULING_COPLANAR_MODE.EDIT, 'abc')
    ).toBe(false);
  });

  it('should invalidate EDIT mode with undefined payload', () => {
    expect(
      validateSchedulingModePayload(SCHEDULING_COPLANAR_MODE.EDIT, undefined)
    ).toBe(false);
  });
});

describe('isSchedulingCoplanarModePayload', () => {
  it('should return true for valid mode NEW', () => {
    expect(isSchedulingCoplanarMode(SCHEDULING_COPLANAR_MODE.NEW)).toBe(true);
  });

  it('should return true for valid mode EDIT', () => {
    expect(isSchedulingCoplanarMode(SCHEDULING_COPLANAR_MODE.EDIT)).toBe(true);
  });

  it('should return false for an invalid mode', () => {
    expect(isSchedulingCoplanarMode('invalid-mode')).toBe(false);
  });
});

describe('encodeScheduleCoplanarId', () => {
  it('should encode mode without payload', () => {
    expect(encodeScheduleCoplanarId(SCHEDULING_COPLANAR_MODE.NEW)).toBe('new');
  });

  it('should encode mode with payload', () => {
    expect(encodeScheduleCoplanarId(SCHEDULING_COPLANAR_MODE.EDIT, '123')).toBe(
      'edit_123'
    );
  });
});

describe('decodeScheduleCoplanarId', () => {
  it('should decode a valid coplanar ID with payload', () => {
    expect(decodeScheduleCoplanarId('edit_123')).toEqual({
      mode: SCHEDULING_COPLANAR_MODE.EDIT,
      payload: '123',
    });
  });

  it('should decode a valid coplanar ID without payload', () => {
    expect(decodeScheduleCoplanarId('new')).toEqual({
      mode: SCHEDULING_COPLANAR_MODE.NEW,
    });
  });

  it('should return undefined for an invalid coplanar ID', () => {
    expect(decodeScheduleCoplanarId('invalid-mode_123')).toBeUndefined();
  });
});

describe('isValidScheduleCoplanarId', () => {
  it('should return true for a valid coplanar ID with valid payload', () => {
    expect(isValidScheduleCoplanarId('edit_123')).toBe(true);
  });

  it('should return false for a valid coplanar ID with invalid payload', () => {
    expect(isValidScheduleCoplanarId('edit_abc')).toBe(false);
  });

  it('should return false for an invalid coplanar ID', () => {
    expect(isValidScheduleCoplanarId('invalid-mode_123')).toBe(false);
  });

  it('should return true for a valid coplanar ID without payload', () => {
    expect(isValidScheduleCoplanarId('new')).toBe(true);
  });
});
