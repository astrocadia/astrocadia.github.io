import { describe, expect, it } from 'vitest';
import { isValidRequiredInteger } from './validation';

describe('Utils - validation', () => {
  it('isValidRequiredInteger', () => {
    expect(isValidRequiredInteger('1')).toBe(true);
    expect(isValidRequiredInteger('0')).toBe(true);
    expect(isValidRequiredInteger('-1')).toBe(true);
    expect(isValidRequiredInteger('1.1')).toBe(false);
    expect(isValidRequiredInteger('0.1')).toBe(false);
    expect(isValidRequiredInteger('-1.1')).toBe(false);
    expect(isValidRequiredInteger('sample')).toBe(false);
    expect(isValidRequiredInteger('')).toBe(false);
    expect(isValidRequiredInteger(undefined)).toBe(false);
    expect(isValidRequiredInteger(null)).toBe(false);
  });
});
