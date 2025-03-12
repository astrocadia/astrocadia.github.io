import { FunctionComponent, useCallback } from 'react';
import { ConfirmationDialog } from '../../common/ConfirmationDialog';
import { Button } from '../../common/buttons';
import { useToggle } from '../../common/hooks/useToggle';
import { UndoIcon } from '../../common/icons';

export interface ExhibitSettingsRevertButtonProps {
  onClick: () => void;
}

export const ExhibitSettingsRevertButton: FunctionComponent<
  ExhibitSettingsRevertButtonProps
> = ({ onClick }) => {
  const { toggled: open, setOff: onClose, setOn: onOpen } = useToggle(false);

  const handleOnAccept = useCallback(() => {
    onClick();
    onClose();
  }, [onClick, onClose]);
  return (
    <>
      <Button startIcon={<UndoIcon />} onClick={onOpen}>
        Revert
      </Button>
      <ConfirmationDialog
        title='Revert Changes'
        onClose={onClose}
        onCancel={onClose}
        onAccept={handleOnAccept}
        acceptText='Revert Changes'
        open={open}
      >
        This will undo all unsaved changes and revert settings to their most
        recently saved values.
      </ConfirmationDialog>
    </>
  );
};
