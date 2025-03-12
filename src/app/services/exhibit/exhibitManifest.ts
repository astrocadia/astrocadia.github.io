import { findSetting } from '../../../utils/exhibitManifest';
import { equalsAsNumbers } from '../../../utils/number';
import {
  type ExhibitManifest,
  isSettingGroup,
  isSettingList,
  STATUS_TYPE,
} from '../../entities/exhibitManifest';
import { api, getHTTPEndpoint } from '../api';
import { GumbandWebsocket } from '../websocket/GumbandWebsocket';
import type {
  ExhibitOfflinePayload,
  ExhibitOnlinePayload,
  ExhibitOpModeReceivedPayload,
  ExhibitSettingListReceivedPayload,
  ExhibitSettingReceivedPayload,
  ExhibitStatusReceivedPayload,
} from '../websocket/websocketResponsePayloads';

export interface ExhibitManifestGetParameters {
  exhibitId: number;
}

export interface ExhibitManifestGetResponse {
  manifest: ExhibitManifest;
}

export const exhibitManifestApi = api.injectEndpoints({
  endpoints: (build) => ({
    getExhibitManifest: build.query<
      ExhibitManifest,
      ExhibitManifestGetParameters
    >({
      query: ({ exhibitId }) =>
        `${getHTTPEndpoint(
          'exhibit'
        )}/exhibit-management/exhibit/${exhibitId}/manifest`,
      async onCacheEntryAdded(
        { exhibitId },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
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

        const exhibitSettingListReceivedEventListener = (
          data: ExhibitSettingListReceivedPayload
        ) => {
          // The exhibitId is not included in this payload, so the best that we can do is
          // check to see if the manifestId (data.id) is contained in the manifest object.
          updateCachedData((draft) => {
            // Settings cannot contain SettingGroups or SettingLists, so we don't need to check it
            // However, both SettingGroups and SettingLists can contain SettingLists, so we need to check
            const setting =
              findSetting(draft.settingLists, data.id) ||
              findSetting(draft.settingGroups, data.id);

            // If setting is found, it should be a SettingList. We don't really care... as long
            // as a match is found, we want to invalidate the cache for this manifest.
            if (setting) {
              dispatch(api.util.invalidateTags(['ExhibitManifest']));
            }
          });
        };

        const exhibitSettingReceivedEventListener = (
          data: ExhibitSettingReceivedPayload
        ) => {
          // Need to verify the event is for this exhibit first
          if (data.id === exhibitId) {
            updateCachedData((draft) => {
              const settingToUpdate =
                findSetting(draft.settings, data.manifestId) ||
                findSetting(draft.settingLists, data.manifestId) ||
                findSetting(draft.settingGroups, data.manifestId);

              if (
                settingToUpdate &&
                !isSettingGroup(settingToUpdate) &&
                !isSettingList(settingToUpdate)
              ) {
                settingToUpdate.value = data.settingValue;
              }
            });
          }
        };

        const exhibitStatusReceivedEventListener = (
          data: ExhibitStatusReceivedPayload
        ) => {
          updateCachedData((draft) => {
            // The exhibitId is not included in this payload, so the best that we can do is
            // to verify the status exists in this manifest by checking that the status id of the payload
            // matches the status id of a status in the manifest. This id field is the PK of the status,
            // and thus, it will be unique.
            const status = draft.statuses.find((s) => s.id === data.id);
            if (
              status &&
              status.type === STATUS_TYPE.STRING &&
              data.type === STATUS_TYPE.STRING
            ) {
              status.value = data.value;
              status.updatedAt = data.updatedAt;
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
            'SETTING_LIST_RECEIVED',
            exhibitSettingListReceivedEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'SETTING_RECEIVED',
            exhibitSettingReceivedEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'STATUS_RECEIVED',
            exhibitStatusReceivedEventListener
          );

          // There are a number of additional events related to settings that we could listen for
          // but at the moment, they don't provide any additional value.
          // NEW_MANIFEST          - Is never actually emitted from the back end, therefore we
          //                         don't need to listen for it
          // SETTING_LIST_RECEIVED - While we do listen for this event, the actual payload does not
          //                         supply enough information to update the cache, therefore we just
          //                         invalidate the cache.  It would be more efficient to update just
          //                         the specific setting.
          // SETTING_LIST_DELETED  - This event is quickly followed by a SETTING_LIST_RECEIVED event
          //                         and doesn't provide enough information to update the cache, therefore
          //                         we will ignore it and just wait for the SETTING_LIST_RECEIVED event.

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

        gumbandWebsocket?.removeMessageEventListener<'OP_MODE_RECEIVED'>(
          exhibitOpModeReceivedEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'SETTING_LIST_RECEIVED'>(
          exhibitSettingListReceivedEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'SETTING_RECEIVED'>(
          exhibitSettingReceivedEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'STATUS_RECEIVED'>(
          exhibitStatusReceivedEventListener
        );
      },
      transformResponse: (response: ExhibitManifestGetResponse) =>
        response.manifest,
      providesTags: (result) =>
        result
          ? [{ type: 'ExhibitManifest', id: result.id }, 'ExhibitManifest']
          : ['ExhibitManifest'],
    }),
    // Functionally identical to getExhibitManifest, but without a subscription to live status updates.
    getExhibitManifestWithoutStatusSubscription: build.query<
      ExhibitManifest,
      ExhibitManifestGetParameters
    >({
      query: ({ exhibitId }) =>
        `${getHTTPEndpoint(
          'exhibit'
        )}/exhibit-management/exhibit/${exhibitId}/manifest`,
      async onCacheEntryAdded(
        { exhibitId },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved, dispatch }
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

        const exhibitSettingListReceivedEventListener = (
          data: ExhibitSettingListReceivedPayload
        ) => {
          // The exhibitId is not included in this payload, so the best that we can do is
          // check to see if the manifestId (data.id) is contained in the manifest object.
          updateCachedData((draft) => {
            // Settings cannot contain SettingGroups or SettingLists, so we don't need to check it
            // However, both SettingGroups and SettingLists can contain SettingLists, so we need to check
            const setting =
              findSetting(draft.settingLists, data.id) ||
              findSetting(draft.settingGroups, data.id);

            // If setting is found, it should be a SettingList. We don't really care... as long
            // as a match is found, we want to invalidate the cache for this manifest.
            if (setting) {
              dispatch(api.util.invalidateTags(['ExhibitManifest']));
            }
          });
        };

        const exhibitSettingReceivedEventListener = (
          data: ExhibitSettingReceivedPayload
        ) => {
          // Need to verify the event is for this exhibit first
          if (data.id === exhibitId) {
            updateCachedData((draft) => {
              const settingToUpdate =
                findSetting(draft.settings, data.manifestId) ||
                findSetting(draft.settingLists, data.manifestId) ||
                findSetting(draft.settingGroups, data.manifestId);

              if (
                settingToUpdate &&
                !isSettingGroup(settingToUpdate) &&
                !isSettingList(settingToUpdate)
              ) {
                settingToUpdate.value = data.settingValue;
              }
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

          gumbandWebsocket.addMessageEventListener(
            'OP_MODE_RECEIVED',
            exhibitOpModeReceivedEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'SETTING_LIST_RECEIVED',
            exhibitSettingListReceivedEventListener
          );

          gumbandWebsocket.addMessageEventListener(
            'SETTING_RECEIVED',
            exhibitSettingReceivedEventListener
          );

          // There are a number of additional events related to settings that we could listen for
          // but at the moment, they don't provide any additional value.
          // NEW_MANIFEST          - Is never actually emitted from the back end, therefore we
          //                         don't need to listen for it
          // SETTING_LIST_RECEIVED - While we do listen for this event, the actual payload does not
          //                         supply enough information to update the cache, therefore we just
          //                         invalidate the cache.  It would be more efficient to update just
          //                         the specific setting.
          // SETTING_LIST_DELETED  - This event is quickly followed by a SETTING_LIST_RECEIVED event
          //                         and doesn't provide enough information to update the cache, therefore
          //                         we will ignore it and just wait for the SETTING_LIST_RECEIVED event.

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

        gumbandWebsocket?.removeMessageEventListener<'OP_MODE_RECEIVED'>(
          exhibitOpModeReceivedEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'SETTING_LIST_RECEIVED'>(
          exhibitSettingListReceivedEventListener
        );

        gumbandWebsocket?.removeMessageEventListener<'SETTING_RECEIVED'>(
          exhibitSettingReceivedEventListener
        );
      },
      transformResponse: (response: ExhibitManifestGetResponse) =>
        response.manifest,
      providesTags: (result) =>
        result
          ? [{ type: 'ExhibitManifest', id: result.id }, 'ExhibitManifest']
          : ['ExhibitManifest'],
    }),
  }),
});

export const {
  useGetExhibitManifestQuery,
  useGetExhibitManifestWithoutStatusSubscriptionQuery,
} = exhibitManifestApi;
