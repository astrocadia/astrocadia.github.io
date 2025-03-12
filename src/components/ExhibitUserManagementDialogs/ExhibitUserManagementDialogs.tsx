import { useCallback, useMemo, type FunctionComponent } from 'react';
import { useGetUserQuery } from '../../app/services/user';
import {
  UserManagementDialogs,
  type UserManagementDialogsProps,
} from '../UserManagementDialogs';
import type { Exhibit } from '../../app/entities/exhibit';
import {
  useDeleteExhibitUserPermissionMutation,
  useGetExhibitQuery,
  useGetExhibitUsersQuery,
  useInviteNewExhibitUserMutation,
  useUpdateExhibitUserPermissionMutation,
} from '../../app/services/exhibit';

const INVITE_TITLE = 'Invite Exhibit User' as const;
const INVITE_SUBTITLE = 'User will be added to ' as const;
const LIST_TITLE = 'Exhibit Users' as const;
const LIST_SUBTITLE = 'Users for ' as const;

export interface ExhibitUserManagementDialogsProps
  extends Pick<UserManagementDialogsProps, 'open' | 'onClose'> {
  exhibitId: Exhibit['id'];
}

export const ExhibitUserManagementDialogs: FunctionComponent<
  ExhibitUserManagementDialogsProps
> = ({ exhibitId, ...rest }) => {
  const { data: exhibit } = useGetExhibitQuery({ exhibitId });
  const { data: users } = useGetExhibitUsersQuery({ exhibitId });
  const { data: user } = useGetUserQuery();

  const [updateExhibitUserPermission] =
    useUpdateExhibitUserPermissionMutation();
  const [deleteExhibitUser] = useDeleteExhibitUserPermissionMutation();
  const [inviteNewExhibitUser] = useInviteNewExhibitUserMutation();

  const inviteSubtitle = useMemo(
    () => `${INVITE_SUBTITLE}${exhibit?.name}`,
    [exhibit?.name]
  );

  const listSubtitle = useMemo(
    () => `${LIST_SUBTITLE}${exhibit?.name}`,
    [exhibit?.name]
  );

  const handleRoleChange: UserManagementDialogsProps['onRoleChange'] =
    useCallback(
      (userId, role) => {
        updateExhibitUserPermission({ id: userId, role });
      },
      [updateExhibitUserPermission]
    );

  const handleInviteUser: UserManagementDialogsProps['onInviteUser'] =
    useCallback(
      (email, role) =>
        inviteNewExhibitUser({ email, role, exhibitId }).unwrap(),
      [inviteNewExhibitUser, exhibitId]
    );

  const handleRemoveUser: UserManagementDialogsProps['onRemoveUser'] =
    useCallback(
      (userId) => {
        deleteExhibitUser({ exhibitUserId: userId });
      },
      [deleteExhibitUser]
    );

  if (!user || !users || !exhibit) {
    return null;
  }

  return (
    <UserManagementDialogs
      users={users}
      currentUserId={user.id}
      onRoleChange={handleRoleChange}
      onRemoveUser={handleRemoveUser}
      onInviteUser={handleInviteUser}
      inviteTitle={INVITE_TITLE}
      inviteSubtitle={inviteSubtitle}
      listTitle={LIST_TITLE}
      listSubtitle={listSubtitle}
      {...rest}
    />
  );
};
