import { z } from 'zod';
import { attachDuplicateStringRefinement } from '../../../../utils/zod';

const EXHIBIT_NAME_MIN_LENGTH = 1 as const;
const EXHIBIT_NAME_MAX_LENGTH = 50 as const;

export const EXHIBIT_NAME_LENGTH_MESSAGE =
  `Exhibit name must be between ${EXHIBIT_NAME_MIN_LENGTH} and ${EXHIBIT_NAME_MAX_LENGTH} characters` as const;
export const EXHIBIT_NAME_DUPLICATE_MESSAGE =
  'This Project already has an Exhibit with this name' as const;

export const getCreateExhibitFormSchema = (
  exhibitNames: Array<string> = []
) => {
  const name = attachDuplicateStringRefinement(
    z
      .string()
      .min(EXHIBIT_NAME_MIN_LENGTH, EXHIBIT_NAME_LENGTH_MESSAGE)
      .max(EXHIBIT_NAME_MAX_LENGTH, EXHIBIT_NAME_LENGTH_MESSAGE),
    exhibitNames,
    EXHIBIT_NAME_DUPLICATE_MESSAGE
  );

  return z.object({
    name,
  });
};

export type CreateExhibitFormSchema = z.infer<typeof createExhibitFormSchema>;

export const createExhibitFormSchema = getCreateExhibitFormSchema();
