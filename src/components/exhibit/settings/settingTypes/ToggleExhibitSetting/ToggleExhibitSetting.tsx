import { useCallback, type ChangeEvent, type FunctionComponent } from 'react';
import type { ToggleSetting } from '../../../../../app/entities/exhibitManifest';
import { isNil } from '../../../../../utils/lang';
import { FormControl } from '../../../../common/FormControl';
import { FormLabel } from '../../../../common/FormLabel';
import { ToggleSwitch } from '../../../../common/ToggleSwitch/ToggleSwitch';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { SettingLabelWrapper } from '../../SettingLabelWrapper/SettingLabelWrapper';
import './ToggleExhibitSetting.css';
import { CheckIcon } from '../../../../common/icons';

interface ToggleExhibitSettingProps {
  setting: ToggleSetting;
  updatedValue?: ToggleSetting['value'];
  onChange: (
    id: number,
    manifestId: string,
    value: ToggleSetting['value'],
    reset: boolean
  ) => void;
  disabled?: boolean;
}
export const ToggleExhibitSetting: FunctionComponent<
  ToggleExhibitSettingProps
> = ({ setting, updatedValue, onChange, disabled }) => {
  const handleOnChange = useCallback(
    (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const newValue = checked ? 'true' : 'false';
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
    <MainPanelCoplanarSubpageBlockRow
      condensed
      className='ToggleExhibitSetting'
    >
      <FormControl
        fullWidth
        orientation='horizontal'
        disabled={disabled || !setting.write}
      >
        <SettingLabelWrapper
          changed={!isNil(updatedValue) && updatedValue !== setting.value}
        >
          <FormLabel>{setting.display}</FormLabel>
        </SettingLabelWrapper>
        <ToggleSwitch
          className='ToggleExhibitSetting__toggle'
          checked={
            (!isNil(updatedValue) ? updatedValue : setting.value) === 'true'
          }
          onChange={handleOnChange}
          disabled={disabled || !setting.write}
          checkedIcon={<CheckIcon />}
        />
      </FormControl>
    </MainPanelCoplanarSubpageBlockRow>
  );
};
