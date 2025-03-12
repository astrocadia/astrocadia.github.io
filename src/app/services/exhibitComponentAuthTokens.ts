/* eslint-disable no-param-reassign */
import {
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import {
  type ExhibitComponentType,
  type ExhibitComponentPrimaryKey,
} from '../entities/exhibitComponents';
import type { Exhibit } from '../entities/exhibit';
import type { RootState } from '../store';
import { isNil } from '../../utils/lang';

export interface ExhibitComponentAuthToken {
  token: string;
  componentType: ExhibitComponentType;
  componentId: ExhibitComponentPrimaryKey;
}

type ExhibitComponentAuthTokensState = Record<
  Exhibit['id'],
  Record<ExhibitComponentType, Array<ExhibitComponentAuthToken>>
>;

const initialState: ExhibitComponentAuthTokensState = {};

const exhibitComponentAuthTokensSlice = createSlice({
  name: 'exhibitComponentAuthTokens',
  initialState,
  reducers: {
    addExhibitComponentAuthToken(
      state,
      action: PayloadAction<{
        exhibitId: Exhibit['id'];
        token: string;
        componentType: ExhibitComponentType;
        componentId: ExhibitComponentPrimaryKey;
      }>
    ) {
      const { exhibitId, token, componentType, componentId } = action.payload;

      if (!state[exhibitId]) {
        state[exhibitId] = {} as Record<
          ExhibitComponentType,
          ExhibitComponentAuthToken[]
        >;
      }
      if (!state[exhibitId][componentType]) {
        state[exhibitId][componentType] = [];
      }

      state[exhibitId][componentType].push({
        token,
        componentType,
        componentId,
      });
    },

    deleteExhibitComponentAuthToken(
      state,
      action: PayloadAction<{
        exhibitId: Exhibit['id'];
        componentId: ExhibitComponentPrimaryKey;
        componentType: ExhibitComponentType;
      }>
    ) {
      const { exhibitId, componentId, componentType } = action.payload;

      if (state[exhibitId]?.[componentType]) {
        state[exhibitId][componentType] = state[exhibitId][
          componentType
        ].filter((authToken) => authToken.componentId !== componentId);
      }
    },
  },
});

export const { addExhibitComponentAuthToken, deleteExhibitComponentAuthToken } =
  exhibitComponentAuthTokensSlice.actions;
export const exhibitComponentAuthTokensReducer =
  exhibitComponentAuthTokensSlice.reducer;

const getExhibitAuthTokenState = (
  state: RootState
): ExhibitComponentAuthTokensState => state.exhibitComponentAuthTokens;

interface SelectExhibitAuthTokenParams {
  exhibitId: Exhibit['id'];
  componentId: ExhibitComponentPrimaryKey;
  componentType: ExhibitComponentType;
}

export const selectExhibitAuthToken = createSelector(
  [
    getExhibitAuthTokenState,
    (state: RootState, params: Partial<SelectExhibitAuthTokenParams>) => params,
  ],
  (exhibitComponentAuthTokensState, params) => {
    const { exhibitId, componentId, componentType } = params;

    if (isNil(exhibitId) || isNil(componentId) || !componentType) {
      return undefined;
    }

    const exhibitComponentAuthTokens =
      exhibitComponentAuthTokensState[exhibitId];
    if (!exhibitComponentAuthTokens) {
      return undefined;
    }

    return exhibitComponentAuthTokens[componentType]?.find(
      (authToken) => authToken.componentId === componentId
    );
  }
);

interface SelectAllExhibitComponentAuthTokensParams {
  exhibitId: Exhibit['id'];
}

export const selectAllExhibitComponentAuthTokens = createSelector(
  [
    getExhibitAuthTokenState,
    (state: RootState, params: SelectAllExhibitComponentAuthTokensParams) =>
      params,
  ],
  (exhibitComponentAuthTokensState, params) => {
    const { exhibitId } = params;
    const exhibitTokens = exhibitComponentAuthTokensState[exhibitId];

    if (!exhibitTokens) {
      return [];
    }

    return Object.values(exhibitTokens).flat();
  }
);
