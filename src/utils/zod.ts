import type { ZodString } from 'zod';

export const DUPLICATE_STRING_REFINEMENT_ERROR_MESSAGE =
  'This value is already in use' as const;

export const attachDuplicateStringRefinement = (
  zodString: ZodString,
  haystack: Array<string>,
  message: string = DUPLICATE_STRING_REFINEMENT_ERROR_MESSAGE
) => {
  return zodString.refine((value) => {
    const lowercaseValue = value.toLowerCase();
    const lowercaseHaystack = haystack.map((item) => item.toLowerCase());

    return !lowercaseHaystack.includes(lowercaseValue);
  }, message);
};
