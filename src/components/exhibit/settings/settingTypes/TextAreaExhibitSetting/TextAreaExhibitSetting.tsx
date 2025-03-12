import { useCallback, type ChangeEvent, type FunctionComponent } from 'react';
import type { TextAreaSetting } from '../../../../../app/entities/exhibitManifest';
import { isNil } from '../../../../../utils/lang';
import { TextField } from '../../../../common/TextField';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { SettingLabelWrapper } from '../../SettingLabelWrapper/SettingLabelWrapper';

interface TextAreaExhibitSettingProps {
  setting: TextAreaSetting;
  updatedValue?: TextAreaSetting['value'];
  onChange: (
    id: number,
    manifestId: string,
    value: TextAreaSetting['value'],
    reset: boolean
  ) => void;
  disabled?: boolean;
}

export const TextAreaExhibitSetting: FunctionComponent<
  TextAreaExhibitSettingProps
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

  return (
    <MainPanelCoplanarSubpageBlockRow className='TextAreaExhibitSetting'>
      <TextField
        label={
          <SettingLabelWrapper
            changed={!isNil(updatedValue) && updatedValue !== setting.value}
          >
            {setting.display}
          </SettingLabelWrapper>
        }
        fullWidth
        minRows={2}
        maxRows={4}
        orientation='horizontal'
        placeholder=''
        multiline
        disabled={disabled || !setting.write}
        value={updatedValue !== undefined ? updatedValue : setting.value ?? ''}
        onChange={handleOnChange}
      />
    </MainPanelCoplanarSubpageBlockRow>
  );
};
