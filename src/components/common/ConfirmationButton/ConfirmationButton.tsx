import { useCallback, type FunctionComponent, type ReactNode } from 'react';
import {
  ConfirmationDialog,
  type ConfirmationDialogProps,
} from '../ConfirmationDialog';
import { Button, type ButtonProps } from '../buttons';
import { useToggle } from '../hooks/useToggle';

export interface ConfirmationButtonProps extends Omit<ButtonProps, 'onClick'> {
  ConfirmationDialogProps?: Partial<
    Omit<
      ConfirmationDialogProps,
      'children' | 'title' | 'open' | 'onClose' | 'onConfirm'
    >
  >;
  dialogMessage: ReactNode;
  dialogTitle?: string;
  onClick: () => void;
}

export const ConfirmationButton: FunctionComponent<ConfirmationButtonProps> = ({
  ConfirmationDialogProps = {},
  dialogMessage,
  dialogTitle,
  onClick,
  ...buttonProps
}) => {
  const { toggled: open, setOff: onClose, setOn: onOpen } = useToggle(false);

  const handleOnAccept = useCallback(() => {
    onClick();
    onClose();
  }, [onClick, onClose]);

  return (
    <>
      <Button {...buttonProps} onClick={onOpen} />
      <ConfirmationDialog
        {...ConfirmationDialogProps}
        open={open}
        onClose={onClose}
        onCancel={onClose}
        onAccept={handleOnAccept}
        title={dialogTitle}
      >
        {dialogMessage}
      </ConfirmationDialog>
    </>
  );
};
