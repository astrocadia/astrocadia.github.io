import type { ObjectValues } from '@deeplocal/gumband-public-shared-lib';
import type { ExhibitSchedulingCoplanarConfirmationDialogProps } from '../../ExhibitSchedulingCoplanarConfirmationDialog';
import {
  CONFIRM_LABEL,
  DELETE_EVENT_SUBTITLE,
  DELETE_EVENT_TITLE,
  DELETE_RECURRING_EVENT_SUBTITLE,
  DELETE_RECURRING_EVENT_TITLE,
  EDIT_EVENT_SUBTITLE,
  EDIT_EVENT_TITLE,
  EDIT_RECURRING_EVENT_ALL_SUBTITLE,
  EDIT_RECURRING_EVENT_SUBTITLE,
  EDIT_RECURRING_EVENT_TITLE,
  UPDATE_ALL_EVENTS_LABEL,
} from './lang';

export const EXHIBIT_SCHEDULING_CONFIRMATION_DIALOG_TYPE = {
  DELETE: 'delete',
  DELETE_RECURRING: 'deleteRecurring',
  EDIT: 'edit',
  EDIT_RECURRING: 'editRecurring',
  EDIT_RECURRING_ALL: 'editRecurringAll',
} as const;
export type ExhibitSchedulingConfirmationDialogType = ObjectValues<
  typeof EXHIBIT_SCHEDULING_CONFIRMATION_DIALOG_TYPE
>;

export const getDialogType = ({
  type,
  recurring = false,
  isRepeatModeDirty = false,
}: {
  type: string;
  recurring?: boolean;
  isRepeatModeDirty?: boolean;
}): ExhibitSchedulingConfirmationDialogType | undefined => {
  if (type !== 'delete' && type !== 'edit') {
    return undefined;
  }

  const all = isRepeatModeDirty && type === 'edit' ? 'All' : '';

  return (
    recurring ? `${type}Recurring${all}` : type
  ) as ExhibitSchedulingConfirmationDialogType;
};

export interface ExhibitSchedulingCoplanarConfirmationDialogConfig {
  type: ExhibitSchedulingConfirmationDialogType;
  open: ExhibitSchedulingCoplanarConfirmationDialogProps['open'];
  title: ExhibitSchedulingCoplanarConfirmationDialogProps['title'];
  subtitle: ExhibitSchedulingCoplanarConfirmationDialogProps['subtitle'];
  primaryActionLabel: ExhibitSchedulingCoplanarConfirmationDialogProps['primaryActionLabel'];
  offerChangeAll?: boolean;
  forceChangeAll?: boolean;
}

export const DIALOG_CONFIG: Record<
  ExhibitSchedulingConfirmationDialogType,
  Omit<ExhibitSchedulingCoplanarConfirmationDialogConfig, 'type' | 'open'>
> = {
  delete: {
    title: DELETE_EVENT_TITLE,
    subtitle: DELETE_EVENT_SUBTITLE,
    primaryActionLabel: CONFIRM_LABEL,
  },
  deleteRecurring: {
    title: DELETE_RECURRING_EVENT_TITLE,
    subtitle: DELETE_RECURRING_EVENT_SUBTITLE,
    primaryActionLabel: CONFIRM_LABEL,
    offerChangeAll: true,
  },
  edit: {
    title: EDIT_EVENT_TITLE,
    subtitle: EDIT_EVENT_SUBTITLE,
    primaryActionLabel: CONFIRM_LABEL,
  },
  editRecurring: {
    title: EDIT_RECURRING_EVENT_TITLE,
    subtitle: EDIT_RECURRING_EVENT_SUBTITLE,
    primaryActionLabel: CONFIRM_LABEL,
    offerChangeAll: true,
  },
  editRecurringAll: {
    title: EDIT_RECURRING_EVENT_TITLE,
    subtitle: EDIT_RECURRING_EVENT_ALL_SUBTITLE,
    primaryActionLabel: UPDATE_ALL_EVENTS_LABEL,
    forceChangeAll: true,
  },
} as const;
