import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetWorkspaceQuery } from '../../../app/services/workspace';
import { generateWorkspacePath } from '../../../views/routes/workspaceRoutePaths';
import { Avatar } from '../../common/Avatar';
import { ListItem } from '../../common/ListItem';
import { ListItemAvatar } from '../../common/ListItemAvatar';
import { ListItemText } from '../../common/ListItemText';
import { Menu } from '../../common/Menu';
import { MenuItem } from '../../common/MenuItem';
import { useMenu } from '../../common/hooks/useMenu';
import { Breadcrumb } from '../common/Breadcrumb';
import { SwitchWorkspaceMenu } from './SwitchWorkspaceMenu';
import { UserBreadcrumbMenuItem } from '../../UserBreadcrumbMenuItem';
import { WorkspaceUserManagementDialogs } from '../../WorkspaceUserManagementDialogs';

const GO_TO_WORKSPACE = 'Go to workspace' as const;

interface WorkspaceBreadcrumbProps {
  primary?: boolean;
  workspaceId: number;
}

export const WorkspaceBreadcrumb: FunctionComponent<
  WorkspaceBreadcrumbProps
> = ({ primary, workspaceId }) => {
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  const navigate = useNavigate();
  const { data: workspace } = useGetWorkspaceQuery({ workspaceId });
  const { anchorEl, open, handleOpenMenu, handleCloseMenu } = useMenu();

  // TODO: In the future, when we have a Workspace config, we can pull the Workspace avatar from there.
  const avatar = useMemo(
    () =>
      workspace && (
        <Avatar alt={workspace.name}>{workspace.name[0].toUpperCase()}</Avatar>
      ),
    [workspace]
  );

  const onGoToWorkspace = useCallback(() => {
    navigate(generateWorkspacePath({ workspaceId: workspaceId.toString() }));
  }, [navigate, workspaceId]);

  const handleDialogClose = useCallback(() => {
    setUserDialogOpen(false);
  }, []);

  if (!workspace) {
    return null;
  }

  return (
    <>
      <Breadcrumb
        avatar={avatar}
        label={workspace.name}
        onClick={handleOpenMenu}
        primary={primary}
        selected={open}
      />
      <Menu
        anchorEl={anchorEl}
        id='workspace-menu'
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        MenuListProps={{ autoFocusItem: false }}
      >
        <ListItem>
          <ListItemAvatar>{avatar}</ListItemAvatar>
          <ListItemText primary={workspace.name} />
        </ListItem>
        {!primary && (
          <MenuItem
            leadingIcon={<ArrowBackIcon fontSize='small' />}
            onClick={onGoToWorkspace}
          >
            <ListItemText primary={GO_TO_WORKSPACE} />
          </MenuItem>
        )}
        <UserBreadcrumbMenuItem onClick={() => setUserDialogOpen(true)} />
        {workspace && <SwitchWorkspaceMenu workspaceId={workspace.id} />}
      </Menu>
      <WorkspaceUserManagementDialogs
        workspaceId={workspaceId}
        open={userDialogOpen}
        onClose={handleDialogClose}
      />
    </>
  );
};
