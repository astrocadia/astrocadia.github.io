import { type NumberFields, type StringFields } from './usefulTS';
import { isNil } from './lang';

/**
 * Provide a string comparator that will account for numbers correctly.  I.E. `sample100` should come after `sample2`.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export const sortCompareStringWithNumbers = (a: string, b: string): number =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

/**
 * Provide a string comparator that will account for numbers correctly and ignore case.  I.E. `sample100` should come after `sample2`.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
export const sortCompareStringWithNumbersIgnoreCase = (
  a: string,
  b: string
): number =>
  a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base',
    caseFirst: 'lower',
  });

/**
 * Provide a comparator for an object by a field that is a string.  I.E. `sample100` should come after `sample2`.
 *
 * @param {StringFields<T>} field
 * @param {boolean} [ignoreCase=false]
 * @returns {((a: T, b: T) => number)}
 */
export const sortCompareObjectByStringField =
  <T extends object>(
    field: StringFields<T>,
    ignoreCase = false
  ): ((a: T, b: T) => number) =>
  (a, b) =>
    ignoreCase
      ? sortCompareStringWithNumbersIgnoreCase(
          a[field] as string,
          b[field] as string
        )
      : sortCompareStringWithNumbers(a[field] as string, b[field] as string);

/**
 * Provide a comparator for an object by a field that is a number.  I.E. `100` should come after `2`.
 * If the field compares equal, then the string field will be used to sort.
 *
 * @param {NumberFields<T>} orderField
 * @param {StringFields<T>} stringField
 * @param {boolean} [ignoreCase=false]
 * @returns {((a: T, b: T) => number)}
 */
export const sortCompareObjectByOrderAndStringField =
  <T extends object>(
    orderField: NumberFields<T>,
    stringField: StringFields<T>,
    ignoreCase = false
  ): ((a: T, b: T) => number) =>
  (a, b) => {
    const aOrder = a[orderField];
    const aField = a[stringField] || '';
    const bOrder = b[orderField];
    const bField = b[stringField] || '';

    if (!isNil(aOrder) && !isNil(bOrder)) {
      // If result is 0 we need to move to the next level of sorting
      const result = (aOrder as number) - (bOrder as number);
      if (result !== 0) {
        return result;
      }
    } else if (!isNil(aOrder)) {
      return -1;
    } else if (!isNil(bOrder)) {
      return 1;
    }

    return ignoreCase
      ? sortCompareStringWithNumbersIgnoreCase(
          aField as string,
          bField as string
        )
      : sortCompareStringWithNumbers(aField as string, bField as string);
  };
