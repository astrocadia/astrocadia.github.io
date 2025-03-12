import { useCallback, useMemo, type FunctionComponent } from 'react';
import {
  ExhibitSettingsManifest,
  isSettingGroup,
  isSettingList,
  MANIFEST_ID_SEPARATOR,
  Setting,
  SettingGroup,
  SettingList,
} from '../../../../../../app/entities/exhibitManifest';
import { isNil } from '../../../../../../utils/lang';
import { BreadcrumbItem } from '../../../../../common/BreadcrumbItem';
import { Breadcrumbs } from '../../../../../common/Breadcrumbs';
import { useOrganizedSettings } from '../../../../common/hooks/useOrganizedSettings';
import {
  FlattenedSettingsBlock,
  flattenManifestSettings,
} from '../../../../common/utils/settings';
import {
  sortSettingListItems,
  sortSettings,
} from '../../../../common/utils/sorting';
import { ListItemExhibitSettingCard } from '../../../../settings/settingTypes/ListItemExhibitSettingCard';
import './AddRemoveExhibitSettingsList.css';
import { ExhibitSettingBlockCheckbox } from './Checkboxes/ExhibitSettingBlockCheckbox';
import { OperatingModeSettingBlockCheckbox } from './Checkboxes/OperatingModeSettingBlockCheckbox/OperatingModeSettingBlockCheckbox';

export interface AddRemoveExhibitSettingsListProps {
  settingsManifest: ExhibitSettingsManifest;
  opModeChecked: boolean;
  onOpModeClick: () => void;
  selectedSettings: Array<FlattenedSettingsBlock>;
  onSelectedSettingsChange: (
    selectedControls: Array<FlattenedSettingsBlock>
  ) => void;
}

export const AddRemoveExhibitSettingsList: FunctionComponent<
  AddRemoveExhibitSettingsListProps
> = ({
  settingsManifest,
  opModeChecked,
  onOpModeClick,
  selectedSettings,
  onSelectedSettingsChange,
}) => {
  const {
    breadcrumbs,
    setBreadcrumbs,
    sortedSettings,
    handleSettingGroupOrListSelected,
    onClickBreadcrumbItem,
  } = useOrganizedSettings(settingsManifest, false);

  const flattenedSettings = useMemo(
    () => flattenManifestSettings(settingsManifest),
    [settingsManifest]
  );

  const breadcrumbOrderLookup = useMemo(
    () =>
      new Map<string, number>(
        flattenedSettings.map((block, idx) => [
          block.breadcrumbs.at(-1)?.manifestId || '',
          idx,
        ])
      ),
    [flattenedSettings]
  );

  const handleSettingCheckboxClick = useCallback(
    (setting: Setting, parentSettingListItemListName?: string) => {
      if (isSettingGroup(setting) || isSettingList(setting)) {
        return;
      }

      const newSelectedSettings = [...selectedSettings];

      const splitManifestId = setting.manifestId.split(MANIFEST_ID_SEPARATOR);
      const parentManifestId = splitManifestId
        .slice(0, -1)
        .join(MANIFEST_ID_SEPARATOR);

      const foundFlattenedSettingsBlockIdx = newSelectedSettings.findIndex(
        (block) => {
          return (
            (splitManifestId.length === 1 && block.breadcrumbs.length === 0) ||
            (parentManifestId !== '' &&
              parentManifestId === block.breadcrumbs.at(-1)?.manifestId)
          );
        }
      );

      if (foundFlattenedSettingsBlockIdx >= 0) {
        // At least on setting in this block was previously added
        const foundFlattenedSettingsBlock =
          newSelectedSettings[foundFlattenedSettingsBlockIdx];

        const checkedSettingIndex =
          foundFlattenedSettingsBlock.settings.findIndex(
            (checkedSetting) => checkedSetting.manifestId === setting.manifestId
          );

        if (checkedSettingIndex >= 0) {
          // Remove setting from the block
          foundFlattenedSettingsBlock.settings.splice(checkedSettingIndex, 1);

          if (foundFlattenedSettingsBlock.settings.length === 0) {
            // This block no longer contains any settings, so we remove it
            newSelectedSettings.splice(foundFlattenedSettingsBlockIdx, 1);
          }
        } else {
          // Add setting to this block
          foundFlattenedSettingsBlock.settings.push(setting);
          foundFlattenedSettingsBlock.settings.sort(sortSettings);
        }
      } else {
        // No settings in this block have been added
        newSelectedSettings.push({
          settings: [setting],
          breadcrumbs: !isNil(parentSettingListItemListName)
            ? [
                ...breadcrumbs,
                // Add breadcrumb for parent SettingListItem
                {
                  manifestId: parentManifestId,
                  label: parentSettingListItemListName,
                  isSettingListItem: true,
                },
              ]
            : [...breadcrumbs],
        });
      }

      onSelectedSettingsChange(
        newSelectedSettings.sort((blockA, blockB) => {
          const blockAPosition = breadcrumbOrderLookup.get(
            blockA.breadcrumbs.at(-1)?.manifestId || ''
          );
          const blockBPosition = breadcrumbOrderLookup.get(
            blockB.breadcrumbs.at(-1)?.manifestId || ''
          );
          if (isNil(blockAPosition) && isNil(blockBPosition)) {
            return 0;
          }
          if (!isNil(blockAPosition) && !isNil(blockBPosition)) {
            return blockAPosition - blockBPosition;
          }
          if (isNil(blockAPosition) && !isNil(blockBPosition)) {
            return 1;
          }
          return -1;
        })
      );
    },
    [
      breadcrumbs,
      selectedSettings,
      onSelectedSettingsChange,
      breadcrumbOrderLookup,
    ]
  );

  const isSettingChecked = useCallback(
    (setting: Setting) => {
      if (isSettingList(setting) || isSettingGroup(setting)) {
        return false;
      }

      const splitManifestId = setting.manifestId.split(MANIFEST_ID_SEPARATOR);
      const parentManifestId = splitManifestId
        .slice(0, -1)
        .join(MANIFEST_ID_SEPARATOR);

      const foundFlattenedSettingsBlock = selectedSettings.find((block) => {
        return (
          (splitManifestId.length === 1 && block.breadcrumbs.length === 0) ||
          (parentManifestId !== '' &&
            parentManifestId === block.breadcrumbs.at(-1)?.manifestId)
        );
      });

      if (!isNil(foundFlattenedSettingsBlock)) {
        // At least on setting in this block is checked
        const foundSetting = foundFlattenedSettingsBlock.settings.find(
          (checkedSetting) => checkedSetting.manifestId === setting.manifestId
        );

        return !isNil(foundSetting);
      }

      return false;
    },
    [selectedSettings]
  );

  return (
    <>
      {!!breadcrumbs.length && (
        <div className='AddRemoveExhibitSettingsList__breadCrumbsWrapper'>
          <Breadcrumbs>
            <BreadcrumbItem label='All' onClick={() => setBreadcrumbs([])} />
            {breadcrumbs.map((breadcrumb, idx) => (
              <BreadcrumbItem
                key={breadcrumb.manifestId}
                label={breadcrumb.label}
                onClick={() => onClickBreadcrumbItem(breadcrumb, idx)}
              />
            ))}
          </Breadcrumbs>
        </div>
      )}
      <div className='AddRemoveExhibitSettingsList__settingWrapper'>
        {breadcrumbs.length === 0 && settingsManifest.opMode !== null && (
          <OperatingModeSettingBlockCheckbox
            checked={opModeChecked}
            onClick={onOpModeClick}
          />
        )}
        {isSettingList(sortedSettings)
          ? sortSettingListItems(
              sortedSettings.order,
              sortedSettings.settinglistitems
            ).map((settingListItem, idx) => (
              <ListItemExhibitSettingCard
                key={`settingListItem-${settingListItem.listName}`}
                listName={settingListItem.listName}
                items={settingListItem.items}
                exhibitId={sortedSettings.ExhibitId}
                settingListId={sortedSettings.id}
                manifestId={sortedSettings.manifestId}
                hideDelete
                settingListItemIndex={idx}
                renderSetting={(setting) => (
                  <ExhibitSettingBlockCheckbox
                    key={`settingCheckbox-${setting.manifestId}`}
                    setting={setting}
                    onClick={() =>
                      handleSettingCheckboxClick(
                        setting,
                        settingListItem.listName
                      )
                    }
                    onSelect={() =>
                      handleSettingGroupOrListSelected(
                        setting as SettingList | SettingGroup,
                        settingListItem.listName
                      )
                    }
                    checked={isSettingChecked(setting)}
                    selectedSettings={selectedSettings}
                  />
                )}
              />
            ))
          : sortedSettings?.map((setting) => (
              <ExhibitSettingBlockCheckbox
                key={`settingCheckbox-${setting.manifestId}`}
                setting={setting}
                onClick={() => handleSettingCheckboxClick(setting)}
                onSelect={handleSettingGroupOrListSelected}
                checked={isSettingChecked(setting)}
                selectedSettings={selectedSettings}
              />
            ))}
      </div>
    </>
  );
};
