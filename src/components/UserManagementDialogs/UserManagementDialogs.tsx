import { useCallback, useState, type FunctionComponent } from 'react';
import type { ObjectValues } from '@deeplocal/gumband-public-shared-lib/dist/utils/usefulTS';
import {
  UserRoleListDialog,
  type UserRoleListDialogProps,
} from '../UserRoleListDialog';
import { UserInviteConfirmedDialog } from '../UserInviteConfirmedDialog';

const MODE = {
  CONFIRM: 'confirm',
  USERS: 'users',
} as const;
type Mode = ObjectValues<typeof MODE>;

const DELAY = 500 as const;

export interface UserManagementDialogsProps
  extends Omit<UserRoleListDialogProps, 'className'> {}

export const UserManagementDialogs: FunctionComponent<
  UserManagementDialogsProps
> = ({ onInviteUser, open, onClose, ...rest }) => {
  const [invitedEmail, setInvitedEmail] = useState<string | undefined>();
  const [mode, setMode] = useState<Mode>(MODE.USERS);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);

    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setMode(MODE.USERS);
      setInvitedEmail(undefined);
    }, DELAY);
  }, [onClose]);

  const handleBackToUsers = useCallback(() => {
    setMode(MODE.USERS);

    setTimeout(() => {
      setInvitedEmail(undefined);
    }, DELAY);
  }, []);

  const handleInviteUser: UserRoleListDialogProps['onInviteUser'] = useCallback(
    async (email, role) => {
      try {
        await onInviteUser(email, role);
        setMode(MODE.CONFIRM);
        setInvitedEmail(email);
      } catch {
        // TODO: This would be a great place for a toast
        // @see https://deeplocal.atlassian.net/browse/GUM-1666
      }
    },
    [onInviteUser]
  );

  if (!open) {
    return null;
  }

  return (
    <>
      <UserInviteConfirmedDialog
        email={invitedEmail ?? ''}
        onDone={handleClose}
        onBackToUsers={handleBackToUsers}
        open={mode === MODE.CONFIRM && !isClosing}
      />
      <UserRoleListDialog
        onClose={handleClose}
        onInviteUser={handleInviteUser}
        open={mode === MODE.USERS && !isClosing}
        {...rest}
      />
    </>
  );
};
