import { type FunctionComponent } from 'react';
import { Control } from '../../../../../app/entities/exhibitManifest';
import { ActionTriggerCardList } from '../../../../common/ActionTriggerCardList';
import { ExhibitControlsIcon } from '../../../../common/icons';
import { useOrganizedControls } from '../../../common/hooks/useOrganizedControls';
import { addRemoveButtonProps } from '../common/addRemoveButtonProps';
import { ScheduleSelectedPropertiesCard } from '../common/ScheduleSelectedPropertiesCard';
import { SelectedExhibitControlCard } from './SelectedExhibitControlCard';
import './SelectedExhibitControlsCard.css';

export interface SelectedExhibitControlsCardProps {
  selectedControls: Array<Control>;
  onButtonClick: () => void;
}

export const SelectedExhibitControlsCard: FunctionComponent<
  SelectedExhibitControlsCardProps
> = ({ selectedControls, onButtonClick }) => {
  const [singleControls, groupControls] =
    useOrganizedControls(selectedControls);

  return (
    <ScheduleSelectedPropertiesCard
      className='SelectedExhibitControlsCard'
      label='Controls'
      buttonProps={{
        onClick: onButtonClick,
        ...addRemoveButtonProps,
      }}
      badgeProps={{ Icon: ExhibitControlsIcon }}
    >
      {!!singleControls?.length && (
        <ActionTriggerCardList>
          {singleControls.map((control) => (
            <SelectedExhibitControlCard
              key={control.id}
              display={control.display}
            />
          ))}
        </ActionTriggerCardList>
      )}

      {groupControls?.map((control) => (
        // Using the ActionTriggerCardList is an easy way to get the title for this block. It might be worth changing this component in the future
        <ActionTriggerCardList key={control.id} title={control.display}>
          {control.items.map((item) => (
            <SelectedExhibitControlCard key={item.id} display={item.display} />
          ))}
        </ActionTriggerCardList>
      ))}
    </ScheduleSelectedPropertiesCard>
  );
};
