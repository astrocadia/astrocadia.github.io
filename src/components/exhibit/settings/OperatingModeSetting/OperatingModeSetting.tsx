import {
  ChangeEvent,
  useCallback,
  useMemo,
  type FunctionComponent,
} from 'react';
import { type OpMode } from '../../../../app/entities/exhibit';
import { isNil } from '../../../../utils/lang';
import { FormControl } from '../../../common/FormControl';
import { FormHelperText } from '../../../common/FormHelperText';
import { FormLabel } from '../../../common/FormLabel';
import { CheckIcon } from '../../../common/icons';
import { ToggleSwitch } from '../../../common/ToggleSwitch/ToggleSwitch';
import { OperatingModeIcon } from '../../../icons/OperatingModeIcon/OperatingModeIcon';
import { MainPanelCoplanarSubpageBlockRow } from '../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { OPERATING_MODE } from '../../common/lang';
import { SettingLabelWrapper } from '../SettingLabelWrapper';
import './OperatingModeSetting.css';

const HELPER_TEXT = 'Switch this Exhibit between operating and standby modes';

export interface OperatingModeSettingProps {
  disabled?: boolean;
  value: OpMode;
  updatedValue: OpMode | null;
  hideHelperText?: boolean;
  onChange: (value: OpMode, reset: boolean) => void;
}

export const OperatingModeSetting: FunctionComponent<
  OperatingModeSettingProps
> = ({
  disabled = false,
  hideHelperText = false,
  updatedValue,
  value,
  onChange,
}) => {
  const displayedOpMode = useMemo(() => {
    return !isNil(updatedValue) ? updatedValue : value;
  }, [value, updatedValue]);
  const handleOnChange = useCallback(
    (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const newValue = checked ? 'On' : 'Off';
      onChange(newValue, newValue === value);
    },
    [onChange, value]
  );

  return (
    <MainPanelCoplanarSubpageBlockRow
      condensed
      className='OperatingModeSetting'
    >
      <OperatingModeIcon opMode={displayedOpMode} />
      <FormControl fullWidth orientation='horizontal' disabled={disabled}>
        <SettingLabelWrapper changed={displayedOpMode !== value}>
          <FormLabel>{OPERATING_MODE}</FormLabel>
          {!hideHelperText && <FormHelperText>{HELPER_TEXT}</FormHelperText>}
        </SettingLabelWrapper>
        <ToggleSwitch
          checked={displayedOpMode === 'On'}
          onChange={handleOnChange}
          disabled={disabled}
          checkedIcon={<CheckIcon />}
        />
      </FormControl>
    </MainPanelCoplanarSubpageBlockRow>
  );
};
