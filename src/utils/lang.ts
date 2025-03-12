/**
 * @param {any} value The value to check
 * @returns {boolean} Returns `true` if `value` is a string
 */
export const isString = (value: unknown): value is string =>
  typeof value === 'string' || value instanceof String;

/**
 * @param {any} value The value to check
 * @returns {boolean} Returns `true` if `value` is nullish
 */
export const isNil = (value: unknown): value is undefined | null =>
  value == null;
