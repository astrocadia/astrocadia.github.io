import { describe, it, expect } from 'vitest';
import { PALETTE_NAMES, stringToColorPaletteName } from './color';

describe('stringToColorPaletteName', () => {
  it('should return a valid palette name for a given string', () => {
    const result = stringToColorPaletteName('example');
    expect(PALETTE_NAMES).toContain(result);
  });

  it('should consistently return the same color for the same input string', () => {
    const stringInput = 'consistentInput';
    const firstResult = stringToColorPaletteName(stringInput);
    const secondResult = stringToColorPaletteName(stringInput);
    expect(firstResult).toBe(secondResult);
  });

  it('should handle empty strings by returning a valid palette name', () => {
    const result = stringToColorPaletteName('');
    expect(PALETTE_NAMES).toContain(result);
  });

  it('should correctly handle strings with special characters', () => {
    const result = stringToColorPaletteName('!@#$%^&*()');
    expect(PALETTE_NAMES).toContain(result);
  });

  it('should correctly handle very long strings', () => {
    const longString = 'a'.repeat(1000);
    const result = stringToColorPaletteName(longString);
    expect(PALETTE_NAMES).toContain(result);
  });

  it('should return valid palette name for strings with Unicode characters', () => {
    const result = stringToColorPaletteName('日本語');
    expect(PALETTE_NAMES).toContain(result);
  });

  it('should return a valid palette name for strings with numerical characters', () => {
    const result = stringToColorPaletteName('1234567890');
    expect(PALETTE_NAMES).toContain(result);
  });

  it('should handle edge cases like null or undefined input', () => {
    const result = stringToColorPaletteName('null');
    expect(PALETTE_NAMES).toContain(result);
  });

  it('should handle edge cases like null input', () => {
    // @ts-expect-error - Testing for null
    const result = stringToColorPaletteName(null);
    expect(PALETTE_NAMES).toContain(result);
  });

  it('should handle edge cases like undefined input', () => {
    // @ts-expect-error - Testing for undefined
    const result = stringToColorPaletteName(undefined);
    expect(PALETTE_NAMES).toContain(result);
  });

  it('should handle edge cases like NaN input', () => {
    // @ts-expect-error - Testing for NaN
    const result = stringToColorPaletteName(NaN);
    expect(PALETTE_NAMES).toContain(result);
  });

  it('should handle characters with charCodeAt that returns NaN', () => {
    const result = stringToColorPaletteName('🤷🏽‍♂️');
    expect(PALETTE_NAMES).toContain(result);
  });
});
