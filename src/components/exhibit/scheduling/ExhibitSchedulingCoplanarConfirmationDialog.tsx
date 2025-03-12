import type { FunctionComponent } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '../../common/Dialog';
import { Button } from '../../common/buttons';
import { FormControl } from '../../common/FormControl';
import { FormControlLabel } from '../../common/FormControlLabel';
import { Radio } from '../../common/Radio';
import { RadioGroup } from '../../common/RadioGroup';
import {
  ALL_EVENTS_LABEL,
  THIS_EVENT_ONLY_LABEL,
} from './schedulingCoplanar/common/lang';

export interface ExhibitSchedulingCoplanarConfirmationDialogProps {
  open: boolean;
  title: string;
  subtitle: string;
  recurring?: boolean;
  changeAll: boolean;
  primaryActionDisabled?: boolean;
  secondaryActionDisabled?: boolean;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  onChangeAll: (
    changeAll: ExhibitSchedulingCoplanarConfirmationDialogProps['changeAll']
  ) => void;
  onClose: () => void;
}

export const ExhibitSchedulingCoplanarConfirmationDialog: FunctionComponent<
  ExhibitSchedulingCoplanarConfirmationDialogProps
> = ({
  open,
  title,
  subtitle,
  changeAll,
  recurring,
  primaryActionDisabled = false,
  secondaryActionDisabled = false,
  primaryActionLabel,
  secondaryActionLabel,
  onPrimaryAction,
  onSecondaryAction,
  onClose,
  onChangeAll,
}) => {
  return (
    <Dialog open={open ?? false} title={title} onClose={onClose}>
      <DialogTitle title={title} />
      <DialogContent>
        {subtitle}
        {recurring && (
          <FormControl>
            <RadioGroup
              defaultValue={false}
              name='radio-buttons-group'
              value={changeAll}
              onChange={(_e, value) => onChangeAll(value === 'true')}
            >
              <FormControlLabel
                value='false'
                control={<Radio />}
                label={THIS_EVENT_ONLY_LABEL}
              />
              <FormControlLabel
                value='true'
                control={<Radio />}
                label={ALL_EVENTS_LABEL}
              />
            </RadioGroup>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onSecondaryAction} disabled={secondaryActionDisabled}>
          {secondaryActionLabel}
        </Button>
        <Button
          onClick={onPrimaryAction}
          variant='secondary'
          disabled={primaryActionDisabled}
        >
          {primaryActionLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
