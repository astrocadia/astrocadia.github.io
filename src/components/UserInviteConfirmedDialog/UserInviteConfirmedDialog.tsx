import { memo, type FunctionComponent } from 'react';
import cx from 'classnames';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '../common/Dialog';
import { Button } from '../common/buttons';
import './UserInviteConfirmedDialog.css';

const CONTENT_TEXT =
  'New users will receive an email invitation to create an account. The link will be valid for 48 hours.' as const;
const DONE = 'Done' as const;
const BACK_TO_USERS = 'Back to Users' as const;
const USER_INVITED = 'User Invited' as const;

export interface UserInviteConfirmedDialogProps {
  email: string;
  open: boolean;
  onDone: () => void;
  onBackToUsers: () => void;
  className?: string;
}

export const UserInviteConfirmedDialog: FunctionComponent<UserInviteConfirmedDialogProps> =
  memo(({ email, open, onDone, onBackToUsers, className }) => {
    return (
      <Dialog
        className={cx('UserInviteConfirmedDialog', className)}
        open={open}
      >
        <DialogTitle title={USER_INVITED} />
        <DialogContent>
          <div>{CONTENT_TEXT}</div>
          <div className='UserInviteConfirmedDialog__email'>{email}</div>
        </DialogContent>
        <DialogActions>
          <Button variant='primary' onClick={onBackToUsers}>
            {BACK_TO_USERS}
          </Button>
          <Button variant='secondary' onClick={onDone}>
            {DONE}
          </Button>
        </DialogActions>
      </Dialog>
    );
  });

UserInviteConfirmedDialog.displayName = 'UserInviteConfirmedDialog';
