import {
  useCallback,
  useMemo,
  type ChangeEvent,
  type FunctionComponent,
} from 'react';
import type {
  OptionSettingItem,
  SingleButtonGroupSetting,
} from '../../../../../app/entities/exhibitManifest';
import { isNil } from '../../../../../utils/lang';
import { sortCompareObjectByOrderAndStringField } from '../../../../../utils/sort';
import { MenuItem } from '../../../../common/MenuItem';
import { TextField } from '../../../../common/TextField';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { SettingLabelWrapper } from '../../SettingLabelWrapper/SettingLabelWrapper';

interface SingleButtonGroupExhibitSettingProps {
  setting: SingleButtonGroupSetting;
  updatedValue?: SingleButtonGroupSetting['value'];
  onChange: (
    id: number,
    manifestId: string,
    value: SingleButtonGroupSetting['value'],
    reset: boolean
  ) => void;
  disabled?: boolean;
}

const dropDownSortCompare =
  sortCompareObjectByOrderAndStringField<OptionSettingItem>('order', 'display');

export const SingleButtonGroupExhibitSetting: FunctionComponent<
  SingleButtonGroupExhibitSettingProps
> = ({ setting, updatedValue, onChange, disabled }) => {
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value || null;
      onChange(
        setting.id,
        setting.manifestId,
        newValue,
        newValue === setting.value
      );
    },
    [onChange, setting.id, setting.manifestId, setting.value]
  );

  const sorttedItems = useMemo(
    () => [...setting.items].sort(dropDownSortCompare),
    [setting.items]
  );

  return (
    <MainPanelCoplanarSubpageBlockRow className='SignleButtonGroupExhibitSetting'>
      <TextField
        label={
          <SettingLabelWrapper
            changed={!isNil(updatedValue) && updatedValue !== setting.value}
          >
            {setting.display}
          </SettingLabelWrapper>
        }
        fullWidth
        select
        orientation='horizontal'
        placeholder=''
        disabled={disabled || !setting.write}
        value={!isNil(updatedValue) ? updatedValue : setting.value ?? ''}
        onChange={handleOnChange}
      >
        {sorttedItems.map((item) => (
          <MenuItem
            key={`setting-${setting.id}${item.id}`}
            value={item.id}
            title={setting.display}
          >
            {item.display}
          </MenuItem>
        ))}
      </TextField>
    </MainPanelCoplanarSubpageBlockRow>
  );
};
