import { FunctionComponent, ReactNode, useMemo } from 'react';
import {
  Setting,
  SettingGroup,
  SettingList,
} from '../../../../../../../app/entities/exhibitManifest';
import { CountBadge } from '../../../../../../common/badges';
import {
  MainPanelCoplanarSubpageBlockCheckbox,
  MainPanelCoplanarSubpageBlockCheckboxProps,
} from '../../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockCheckbox';
import { FlattenedSettingsBlock } from '../../../../../common/utils/settings';
import { GroupExhibitSettingCard } from '../../../../../settings/settingTypes/GroupExhibitSettingCard';
import { ListExhibitSettingCard } from '../../../../../settings/settingTypes/ListExhibitSettingCard';

export interface ExhibitSettingBlockCheckboxProps<T extends Setting = Setting>
  extends Pick<
    MainPanelCoplanarSubpageBlockCheckboxProps,
    'checked' | 'disabled' | 'checkboxProps' | 'onClick'
  > {
  setting: T;
  selectedSettings: Array<FlattenedSettingsBlock>;
  onSelect: (setting: SettingGroup | SettingList) => void;
}

function countChildSelectedSettings(
  setting: SettingList | SettingGroup,
  selectedSettings: Array<FlattenedSettingsBlock>
): number {
  const { manifestId } = setting;
  return selectedSettings.reduce((prevCount, currentBlock) => {
    if (currentBlock.breadcrumbs.at(-1)?.manifestId.startsWith(manifestId)) {
      return prevCount + currentBlock.settings.length;
    }
    return prevCount;
  }, 0);
}

export const ExhibitSettingBlockCheckbox: FunctionComponent<
  ExhibitSettingBlockCheckboxProps
> = ({
  disabled = false,
  setting,
  checked,
  onClick,
  onSelect,
  selectedSettings,
  ...rest
}) => {
  const settingType = setting.type;

  const listCardAction: ReactNode | undefined = useMemo(() => {
    let selectedChildrenCount: number = 0;
    if (settingType === 'SettingsGroup' || settingType === 'SettingsList') {
      selectedChildrenCount = countChildSelectedSettings(
        setting,
        selectedSettings
      );
    }

    if (selectedChildrenCount > 0) {
      return <CountBadge count={selectedChildrenCount} />;
    }
    return undefined;
  }, [setting, settingType, selectedSettings]);

  switch (settingType) {
    case 'SettingsList':
      return (
        <ListExhibitSettingCard
          settingList={setting}
          onSelect={onSelect}
          disabled={disabled}
          action={listCardAction}
        />
      );
    case 'SettingsGroup':
      return (
        <GroupExhibitSettingCard
          settingGroup={setting}
          onSelect={onSelect}
          disabled={disabled}
          action={listCardAction}
        />
      );
    default:
      return (
        <MainPanelCoplanarSubpageBlockCheckbox
          title={setting.display}
          checked={checked}
          onClick={onClick}
          disabled={disabled}
          {...rest}
        />
      );
  }
};
