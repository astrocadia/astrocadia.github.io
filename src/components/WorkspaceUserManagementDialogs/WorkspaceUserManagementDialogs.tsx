import { useCallback, useMemo, type FunctionComponent } from 'react';
import {
  useDeleteWorkspaceUserPermissionMutation,
  useGetWorkspaceQuery,
  useGetWorkspaceUsersQuery,
  useInviteNewWorkspaceUserMutation,
  useUpdateWorkspaceUserPermissionMutation,
  type Workspace,
} from '../../app/services/workspace';
import { useGetUserQuery } from '../../app/services/user';
import {
  UserManagementDialogs,
  type UserManagementDialogsProps,
} from '../UserManagementDialogs';

const INVITE_TITLE = 'Invite Workspace User' as const;
const INVITE_SUBTITLE =
  'User will be added to all projects and exhibits within ' as const;
const LIST_TITLE = 'Workspace Users' as const;
const LIST_SUBTITLE = 'Users for ' as const;

export interface WorkspaceUserManagementDialogsProps
  extends Pick<UserManagementDialogsProps, 'open' | 'onClose'> {
  workspaceId: Workspace['id'];
}

export const WorkspaceUserManagementDialogs: FunctionComponent<
  WorkspaceUserManagementDialogsProps
> = ({ workspaceId, ...rest }) => {
  const { data: workspace } = useGetWorkspaceQuery({ workspaceId });
  const { data: users } = useGetWorkspaceUsersQuery({ workspaceId });
  const { data: user } = useGetUserQuery();

  const [updateWorkspaceUserPermission] =
    useUpdateWorkspaceUserPermissionMutation();
  const [deleteWorkspaceUser] = useDeleteWorkspaceUserPermissionMutation();
  const [inviteNewWorkspaceUser] = useInviteNewWorkspaceUserMutation();

  const inviteSubtitle = useMemo(
    () => `${INVITE_SUBTITLE}${workspace?.name}`,
    [workspace?.name]
  );

  const listSubtitle = useMemo(
    () => `${LIST_SUBTITLE}${workspace?.name}`,
    [workspace?.name]
  );

  const handleRoleChange: UserManagementDialogsProps['onRoleChange'] =
    useCallback(
      (userId, role) => {
        updateWorkspaceUserPermission({ workspaceUserId: userId, role });
      },
      [updateWorkspaceUserPermission]
    );

  const handleInviteUser: UserManagementDialogsProps['onInviteUser'] =
    useCallback(
      (email, role) =>
        inviteNewWorkspaceUser({ email, role, workspaceId }).unwrap(),

      [inviteNewWorkspaceUser, workspaceId]
    );

  const handleRemoveUser: UserManagementDialogsProps['onRemoveUser'] =
    useCallback(
      (userId) => {
        deleteWorkspaceUser({ workspaceUserId: userId });
      },
      [deleteWorkspaceUser]
    );

  if (!user || !users || !workspace) {
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
