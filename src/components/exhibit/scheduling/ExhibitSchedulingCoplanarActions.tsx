import type { FunctionComponent } from 'react';
import { Button } from '../../common/buttons';
import {
  SCHEDULING_COPLANAR_MODE,
  type SchedulingCoplanarMode,
} from './schedulingCoplanar/common/coplanarMode';
import {
  DELETE_BUTTON_LABEL,
  CANCEL_BUTTON_LABEL,
  CREATE_BUTTON_LABEL,
  SAVE_BUTTON_LABEL,
} from './schedulingCoplanar/common/lang';
import './ExhibitSchedulingCoplanarActions.css';

interface ExhibitSchedulingCoplanarActionsProps {
  mode: SchedulingCoplanarMode;
  isDisabled: boolean;
  onDelete: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const ExhibitSchedulingCoplanarActions: FunctionComponent<
  ExhibitSchedulingCoplanarActionsProps
> = ({ mode, isDisabled, onDelete, onCancel, onSave }) => (
  <div className='ExhibitSchedulingCoplanarActions'>
    <Button
      onClick={mode === SCHEDULING_COPLANAR_MODE.EDIT ? onDelete : onCancel}
    >
      {mode === SCHEDULING_COPLANAR_MODE.EDIT
        ? DELETE_BUTTON_LABEL
        : CANCEL_BUTTON_LABEL}
    </Button>
    <Button disabled={isDisabled} variant='secondary' onClick={onSave}>
      {mode === SCHEDULING_COPLANAR_MODE.NEW
        ? CREATE_BUTTON_LABEL
        : SAVE_BUTTON_LABEL}
    </Button>
  </div>
);
