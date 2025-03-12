import ChevronRight from '@mui/icons-material/ChevronRight';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useMemo, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListProjectsQuery } from '../../../app/services/workspace';
import { sortCompareObjectByStringField } from '../../../utils/sort';
import { generateProjectPath } from '../../../views/routes/projectRoutePaths';
import { ListItemSecondaryAction } from '../../common/ListItemSecondaryAction';
import { ListItemText } from '../../common/ListItemText';
import { Menu } from '../../common/Menu';
import { MenuItem } from '../../common/MenuItem';
import { useMenu } from '../../common/hooks/useMenu';

interface SwitchProjectMenuProps {
  projectId: number;
  workspaceId: number;
}

export const SwitchProjectMenu: FunctionComponent<SwitchProjectMenuProps> = ({
  projectId,
  workspaceId,
}) => {
  const navigate = useNavigate();
  const { data: projects } = useListProjectsQuery({ workspaceId });
  const { anchorEl, open, handleCloseMenu, handleOpenMenuAndStopPropagation } =
    useMenu();

  const sortedProjects = useMemo(() => {
    if (projects) {
      return projects
        .filter((project) => project.id !== projectId)
        .sort(sortCompareObjectByStringField('name'));
    }
    return undefined;
  }, [projectId, projects]);

  if (!sortedProjects?.length) {
    return null;
  }

  return (
    <>
      <MenuItem
        leadingIcon={<SwapHorizIcon />}
        onClick={handleOpenMenuAndStopPropagation}
      >
        <ListItemText primary='Switch projects' />
        <ListItemSecondaryAction>
          <ChevronRight />
        </ListItemSecondaryAction>
      </MenuItem>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id='projects-menu'
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        {sortedProjects.map((project) => (
          <MenuItem
            key={project.id}
            onClick={() =>
              navigate(
                generateProjectPath({ projectId: project.id.toString() })
              )
            }
          >
            <ListItemText primary={project.name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
