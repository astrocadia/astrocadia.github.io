/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface UIState {
  standardNavigation: {
    collapsed: boolean;
  };
}

const initialState: UIState = {
  standardNavigation: {
    collapsed: false,
  },
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleStandardNavigationCollapsed: (state) => {
      state.standardNavigation.collapsed = !state.standardNavigation.collapsed;
    },
  },
});

export const { toggleStandardNavigationCollapsed } = slice.actions;

export const uiReducer = slice.reducer;

export const isStandardNavigationCollapsed = (state: RootState) =>
  state.ui.standardNavigation.collapsed;
