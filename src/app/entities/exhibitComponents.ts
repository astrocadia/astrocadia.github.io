import { ObjectValues } from '@deeplocal/gumband-public-shared-lib';
import type { Brand } from '../../utils/usefulTS';

export const EXHIBIT_COMPONENT_CATEGORY = {
  SOFTWARE: 'software',
  HARDWARE: 'hardware',
} as const;

export type ExhibitComponentCategory = ObjectValues<
  typeof EXHIBIT_COMPONENT_CATEGORY
>;
export type ExhibitHardwareComponentCategory =
  typeof EXHIBIT_COMPONENT_CATEGORY.HARDWARE;
export type ExhibitSoftwareComponentCategory =
  typeof EXHIBIT_COMPONENT_CATEGORY.SOFTWARE;

export const EXHIBIT_COMPONENT_TYPE = {
  CUSTOM_APPLICATION: 'custom-application',
  OS_MONITOR: 'os-monitor',
  CUSTOM_HARDWARE: 'custom-hardware',
  PRESENCE_SENSOR: 'presence-sensor',
} as const;

export const EXHIBIT_HARDWARE_COMPONENT_TYPE = {
  CUSTOM_HARDWARE: EXHIBIT_COMPONENT_TYPE.CUSTOM_HARDWARE,
  PRESENCE_SENSOR: EXHIBIT_COMPONENT_TYPE.PRESENCE_SENSOR,
} as const;

export type ExhibitComponentType = ObjectValues<typeof EXHIBIT_COMPONENT_TYPE>;
export type ExhibitHardwareComponentType = ObjectValues<
  typeof EXHIBIT_HARDWARE_COMPONENT_TYPE
>;
export type ExhibitSoftwareComponentType = Exclude<
  ExhibitComponentType,
  ExhibitHardwareComponentType
>;

export type ExhibitHardwareComponentKeyParts = {
  componentId: string;
  type: ExhibitHardwareComponentType;
};
export type ExhibitSoftwareComponentKeyParts = {
  componentId: number | string;
  type: ExhibitSoftwareComponentType;
};
export type ExhibitComponentKeyParts =
  | ExhibitHardwareComponentKeyParts
  | ExhibitSoftwareComponentKeyParts;

export interface ExhibitComponentSummaryBase {
  exhibitId: number;
  name: string;
  connected: boolean;
  connectedChangedAt: string | null;
  createdAt: string;
  order: number | null;
}

export interface ExhibitSoftwareComponentSummary
  extends ExhibitSoftwareComponentKeyParts,
    ExhibitComponentSummaryBase {
  isLegacyExhibit: boolean;
  category: ExhibitSoftwareComponentCategory;
}

export interface ExhibitHardwareComponentSummary
  extends ExhibitHardwareComponentKeyParts,
    ExhibitComponentSummaryBase {
  category: ExhibitHardwareComponentCategory;
}

export type ExhibitComponentSummary =
  | ExhibitSoftwareComponentSummary
  | ExhibitHardwareComponentSummary;

export interface ExhibitHardwareComponentDetails
  extends Omit<ExhibitHardwareComponentSummary, 'order'> {
  applicationRegistered: boolean;
  systemRegistered: boolean;
  exhibitApi: string;
  hardwareApi: string;
  tlsEncryption?: unknown;
  ip: string;
  mac: string;
  updatedAt: string | null;
}

export interface ExhibitHardware
  extends Omit<ExhibitHardwareComponentSummary, 'exhibitId'> {
  deviceRegistered: boolean;
  applicationRegistered: boolean;
  exhibitId: string;
  updatedAt: string;
  mqttClientId: string;
  deletedAt: string | null;
  hardwareApi: string;
}

export interface ExhibitSoftware extends ExhibitSoftwareComponentSummary {
  updatedAt: string;
  isLegacyExhibit: boolean;
  mqttPath: string | null;
  sdkVersion: string | null;
  deletedAt: string | null;
}

/**
 * Component IDs are either numbers or UUIDs right now, which makes them tricky to work with.
 * This union type is useful for when you need to work with both types.
 */
export type ExhibitComponentPrimaryKey =
  | ExhibitSoftwareComponentKeyParts['componentId']
  | ExhibitHardware['componentId'];

export type ExhibitComponentKey = Brand<string, 'ExhibitComponentKey'>;

export const ExhibitHardwareComponentPropertyTypes = {
  GMBND_PRIMITIVE: 'gmbnd_primitive',
  GMBND_COLOR: 'gmbnd_color',
} as const;

export type ExhibitHardwareComponentPropertyType = ObjectValues<
  typeof ExhibitHardwareComponentPropertyTypes
>;

export const ExhibitHardwareComponentPropertySubtypes = {
  STRING_PROPERTY: 'StringProperty',
  BOOLEAN_PROPERTY: 'BooleanProperty',
  NUMBER_PROPERTY: 'NumberProperty',
  TRIGGER_PROPERTY: 'TriggerProperty',
} as const;

export type ExhibitHardwareComponentPropertySubtype = ObjectValues<
  typeof ExhibitHardwareComponentPropertySubtypes
>;

export const ExhibitHardwareComponentPropertyFormats = {
  TRIGGER: '',
  STRING: '!s',
  BOOLEAN: '!?',
  BYTE: '!B',
  INTEGER: '!i',
  FLOAT: '!d',
  COLOR: '!4B',
} as const;

export type ExhibitHardwareComponentPropertyFormat = ObjectValues<
  typeof ExhibitHardwareComponentPropertyFormats
>;

export const ExhibitHardwareComponentPropertySources = {
  APP: 'app',
  SYSTEM: 'system',
} as const;

export type ExhibitHardwareComponentPropertySource = ObjectValues<
  typeof ExhibitHardwareComponentPropertySources
>;

export interface ExhibitHardwareComponentPropertyBase {
  arrayLength: number;
  componentId: ExhibitHardwareComponentDetails['componentId'];
  desc: string;
  path: string;
  index: number;
  format: ExhibitHardwareComponentPropertyFormat;
  type: ExhibitHardwareComponentPropertyType;
  settable: boolean;
  gettable: boolean;
  uiHidden: boolean;
  min?: number | null;
  max?: number | null;
  step?: number | null;
  source: ExhibitHardwareComponentPropertySource;
}

export interface ExhibitHardwareComponentPropertyGroup {
  group: string;
  properties: Array<ExhibitHardwareComponentIndividualProperty>;
}

export type ExhibitHardwareComponentPropertyOrGroup =
  | ExhibitHardwareComponentIndividualProperty
  | ExhibitHardwareComponentPropertyGroup;

export interface StringProperty extends ExhibitHardwareComponentPropertyBase {
  type: Extract<ExhibitHardwareComponentPropertyType, 'gmbnd_primitive'>;
  subtype: Extract<ExhibitHardwareComponentPropertySubtype, 'StringProperty'>;
  value?: Array<string | Array<string>>;
  format: Extract<ExhibitHardwareComponentPropertyFormat, '!s'>;
}

export interface BooleanProperty extends ExhibitHardwareComponentPropertyBase {
  type: Extract<ExhibitHardwareComponentPropertyType, 'gmbnd_primitive'>;
  subtype: Extract<ExhibitHardwareComponentPropertySubtype, 'BooleanProperty'>;
  value?: Array<boolean | Array<boolean>>;
  format: Extract<ExhibitHardwareComponentPropertyFormat, '!?'>;
}

export interface NumberProperty extends ExhibitHardwareComponentPropertyBase {
  type: Extract<ExhibitHardwareComponentPropertyType, 'gmbnd_primitive'>;
  subtype: Extract<ExhibitHardwareComponentPropertySubtype, 'NumberProperty'>;
  value?: Array<number | Array<number>>;
  format: Extract<ExhibitHardwareComponentPropertyFormat, '!i' | '!B' | '!d'>;
}

export interface TriggerProperty extends ExhibitHardwareComponentPropertyBase {
  type: Extract<ExhibitHardwareComponentPropertyType, 'gmbnd_primitive'>;
  subtype: Extract<ExhibitHardwareComponentPropertySubtype, 'TriggerProperty'>;
  value: [];
  format: Extract<ExhibitHardwareComponentPropertyFormat, ''>;
}

export type ColorValue = Brand<number, 'ColorValue'>;

export const isColorValue = (value: number): value is ColorValue => {
  return value >= 0 && value <= 255;
};

export type ColorPropertyValue = Record<
  'red' | 'green' | 'blue' | 'white',
  ColorValue
>;

export const isColorPropertyValue = (
  value: unknown
): value is ColorPropertyValue => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  return (
    Object.keys(value).includes('red' && 'green' && 'blue' && 'white') &&
    Object.values(value).every((colorValue) => isColorValue(colorValue))
  );
};

export interface ColorProperty extends ExhibitHardwareComponentPropertyBase {
  type: Extract<ExhibitHardwareComponentPropertyType, 'gmbnd_color'>;
  value?: Array<ColorPropertyValue | Array<ColorPropertyValue>>;
  format: Extract<ExhibitHardwareComponentPropertyFormat, '!4B'>;
}

export type ExhibitHardwareComponentIndividualProperty =
  | StringProperty
  | BooleanProperty
  | NumberProperty
  | TriggerProperty
  | ColorProperty;

export const isExhibitHardwareComponentProperty = (
  property: ExhibitHardwareComponentPropertyOrGroup
): property is ExhibitHardwareComponentIndividualProperty =>
  Object.keys(property).includes('componentId');

export const isExhibitHardwareComponentPropertyGroup = (
  property: ExhibitHardwareComponentPropertyOrGroup
): property is ExhibitHardwareComponentPropertyGroup =>
  Object.keys(property).includes('group');

export const isStringProperty = (
  property: ExhibitHardwareComponentIndividualProperty
): property is StringProperty =>
  property.type === ExhibitHardwareComponentPropertyTypes.GMBND_PRIMITIVE &&
  property.format === ExhibitHardwareComponentPropertyFormats.STRING;

export const isBooleanProperty = (
  property: ExhibitHardwareComponentIndividualProperty
): property is BooleanProperty =>
  property.type === ExhibitHardwareComponentPropertyTypes.GMBND_PRIMITIVE &&
  property.format === ExhibitHardwareComponentPropertyFormats.BOOLEAN;

export const isTriggerProperty = (
  property: ExhibitHardwareComponentIndividualProperty
): property is BooleanProperty =>
  property.type === ExhibitHardwareComponentPropertyTypes.GMBND_PRIMITIVE &&
  property.format === ExhibitHardwareComponentPropertyFormats.TRIGGER;

export const isNumberProperty = (
  property: ExhibitHardwareComponentIndividualProperty
): property is NumberProperty =>
  property.type === ExhibitHardwareComponentPropertyTypes.GMBND_PRIMITIVE &&
  (property.format === ExhibitHardwareComponentPropertyFormats.BYTE ||
    property.format === ExhibitHardwareComponentPropertyFormats.INTEGER ||
    property.format === ExhibitHardwareComponentPropertyFormats.FLOAT);
