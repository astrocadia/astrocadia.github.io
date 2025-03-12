import ChevronRight from '@mui/icons-material/ChevronRight';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useMemo, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListWorkspacesQuery } from '../../../app/services/workspace';
import { sortCompareObjectByStringField } from '../../../utils/sort';
import { generateWorkspacePath } from '../../../views/routes/workspaceRoutePaths';
import { ListItemSecondaryAction } from '../../common/ListItemSecondaryAction';
import { ListItemText } from '../../common/ListItemText';
import { Menu } from '../../common/Menu';
import { MenuItem } from '../../common/MenuItem';
import { useMenu } from '../../common/hooks/useMenu';

interface SwitchWorkspaceMenuProps {
  workspaceId: number;
}

export const SwitchWorkspaceMenu: FunctionComponent<
  SwitchWorkspaceMenuProps
> = ({ workspaceId }) => {
  const navigate = useNavigate();
  const { data: workspaces } = useListWorkspacesQuery();
  const { anchorEl, open, handleCloseMenu, handleOpenMenuAndStopPropagation } =
    useMenu();

  const sortedWorkspaces = useMemo(() => {
    if (workspaces) {
      return workspaces
        .filter((workspace) => workspace.id !== workspaceId)
        .sort(sortCompareObjectByStringField('name'));
    }
    return undefined;
  }, [workspaceId, workspaces]);

  if (!sortedWorkspaces?.length) {
    return null;
  }

  return (
    <>
      <MenuItem
        leadingIcon={<SwapHorizIcon />}
        onClick={handleOpenMenuAndStopPropagation}
      >
        <ListItemText primary='Switch workspaces' />
        <ListItemSecondaryAction>
          <ChevronRight />
        </ListItemSecondaryAction>
      </MenuItem>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id='workspaces-menu'
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        {sortedWorkspaces.map((workspace) => (
          <MenuItem
            key={workspace.id}
            onClick={() =>
              navigate(
                generateWorkspacePath({ workspaceId: workspace.id.toString() })
              )
            }
          >
            <ListItemText primary={workspace.name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
