import { isNil } from '../../../utils/lang';

export const PALETTE_NAMES = [
  'blue',
  'green',
  'yellow',
  'orange',
  'red',
  'purple',
  'pink',
  'teal',
  'brown',
] as const;

export const stringToColorPaletteName = (
  string: string
): (typeof PALETTE_NAMES)[number] => {
  if (isNil(string)) {
    // eslint-disable-next-line no-param-reassign
    string = 'null';
  }

  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    const charCode = Number.isNaN(string.charCodeAt(i))
      ? 0
      : string.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = charCode + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % PALETTE_NAMES.length;

  return PALETTE_NAMES[index];
};
