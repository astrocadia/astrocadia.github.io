import {
  memo,
  useCallback,
  useMemo,
  useState,
  type FunctionComponent,
} from 'react';
import cx from 'classnames';
import type { ObjectValues } from '@deeplocal/gumband-public-shared-lib/dist/utils/usefulTS';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '../common/Dialog';
import { UserInviteInputField } from '../UserInviteInputField';
import { UserRoleList } from '../UserRoleList';
import type { EntityUser, User, UserRole } from '../../app/services/user';
import { ArrowBackIcon } from '../common/icons';
import { IconButton } from '../common/buttons/IconButton';
import {
  RadioButtonGroup,
  type RadioButtonGroupOption,
} from '../RadioButtonGroup';
import { Button } from '../common/buttons';
import './UserRoleListDialog.css';

export const USER_ROLE_LIST_DIALOG_MODE = {
  INVITE: 'invite',
  LIST: 'list',
} as const;
type Mode = ObjectValues<typeof USER_ROLE_LIST_DIALOG_MODE>;

const DEFAULT_MODE: Mode = 'list' as const;
const YOUR_ROLE = ' (your role)' as const;
const ASSIGN_ROLE = 'Assign Role' as const;
const CANCEL = 'Cancel' as const;
const INVITE = 'Invite' as const;
const RESET_DELAY = 500 as const;

export interface UserRoleWithTitles {
  title: string;
  subtitle: string;
  role: UserRole;
}

export const DefaultUserRoleListRoles: Array<UserRoleWithTitles> = [
  {
    role: 'manager',
    title: 'Manager',
    subtitle: 'Manage audience facing exhibits and view metrics',
  },
  {
    role: 'developer',
    title: 'Developer',
    subtitle:
      'Build, manage and troubleshoot exhibit backend, including software and hardware components',
  },
];

export interface UserRoleListDialogProps {
  open: boolean;
  onClose: () => void;
  onRoleChange: (userId: EntityUser['id'], role: UserRole) => void;
  onRemoveUser: (userId: EntityUser['id']) => void;
  onInviteUser: (email: string, role: UserRole) => Promise<unknown>;
  users: Array<EntityUser>;
  roles?: Array<UserRoleWithTitles>;
  inviteTitle: string;
  inviteSubtitle: string;
  listTitle: string;
  listSubtitle: string;
  currentUserId: User['id'] | EntityUser['userId'];
  className?: string;
}

export const UserRoleListDialog: FunctionComponent<UserRoleListDialogProps> =
  memo(
    ({
      open,
      onClose,
      users,
      roles = DefaultUserRoleListRoles,
      currentUserId,
      onRoleChange,
      onInviteUser,
      onRemoveUser,
      inviteTitle,
      inviteSubtitle,
      listTitle,
      listSubtitle,
      className,
    }) => {
      const [mode, setMode] = useState<Mode>(DEFAULT_MODE);
      const [hasInvited, setHasInvited] = useState(false);
      const [isInviting, setIsInviting] = useState(false);
      const [invitedUserEmail, setInvitedUserEmail] = useState('');
      const [invitedUserRole, setInvitedUserRole] = useState<
        string | undefined
      >(undefined);

      const emails = useMemo(() => users.map((user) => user.email), [users]);
      const titles = useMemo(
        () => ({
          invite: { title: inviteTitle, subtitle: inviteSubtitle },
          list: { title: listTitle, subtitle: listSubtitle },
        }),
        [inviteTitle, inviteSubtitle, listTitle, listSubtitle]
      );
      const modeTitle = useMemo(() => titles[mode], [mode, titles]);

      const currentUser = useMemo(
        () => users.find((user) => user.userId === currentUserId),
        [users, currentUserId]
      );

      const roleOptions: Array<RadioButtonGroupOption> = useMemo(
        () =>
          roles.map((role) => {
            const title =
              currentUser?.role === role.role
                ? `${role.title}${YOUR_ROLE}`
                : role.title;

            return {
              value: role.role,
              title,
              description: role.subtitle,
            };
          }),
        [roles, currentUser]
      );

      const isInviteActive = useMemo(
        () => !!invitedUserEmail && mode === 'invite' && hasInvited,
        [invitedUserEmail, mode, hasInvited]
      );

      const canSubmitInvite = useMemo(
        () => isInviteActive && !!invitedUserRole,
        [isInviteActive, invitedUserRole]
      );

      const resetComponent = useCallback(() => {
        setMode(DEFAULT_MODE);
        setIsInviting(false);
        setHasInvited(false);
        setInvitedUserEmail('');
        setInvitedUserRole(undefined);
      }, []);

      /** Intentionally named since this returns a function instead of firing one or undefined  */
      const modeTitleCloseHandler = useMemo<
        UserRoleListDialogProps['onClose'] | undefined
      >(() => {
        if (mode === USER_ROLE_LIST_DIALOG_MODE.LIST) {
          return onClose;
        }

        return undefined;
      }, [mode, onClose]);

      const handleBackClick = useCallback(() => {
        setMode(USER_ROLE_LIST_DIALOG_MODE.LIST);
        setHasInvited(false);
      }, []);

      const handleSetActiveEmail = useCallback((email: string) => {
        setInvitedUserEmail(email);

        if (!email) {
          setHasInvited(false);
        }
      }, []);

      const handleInviteButtonPress = useCallback(() => {
        setMode('invite');
        setHasInvited(true);
      }, []);

      const handleSubmitInvite = useCallback(async () => {
        if (canSubmitInvite) {
          setIsInviting(true);
          await onInviteUser(invitedUserEmail, invitedUserRole as UserRole);
          setIsInviting(false);

          // Reset component after a delay to allow for the dialog to close
          setTimeout(() => {
            resetComponent();
          }, RESET_DELAY);
        }
      }, [
        canSubmitInvite,
        invitedUserEmail,
        invitedUserRole,
        onInviteUser,
        resetComponent,
      ]);

      return (
        <Dialog
          className={cx(
            'UserRoleListDialog',
            `UserRoleListDialog__mode__${mode}`,
            className
          )}
          open={open}
          onClose={onClose}
        >
          <div>
            {mode === USER_ROLE_LIST_DIALOG_MODE.INVITE && (
              <IconButton
                className='UserRoleListDialog__backButton'
                onClick={handleBackClick}
                variant='ghost'
                aria-label='back'
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <DialogTitle
              title={modeTitle.title}
              subTitle={modeTitle.subtitle}
              onClose={modeTitleCloseHandler}
            />
          </div>
          <DialogContent>
            <UserInviteInputField
              currentUserEmails={emails}
              activeEmail={invitedUserEmail}
              setActiveEmail={handleSetActiveEmail}
              isInviteActive={isInviteActive}
              onInvite={handleInviteButtonPress}
            />
            {mode === USER_ROLE_LIST_DIALOG_MODE.LIST && (
              <UserRoleList
                users={users}
                currentUserId={currentUserId}
                onRoleChange={onRoleChange}
                onRemoveUser={onRemoveUser}
              />
            )}
            {mode === USER_ROLE_LIST_DIALOG_MODE.INVITE && (
              <div>
                <div className='UserRoleListDialog__caption'>{ASSIGN_ROLE}</div>
                <RadioButtonGroup
                  options={roleOptions}
                  onChange={setInvitedUserRole}
                  value={invitedUserRole}
                />
              </div>
            )}
          </DialogContent>
          {mode === USER_ROLE_LIST_DIALOG_MODE.INVITE && (
            <DialogActions>
              <Button variant='primary' onClick={resetComponent}>
                {CANCEL}
              </Button>
              <Button
                variant='secondary'
                onClick={handleSubmitInvite}
                disabled={!canSubmitInvite || isInviting}
              >
                {INVITE}
              </Button>
            </DialogActions>
          )}
        </Dialog>
      );
    }
  );

UserRoleListDialog.displayName = 'UserRoleListDialog';
