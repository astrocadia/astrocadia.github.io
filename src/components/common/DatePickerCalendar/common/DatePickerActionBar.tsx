import { DialogActions } from '@mui/material';
import { PickersActionBarProps } from '@mui/x-date-pickers';
import cx from 'classnames';
import { FunctionComponent } from 'react';
import { Button } from '../../buttons';
import './DatePickerActionBar.css';

export const DatePickerActionBar: FunctionComponent<PickersActionBarProps> = ({
  onAccept,
  onClear,
  onCancel,
  onSetToday,
  actions,
  className,
}) => {
  if (!actions?.length) {
    return null;
  }

  const menuItems = actions.map((actionType) => {
    switch (actionType) {
      case 'clear':
        return (
          <Button
            size='small'
            variant='ghost'
            onClick={onClear}
            key={actionType}
          >
            Clear
          </Button>
        );
      case 'cancel':
        return (
          <Button
            size='small'
            variant='ghost'
            onClick={onCancel}
            key={actionType}
          >
            Cancel
          </Button>
        );
      case 'accept':
        return (
          <Button
            size='small'
            variant='ghost'
            onClick={onAccept}
            key={actionType}
          >
            Ok
          </Button>
        );
      case 'today':
        return (
          <Button
            size='small'
            variant='ghost'
            onClick={onSetToday}
            key={actionType}
          >
            Today
          </Button>
        );
      default:
        return null;
    }
  });

  return (
    <DialogActions className={cx('DatePickerActionBar', className)}>
      {menuItems}
    </DialogActions>
  );
};
