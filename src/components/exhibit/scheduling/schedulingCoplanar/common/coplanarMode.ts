import type { ObjectValues } from '@deeplocal/gumband-public-shared-lib';

export const SCHEDULING_COPLANAR_MODE = {
  NEW: 'new',
  EDIT: 'edit',
} as const;
export type SchedulingCoplanarMode = ObjectValues<
  typeof SCHEDULING_COPLANAR_MODE
>;
