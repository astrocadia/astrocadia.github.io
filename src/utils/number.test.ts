import { describe, expect, it } from 'vitest';
import { equalsAsNumbers } from './number';

describe('Utils - number', () => {
  it('equalsAsNumbers', () => {
    expect(equalsAsNumbers(0, 0)).toBe(true);
    expect(equalsAsNumbers(0, '0')).toBe(true);
    expect(equalsAsNumbers('0', 0)).toBe(true);
    expect(equalsAsNumbers('0', '0')).toBe(true);
    expect(equalsAsNumbers(0, 1)).toBe(false);
    expect(equalsAsNumbers(0, '1')).toBe(false);
    expect(equalsAsNumbers('0', 1)).toBe(false);
    expect(equalsAsNumbers('0', '1')).toBe(false);
    expect(equalsAsNumbers(NaN, NaN)).toBe(false);
    // Note: parseInt('3adb') returns 3
    expect(equalsAsNumbers('3adb', 3)).toBe(false);

    // handle floats
    expect(equalsAsNumbers(0.1, 0.1)).toBe(true);
    expect(equalsAsNumbers(0.1, '0.1')).toBe(true);
    expect(equalsAsNumbers('0.1', 0.1)).toBe(true);
    expect(equalsAsNumbers('0.1', '0.1')).toBe(true);
    expect(equalsAsNumbers(0.1, 0.2)).toBe(false);
    expect(equalsAsNumbers(0.1, '0.2')).toBe(false);
    expect(equalsAsNumbers('0.1', 0.2)).toBe(false);
    expect(equalsAsNumbers('0.1', '0.2')).toBe(false);
    expect(equalsAsNumbers(0.1, 0.10000000000000001)).toBe(true);
    expect(equalsAsNumbers(0.1, '0.10000000000000001')).toBe(true);
    expect(equalsAsNumbers('0.1', 0.10000000000000001)).toBe(true);
    expect(equalsAsNumbers('0.1', '0.10000000000000001')).toBe(true);

    // handle null and undefined
    expect(equalsAsNumbers(null, null)).toBe(true);
    expect(equalsAsNumbers(undefined, undefined)).toBe(true);
    expect(equalsAsNumbers(null, undefined)).toBe(false);
    expect(equalsAsNumbers(undefined, null)).toBe(false);
  });
});
