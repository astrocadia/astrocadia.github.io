export const SUCCESS_INDICATOR_TIMEOUT_MS = 1000 as const;
export const MINIMUM_VALUE_STRING = 'Minimum value is' as const;
export const MAXIMUM_VALUE_STRING = 'Maximum value is' as const;
export const MAXIMUM_CHARACTER_LENGTH_STRING =
  'Maximum character length is' as const;
export const INTEGER_VALUE_PLACEHOLDER = 'Enter integer value' as const;
export const BYTE_VALUE_PLACEHOLDER = 'Enter byte value' as const;
export const FLOAT_VALUE_PLACEHOLDER = 'Enter float value' as const;
export const ARRAY_PREVIEW_MAX_RENDERED_FIELDS = 3 as const;

// setting this variable too high may cause noticable key press lag
export const ARRAY_SUBPAGE_MAX_RENDERED_FIELDS = 100 as const;

// half the value of the max rendered fields seems to be the sweet spot for increment length
export const ARRAY_SUBPAGE_RENDERED_FIELDS_END_INDEX_INCREMENT_LENGTH =
  50 as const;
