import type {
  ComponentConnectedPayload,
  ComponentDisconnectedPayload,
  ComponentPropertyReceivedPayload,
} from '@deeplocal/gumband-public-shared-lib';
import { equalsAsNumbers } from '../../utils/number';
import {
  EXHIBIT_COMPONENT_TYPE,
  ExhibitHardware,
  type ExhibitHardwareComponentDetails,
  type ExhibitHardwareComponentIndividualProperty,
  type ExhibitHardwareComponentPropertyOrGroup,
  type ExhibitHardwareComponentSummary,
  ExhibitSoftware,
  type ExhibitSoftwareComponentSummary,
  ExhibitSoftwareComponentType,
  isExhibitHardwareComponentProperty,
} from '../entities/exhibitComponents';
import { api, getHTTPEndpoint } from './api';
import type { SuccessResponse } from './common/responses';
import { addExhibitComponentAuthToken } from './exhibitComponentAuthTokens';
import { GumbandWebsocket } from './websocket/GumbandWebsocket';
import type {
  ExhibitOfflinePayload,
  ExhibitOnlinePayload,
} from './websocket/websocketResponsePayloads';

export interface ExhibitComponentListRequestParameters {
  exhibitId: number;
}

export interface ExhibitHardwareComponentDetailsRequestParameters
  extends Pick<ExhibitHardwareComponentDetails, 'componentId'> {}

export interface ExhibitSoftwareComponentListResponse extends SuccessResponse {
  components: Array<ExhibitSoftwareComponentSummary>;
}

export interface ExhibitHardwareComponentListResponse extends SuccessResponse {
  components: Array<ExhibitHardwareComponentSummary>;
}

export interface ExhibitHardwareComponentDetailsResponse
  extends SuccessResponse {
  component: ExhibitHardwareComponentDetails;
}

export interface ExhibitHardwareComponentPropertiesResponse
  extends SuccessResponse {
  properties: Array<ExhibitHardwareComponentPropertyOrGroup>;
}

export interface ExhibitHardwareComponentPropertiesRequestParameters
  extends ExhibitHardwareComponentDetailsRequestParameters {
  group?: 'false';
  source?: ExhibitHardwareComponentIndividualProperty['source'];
}

export interface UpdateExhibitHardwareComponentPropertyResponse
  extends SuccessResponse {}

export interface UpdateExhibitHardwareComponentPropertyRequestParameters {
  componentId: ExhibitHardwareComponentIndividualProperty['componentId'];
  propertyPath: ExhibitHardwareComponentIndividualProperty['path'];
  source: ExhibitHardwareComponentIndividualProperty['source'];
  values: ExhibitHardwareComponentIndividualProperty['value'];
}

export interface ExhibitCreateHardwareComponentRequest {
  exhibitId: number;
  exhibitApi: string;
  name?: string;
  order?: number;
}

export interface ExhibitCreateSoftwareComponentRequest {
  exhibitId: number;
  name: string;
  type?: ExhibitSoftwareComponentType;
  order?: number;
}

export interface ExhibitCreateComponentResponseBase extends SuccessResponse {
  credentials: {
    componentId: ExhibitHardware['componentId'];
    token: string;
  };
}

export interface ExhibitCreateHardwareComponentResponse
  extends ExhibitCreateComponentResponseBase {
  component: ExhibitHardware;
}

export interface ExhibitCreateSoftwareComponentResponse
  extends ExhibitCreateComponentResponseBase {
  component: ExhibitSoftware;
}

const findComponentProperty = (
  property: ExhibitHardwareComponentPropertyOrGroup,
  collectedProperties: ExhibitHardwareComponentIndividualProperty[] = []
): ExhibitHardwareComponentIndividualProperty[] => {
  if (isExhibitHardwareComponentProperty(property)) {
    collectedProperties.push(property);
  } else {
    property.properties.forEach((groupProperty) =>
      findComponentProperty(groupProperty, collectedProperties)
    );
  }
  return collectedProperties;
};

export const findComponentProperties = (
  properties: Array<ExhibitHardwareComponentPropertyOrGroup>
): ExhibitHardwareComponentIndividualProperty[] => {
  const collectedProperties: ExhibitHardwareComponentIndividualProperty[] = [];
  properties.forEach((property) =>
    findComponentProperty(property, collectedProperties)
  );
  return collectedProperties;
};

export const exhibitComponentApi = api.injectEndpoints({
  endpoints: (build) => ({
    listExhibitSoftwareComponents: build.query<
      Array<ExhibitSoftwareComponentSummary>,
      ExhibitComponentListRequestParameters
    >({
      query: ({ exhibitId }) => ({
        url: `${getHTTPEndpoint(
          'exhibit'
        )}/exhibit-management/component/by-exhibit-id/${exhibitId}`,
      }),
      async onCacheEntryAdded(
        { exhibitId },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const exhibitOnlineEventListener = (data: ExhibitOnlinePayload) => {
          if (equalsAsNumbers(data.exhibitId, exhibitId)) {
            updateCachedData((draft) => {
              draft.forEach((component) => {
                // eslint-disable-next-line no-param-reassign
                component.connected = true;
                // eslint-disable-next-line no-param-reassign
                component.connectedChangedAt = data.lastOnlineChange;
              });
            });
          }
        };

        const exhibitOfflineEventListener = (data: ExhibitOfflinePayload) => {
          if (equalsAsNumbers(data.exhibitId, exhibitId)) {
            updateCachedData((draft) => {
              draft.forEach((component) => {
                // eslint-disable-next-line no-param-reassign
                component.connected = false;
                // eslint-disable-next-line no-param-reassign
                component.connectedChangedAt = data.lastOnlineChange;
              });
            });
          }
        };

        let gumbandWebsocket: GumbandWebsocket | undefined;

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          gumbandWebsocket = await GumbandWebsocket.getInstance();

          // Actually add the listeners

          gumbandWebsocket.addMessageEventListener(
            'EXHIBIT_ONLINE',
            exhibitOnlineEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'EXHIBIT_OFFLINE',
            exhibitOfflineEventListener
          );

          // Now that we have the listeners ready, we need to subscribe to the exhibit so that
          // we can receive updates
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
      },
      /* TODO:: The follow is a quick fix to handle the dicrepencies between an endpoint change and the way it's used in the FE.
       * At this point both endpoints (hardware and here, software) now return with `compnentId`.  The following ticket has between
       * created so to remove this transformResponse and the one in the hardware list endpoint and make any and all necessary type
       * updates.
       * https://deeplocal.atlassian.net/browse/GUM-1718
       * */
      transformResponse: (response: ExhibitSoftwareComponentListResponse) =>
        response.components,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ componentId }) => ({
                type: 'Software' as const,
                id: componentId,
              })),
              'Software',
            ]
          : ['Software'],
    }),
    listExhibitHardwareComponents: build.query<
      Array<ExhibitHardwareComponentSummary>,
      ExhibitComponentListRequestParameters
    >({
      query: ({ exhibitId }) => ({
        url: `${getHTTPEndpoint('hardware')}/hardware-management/component/list/`,
        params: { exhibitId },
      }),
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getCacheEntry }
      ) {
        const ComponentDisconnectedEventListener = (
          data: ComponentDisconnectedPayload
        ) => {
          updateCachedData((draft) => {
            draft.forEach((component) => {
              if (component.componentId === data.componentId) {
                // eslint-disable-next-line no-param-reassign
                component.connected = false;
                // eslint-disable-next-line no-param-reassign
                component.connectedChangedAt = data.connectedChangedAt;
              }
            });
          });
        };

        const ComponentConnectedEventListener = (
          data: ComponentConnectedPayload
        ) => {
          updateCachedData((draft) => {
            draft.forEach((component) => {
              if (component.componentId === data.componentId) {
                // eslint-disable-next-line no-param-reassign
                component.connected = true;
                // eslint-disable-next-line no-param-reassign
                component.connectedChangedAt = data.connectedChangedAt;
              }
            });
          });
        };

        let gumbandWebsocket: GumbandWebsocket | undefined;

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          gumbandWebsocket = await GumbandWebsocket.getInstance();

          // Actually add the listeners

          gumbandWebsocket.addMessageEventListener(
            'COMPONENT_CONNECTED',
            ComponentConnectedEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'COMPONENT_DISCONNECTED',
            ComponentDisconnectedEventListener
          );

          // Now that we have the listeners ready, we need to subscribe to the exhibit so that
          // we can receive updates
          const { data } = getCacheEntry();
          if (data) {
            gumbandWebsocket.subscribeToHardware(
              data.map(({ componentId }) => componentId)
            );
          }
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }

        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        // remove listeners

        gumbandWebsocket?.removeMessageEventListener<'COMPONENT_CONNECTED'>(
          ComponentConnectedEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'COMPONENT_DISCONNECTED'>(
          ComponentConnectedEventListener
        );
      },
      transformResponse: (response: ExhibitHardwareComponentListResponse) =>
        response.components,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ componentId }) => ({
                type: 'Hardware' as const,
                id: componentId,
              })),
              'Hardware',
            ]
          : ['Hardware'],
    }),
    getExhibitHardwareComponentDetails: build.query<
      ExhibitHardwareComponentDetails,
      ExhibitHardwareComponentDetailsRequestParameters
    >({
      query: ({ componentId }) => ({
        url: `${getHTTPEndpoint('hardware')}/hardware-management/component/`,
        params: { componentId },
      }),
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getCacheEntry }
      ) {
        const ComponentDisconnectedEventListener = (
          data: ComponentDisconnectedPayload
        ) => {
          updateCachedData((draft) => {
            if (draft.componentId === data.componentId) {
              draft.connected = false;
              draft.connectedChangedAt = data.connectedChangedAt;
            }
          });
        };

        const ComponentConnectedEventListener = (
          data: ComponentConnectedPayload
        ) => {
          updateCachedData((draft) => {
            if (draft.componentId === data.componentId) {
              draft.connected = true;
              draft.connectedChangedAt = data.connectedChangedAt;
            }
          });
        };

        let gumbandWebsocket: GumbandWebsocket | undefined;

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          gumbandWebsocket = await GumbandWebsocket.getInstance();

          // Actually add the listeners

          gumbandWebsocket.addMessageEventListener(
            'COMPONENT_CONNECTED',
            ComponentConnectedEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'COMPONENT_DISCONNECTED',
            ComponentDisconnectedEventListener
          );

          // Now that we have the listeners ready, we need to subscribe to the exhibit so that
          // we can receive updates
          const { data } = getCacheEntry();
          if (data) {
            gumbandWebsocket.subscribeToHardware(data.componentId);
          }
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }

        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        // remove listeners

        gumbandWebsocket?.removeMessageEventListener<'COMPONENT_CONNECTED'>(
          ComponentConnectedEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'COMPONENT_DISCONNECTED'>(
          ComponentConnectedEventListener
        );
      },
      transformResponse: (response: ExhibitHardwareComponentDetailsResponse) =>
        response.component,
      providesTags: (result) =>
        result
          ? [
              {
                type: 'Hardware' as const,
                id: result.componentId,
              },
              'Hardware',
            ]
          : ['Hardware'],
    }),
    getExhibitHardwareComponentProperties: build.query<
      Array<ExhibitHardwareComponentPropertyOrGroup>,
      ExhibitHardwareComponentPropertiesRequestParameters
    >({
      query: ({ componentId, source, group }) => ({
        url: `${getHTTPEndpoint('hardware')}/hardware-management/component/${componentId}/properties/${source || 'app'}`,
        params: { group },
      }),
      async onCacheEntryAdded(
        request,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getCacheEntry }
      ) {
        const ComponentPropertyReceivedEventListener = (
          data: ComponentPropertyReceivedPayload
        ) => {
          updateCachedData((draft) => {
            if (
              request.componentId !== data.property.componentId ||
              request.source !== data.property.source
            ) {
              return;
            }
            const foundProperty = findComponentProperties(draft).find(
              (property) => property.path === data.property.path
            );

            if (foundProperty) {
              // Update the property value if found
              foundProperty.value = data.property
                .value as ExhibitHardwareComponentIndividualProperty['value'];
            } else {
              draft.push(
                data.property as ExhibitHardwareComponentIndividualProperty
              );
            }
          });
        };

        let gumbandWebsocket: GumbandWebsocket | undefined;

        try {
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          gumbandWebsocket = await GumbandWebsocket.getInstance();

          // Actually add the listeners

          gumbandWebsocket.addMessageEventListener(
            'COMPONENT_PROPERTY_RECEIVED',
            ComponentPropertyReceivedEventListener
          );

          // Now that we have the listeners ready, we need to subscribe to the exhibit so that
          // we can receive updates
          const { data } = getCacheEntry();
          if (data) {
            gumbandWebsocket.subscribeToHardware(request.componentId);
          }
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }

        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        // remove listeners

        gumbandWebsocket?.removeMessageEventListener<'COMPONENT_PROPERTY_RECEIVED'>(
          ComponentPropertyReceivedEventListener
        );
      },
      transformResponse: (
        response: ExhibitHardwareComponentPropertiesResponse
      ) => response.properties,
      providesTags: (result, _, { componentId }) => {
        return result
          ? [
              {
                type: 'Hardware' as const,
                id: componentId,
              },
              'Hardware',
            ]
          : ['Hardware'];
      },
    }),
    updateExhibitHardwareComponentProperty: build.mutation<
      UpdateExhibitHardwareComponentPropertyResponse,
      UpdateExhibitHardwareComponentPropertyRequestParameters
    >({
      query: ({ componentId, propertyPath, values, source }) => ({
        url: `${getHTTPEndpoint('hardware')}/hardware-management/component/${componentId}/property`,
        method: 'POST',
        body: { propertyPath, values, source },
      }),
    }),
    createExhibitHardwareComponent: build.mutation<
      ExhibitCreateHardwareComponentResponse,
      ExhibitCreateHardwareComponentRequest
    >({
      query: (params) => ({
        url: `${getHTTPEndpoint('hardware')}/hardware-management/component`,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Hardware'],
      // Adds the auth token to the store
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        // Wait for the query to be fulfilled and get the response
        const {
          data: { credentials, response },
        } = await queryFulfilled;

        if (response === 'success') {
          dispatch(
            addExhibitComponentAuthToken({
              exhibitId: params.exhibitId,
              token: credentials.token,
              componentType: EXHIBIT_COMPONENT_TYPE.CUSTOM_HARDWARE,
              componentId: credentials.componentId,
            })
          );
        }
      },
    }),
    createExhibitSoftwareComponent: build.mutation<
      ExhibitCreateSoftwareComponentResponse,
      ExhibitCreateSoftwareComponentRequest
    >({
      query: (params) => ({
        url: `${getHTTPEndpoint('exhibit')}/exhibit-management/software/`,
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Software'],
      // Adds the auth token to the store
      async onQueryStarted(params, { dispatch, queryFulfilled }) {
        // Wait for the query to be fulfilled and get the response
        const {
          data: { credentials, response },
        } = await queryFulfilled;

        if (response === 'success') {
          dispatch(
            addExhibitComponentAuthToken({
              exhibitId: params.exhibitId,
              token: credentials.token,
              componentType: params.type
                ? params.type
                : EXHIBIT_COMPONENT_TYPE.CUSTOM_APPLICATION,
              componentId: credentials.componentId,
            })
          );
        }
      },
    }),
  }),
});

export const {
  useListExhibitSoftwareComponentsQuery,
  useListExhibitHardwareComponentsQuery,
  useGetExhibitHardwareComponentDetailsQuery,
  useGetExhibitHardwareComponentPropertiesQuery,
  useUpdateExhibitHardwareComponentPropertyMutation,
  useCreateExhibitHardwareComponentMutation,
  useCreateExhibitSoftwareComponentMutation,
} = exhibitComponentApi;
