import {
  isSuccessResponseBody,
  type SuccessResponseBody,
} from '@deeplocal/gumband-public-shared-lib';
import { findSetting } from '../../../utils/exhibitManifest';
import type { Exhibit, OpMode } from '../../entities/exhibit';
import {
  type IndividualSetting,
  type SettingGroup,
  type SettingList,
  type SettingListItem,
  type StrapiSetting,
  isSettingGroup,
  isSettingList,
  MANIFEST_ID_SEPARATOR,
} from '../../entities/exhibitManifest';
import { api, getHTTPEndpoint } from '../api';
import type { SuccessResponse } from '../common/responses';
import { exhibitManifestApi } from './exhibitManifest';

export interface ExhibitSettingsListItemCreateRequestParameters {
  exhibitId: Exhibit['id'];
  settingListId: SettingList['id'];
  itemName: SettingListItem['listName'];
}

interface SettingsListCreateResponse
  extends Omit<SettingList, 'type' | 'settinglistitems'> {
  settinglistitems: Array<IndividualSetting | SettingList | SettingGroup>;
}

interface ExhibitSettingsListItemCreateResponse extends SuccessResponse {
  // Yes, you read that right. This endpoint returns the entire setting list,
  // however, it isn't exactly the same shape as the same element when it is returned
  // as part of the exhibit manifest.  There may be other incorrect fields, but this should be enough for now.'
  settingsList: SettingsListCreateResponse;
}

export interface ExhibitSettingsListItemDeleteRequestParameters {
  exhibitId: Exhibit['id'];
  settingListId: SettingList['id'];
  manifestId: SettingList['manifestId']; // Needed to do the cache update
  itemName: SettingListItem['listName'];
}

export interface ExhibitSettingListItemDeleteResponse extends SuccessResponse {}

export interface ExhibitSettingsListItemOrderUpdateRequestParameters {
  exhibitId: Exhibit['id'];
  settingListId: SettingList['id'];
  manifestId: SettingList['manifestId']; // Needed to do the cache update
  order: SettingList['order'];
}

export interface ExhibitSettingsListItemOrderUpdateResponse
  extends SuccessResponse {
  order: SettingList['order'];
}

export interface ExhibitSettingUpdateRequestParameters {
  settings: Array<{
    ExhibitId: Exhibit['id'];
    settingId: IndividualSetting['id'];
    value: string | number | undefined;
  }>;
}

export interface ExhibitSettingsUpdateResponse extends SuccessResponse {
  settings: Array<IndividualSetting & { ExhibitId: Exhibit['id'] }>;
}

export interface ExhibitStrapiSettingUpdateRequestParameters {
  exhibitId: Exhibit['id'];
  manifestId: IndividualSetting['manifestId'];
  contentId: StrapiSetting['contentId'];
}

export interface ExhibitStrapiSettingUpdateResponse extends SuccessResponse {
  strapiContent: Omit<StrapiSetting, 'value'> & { ExhibitId: Exhibit['id'] };
}

export interface ExhibitOpModeUpdateRequestParameters {
  exhibitId: number;
  opMode: OpMode;
}

export interface ExhibitOpModeUpdateResponse extends SuccessResponseBody {}

const exhibitSettingsApi = api.injectEndpoints({
  endpoints: (build) => ({
    createExhibitManifestSettingsListItem: build.mutation<
      ExhibitSettingsListItemCreateResponse,
      ExhibitSettingsListItemCreateRequestParameters
    >({
      query: ({ exhibitId, settingListId, itemName }) => ({
        url: `${getHTTPEndpoint('exhibit')}/exhibit-management/exhibit/${exhibitId}/settinglist/${settingListId}`,
        method: 'POST',
        body: { listName: itemName },
      }),
      // It appears that if we invalidate the tag and try to use the onQueryStarted, a delay is introduced in providing the
      // pessimistic update, so I'm commenting this out for now in favor of the update.
      // invalidatesTags: (result) => {
      //   if (result) {
      //     return [
      //       { type: 'ExhibitManifest', id: result.settingsList.exhibitId },
      //       'ExhibitManifest',
      //     ];
      //   }
      //   return [];
      // },
      // HACK WARNING
      // ============
      // As mentioned in the types, the return object from this API call is not exactly the same as the "same" object from the exhibit manifest.
      // Therefore if we are going to do some pessimistic updates, we need to massage the data a bit.
      // After we massage the data, then we have to find the "right" spot to update it in the exhibit manifest object.
      // The possibility of a SettingList to be in multiple locations requires use to do a little manfestId manipulation
      // and then searching. This is not ideal, but it is what we have to work with.
      async onQueryStarted(entity, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { settingsList: settingsListWithoutType },
          } = await queryFulfilled;

          const {
            settinglistitems: flatSettingListItems,
            ...restSettingsListProps
          } = settingsListWithoutType;

          const settingListItemMap: Map<
            string /* listName */,
            SettingListItem
          > = new Map();

          // The return object does not have the SettingListItem type with the listName property, therefore we need to extract
          // the listName from the manifestId of each individual settingListItem and group them together.
          flatSettingListItems.forEach((settingListItem) => {
            const quotedListName = settingListItem.manifestId
              .split(MANIFEST_ID_SEPARATOR) // All levels are split by a separator
              .at(-2); // The listName is the second to last element in the manifestId

            // It seems that the in the manifestId, the listName is wrapped in quotes, so we need to remove them.  This
            // regex finds all double quotes.  They should only be used to surround the listName, as double quotes are not
            // valid characters in a listName.
            const listName = quotedListName?.replace(/"/g, '');

            if (listName) {
              const listItem = settingListItemMap.get(listName);

              if (listItem) {
                listItem.items.push(settingListItem);
              } else {
                settingListItemMap.set(listName, {
                  listName,
                  items: [settingListItem],
                });
              }
            }
          });

          const settingsList: SettingList = {
            type: 'SettingsList',
            ...restSettingsListProps,
            settinglistitems: Array.from(settingListItemMap.values()),
          };

          // Now that we have the settingsList in the correct shape, we can update the exhibit manifest
          dispatch(
            exhibitManifestApi.util.updateQueryData(
              'getExhibitManifest',
              { exhibitId: entity.exhibitId },
              (draft) => {
                const { manifestId } = settingsList;
                const manifestIdParts = manifestId.split(MANIFEST_ID_SEPARATOR);

                if (manifestIdParts.length === 1) {
                  // This settingsList is a child of the root manifest
                  const replacementIdx = draft.settingLists.findIndex(
                    (sl) => sl.id === settingsList.id
                  );

                  if (replacementIdx >= 0) {
                    draft.settingLists[replacementIdx] = settingsList;
                  }
                } else {
                  // Need to find the parent node of the settingsList
                  manifestIdParts.pop();

                  let parentManifestId = manifestIdParts.join(
                    MANIFEST_ID_SEPARATOR
                  );

                  const settingsToSearch = [
                    ...draft.settingLists,
                    ...draft.settingGroups,
                  ];

                  let parentNode = findSetting(
                    settingsToSearch,
                    parentManifestId
                  );

                  if (!parentNode) {
                    // If the parent node is actually another SettingList, we need to pop the last part of the manifestId.
                    // Likely this is the manifestId (if we had them to the this level) to the settinglist item.  To get to
                    // the parent setting list manifest id, we need to pop off the last part.  We could potentially test
                    // to see if the last element is wrapped in double quotes, as all item `listName`s are, but I don't know
                    // for sure if that is the only element that is wrapped in double quotes.

                    manifestIdParts.pop();

                    parentManifestId = manifestIdParts.join(
                      MANIFEST_ID_SEPARATOR
                    );

                    parentNode = findSetting(
                      settingsToSearch,
                      parentManifestId
                    );
                  }

                  if (isSettingGroup(parentNode)) {
                    const replacementIdx = parentNode.settingLists.findIndex(
                      (sl) => sl.id === settingsList.id
                    );

                    if (replacementIdx >= 0) {
                      parentNode.settingLists[replacementIdx] = settingsList;
                    }
                  } else if (isSettingList(parentNode)) {
                    // Loop throughout the settinglistitems, then loop through the list of items within the settinglistitems
                    // to see if you find a match.  If you do, replace and exit the loop.
                    for (
                      let idx = 0, len = parentNode.settinglistitems.length;
                      idx < len;
                      idx++
                    ) {
                      const settingListItem = parentNode.settinglistitems[idx];
                      const replacementIdx = settingListItem.items.findIndex(
                        (item) => item.id === settingsList.id
                      );

                      if (replacementIdx >= 0) {
                        settingListItem.items[replacementIdx] = settingsList;
                        break;
                      }
                    }
                  }
                  // If we fail to find the item to be replaced, we won't throw and error, but we will just resort to
                  // the default refresh behavior.
                }
              }
            )
          );
        } catch {
          // Absorb the error, as we don't want to throw an error if the data is not in the correct shape.
        }
      },
    }),
    deleteExhibitManifestSettingsListItem: build.mutation<
      ExhibitSettingListItemDeleteResponse,
      ExhibitSettingsListItemDeleteRequestParameters
    >({
      query: ({ exhibitId, settingListId, itemName }) => ({
        url: `${getHTTPEndpoint('exhibit')}/exhibit-management/exhibit/${exhibitId}/settinglist/${settingListId}`,
        method: 'DELETE',
        params: { listName: itemName },
      }),
      async onQueryStarted(requestParams, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            exhibitManifestApi.util.updateQueryData(
              'getExhibitManifest',
              { exhibitId: requestParams.exhibitId },
              (draft) => {
                const settingList = findSetting(
                  [...draft.settingLists, ...draft.settingGroups],
                  requestParams.manifestId
                );

                if (isSettingList(settingList)) {
                  // Remove the settingListItem from the settingList
                  const settingListItemIdx =
                    settingList.settinglistitems.findIndex(
                      (settingListItem) =>
                        settingListItem.listName === requestParams.itemName
                    );

                  if (settingListItemIdx >= 0) {
                    settingList.settinglistitems.splice(settingListItemIdx, 1);
                  }

                  // Remove the item name from the order list
                  const orderIdx =
                    settingList.order?.indexOf(requestParams.itemName) || -1;

                  if (orderIdx >= 0) {
                    settingList.order?.splice(orderIdx, 1);
                  }
                }
              }
            )
          );
        } catch {
          // Absorb the error, as we don't want to throw an error if the data is not in the correct shape.
        }
      },
    }),
    updateExhibitManifestSettingsListItemOrder: build.mutation<
      ExhibitSettingsListItemOrderUpdateResponse,
      ExhibitSettingsListItemOrderUpdateRequestParameters
    >({
      query: ({ exhibitId, settingListId, order }) => ({
        url: `${getHTTPEndpoint('exhibit')}/exhibit-management/exhibit/${exhibitId}/settinglist/${settingListId}/order`,
        method: 'POST',
        body: { order },
      }),
      async onQueryStarted(requestParams, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;

          if (response.order) {
            dispatch(
              exhibitManifestApi.util.updateQueryData(
                'getExhibitManifest',
                { exhibitId: requestParams.exhibitId },
                (draft) => {
                  const settingList = findSetting(
                    [...draft.settingLists, ...draft.settingGroups],
                    requestParams.manifestId
                  );

                  if (isSettingList(settingList)) {
                    settingList.order = response.order;
                  }
                }
              )
            );
          }
        } catch {
          // Absorb the error, as we don't want to throw an error if the data is not in the correct shape.
        }
      },
    }),
    updateExhibitSettings: build.mutation<
      ExhibitSettingsUpdateResponse,
      ExhibitSettingUpdateRequestParameters
    >({
      query: (body) => ({
        url: `${getHTTPEndpoint(
          'exhibit'
        )}/exhibit-management/exhibit/settings`,
        method: 'POST',
        body,
      }),
      // invalidatesTags: (result) => {
      //   if (result) {
      //     return result.settings.map((setting) => {
      //       return { type: 'ExhibitManifest', id: setting.ExhibitId };
      //     });
      //   }
      //   return [];
      // },
      // Pessimistic update so that we don't have to wait for the manifest to refresh on screen'
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { settings },
          } = await queryFulfilled;

          dispatch(
            exhibitManifestApi.util.updateQueryData(
              'getExhibitManifest',
              { exhibitId: request.settings[0].ExhibitId },
              (draft) => {
                const settingsToSearch = [
                  ...draft.settings,
                  ...draft.settingLists,
                  ...draft.settingGroups,
                ];
                settings?.forEach((setting) => {
                  const foundSetting = findSetting(
                    settingsToSearch,
                    setting.manifestId
                  );

                  if (
                    foundSetting &&
                    !isSettingList(foundSetting) &&
                    !isSettingGroup(foundSetting)
                  ) {
                    foundSetting.value = setting.value;
                  }
                });
              }
            )
          );
        } catch {
          // Absourb the error, as we don't want to throw an error if the data is not in the correct shape.
        }
      },
    }),
    updateExhibitStrapiSetting: build.mutation<
      ExhibitStrapiSettingUpdateResponse,
      ExhibitStrapiSettingUpdateRequestParameters
    >({
      query: ({ exhibitId, manifestId, contentId }) => ({
        url: `${getHTTPEndpoint(
          'exhibit'
        )}/exhibit-management/exhibit/${exhibitId}/strapi-content/${encodeURIComponent(manifestId)}`,
        method: 'PUT',
        body: { contentId },
      }),
      // The manifest StrapiContent value is not returned from this endpoint, so we need to invalidate the cache
      invalidatesTags: (result) => {
        if (result) {
          return [
            {
              type: 'ExhibitManifest',
              id: result.strapiContent.ExhibitId,
            },
          ];
        }
        return [];
      },
    }),
    updateExhibitOpMode: build.mutation<
      ExhibitOpModeUpdateResponse,
      ExhibitOpModeUpdateRequestParameters
    >({
      query: (body) => ({
        url: `${getHTTPEndpoint(
          'exhibit'
        )}/exhibit-management/exhibit/${body.exhibitId}/opMode`,
        method: 'POST',
        body,
      }),
      // Pessimistic update so that we don't have to wait for the manifest to refresh on screen'
      async onQueryStarted(request, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;

          if (isSuccessResponseBody(response)) {
            dispatch(
              exhibitManifestApi.util.updateQueryData(
                'getExhibitManifest',
                { exhibitId: request.exhibitId },
                (draft) => {
                  draft.opMode = request.opMode;
                }
              )
            );
          }
        } catch {
          // Absourb the error, as we don't want to throw an error if the data is not in the correct shape.
        }
      },
    }),
  }),
});

export const {
  useCreateExhibitManifestSettingsListItemMutation,
  useDeleteExhibitManifestSettingsListItemMutation,
  useUpdateExhibitManifestSettingsListItemOrderMutation,
  useUpdateExhibitSettingsMutation,
  useUpdateExhibitStrapiSettingMutation,
  useUpdateExhibitOpModeMutation,
} = exhibitSettingsApi;
