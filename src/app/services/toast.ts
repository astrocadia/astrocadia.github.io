import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ObjectValues } from '@deeplocal/gumband-public-shared-lib';
import { v4 as uuid4 } from 'uuid';
import type { RootState } from '../store';
import type { ToastProps } from '../../components/Toast';

/** This should ideally live in a top-level config file. */
export const DEFAULT_AUTO_HIDE_DURATION = 5000 as const;

export const TOAST_KEY = 'toast' as const;

export const TOAST_TYPES = {
  ERROR: 'error',
  INFO: 'info',
  SUCCESS: 'success',
  COPY: 'copy',
  ERROR_CONNECTION: 'error_connection',
  LOADING: 'loading',
  PLAIN: 'plain',
} as const;
export type ToastType = ObjectValues<typeof TOAST_TYPES>;

export type ToastDuration = ToastProps['autoHideDuration'];

/** If a toast type duration is not defined, this will default to DEFAULT_AUTO_HIDE_DURATION */
export const TOAST_TYPE_DURATIONS: Partial<Record<ToastType, ToastDuration>> = {
  [TOAST_TYPES.LOADING]: null,
} as const;

export interface Toast {
  /** UUID V4  */
  id: string;
  message: string;
  type: ToastType;
  open: boolean;
  duration?: ToastDuration;
}

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

export interface AddToastPayload {
  message: Toast['message'];
  type: Toast['type'];
}

const toastSlice = createSlice({
  name: TOAST_KEY,
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<AddToastPayload>) => {
      const draft = state;
      const toastDuration = TOAST_TYPE_DURATIONS[action.payload.type];
      const duration =
        toastDuration === undefined
          ? DEFAULT_AUTO_HIDE_DURATION
          : toastDuration;

      draft.toasts.push({
        id: uuid4(),
        message: action.payload.message,
        type: action.payload.type,
        open: true,
        duration,
      });
    },
    removeToast: (state, action: PayloadAction<Toast['id']>) => {
      const draft = state;

      draft.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
    closeToast: (state, action: PayloadAction<Toast['id']>) => {
      const toast = state.toasts.find((t) => t.id === action.payload);

      if (toast) {
        toast.open = false;
      }
    },
  },
});

export const { addToast, removeToast, closeToast } = toastSlice.actions;
export const { reducer: toastReducer } = toastSlice;

const getToastState = (state: RootState) => state[TOAST_KEY] as ToastState;

export const selectToasts = createSelector(
  getToastState,
  (state) => state.toasts
);
