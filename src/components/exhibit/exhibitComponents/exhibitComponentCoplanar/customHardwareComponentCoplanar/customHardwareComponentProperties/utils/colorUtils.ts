import {
  ColorValue,
  isColorValue,
  type ColorPropertyValue,
} from '../../../../../../../app/entities/exhibitComponents';

// HW sends and receives the color as a WRBG object, but we display it as RGBA hex string in the frontend

export const convertWRGBColorPropertyValueToRGBAHex = ({
  white,
  red,
  green,
  blue,
}: ColorPropertyValue): string =>
  `#${[red, green, blue, white].map((color) => color.toString(16).padStart(2, '0')).join('')}`;

export const convertRGBAHexToWRGBColorPropertyValue = (
  hexColorString: string | null
): ColorPropertyValue => {
  const zeroColorValue = 0 as ColorValue;
  if (!hexColorString) {
    return {
      red: zeroColorValue,
      green: zeroColorValue,
      blue: zeroColorValue,
      white: zeroColorValue,
    };
  }
  const hex = hexColorString.replace('#', '');
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);
  const alpha = parseInt(hex.substring(6, 8), 16);

  return {
    white: isColorValue(alpha) ? alpha : zeroColorValue,
    red: isColorValue(red) ? red : zeroColorValue,
    green: isColorValue(green) ? green : zeroColorValue,
    blue: isColorValue(blue) ? blue : zeroColorValue,
  };
};
