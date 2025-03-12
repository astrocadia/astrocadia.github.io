import { describe, expect, it } from 'vitest';
import { isNil, isString } from './lang';

describe('Utils - lang', () => {
  it('isString', () => {
    expect(isString('')).toBe(true);
    expect(isString('abc')).toBe(true);
    // This is a good rule, but I want to test in case someone uses it
    // eslint-disable-next-line no-new-wrappers
    expect(isString(new String('abc'))).toBe(true);
    expect(isString(String('abc'))).toBe(true);
    expect(isString(0)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(NaN)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
  });

  it('isNil', () => {
    expect(isNil(undefined)).toBe(true);
    expect(isNil(null)).toBe(true);
    expect(isNil(0)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil(NaN)).toBe(false);
    expect(isNil(false)).toBe(false);
  });
});
