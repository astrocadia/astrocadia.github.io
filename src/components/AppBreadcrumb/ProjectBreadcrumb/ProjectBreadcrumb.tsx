import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FunctionComponent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProjectQuery } from '../../../app/services/workspace';
import { generateProjectPath } from '../../../views/routes/projectRoutePaths';
import { ListItem } from '../../common/ListItem';
import { ListItemText } from '../../common/ListItemText';
import { Menu } from '../../common/Menu';
import { MenuItem } from '../../common/MenuItem';
import { useMenu } from '../../common/hooks/useMenu';
import { Breadcrumb } from '../common/Breadcrumb';
import { SwitchProjectMenu } from './SwitchProjectMenu';
import { UserBreadcrumbMenuItem } from '../../UserBreadcrumbMenuItem';
import { ProjectUserManagementDialogs } from '../../ProjectUserManagementDialogs';

interface ProjectBreadcrumbProps {
  primary?: boolean;
  projectId: number;
}

export const ProjectBreadcrumb: FunctionComponent<ProjectBreadcrumbProps> = ({
  primary,
  projectId,
}) => {
  const navigate = useNavigate();
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  const { data: project } = useGetProjectQuery({ projectId });
  const { anchorEl, open, handleOpenMenu, handleCloseMenu } = useMenu();

  const onGoToProject = useCallback(() => {
    navigate(generateProjectPath({ projectId: projectId.toString() }));
  }, [navigate, projectId]);

  const handleDialogClose = useCallback(() => {
    setUserDialogOpen(false);
  }, []);

  if (!project) {
    return null;
  }

  return (
    <>
      <Breadcrumb
        label={project.name}
        onClick={handleOpenMenu}
        primary={primary}
        selected={open}
      />
      <Menu
        anchorEl={anchorEl}
        id='project-menu'
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        MenuListProps={{ autoFocusItem: false }}
      >
        <ListItem>
          <ListItemText primary={project.name} />
        </ListItem>
        {!primary && (
          <MenuItem
            leadingIcon={<ArrowBackIcon fontSize='small' />}
            onClick={onGoToProject}
          >
            <ListItemText primary='Go to project' />
          </MenuItem>
        )}
        <UserBreadcrumbMenuItem onClick={() => setUserDialogOpen(true)} />
        {project && (
          <SwitchProjectMenu
            projectId={projectId}
            workspaceId={project.organizationId}
          />
        )}
      </Menu>
      <ProjectUserManagementDialogs
        open={userDialogOpen}
        onClose={handleDialogClose}
        projectId={projectId}
      />
    </>
  );
};
