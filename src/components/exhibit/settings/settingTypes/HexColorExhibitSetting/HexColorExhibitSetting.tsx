import { useCallback, type FunctionComponent } from 'react';
import type { HexColorSetting } from '../../../../../app/entities/exhibitManifest';
import { ColorInput } from '../../../../common/ColorInput/ColorInput';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import './HexColorExhibitSetting.css';
import { SettingLabelWrapper } from '../../SettingLabelWrapper';
import { isNil } from '../../../../../utils/lang';

interface HexColorExhibitSettingProps {
  setting: HexColorSetting;
  updatedValue?: HexColorSetting['value'];
  onChange: (
    id: number,
    manifestId: string,
    value: HexColorSetting['value'],
    reset: boolean
  ) => void;
  disabled?: boolean;
}

export const HexColorExhibitSetting: FunctionComponent<
  HexColorExhibitSettingProps
> = ({ setting, updatedValue, onChange, disabled }) => {
  const handleOnChange = useCallback(
    (event: string) => {
      const newValue = event || null;
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
    <MainPanelCoplanarSubpageBlockRow className='HexColorExhibitSetting'>
      <div className='HexColorExhibitSetting_wrapper'>
        <SettingLabelWrapper
          className='HexColorExhibitSetting_label-wrapper'
          changed={!isNil(updatedValue) && updatedValue !== setting.value}
        >
          <div className='HexColorExhibitSetting_label'>{setting.display}</div>
        </SettingLabelWrapper>
        <ColorInput
          format='hex'
          onChange={handleOnChange}
          className='HexColorExhibitSetting_color-input'
          disabled={disabled || !setting.write}
          PopoverProps={{ anchorReference: 'anchorEl' }}
          value={
            updatedValue !== undefined && updatedValue !== null
              ? updatedValue
              : setting.value?.toString() ?? ''
          }
        />
      </div>
    </MainPanelCoplanarSubpageBlockRow>
  );
};
