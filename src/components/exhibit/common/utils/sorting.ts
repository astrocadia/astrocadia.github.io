import {
  Control,
  isSettingGroup,
  isSettingList,
  SettingList,
  SettingListItem,
  type Setting,
} from '../../../../app/entities/exhibitManifest';
import {
  sortCompareObjectByOrderAndStringField,
  sortCompareStringWithNumbers,
} from '../../../../utils/sort';

type ControlSort = Pick<Control, 'display' | 'order'>;

export const sortControls = sortCompareObjectByOrderAndStringField<ControlSort>(
  'order',
  'display'
);

const getOrderValueFromSetting = (setting: Setting) => {
  let orderValue;

  if (isSettingGroup(setting)) {
    orderValue = setting.order?.toString() || setting.groupDisplay;
  } else if (isSettingList(setting)) {
    orderValue = setting.orderSelf?.toString() || setting.listDisplay;
  } else {
    orderValue = setting.order?.toString() || setting.display;
  }

  return orderValue || '';
};

// Can't use sortCompareObjectByOrderAndStringField because SettingsList and SettingsGroup have a custom order and display field
export const sortSettings = (a: Setting, b: Setting) =>
  sortCompareStringWithNumbers(
    getOrderValueFromSetting(a),
    getOrderValueFromSetting(b)
  );

export function sortSettingListItems(
  order: SettingList['order'],
  settinglistitems: SettingList['settinglistitems']
) {
  if (order && settinglistitems) {
    // Need to sort by list item `listName`.  Rather then looping the array each time, loop once and create a map
    // so that lookup is O(1) rather than O(n)
    const listItemMap = new Map<SettingListItem['listName'], SettingListItem>(
      settinglistitems.map((item) => [item.listName, item])
    );

    return (
      order
        .map((listName) => listItemMap.get(listName))
        // NOTE: Typescript doesn't understand that the filter(Boolean) will remove nulls from the array
        .filter(Boolean) as Array<SettingListItem>
    );
  }

  return settinglistitems || [];
}
