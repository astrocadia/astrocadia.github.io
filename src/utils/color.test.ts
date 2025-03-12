import { describe, expect, it } from 'vitest';
import { convertHexToRGB, darken, applyOpacity } from './color';

describe('Utils - color', () => {
  it('convertHexToRGB', () => {
    expect(convertHexToRGB('#BAB1EE')).toEqual('rgb(186, 177, 238)');
    expect(convertHexToRGB('#BAE')).toEqual('rgb(187, 170, 238)');
    expect(convertHexToRGB('#BAB1EEEE')).toEqual('rgba(186, 177, 238, 0.933)');
  });

  it('darken', () => {
    expect(darken('rgb(186, 177, 238)', 0.1)).toEqual('rgb(167, 159, 214)');
    expect(darken('rgba(186, 177, 238, 0.5)', 0.1)).toEqual(
      'rgba(167, 159, 214, 0.5)'
    );
    expect(darken('#BAB1EE', 0.1)).toEqual('rgb(167, 159, 214)');
    expect(darken('#BAE', 0.1)).toEqual('rgb(168, 153, 214)');
  });

  it('applyOpacity', () => {
    expect(applyOpacity('rgb(186, 177, 238)', 0.1)).toEqual(
      'rgba(186, 177, 238, 0.1)'
    );
    expect(applyOpacity('#BAB1EE', 0.1)).toEqual('rgba(186, 177, 238, 0.1)');
    expect(applyOpacity('rgba(186, 177, 238, 0.5)', 0.1)).toEqual(
      'rgba(186, 177, 238, 0.1)'
    );
  });
});
