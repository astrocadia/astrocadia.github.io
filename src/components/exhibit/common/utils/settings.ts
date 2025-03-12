import {
  ExhibitSettingsManifest,
  IndividualSetting,
  isSettingGroup,
  isSettingList,
  SettingGroup,
  SettingList,
  SettingListItem,
} from '../../../../app/entities/exhibitManifest';
import { SettingBreadcrumb } from '../types';
import { sortSettings } from './sorting';

export type FlattenedSettingsBlock = {
  breadcrumbs: Array<SettingBreadcrumb>;
  settings: Array<IndividualSetting>;
};

function flattenSettingsGroupOrList(
  groupOrList: SettingGroup | SettingList,
  prevBreadcrumbs: Array<SettingBreadcrumb>,
  flattenedSettings: Array<FlattenedSettingsBlock>
) {
  if (isSettingGroup(groupOrList)) {
    const settingGroup = groupOrList;
    const currentBreadcrumbs: Array<SettingBreadcrumb> = prevBreadcrumbs.concat(
      {
        manifestId: settingGroup.manifestId,
        label: settingGroup.groupDisplay,
      }
    );
    const groupSettings = [
      ...settingGroup.settings,
      ...settingGroup.strapiContent,
    ].sort(sortSettings);
    if (groupSettings.length > 1) {
      flattenedSettings.push({
        breadcrumbs: currentBreadcrumbs,
        settings: groupSettings,
      });
    }

    const childGroupsAndLists = [
      ...settingGroup.settingGroups,
      ...settingGroup.settingLists,
    ].sort(sortSettings);
    childGroupsAndLists.forEach((child) =>
      flattenSettingsGroupOrList(child, currentBreadcrumbs, flattenedSettings)
    );
  } else {
    const settingsList = groupOrList;
    if (settingsList.settinglistitems.length > 0) {
      const currentSettingListBreadcrumbs = prevBreadcrumbs.concat({
        manifestId: settingsList.manifestId,
        label: settingsList.listDisplay,
      });
      settingsList.settinglistitems.forEach((item) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        flattenSettingsListItem(
          item,
          currentSettingListBreadcrumbs,
          flattenedSettings
        );
      });
    }
  }
}

function flattenSettingsListItem(
  settingListItem: SettingListItem,
  parentBreadcrumbs: Array<SettingBreadcrumb>,
  flattenedSettings: Array<FlattenedSettingsBlock>
) {
  const parentSettingListManifestId = parentBreadcrumbs.at(-1)?.manifestId;
  // Flattened Settings get weird when trying to shrink settingListItems, so we do not shrink them here
  const currentBreadcrumbs: Array<SettingBreadcrumb> = parentBreadcrumbs.concat(
    {
      // generate manifestId for settinglistitem (we don't do this in the BE smh)
      manifestId: `${parentSettingListManifestId}/"${settingListItem.listName}"`,
      label: settingListItem.listName,
      isSettingListItem: true,
    }
  );
  const settingListItemSettings = settingListItem.items
    .filter((settingOrGroupOrList) => {
      return (
        !isSettingGroup(settingOrGroupOrList) &&
        !isSettingList(settingOrGroupOrList)
      );
    })
    .sort(sortSettings) as Array<IndividualSetting>;
  if (settingListItemSettings.length > 0) {
    flattenedSettings.push({
      breadcrumbs: currentBreadcrumbs,
      settings: settingListItemSettings,
    });
  }
  const childGroupsAndLists = settingListItem.items
    .filter((settingOrGroupOrList) => {
      return (
        isSettingGroup(settingOrGroupOrList) ||
        isSettingList(settingOrGroupOrList)
      );
    })
    .sort(sortSettings);
  childGroupsAndLists.forEach((child) =>
    // @ts-expect-error for some reason, the build still thinks child is Array<IndividualSetting | SettingGroup | SettingList>
    flattenSettingsGroupOrList(child, currentBreadcrumbs, flattenedSettings)
  );
}

export function flattenManifestSettings(
  settingsManifest: ExhibitSettingsManifest
): Array<FlattenedSettingsBlock> {
  const flattenedSettings: Array<FlattenedSettingsBlock> = [];

  const rootSettings = [
    ...settingsManifest.settings,
    ...settingsManifest.strapiContent,
  ].sort(sortSettings);

  if (rootSettings.length > 0) {
    flattenedSettings.push({
      settings: rootSettings,
      breadcrumbs: [],
    });
  }

  const allSettingsGroupsAndLists = [
    ...settingsManifest.settingGroups,
    ...settingsManifest.settingLists,
  ].sort(sortSettings);

  if (allSettingsGroupsAndLists.length > 0) {
    allSettingsGroupsAndLists.forEach((groupOrList) => {
      flattenSettingsGroupOrList(groupOrList, [], flattenedSettings);
    });
  }

  return flattenedSettings;
}
