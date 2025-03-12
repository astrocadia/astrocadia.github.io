import { useCallback, type ChangeEvent, type FunctionComponent } from 'react';
import type { NumberSetting } from '../../../../../app/entities/exhibitManifest';
import { isNil } from '../../../../../utils/lang';
import { TextField } from '../../../../common/TextField';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { SettingLabelWrapper } from '../../SettingLabelWrapper/SettingLabelWrapper';

interface IntegerExhibitSettingProps {
  setting: NumberSetting;
  updatedValue?: NumberSetting['value'];
  onChange: (
    id: number,
    manifestId: string,
    value: NumberSetting['value'],
    reset: boolean
  ) => void;
  disabled?: boolean;
}

export const IntegerExhibitSetting: FunctionComponent<
  IntegerExhibitSettingProps
> = ({ setting, updatedValue, onChange, disabled }) => {
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value ? Number(event.target.value) : null;
      onChange(
        setting.id,
        setting.manifestId,
        newValue,
        newValue === setting.value
      );
    },
    [onChange, setting.id, setting.manifestId, setting.value]
  );

  return (
    <MainPanelCoplanarSubpageBlockRow className='IntegerExhibitSetting'>
      <TextField
        label={
          <SettingLabelWrapper
            changed={!isNil(updatedValue) && updatedValue !== setting.value}
          >
            {setting.display}
          </SettingLabelWrapper>
        }
        fullWidth
        orientation='horizontal'
        placeholder=''
        type='number'
        disabled={disabled || !setting.write}
        value={updatedValue !== undefined ? updatedValue : setting.value ?? ''}
        onChange={handleOnChange}
      />
    </MainPanelCoplanarSubpageBlockRow>
  );
};
