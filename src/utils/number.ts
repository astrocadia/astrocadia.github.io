import { isNil } from './lang';

/**
 * Compares two values as numbers
 * @param {string | number | null | undefined} a
 * @param {string | number | null | undefined} b
 */
export const equalsAsNumbers = (
  a: string | number | null | undefined,
  b: string | number | null | undefined
): boolean => {
  // If both are null or both undefined, return true
  // If one is null and the other is undefined, return false
  if (isNil(a) && isNil(b)) return a === b;

  // Number(null) is actually converted to 0, therefore we have to test for null first
  if (a === null || b === null) return false;

  return Number(a) === Number(b);
};
