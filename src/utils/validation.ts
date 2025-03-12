import { isNil } from './lang';

/**
 * Checks to see if a value exists and that it is an integer
 * @param id
 * @returns boolean
 */
export const isValidRequiredInteger = (id: string | undefined | null) =>
  !isNil(id) && id !== '' && Number.isInteger(Number(id));
