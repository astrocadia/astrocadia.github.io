import { describe, expect, it } from 'vitest';
import { ColorPropertyValue } from '../../../../../../../app/entities/exhibitComponents';
import {
  convertWRGBColorPropertyValueToRGBAHex,
  convertRGBAHexToWRGBColorPropertyValue,
} from './colorUtils';

describe('convertWRGBColorPropertyValueToRGBAHex', () => {
  it('should convert WRGB values to RGBA hex string', () => {
    const colorPropertyValue = {
      white: 255,
      red: 128,
      green: 64,
      blue: 32,
    } as ColorPropertyValue;
    const result = convertWRGBColorPropertyValueToRGBAHex(colorPropertyValue);
    expect(result).toBe('#804020ff');
  });

  it('should handle WRGB values of 0 correctly', () => {
    const colorPropertyValue = {
      white: 0,
      red: 0,
      green: 0,
      blue: 0,
    } as ColorPropertyValue;
    const result = convertWRGBColorPropertyValueToRGBAHex(colorPropertyValue);
    expect(result).toBe('#00000000');
  });

  it('should pad single digit hex values with leading zeros', () => {
    const colorPropertyValue = {
      white: 1,
      red: 15,
      green: 16,
      blue: 255,
    } as ColorPropertyValue;
    const result = convertWRGBColorPropertyValueToRGBAHex(colorPropertyValue);
    expect(result).toBe('#0f10ff01');
  });
});

describe('convertRGBAHexToWRGBColorPropertyValue', () => {
  it('should convert RGBA hex string to WRGB values', () => {
    const hexColorString = '#804020ff';
    const result = convertRGBAHexToWRGBColorPropertyValue(hexColorString);
    expect(result).toEqual({ white: 255, red: 128, green: 64, blue: 32 });
  });

  it('should return zeros for invalid or null hex string', () => {
    const result = convertRGBAHexToWRGBColorPropertyValue(null);
    expect(result).toEqual({ white: 0, red: 0, green: 0, blue: 0 });

    const invalidResult = convertRGBAHexToWRGBColorPropertyValue('#zzzzzzzz');
    expect(invalidResult).toEqual({ white: 0, red: 0, green: 0, blue: 0 });
  });

  it('should handle hex strings with missing alpha component', () => {
    const hexColorString = '#804020';
    const result = convertRGBAHexToWRGBColorPropertyValue(hexColorString);
    expect(result).toEqual({ white: 0, red: 128, green: 64, blue: 32 });
  });

  it('should correctly parse hex values with leading zeros', () => {
    const hexColorString = '#0f10ff01';
    const result = convertRGBAHexToWRGBColorPropertyValue(hexColorString);
    expect(result).toEqual({ white: 1, red: 15, green: 16, blue: 255 });
  });
});
