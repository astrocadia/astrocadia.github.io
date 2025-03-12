import type { ExhibitHealthStateUpdatePayload } from '@deeplocal/gumband-public-shared-lib';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { equalsAsNumbers } from '../../../utils/number';
import type { Exhibit, ExhibitSummary } from '../../entities/exhibit';
import { EXHIBIT_COMPONENT_TYPE } from '../../entities/exhibitComponents';
import { useAppDispatch } from '../../store';
import { api, getHTTPEndpoint } from '../api';
import type { SuccessResponse } from '../common/responses';
import { addExhibitComponentAuthToken } from '../exhibitComponentAuthTokens';
import { GumbandWebsocket } from '../websocket/GumbandWebsocket';
import type {
  ExhibitOfflinePayload,
  ExhibitOnlinePayload,
  ExhibitOpModeReceivedPayload,
} from '../websocket/websocketResponsePayloads';

export const DEFAULT_TOKEN_NAME = 'Initial Token' as const;
export type ComponentAuthToken = string;
export interface GumbandAuthToken {
  id: number;
  createdAt: string;
  name: string;
}

export interface ExhibitCreateRequestParameters {
  name: string;
  projectId: number;
}

export interface ExhibitCreateResponse extends SuccessResponse {
  exhibit: Exhibit;
}

export interface ExhibitGetRequestParameters {
  exhibitId: number;
}

export interface ExhibitGetResponse extends SuccessResponse {
  exhibit: Exhibit;
}

export interface ExhibitGetAllResponse extends SuccessResponse {
  exhibits: Array<Exhibit>;
}

export interface ExhibitListRequestParameters {
  projectId: number;
}

export interface ExhibitListResponse extends SuccessResponse {
  exhibits: Array<ExhibitSummary>;
}

export interface ExhibitCreateTokenRequestParameters {
  exhibitId: number;
  name: string;
}

export interface ExhibitCreateTokenResponse {
  token: ComponentAuthToken;
}

export interface ExhibitGetTokenRequestParameters {
  exhibitId: number;
}

export interface ExhibitGetTokenResponse {
  tokens: Array<GumbandAuthToken>;
}

export const exhibitApi = api.injectEndpoints({
  endpoints: (build) => ({
    getExhibit: build.query<Exhibit, ExhibitGetRequestParameters>({
      query: ({ exhibitId }) =>
        `${getHTTPEndpoint('exhibit')}/exhibit-management/exhibit/${exhibitId}`,
      transformResponse: (response: ExhibitGetResponse) => response.exhibit,
      providesTags: (result) =>
        result ? [{ type: 'Exhibit', id: result.id }, 'Exhibit'] : ['Exhibit'],
      async onCacheEntryAdded(
        { exhibitId },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // We need to create the listener functions here so that they can be removed later
        // Additionally, in order to update the data, we need to use the `updateCachedData` function
        // which uses Immer to update the data in the cache.  If you are unfamiliar with Immer, it's
        // a library that allows us to write code as if we are mutating the state directly, but it
        // actually creates a new state object with the changes applied.  This will manage the immutability
        // of the cache for us. See https://immerjs.github.io/immer/ for more information.
        const exhibitOnlineEventListener = (data: ExhibitOnlinePayload) => {
          // Need to verify the event is for this exhibit first (yes, the id is a string in this payload)
          if (equalsAsNumbers(data.exhibitId, exhibitId)) {
            updateCachedData((draft) => {
              draft.online = true;
            });
          }
        };

        const exhibitOfflineEventListener = (data: ExhibitOfflinePayload) => {
          // Need to verify the event is for this exhibit first (yes, the id is a string in this payload)
          if (parseInt(data.exhibitId, 10) === exhibitId) {
            updateCachedData((draft) => {
              draft.online = false;
            });
          }
        };

        const exhibitOpModeReceivedEventListener = (
          data: ExhibitOpModeReceivedPayload
        ) => {
          // Need to verify the event is for this exhibit first
          if (data.id === exhibitId) {
            updateCachedData((draft) => {
              draft.opMode = data.mode ? 'On' : 'Off';
            });
          }
        };

        const exhibitHealthStateUpdateReceivedEventListener = (
          data: ExhibitHealthStateUpdatePayload
        ) => {
          // Need to verify the event is for this exhibit first
          if (data.exhibitId === exhibitId) {
            updateCachedData((draft) => {
              draft.healthState = data.healthState;
              draft.numberDisconnectedComponents =
                data.numberDisconnectedComponents;
              draft.totalNumberComponents = data.totalNumberComponents;
            });
          }
        };

        let gumbandWebsocket: GumbandWebsocket | undefined;

        try {
          await cacheDataLoaded;

          gumbandWebsocket = await GumbandWebsocket.getInstance();

          gumbandWebsocket.addMessageEventListener(
            'EXHIBIT_ONLINE',
            exhibitOnlineEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'EXHIBIT_OFFLINE',
            exhibitOfflineEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'OP_MODE_RECEIVED',
            exhibitOpModeReceivedEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'EXHIBIT_HEALTH_UPDATED',
            exhibitHealthStateUpdateReceivedEventListener
          );

          gumbandWebsocket.subscribeToExhibits(exhibitId);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }

        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        // remove listeners

        gumbandWebsocket?.removeMessageEventListener<'EXHIBIT_ONLINE'>(
          exhibitOnlineEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'EXHIBIT_OFFLINE'>(
          exhibitOfflineEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'OP_MODE_RECEIVED'>(
          exhibitOpModeReceivedEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'EXHIBIT_HEALTH_UPDATED'>(
          exhibitHealthStateUpdateReceivedEventListener
        );
      },
    }),
    getAllExhibits: build.query<Array<Exhibit>, void>({
      query: () => `${getHTTPEndpoint('exhibit')}/exhibit-management/exhibit`,
      transformResponse: (response: ExhibitGetAllResponse) => response.exhibits,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ siteId, organizationId }) => ({
                type: 'Exhibit' as const,
                siteId,
                organizationId,
              })),
              'Exhibit',
            ]
          : ['Exhibit'],
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // We need to create the listener functions here so that they can be removed later
        // Additionally, in order to update the data, we need to use the `updateCachedData` function
        // which uses Immer to update the data in the cache.  If you are unfamiliar with Immer, it's
        // a library that allows us to write code as if we are mutating the state directly, but it
        // actually creates a new state object with the changes applied.  This will manage the immutability
        // of the cache for us. See https://immerjs.github.io/immer/ for more information.
        const exhibitOnlineEventListener = (data: ExhibitOnlinePayload) => {
          // Need to verify the event is for an exhibit in the list first (yes, the id is a string in this payload)
          updateCachedData((draft) => {
            const exhibit = draft.find((e) =>
              equalsAsNumbers(e.id, data.exhibitId)
            );
            if (exhibit) {
              exhibit.online = true;
            }
          });
        };

        const exhibitOfflineEventListener = (data: ExhibitOfflinePayload) => {
          // Need to verify the event is for an exhibit in the list first (yes, the id is a string in this payload)

          updateCachedData((draft) => {
            const exhibit = draft.find((e) =>
              equalsAsNumbers(e.id, data.exhibitId)
            );
            if (exhibit) {
              exhibit.online = false;
            }
          });
        };

        const exhibitOpModeReceivedEventListener = (
          data: ExhibitOpModeReceivedPayload
        ) => {
          // Need to verify the event is for an exhibit in the list first
          updateCachedData((draft) => {
            const exhibit = draft.find((e) => e.id === data.id);
            if (exhibit) {
              exhibit.opMode = data.mode ? 'On' : 'Off';
            }
          });
        };

        const exhibitHealthStateUpdateReceivedEventListener = (
          data: ExhibitHealthStateUpdatePayload
        ) => {
          // Need to verify the event is for an exhibit in the list first
          updateCachedData((draft) => {
            const exhibit = draft.find((e) => e.id === data.exhibitId);
            if (exhibit) {
              exhibit.healthState = data.healthState;
              exhibit.numberDisconnectedComponents =
                data.numberDisconnectedComponents;
              exhibit.totalNumberComponents = data.totalNumberComponents;
            }
          });
        };

        let gumbandWebsocket: GumbandWebsocket | undefined;

        try {
          const { data: exhibits } = await cacheDataLoaded;

          gumbandWebsocket = await GumbandWebsocket.getInstance();

          gumbandWebsocket.addMessageEventListener(
            'EXHIBIT_ONLINE',
            exhibitOnlineEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'EXHIBIT_OFFLINE',
            exhibitOfflineEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'OP_MODE_RECEIVED',
            exhibitOpModeReceivedEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'EXHIBIT_HEALTH_UPDATED',
            exhibitHealthStateUpdateReceivedEventListener
          );

          gumbandWebsocket.subscribeToExhibits(exhibits.map((e) => e.id));
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }

        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        // remove listeners

        gumbandWebsocket?.removeMessageEventListener<'EXHIBIT_ONLINE'>(
          exhibitOnlineEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'EXHIBIT_OFFLINE'>(
          exhibitOfflineEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'OP_MODE_RECEIVED'>(
          exhibitOpModeReceivedEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'EXHIBIT_HEALTH_UPDATED'>(
          exhibitHealthStateUpdateReceivedEventListener
        );
      },
    }),
    createExhibit: build.mutation<Exhibit, ExhibitCreateRequestParameters>({
      query: ({ name, projectId: siteId }) => ({
        url: `${getHTTPEndpoint('exhibit')}/exhibit-management/exhibit`,
        method: 'POST',
        body: { name, siteId },
      }),
      transformResponse: (response: ExhibitCreateResponse) => response.exhibit,
      invalidatesTags: (result) =>
        result ? [{ type: 'Project', id: result.siteId }, 'Exhibit'] : [],
    }),
    createExhibitToken: build.mutation<
      ComponentAuthToken,
      ExhibitCreateTokenRequestParameters
    >({
      query: ({ exhibitId, name }) => ({
        url: `${getHTTPEndpoint('auth')}/auth/exhibit`,
        method: 'POST',
        body: { name, exhibitId },
      }),
      transformResponse: (response: ExhibitCreateTokenResponse) =>
        response.token,
    }),
    getExhibitTokens: build.query<
      Array<GumbandAuthToken>,
      ExhibitGetTokenRequestParameters
    >({
      query: ({ exhibitId }) => ({
        url: `${getHTTPEndpoint('auth')}/auth/exhibit/${exhibitId}`,
      }),
      transformResponse: (response: ExhibitGetTokenResponse) => response.tokens,
    }),
    listExhibits: build.query<
      Array<ExhibitSummary>,
      ExhibitListRequestParameters
    >({
      query: ({ projectId }) => ({
        url: `${getHTTPEndpoint(
          'exhibit'
        )}/exhibit-management/exhibit/by-site-ids`,
        params: { siteId: [projectId] },
      }),
      transformResponse: (response: ExhibitListResponse) => response.exhibits,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Exhibit' as const, id })),
              'Exhibit',
            ]
          : ['Exhibit'],
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // We need to create the listener functions here so that they can be removed later
        // Additionally, in order to update the data, we need to use the `updateCachedData` function
        // which uses Immer to update the data in the cache.  If you are unfamiliar with Immer, it's
        // a library that allows us to write code as if we are mutating the state directly, but it
        // actually creates a new state object with the changes applied.  This will manage the immutability
        // of the cache for us. See https://immerjs.github.io/immer/ for more information.
        const exhibitOnlineEventListener = (data: ExhibitOnlinePayload) => {
          // Need to verify the event is for an exhibit in the list first (yes, the id is a string in this payload)
          updateCachedData((draft) => {
            const exhibit = draft.find((e) =>
              equalsAsNumbers(e.id, data.exhibitId)
            );
            if (exhibit) {
              exhibit.online = true;
            }
          });
        };

        const exhibitOfflineEventListener = (data: ExhibitOfflinePayload) => {
          // Need to verify the event is for an exhibit in the list first (yes, the id is a string in this payload)

          updateCachedData((draft) => {
            const exhibit = draft.find((e) =>
              equalsAsNumbers(e.id, data.exhibitId)
            );
            if (exhibit) {
              exhibit.online = false;
            }
          });
        };

        const exhibitOpModeReceivedEventListener = (
          data: ExhibitOpModeReceivedPayload
        ) => {
          // Need to verify the event is for an exhibit in the list first
          updateCachedData((draft) => {
            const exhibit = draft.find((e) => e.id === data.id);
            if (exhibit) {
              exhibit.opMode = data.mode ? 'On' : 'Off';
            }
          });
        };

        const exhibitHealthStateUpdateReceivedEventListener = (
          data: ExhibitHealthStateUpdatePayload
        ) => {
          // Need to verify the event is for an exhibit in the list first
          updateCachedData((draft) => {
            const exhibit = draft.find((e) => e.id === data.exhibitId);
            if (exhibit) {
              exhibit.healthState = data.healthState;
              exhibit.numberDisconnectedComponents =
                data.numberDisconnectedComponents;
              exhibit.totalNumberComponents = data.totalNumberComponents;
            }
          });
        };

        let gumbandWebsocket: GumbandWebsocket | undefined;

        try {
          const { data: exhibits } = await cacheDataLoaded;

          gumbandWebsocket = await GumbandWebsocket.getInstance();

          gumbandWebsocket.addMessageEventListener(
            'EXHIBIT_ONLINE',
            exhibitOnlineEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'EXHIBIT_OFFLINE',
            exhibitOfflineEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'OP_MODE_RECEIVED',
            exhibitOpModeReceivedEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'EXHIBIT_HEALTH_UPDATED',
            exhibitHealthStateUpdateReceivedEventListener
          );

          gumbandWebsocket.subscribeToExhibits(exhibits.map((e) => e.id));
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }

        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        // remove listeners

        gumbandWebsocket?.removeMessageEventListener<'EXHIBIT_ONLINE'>(
          exhibitOnlineEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'EXHIBIT_OFFLINE'>(
          exhibitOfflineEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'OP_MODE_RECEIVED'>(
          exhibitOpModeReceivedEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'EXHIBIT_HEALTH_UPDATED'>(
          exhibitHealthStateUpdateReceivedEventListener
        );
      },
    }),
  }),
});

export const {
  useGetExhibitQuery,
  useListExhibitsQuery,
  useGetAllExhibitsQuery,
  useCreateExhibitTokenMutation,
  useGetExhibitTokensQuery,
  useCreateExhibitMutation,
} = exhibitApi;

export type CreateExhibitAndTokenFunction = (
  exhibitParams: ExhibitCreateRequestParameters
) => Promise<
  { data: Exhibit } | { error: FetchBaseQueryError | SerializedError }
>;

export type UseCreateExhibitWithTokenMutation = () => [
  CreateExhibitAndTokenFunction,
  ReturnType<typeof useCreateExhibitMutation>[1],
];

/** Creates an exhibit and an auth token for it. Stores the token in Redux. @see {@link addExhibitComponentAuthToken} */
export const useCreateExhibitWithTokenMutation: UseCreateExhibitWithTokenMutation =
  () => {
    const dispatch = useAppDispatch();
    const [
      createExhibit,
      { isLoading: isCreatingExhibit, ...createExhibitMutationResult },
    ] = useCreateExhibitMutation();
    const [createExhibitToken, { isLoading: isCreatingToken }] =
      useCreateExhibitTokenMutation();

    const createExhibitAndToken: CreateExhibitAndTokenFunction = async (
      exhibitParams: ExhibitCreateRequestParameters
    ) => {
      try {
        // Create the new exhibit.
        const exhibit = await createExhibit(exhibitParams).unwrap();

        // Create the new token and store it in Redux. We only care about the exhibit creation error, hence the dual try/catch blocks.
        try {
          const token = await createExhibitToken({
            exhibitId: exhibit.id,
            name: DEFAULT_TOKEN_NAME,
          }).unwrap();

          dispatch(
            addExhibitComponentAuthToken({
              exhibitId: exhibit.id,
              token,
              componentType: EXHIBIT_COMPONENT_TYPE.CUSTOM_APPLICATION,
              componentId: exhibit.id,
            })
          );
        } catch (tokenError) {
          // We only care about errors from creating an exhibit. Not creating a token isn't a deal breaker here.
        }

        return { data: exhibit };
      } catch (creationError) {
        return {
          error: creationError as FetchBaseQueryError | SerializedError,
        };
      }
    };

    return [
      createExhibitAndToken,
      {
        isLoading: isCreatingExhibit || isCreatingToken,
        ...createExhibitMutationResult,
      },
    ];
  };
