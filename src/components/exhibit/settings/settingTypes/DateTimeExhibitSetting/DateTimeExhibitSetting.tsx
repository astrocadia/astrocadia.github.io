import { DateTime } from 'luxon';
import { useCallback, useMemo, type FunctionComponent } from 'react';
import type { DateSetting } from '../../../../../app/entities/exhibitManifest';
import { isNil } from '../../../../../utils/lang';
import { DateTimePicker } from '../../../../common/DateTimePicker';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { SettingLabelWrapper } from '../../SettingLabelWrapper/SettingLabelWrapper';

interface DateTimeExhibitSettingProps {
  setting: DateSetting;
  updatedValue?: DateSetting['value'];
  onChange: (
    id: number,
    manifestId: string,
    value: DateSetting['value'],
    reset: boolean
  ) => void;
  disabled?: boolean;
}

export const DateTimeExhibitSetting: FunctionComponent<
  DateTimeExhibitSettingProps
> = ({ setting, updatedValue, onChange, disabled }) => {
  const dateTimeValue = useMemo(() => {
    const value = !isNil(updatedValue) ? updatedValue : setting.value;
    return value ? DateTime.fromISO(value) : null;
  }, [setting.value, updatedValue]);

  const handleOnChange = useCallback(
    (newRawValue: DateTime | null) => {
      const newValue = newRawValue ? newRawValue.toISO() : null;
      onChange(
        setting.id,
        setting.manifestId,
        newValue,
        setting.value === newValue
      );
    },
    [onChange, setting.id, setting.manifestId, setting.value]
  );

  return (
    <MainPanelCoplanarSubpageBlockRow className='DateTimeExhibitSetting'>
      <DateTimePicker
        label={
          <SettingLabelWrapper
            changed={!isNil(updatedValue) && updatedValue !== setting.value}
          >
            {setting.display}
          </SettingLabelWrapper>
        }
        fullWidth
        orientation='horizontal'
        disabled={disabled || !setting.write}
        value={dateTimeValue}
        onChange={handleOnChange}
      />
    </MainPanelCoplanarSubpageBlockRow>
  );
};
