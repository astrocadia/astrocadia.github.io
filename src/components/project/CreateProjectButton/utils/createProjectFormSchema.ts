import { z } from 'zod';
import { attachDuplicateStringRefinement } from '../../../../utils/zod';

export const PROJECT_NAME_MIN_LENGTH = 1 as const;
export const PROJECT_NAME_MAX_LENGTH = 50 as const;

export const PROJECT_NAME_LENGTH_MESSAGE =
  `Project name must be between ${PROJECT_NAME_MIN_LENGTH} and ${PROJECT_NAME_MAX_LENGTH} characters` as const;
export const PROJECT_NAME_DUPLICATE_MESSAGE =
  'This Workspace already has a Project with this name' as const;

export const getCreateProjectFormSchema = (
  projectNames: Array<string> = []
) => {
  const name = attachDuplicateStringRefinement(
    z
      .string()
      .min(PROJECT_NAME_MIN_LENGTH, PROJECT_NAME_LENGTH_MESSAGE)
      .max(PROJECT_NAME_MAX_LENGTH, PROJECT_NAME_LENGTH_MESSAGE),
    projectNames,
    PROJECT_NAME_DUPLICATE_MESSAGE
  );

  return z.object({
    name,
  });
};
export type CreateProjectFormSchema = z.infer<typeof createProjectSchema>;

export const createProjectSchema = getCreateProjectFormSchema();
