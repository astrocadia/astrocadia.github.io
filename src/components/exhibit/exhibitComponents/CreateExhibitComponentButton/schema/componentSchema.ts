import { z } from 'zod';
import { EXHIBIT_COMPONENT_TYPE } from '../../../../../app/entities/exhibitComponents';

export const NEW_COMPONENT_NAME_MIN_LENGTH = 1 as const;
export const NEW_COMPONENT_NAME_MAX_LENGTH = 255 as const;

export const EXHIBIT_NAME_LENGTH_MESSAGE =
  `Component name must be between ${NEW_COMPONENT_NAME_MIN_LENGTH} and ${NEW_COMPONENT_NAME_MAX_LENGTH} characters` as const;

// This is the only way to get the values to work with z.enum
const exhibitComponentTypeValues: [string, ...string[]] = [
  ...Object.values(EXHIBIT_COMPONENT_TYPE),
] as [string, ...string[]];

export const exhibitComponentSchema = z.object({
  name: z
    .string()
    .min(NEW_COMPONENT_NAME_MIN_LENGTH, EXHIBIT_NAME_LENGTH_MESSAGE)
    .max(NEW_COMPONENT_NAME_MAX_LENGTH, EXHIBIT_NAME_LENGTH_MESSAGE),
  type: z.enum(exhibitComponentTypeValues),
});

export type ExhibitComponentSchema = z.infer<typeof exhibitComponentSchema>;
