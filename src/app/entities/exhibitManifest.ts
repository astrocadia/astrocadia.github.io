import { ObjectValues } from '../../utils/usefulTS';
import type { OpMode } from './exhibit';

export const MANIFEST_ID_SEPARATOR = '/' as const;

export interface Permissions {
  read: boolean;
  write: boolean;
}

export interface ControlGroupItem {
  id: string; // manifest id
  uniqueId: number;
  display: string;
  order: number | null;
}

export const CONTROL_TYPE = {
  SINGLE: 'Single',
  GROUP: 'Group',
} as const;

export type ControlType = ObjectValues<typeof CONTROL_TYPE>;

interface ControlBase extends Permissions {
  id: number;
  manifestId: string;
  exhibitId: number;
  display?: string;
  controlGroupId: number | null;
  order: number | null;
  /** @deprecated */
  touchless: boolean | null;
}

export interface ControlSingle extends ControlBase {
  type: Extract<ControlType, 'Single'>;
  items: [];
}

export interface ControlGroup extends ControlBase {
  type: Extract<ControlType, 'Group'>;
  items: Array<ControlGroupItem>;
}

export type Control = ControlSingle | ControlGroup;

export const SettingTypes = {
  TEXT_INPUT: 'TextInput',
  TEXT_AREA_INPUT: 'TextAreaInput',
  HEX_COLOR: 'HexColor',
  INTEGER_INPUT: 'IntegerInput',
  TOGGLE: 'Toggle',
  DROPDOWN: 'Dropdown',
  SINGLE_BUTTON_GROUP: 'SingleButtonGroup',
  FILE_SELECTION: 'FileSelection',
  DATE: 'Date',
  STRAPI_CONTENT: 'StrapiContent',
} as const;

export type SettingType = ObjectValues<typeof SettingTypes>;

export interface SettingBase extends Permissions {
  id: number;
  manifestId: string;
  exhibitId: number;
  display: string;
  default: string | null;
  order: number | null;
  /** @deprecated */
  touchless: boolean | null;
  listId: number | null;
  groupId: number | null;
}

export interface NumberSetting extends SettingBase {
  type: Extract<SettingType, 'IntegerInput'>;
  value: number | null;
  items: [];
}

export interface OptionSettingItem
  extends Pick<SettingBase, 'display' | 'order'> {
  id: string;
  uniqueId: number;
}

interface OptionSettingBase extends SettingBase {
  value: string | null;
  items: Array<OptionSettingItem>;
}

export interface DropDownSetting extends OptionSettingBase {
  type: Extract<SettingType, 'Dropdown'>;
}

export interface SingleButtonGroupSetting extends OptionSettingBase {
  type: Extract<SettingType, 'SingleButtonGroup'>;
}

export type OptionSetting = DropDownSetting | SingleButtonGroupSetting;

export interface ToggleSetting extends SettingBase {
  type: Extract<SettingType, 'Toggle'>;
  value: 'true' | 'false' | null; // Yes, this is correct, the manifest sends down a boolean as a string
  items: [];
}

interface StringSettingBase extends SettingBase {
  value: string | null;
  items: [];
}

export interface TextSetting extends StringSettingBase {
  type: Extract<SettingType, 'TextInput'>;
}

export interface TextAreaSetting extends StringSettingBase {
  type: Extract<SettingType, 'TextAreaInput'>;
}

export interface HexColorSetting extends StringSettingBase {
  type: Extract<SettingType, 'HexColor'>;
}

// NOTE: for `type='Date'`, the date string is not in ISO format, but rather in the format of Date.toString();
export interface DateSetting extends StringSettingBase {
  type: Extract<SettingType, 'Date'>;
}

// NOTE: for `type='FileSelection'`, the value is the file path;
export interface FileSetting extends StringSettingBase {
  type: Extract<SettingType, 'FileSelection'>;
}

export type StringSetting =
  | TextSetting
  | TextAreaSetting
  | HexColorSetting
  | DateSetting
  | FileSetting;

export type StrapiOption = {
  id: number;
} & {
  [key in string as Exclude<key, 'id'>]: unknown;
};

// NOTE: This is a very preliminary type for StrapiContent settings and more investigation is needed
export interface StrapiSetting
  extends Omit<
      SettingBase,
      'default' | 'order' | 'touchless' | 'listId' | 'groupId'
    >,
    // I don't think we actually have an order, but I want it in the type so that we can order with other settings
    Partial<Pick<SettingBase, 'order'>> {
  type: Extract<SettingType, 'StrapiContent'>;
  contentId: string | null; // contentId is a number transformed to a string
  contentType: string;
  displayFieldName: string;
  listParent: null;
  groupParent: null;
  value?: StrapiOption;
}

export type IndividualSetting =
  | OptionSetting
  | NumberSetting
  | StringSetting
  | StrapiSetting
  | ToggleSetting;

export interface SchemaSetting {
  type: SettingType;
  id: string;
  display: string;
}

export interface SchemaSettingList {
  type: 'SettingsList';
  id: string;
  display: string;
  schema: Array<Schema>;
}

export type Schema = SchemaSetting | SchemaSettingList;

export interface SettingListItem {
  listName: string;
  items: Array<Setting>;
}

export interface SettingList {
  type: 'SettingsList';
  id: number;
  ExhibitId: number;
  manifestId: string;
  listDisplay: string;
  listParent: number | null;
  schema: Array<Schema>;
  listItemCount: number;
  order: Array<string> | null;
  orderSelf: number | null;
  groupId: number | null;
  settinglistitems: Array<SettingListItem>;
}

export interface SettingGroup {
  type: 'SettingsGroup';
  id: number;
  ExhibitId: number;
  manifestId: string;
  groupDisplay: string;
  listId: number | null;
  groupParent: number | null;
  schema: Array<Schema>;
  groupItemCount: number;
  order: number | null;
  settings: Array<IndividualSetting>;
  settingLists: Array<SettingList>;
  settingGroups: Array<SettingGroup>;
  strapiContent: Array<StrapiSetting>;
}

export type Setting =
  | IndividualSetting
  | SettingList
  | SettingGroup
  | StrapiSetting;

export type ExhibitSettingsManifest = Pick<
  ExhibitManifest,
  'settingGroups' | 'settingLists' | 'settings' | 'strapiContent' | 'opMode'
>;

export const isSettingGroup = (
  setting?: Setting | Array<Setting> | ExhibitManifest | ExhibitSettingsManifest
): setting is SettingGroup =>
  !!setting &&
  !Array.isArray(setting) &&
  (setting as SettingGroup).type === 'SettingsGroup';

export const isSettingList = (
  setting?: Setting | Array<Setting> | ExhibitManifest | ExhibitSettingsManifest
): setting is SettingList =>
  !!setting &&
  !Array.isArray(setting) &&
  (setting as SettingList).type === 'SettingsList';

export const STATUS_TYPE = {
  INTEGER: 'Integer',
  STRING: 'String',
  DATE: 'Date',
  COLOR: 'Color',
  GROUP: 'Group',
} as const;

export type StatusType = ObjectValues<typeof STATUS_TYPE>;

export interface StatusBase extends Permissions {
  id: number;
  manifestId: string;
  exhibitId: number;
  display: string;
  type: StatusType;
  order: number;
  updatedAt: string;
}

export type Status = IndividualStatus | GroupStatus;

export interface IndividualStatus extends StatusBase {
  type: Extract<StatusType, 'String'>;
  value: string;
  default: string;
}

export interface GroupStatus extends StatusBase {
  type: Extract<StatusType, 'Group'>;
  items: IndividualStatus[];
}

export interface ExhibitManifest {
  id: number;
  siteId: number;
  name?: string;
  mqttPath: string | null;
  online?: boolean;
  manifestLocked?: boolean;
  opMode: OpMode | null;
  settingGroups: Array<SettingGroup>;
  settingLists: Array<SettingList>;
  settings: Array<IndividualSetting>;
  statuses: Array<Status>;
  controls: Array<Control>;
  strapiContent: Array<StrapiSetting>;
}
