import { Brand, ObjectValues } from '../../../../../utils/usefulTS';
import { type SettingBase } from '../../../../../app/entities/exhibitManifest';

// Setting Categories are used to assign unique identifiers to default and strapi content settings.
export const SETTING_CATEGORIES = {
  DEFAULT_SETTING: 'default-setting',
  STRAPI_CONTENT: 'strapi-content',
} as const;

export type SettingCategory = ObjectValues<typeof SETTING_CATEGORIES>;

export type ExhibitSettingKey = Brand<string, 'ExhibitSettingKey'>;

export interface ExhibitSettingKeyParts extends Pick<SettingBase, 'id'> {
  category?: SettingCategory;
}

export const KEY_SEPARATOR = '|' as const;

export const encodeSettingKey = (
  settingKeyParts: ExhibitSettingKeyParts
): ExhibitSettingKey => {
  return `${settingKeyParts.category}${KEY_SEPARATOR}${settingKeyParts.id}` as ExhibitSettingKey;
};

export const decodeSettingKey = (
  settingKey: string
): ExhibitSettingKeyParts => {
  const [category, id] = settingKey.split(KEY_SEPARATOR);
  return {
    id: Number(id),
    category:
      category === SETTING_CATEGORIES.STRAPI_CONTENT
        ? SETTING_CATEGORIES.STRAPI_CONTENT
        : (SETTING_CATEGORIES.DEFAULT_SETTING as SettingCategory),
  };
};
