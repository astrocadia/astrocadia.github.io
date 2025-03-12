import { useCallback, type ChangeEvent, type FunctionComponent } from 'react';
import type { TextSetting } from '../../../../../app/entities/exhibitManifest';
import { isNil } from '../../../../../utils/lang';
import { TextField } from '../../../../common/TextField';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { SettingLabelWrapper } from '../../SettingLabelWrapper/SettingLabelWrapper';

interface TextExhibitSettingProps {
  setting: TextSetting;
  updatedValue?: TextSetting['value'];
  onChange: (
    id: number,
    manifestId: string,
    value: TextSetting['value'],
    reset: boolean
  ) => void;
  disabled?: boolean;
}

export const TextExhibitSetting: FunctionComponent<TextExhibitSettingProps> = ({
  setting,
  updatedValue,
  onChange,
  disabled,
}) => {
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
    <MainPanelCoplanarSubpageBlockRow className='TextExhibitSetting'>
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
        disabled={disabled || !setting.write}
        value={updatedValue !== undefined ? updatedValue : setting.value ?? ''}
        onChange={handleOnChange}
      />
    </MainPanelCoplanarSubpageBlockRow>
  );
};
