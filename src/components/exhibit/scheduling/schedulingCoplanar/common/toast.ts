import type { AddToastPayload } from '../../../../../app/services/toast';
import { TOAST_MESSAGE } from './lang';

export const TOAST: Record<string, AddToastPayload> = {
  EVENT_CREATED: { message: TOAST_MESSAGE.EVENT_CREATED, type: 'success' },
  EVENT_UPDATED: { message: TOAST_MESSAGE.EVENT_UPDATED, type: 'success' },
  EVENT_DELETED: { message: TOAST_MESSAGE.EVENT_DELETED, type: 'success' },
  EVENT_DELETE_ERROR: {
    message: TOAST_MESSAGE.EVENT_DELETE_ERROR,
    type: 'error',
  },
  EVENT_UPDATE_ERROR: {
    message: TOAST_MESSAGE.EVENT_UPDATE_ERROR,
    type: 'error',
  },
  EVENT_CREATE_ERROR: {
    message: TOAST_MESSAGE.EVENT_CREATE_ERROR,
    type: 'error',
  },
} as const;
