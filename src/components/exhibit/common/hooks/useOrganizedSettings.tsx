import { useCallback, useMemo, useState } from 'react';
import {
  ExhibitSettingsManifest,
  isSettingGroup,
  isSettingList,
  MANIFEST_ID_SEPARATOR,
  SettingGroup,
  SettingList,
} from '../../../../app/entities/exhibitManifest';
import { findSetting } from '../../../../utils/exhibitManifest';
import { isNil } from '../../../../utils/lang';
import { SettingBreadcrumb } from '../types';
import { sortSettings } from '../utils/sorting';

export const useOrganizedSettings = (
  cachedManifest: ExhibitSettingsManifest | undefined,
  shouldShrinkSettingListItems: boolean = true
) => {
  const [breadcrumbs, setBreadcrumbs] = useState<Array<SettingBreadcrumb>>([]);

  const sortedSettings = useMemo(() => {
    if (cachedManifest) {
      const manifestId = breadcrumbs.at(-1)?.manifestId;
      const node = manifestId
        ? findSetting(
            [...cachedManifest.settingGroups, ...cachedManifest.settingLists],
            manifestId
          )
        : cachedManifest;

      if (!manifestId) {
        // manifest root node
        return [
          ...(cachedManifest.settings || []),
          ...(cachedManifest.settingLists || []),
          ...(cachedManifest.settingGroups || []),
          ...(cachedManifest.strapiContent || []),
        ].sort(sortSettings);
      }

      if (isSettingGroup(node)) {
        return [
          ...(node.settings || []),
          ...(node.settingLists || []),
          ...(node.settingGroups || []),
          ...(node.strapiContent || []),
        ].sort(sortSettings);
      }

      if (isSettingList(node)) {
        return node;
      }
    }

    return undefined;
  }, [breadcrumbs, cachedManifest]);

  const handleSettingGroupOrListSelected = useCallback(
    (setting: SettingList | SettingGroup, parentListItemName?: string) => {
      setBreadcrumbs((prev) => {
        const newBreadcrumbs = [...prev];
        // Add a new Breadcrumb for the settinglist or group

        let label: string;
        if (isSettingGroup(setting)) {
          label = setting.groupDisplay;
        } else {
          label = setting.listDisplay;
        }

        if (!isNil(parentListItemName)) {
          if (shouldShrinkSettingListItems) {
            label = `${parentListItemName} : ${label}`;
          } else {
            // Add a new breadcrumb for the parent SettingListItem
            newBreadcrumbs.push({
              // generate manifestId for settinglistitem (we don't do this in the BE smh)
              manifestId: setting.manifestId
                .split(MANIFEST_ID_SEPARATOR)
                .slice(0, -1)
                .join(MANIFEST_ID_SEPARATOR),
              label: parentListItemName,
              isSettingListItem: true,
            });
          }
        }

        newBreadcrumbs.push({
          manifestId: setting.manifestId,
          label,
        });
        return newBreadcrumbs;
      });
    },
    [setBreadcrumbs, shouldShrinkSettingListItems]
  );

  const onClickBreadcrumbItem = useCallback(
    (breadcrumb: SettingBreadcrumb, idx: number) => {
      let parentBreadcrumbIdx = idx;
      if (breadcrumb.isSettingListItem) {
        // Because setting list items are not rendered on their own page, this will redirect to the setting list page
        parentBreadcrumbIdx -= 1;
      }
      if (parentBreadcrumbIdx < breadcrumbs.length - 1) {
        setBreadcrumbs((prev) => prev.slice(0, parentBreadcrumbIdx + 1));
      }
    },
    [breadcrumbs, setBreadcrumbs]
  );

  return {
    breadcrumbs,
    setBreadcrumbs,
    sortedSettings,
    handleSettingGroupOrListSelected,
    onClickBreadcrumbItem,
  };
};
