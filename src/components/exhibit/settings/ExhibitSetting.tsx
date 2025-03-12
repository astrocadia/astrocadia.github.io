import { type FunctionComponent } from 'react';
import {
  HexColorSetting,
  SettingTypes,
  StrapiOption,
  type DateSetting,
  type FileSetting,
  type IndividualSetting,
  type NumberSetting,
  type OptionSetting,
  type Setting,
  type SettingGroup,
  type SettingList,
  type SingleButtonGroupSetting,
  type TextAreaSetting,
  type TextSetting,
  type ToggleSetting,
} from '../../../app/entities/exhibitManifest';
import { exhaustiveGuard } from '../../../utils/usefulTS';
import {
  DateTimeExhibitSetting,
  DropDownExhibitSetting,
  FileSelectionExhibitSetting,
  GroupExhibitSettingCard,
  IntegerExhibitSetting,
  ListExhibitSettingCard,
  SingleButtonGroupExhibitSetting,
  TextAreaExhibitSetting,
  TextExhibitSetting,
  ToggleExhibitSetting,
  StrapiContentExhibitSetting,
} from './settingTypes';
import { HexColorExhibitSetting } from './settingTypes/HexColorExhibitSetting';

export interface ExhibitSettingProps<T extends Setting = Setting> {
  exhibitId: number;
  manifestIdsWithPendingChanges?: Set<Setting['manifestId']>;
  disabled?: boolean;
  setting: T;
  updatedValue: T extends IndividualSetting
    ? Exclude<T['value'], StrapiOption>
    : undefined;
  onChange: (
    id: number,
    manifestId: string,
    value: string | number | null,
    reset: boolean
  ) => void;
  onSelect: (
    setting: SettingGroup | SettingList,
    parentListItemName?: string
  ) => void;
}

export const ExhibitSetting: FunctionComponent<ExhibitSettingProps> = ({
  exhibitId,
  manifestIdsWithPendingChanges,
  disabled = false,
  setting,
  updatedValue,
  onChange,
  onSelect,
}) => {
  const settingType = setting.type;
  switch (settingType) {
    case SettingTypes.TEXT_INPUT:
      return (
        <TextExhibitSetting
          disabled={disabled}
          setting={setting}
          updatedValue={updatedValue as TextSetting['value']}
          onChange={onChange}
        />
      );
    case SettingTypes.HEX_COLOR:
      return (
        <HexColorExhibitSetting
          disabled={disabled}
          setting={setting}
          updatedValue={updatedValue as HexColorSetting['value']}
          onChange={onChange}
        />
      );
    case SettingTypes.INTEGER_INPUT:
      return (
        <IntegerExhibitSetting
          disabled={disabled}
          setting={setting}
          updatedValue={updatedValue as NumberSetting['value']}
          onChange={onChange}
        />
      );
    case SettingTypes.DROPDOWN:
      return (
        <DropDownExhibitSetting
          disabled={disabled}
          setting={setting}
          updatedValue={updatedValue as OptionSetting['value']}
          onChange={onChange}
        />
      );
    case SettingTypes.TOGGLE:
      return (
        <ToggleExhibitSetting
          disabled={disabled}
          setting={setting}
          updatedValue={updatedValue as ToggleSetting['value']}
          onChange={onChange}
        />
      );
    case SettingTypes.DATE:
      return (
        <DateTimeExhibitSetting
          disabled={disabled}
          setting={setting}
          updatedValue={updatedValue as DateSetting['value']}
          onChange={onChange}
        />
      );
    case SettingTypes.SINGLE_BUTTON_GROUP:
      return (
        <SingleButtonGroupExhibitSetting
          disabled={disabled}
          setting={setting}
          updatedValue={updatedValue as SingleButtonGroupSetting['value']}
          onChange={onChange}
        />
      );
    case SettingTypes.TEXT_AREA_INPUT:
      return (
        <TextAreaExhibitSetting
          disabled={disabled}
          setting={setting}
          updatedValue={updatedValue as TextAreaSetting['value']}
          onChange={onChange}
        />
      );
    case SettingTypes.FILE_SELECTION:
      return (
        <FileSelectionExhibitSetting
          exhibitId={exhibitId}
          disabled={disabled}
          setting={setting}
          updatedValue={updatedValue as FileSetting['value']}
          onChange={onChange}
        />
      );
    case SettingTypes.STRAPI_CONTENT:
      return (
        <StrapiContentExhibitSetting
          exhibitId={exhibitId}
          disabled={disabled}
          setting={setting}
          updatedValue={updatedValue as string | null}
          onChange={onChange}
        />
      );
    case 'SettingsList':
      return (
        <ListExhibitSettingCard
          manifestIdsWithPendingChanges={manifestIdsWithPendingChanges}
          settingList={setting}
          onSelect={onSelect}
        />
      );
    case 'SettingsGroup':
      return (
        <GroupExhibitSettingCard
          manifestIdsWithPendingChanges={manifestIdsWithPendingChanges}
          settingGroup={setting}
          onSelect={onSelect}
        />
      );
    default:
      return exhaustiveGuard(settingType);
  }
};
