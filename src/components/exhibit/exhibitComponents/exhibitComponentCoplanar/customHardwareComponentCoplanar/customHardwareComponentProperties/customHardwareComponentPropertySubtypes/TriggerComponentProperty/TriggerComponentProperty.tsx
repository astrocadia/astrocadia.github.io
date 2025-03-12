import { type FunctionComponent, useCallback } from 'react';
import { type TriggerProperty } from '../../../../../../../../app/entities/exhibitComponents';
import { ActionTriggerButton } from '../../../../../../../common/ActionTriggerButton';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { SettingLabelWrapper } from '../../../../../../settings/SettingLabelWrapper';
import './TriggerComponentProperty.css';

interface TriggerComponentPropertyProps {
  propertyName: string;
  disabled?: boolean;
  onSendValue: (values: TriggerProperty['value']) => void;
  loading: boolean;
  success: boolean;
}

export const TriggerComponentProperty: FunctionComponent<
  TriggerComponentPropertyProps
> = ({ propertyName, disabled, onSendValue, loading, success }) => {
  const handleSendTrigger = useCallback(() => {
    onSendValue([]);
  }, [onSendValue]);

  return (
    <MainPanelCoplanarSubpageBlockRow className='TriggerComponentProperty'>
      <div className='TriggerComponentProperty__labelAndActionWrapper'>
        <SettingLabelWrapper className='TriggerComponentProperty__label'>
          {propertyName}
        </SettingLabelWrapper>
        <div className='TriggerComponentProperty__buttonWrapper'>
          <ActionTriggerButton
            busy={loading}
            success={success}
            disabled={disabled}
            onClick={handleSendTrigger}
          />
        </div>
      </div>
    </MainPanelCoplanarSubpageBlockRow>
  );
};
