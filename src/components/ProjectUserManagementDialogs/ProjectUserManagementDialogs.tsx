import { useCallback, useMemo, type FunctionComponent } from 'react';
import {
  useDeleteProjectUserPermissionMutation,
  useGetProjectQuery,
  useGetProjectUsersQuery,
  useInviteNewProjectUserMutation,
  useUpdateProjectUserPermissionMutation,
  type Project,
} from '../../app/services/workspace';
import { useGetUserQuery } from '../../app/services/user';
import {
  UserManagementDialogs,
  type UserManagementDialogsProps,
} from '../UserManagementDialogs';

const INVITE_TITLE = 'Invite Project User' as const;
const INVITE_SUBTITLE = 'User will be added to all exhibits within ' as const;
const LIST_TITLE = 'Project Users' as const;
const LIST_SUBTITLE = 'Users for ' as const;

export interface ProjectUserManagementDialogsProps
  extends Pick<UserManagementDialogsProps, 'open' | 'onClose'> {
  projectId: Project['id'];
}

export const ProjectUserManagementDialogs: FunctionComponent<
  ProjectUserManagementDialogsProps
> = ({ projectId, ...rest }) => {
  const { data: project } = useGetProjectQuery({ projectId });
  const { data: users } = useGetProjectUsersQuery({ projectId });
  const { data: user } = useGetUserQuery();

  const [updateProjectUserPermission] =
    useUpdateProjectUserPermissionMutation();
  const [deleteProjectUser] = useDeleteProjectUserPermissionMutation();
  const [inviteNewProjectUser] = useInviteNewProjectUserMutation();

  const inviteSubtitle = useMemo(
    () => `${INVITE_SUBTITLE}${project?.name}`,
    [project?.name]
  );

  const listSubtitle = useMemo(
    () => `${LIST_SUBTITLE}${project?.name}`,
    [project?.name]
  );

  const handleRoleChange: UserManagementDialogsProps['onRoleChange'] =
    useCallback(
      (userId, role) => {
        updateProjectUserPermission({ id: userId, role });
      },
      [updateProjectUserPermission]
    );

  const handleInviteUser: UserManagementDialogsProps['onInviteUser'] =
    useCallback(
      (email, role) =>
        inviteNewProjectUser({ email, role, projectId }).unwrap(),
      [inviteNewProjectUser, projectId]
    );

  const handleRemoveUser: UserManagementDialogsProps['onRemoveUser'] =
    useCallback(
      (userId) => {
        deleteProjectUser({ id: userId });
      },
      [deleteProjectUser]
    );

  if (!user || !users || !project) {
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
