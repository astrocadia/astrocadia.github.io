import { useCallback, type FunctionComponent } from 'react';
import {
  Control,
  ControlGroup,
  ControlGroupItem,
  ControlSingle,
} from '../../../../../../app/entities/exhibitManifest';
import { ActionTriggerCardList } from '../../../../../common/ActionTriggerCardList';
import { MainPanelCoplanarSubpageBlockCheckbox } from '../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockCheckbox';
import { useOrganizedControls } from '../../../../common/hooks/useOrganizedControls';
import './AddRemoveExhibitControlsList.css';

export interface AddRemoveExhibitControlsListProps {
  controls: Array<Control>;
  /*
    This object is based on the create event API request data structure.
    I don't think this is the best option for this, but we gotta build for what we have rn
    The get schedule api is not this simple, so it may be difficult to recreate this structure properly
  */
  selectedControls: Array<Control>;
  onSelectedControlsChange: (selectedControls: Array<Control>) => void;
}

export const AddRemoveExhibitControlsList: FunctionComponent<
  AddRemoveExhibitControlsListProps
> = ({ controls, selectedControls, onSelectedControlsChange }) => {
  const [singleControls, groupControls] = useOrganizedControls(controls);

  const handleSingleControlCheckboxClick = useCallback(
    (control: ControlSingle) => {
      const newSelectedControls = Array.from(selectedControls);
      const selectedControlIndex = newSelectedControls.findIndex(
        (selectedControl) => {
          return (
            selectedControl.type === 'Single' &&
            control.id === selectedControl.id
          );
        }
      );

      if (selectedControlIndex < 0) {
        // add new control to the selected list
        newSelectedControls.push(control);
      } else {
        // remove this control from the selected list
        newSelectedControls.splice(selectedControlIndex, 1);
      }

      onSelectedControlsChange(newSelectedControls);
    },
    [selectedControls, onSelectedControlsChange]
  );

  const handleGroupControlItemCheckboxClick = useCallback(
    (control: ControlGroup, item: ControlGroupItem) => {
      const newSelectedControls = Array.from(selectedControls);
      const selectedControlIndex = newSelectedControls.findIndex(
        (selectedControl) => {
          return (
            selectedControl.type === 'Group' &&
            control.id === selectedControl.id
          );
        }
      );

      if (selectedControlIndex >= 0) {
        // At least 1 control in this group were added previously
        const newSelectedControl: Control = {
          ...selectedControls[selectedControlIndex],
        };

        if (
          newSelectedControl.type === 'Group' && // Somewhat redundant type check, for the ts compiler
          newSelectedControl.items?.includes(item)
        ) {
          // Remove this item from the selected control
          newSelectedControl.items = newSelectedControl.items.filter(
            (selectedItem) => selectedItem.uniqueId !== item.uniqueId
          );
        } else if (newSelectedControl.type === 'Group') {
          // Add this item to the previously selected control group
          newSelectedControl.items.push(item);
        }

        if (newSelectedControl.items.length === 0) {
          // There are no longer any selected items within this group, so we remove the parent control
          newSelectedControls.splice(selectedControlIndex, 1);
        } else {
          // There are other control group items in this group, so we replace the parent control with the new one
          newSelectedControls.splice(
            selectedControlIndex,
            1,
            newSelectedControl
          );
        }
      } else {
        // No controls in this group were added previously
        const newSelectedControl: ControlGroup = {
          ...control,
          items: [item],
        };
        newSelectedControls.push(newSelectedControl);
      }

      onSelectedControlsChange(newSelectedControls);
    },
    [selectedControls, onSelectedControlsChange]
  );

  const isControlSingleChecked = useCallback(
    (control: ControlSingle) => {
      return (
        selectedControls.find(
          (selectedControl) =>
            selectedControl.id === control.id &&
            selectedControl.type === 'Single'
        ) !== undefined
      );
    },
    [selectedControls]
  );

  const isControlGroupItemChecked = useCallback(
    (control: ControlGroup, item: ControlGroupItem) => {
      const selectedControlGroup = selectedControls.find(
        (selectedControl) =>
          selectedControl.id === control.id && selectedControl.type === 'Group'
      );

      return (
        selectedControlGroup?.items.find(
          (selectedItem) => selectedItem.id === item.id
        ) !== undefined
      );
    },
    [selectedControls]
  );

  return (
    <div className='AddRemoveExhibitControlsList'>
      {!!singleControls?.length && (
        <ActionTriggerCardList>
          {singleControls.map((control) => (
            <MainPanelCoplanarSubpageBlockCheckbox
              key={control.id}
              title={control.display || ''}
              checked={isControlSingleChecked(control)}
              onClick={() => {
                handleSingleControlCheckboxClick(control);
              }}
            />
          ))}
        </ActionTriggerCardList>
      )}

      {groupControls?.map((control) => (
        // Using the ActionTriggerCardList is an easy way to get the title for this block. It might be worth changing this component in the future
        <ActionTriggerCardList key={control.id} title={control.display}>
          {control.items.map((item) => (
            <MainPanelCoplanarSubpageBlockCheckbox
              key={item.id}
              title={item.display || ''}
              checked={isControlGroupItemChecked(control, item)}
              onClick={() => handleGroupControlItemCheckboxClick(control, item)}
            />
          ))}
        </ActionTriggerCardList>
      ))}
    </div>
  );
};
