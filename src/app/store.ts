import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from './services/api';
import { exhibitComponentAuthTokensReducer } from './services/exhibitComponentAuthTokens';
import { toastReducer } from './services/toast';
import { uiReducer } from './services/ui';

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      ui: uiReducer,
      exhibitComponentAuthTokens: exhibitComponentAuthTokensReducer,
      toast: toastReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
