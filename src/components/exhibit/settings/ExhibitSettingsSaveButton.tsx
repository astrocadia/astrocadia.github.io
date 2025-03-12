import { FunctionComponent, useCallback } from 'react';
import { ConfirmationDialog } from '../../common/ConfirmationDialog';
import { Button } from '../../common/buttons';
import { useToggle } from '../../common/hooks/useToggle';
import { CheckIcon } from '../../common/icons';

export interface ExhibitSettingsSaveButtonProps {
  onClick: () => void;
}

export const ExhibitSettingsSaveButton: FunctionComponent<
  ExhibitSettingsSaveButtonProps
> = ({ onClick }) => {
  const { toggled: open, setOff: onClose, setOn: onOpen } = useToggle(false);

  const handleOnAccept = useCallback(() => {
    onClick();
    onClose();
  }, [onClick, onClose]);
  return (
    <>
      <Button variant='secondary' startIcon={<CheckIcon />} onClick={onOpen}>
        Save
      </Button>
      <ConfirmationDialog
        title='Save Changes'
        onClose={onClose}
        onCancel={onClose}
        onAccept={handleOnAccept}
        acceptText='Save Changes'
        open={open}
      >
        This will save all changes made to setting values and cannot be undone.
      </ConfirmationDialog>
    </>
  );
};
