import {
  isSettingGroup,
  isSettingList,
  type IndividualSetting,
  type SettingGroup,
  type SettingList,
} from '../app/entities/exhibitManifest';

export const findSetting = (
  settings:
    | IndividualSetting
    | SettingList
    | SettingGroup
    | Array<IndividualSetting>
    | Array<SettingList>
    | Array<SettingGroup>
    | Array<IndividualSetting | SettingList | SettingGroup>,
  manifestId: string
): IndividualSetting | SettingGroup | SettingList | undefined => {
  if (Array.isArray(settings)) {
    // If it's an array of items, we need to run the recursive function on each item
    const l = settings.length;
    for (let i = 0; i < l; i++) {
      const foundSetting = findSetting(settings[i], manifestId);
      if (foundSetting) {
        return foundSetting;
      }
    }
  } else {
    // If it's a single item, we need to check if it's the one we're looking for, if so stop here
    if (settings.manifestId === manifestId) {
      return settings;
    }

    // If it's a setting list, we need to run the recursive function on each of its internal items
    // We can short-circuit the search if the SettingList in question doesn't have a manifestId that
    // matches the start of the manifestId we're looking for
    if (isSettingList(settings) && manifestId.startsWith(settings.manifestId)) {
      const settingListItemsLength = settings.settinglistitems.length;
      for (
        let settingListItemsIndex = 0;
        settingListItemsIndex < settingListItemsLength;
        settingListItemsIndex++
      ) {
        const settingListItem =
          settings.settinglistitems[settingListItemsIndex];

        const foundSetting = findSetting(settingListItem.items, manifestId);

        if (foundSetting) {
          return foundSetting;
        }
      }
      return undefined;
    }

    // If it's a setting group, we need to run the recursive function on each of its internal items
    // We can short-circuit the search if the SettingGroup in question doesn't have a manifestId that
    // matches the start of the manifestId we're looking for
    if (
      isSettingGroup(settings) &&
      manifestId.startsWith(settings.manifestId)
    ) {
      return (
        findSetting(settings.settings, manifestId) ||
        findSetting(settings.settingLists, manifestId) ||
        findSetting(settings.settingGroups, manifestId)
      );
    }
  }

  return undefined;
};
