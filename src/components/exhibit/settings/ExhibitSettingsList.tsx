import { useMemo, type FunctionComponent } from 'react';
import type { SettingList } from '../../../app/entities/exhibitManifest';
import { useUpdateExhibitManifestSettingsListItemOrderMutation } from '../../../app/services/exhibit';
import { sortSettingListItems } from '../common/utils/sorting';
import { ExhibitSetting, ExhibitSettingProps } from './ExhibitSetting';
import {
  encodeSettingKey,
  ExhibitSettingKey,
  SETTING_CATEGORIES,
} from './common/utils/exhibitSettingIdUtils';
import { NoListItemsFoundFeedback } from './feedback/NoListItemsFoundFeedback';
import { ListItemExhibitSettingCard } from './settingTypes/ListItemExhibitSettingCard';

export interface ExhibitSettingsListProps
  extends Pick<
    ExhibitSettingProps,
    'exhibitId' | 'manifestIdsWithPendingChanges' | 'onChange' | 'onSelect'
  > {
  settingsChanged: Map<
    ExhibitSettingKey,
    { value: string | number | null; manifestId: string }
  >;
  settingsList: SettingList;
}

export const ExhibitSettingsList: FunctionComponent<
  ExhibitSettingsListProps
> = ({
  exhibitId,
  manifestIdsWithPendingChanges,
  onChange,
  onSelect,
  settingsList,
  settingsChanged,
}) => {
  const [updateListItemOrder] =
    useUpdateExhibitManifestSettingsListItemOrderMutation();

  const sortedItems = useMemo(
    () =>
      sortSettingListItems(settingsList.order, settingsList.settinglistitems),
    [settingsList.order, settingsList.settinglistitems]
  );

  const handleListItemOrderChange = useMemo(() => {
    if (!sortedItems.length) {
      return undefined;
    }

    const callback = (idx: number, direction: 'UP' | 'DOWN' = 'UP') => {
      // Generate new order array in case the original one is null
      const order = sortedItems.map((item) => item.listName);

      const destIdx = direction === 'UP' ? idx - 1 : idx + 1;

      // move item at idx, up one position
      if (destIdx >= 0 && destIdx < order.length) {
        // swap the two items
        [order[idx], order[destIdx]] = [order[destIdx], order[idx]];

        updateListItemOrder({
          exhibitId: settingsList.ExhibitId,
          settingListId: settingsList.id,
          manifestId: settingsList.manifestId,
          order,
        });
      }
    };

    return callback;
  }, [
    sortedItems,
    updateListItemOrder,
    settingsList.ExhibitId,
    settingsList.id,
    settingsList.manifestId,
  ]);

  return !sortedItems.length ? (
    <NoListItemsFoundFeedback />
  ) : (
    <>
      {sortedItems.map((listItemExhibitSetting, idx) => (
        <ListItemExhibitSettingCard
          key={listItemExhibitSetting.listName}
          exhibitId={exhibitId}
          renderSetting={(setting) => (
            <ExhibitSetting
              exhibitId={exhibitId}
              setting={setting}
              key={`setting-${setting.manifestId}`}
              manifestIdsWithPendingChanges={manifestIdsWithPendingChanges}
              onChange={onChange}
              onSelect={onSelect}
              updatedValue={
                settingsChanged.get(
                  encodeSettingKey({
                    id: setting.id,
                    category:
                      setting.type === 'StrapiContent'
                        ? SETTING_CATEGORIES.STRAPI_CONTENT
                        : SETTING_CATEGORIES.DEFAULT_SETTING,
                  })
                )?.value
              }
            />
          )}
          settingListItemIndex={idx}
          settingListId={settingsList.id}
          manifestId={settingsList.manifestId}
          onMoveDown={() => handleListItemOrderChange?.(idx, 'DOWN')}
          onMoveUp={() => handleListItemOrderChange?.(idx, 'UP')}
          first={idx === 0}
          last={idx === sortedItems.length - 1}
          {...listItemExhibitSetting}
        />
      ))}
    </>
  );
};
