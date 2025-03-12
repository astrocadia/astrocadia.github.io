import { type FunctionComponent, useCallback } from 'react';
import {
  ActionTriggerCard,
  type ActionTriggerCardProps,
} from '../../common/ActionTriggerCard';
import type { Control } from '../../../app/entities/exhibitManifest';
import { useTriggerExhibitControlMutation } from '../../../app/services/exhibit';

type ControlFields = 'display';
type ActionTriggerCardFields = 'className' | 'disabled' | 'fullWidth';
export interface ExhibitControlActionTriggerCardProps
  extends Pick<Control, ControlFields>,
    Pick<ActionTriggerCardProps, ActionTriggerCardFields> {
  exhibitId: number;
  controlId: Control['id'];
  itemId?: string;
}

export const ExhibitControlActionTriggerCard: FunctionComponent<
  ExhibitControlActionTriggerCardProps
> = ({
  className,
  controlId,
  disabled,
  display = '',
  exhibitId,
  fullWidth,
  itemId,
}) => {
  const [onTriggerControl, { isSuccess, isLoading }] =
    useTriggerExhibitControlMutation();

  const onClick = useCallback(() => {
    onTriggerControl({ exhibitId, controlId, itemId });
  }, [controlId, exhibitId, itemId, onTriggerControl]);

  return (
    <ActionTriggerCard
      busy={isLoading}
      className={className}
      disabled={disabled}
      fullWidth={fullWidth}
      success={isSuccess}
      label={display}
      onClick={onClick}
    />
  );
};
