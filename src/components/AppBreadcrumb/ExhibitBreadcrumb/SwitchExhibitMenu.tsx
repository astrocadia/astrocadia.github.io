import ChevronRight from '@mui/icons-material/ChevronRight';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useMemo, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListExhibitsQuery } from '../../../app/services/exhibit';
import { sortCompareObjectByStringField } from '../../../utils/sort';
import { generateExhibitPath } from '../../../views/routes/exhibitRoutePaths';
import { ListItemIcon } from '../../common/ListItemIcon';
import { ListItemSecondaryAction } from '../../common/ListItemSecondaryAction';
import { ListItemText } from '../../common/ListItemText';
import { Menu } from '../../common/Menu';
import { MenuItem } from '../../common/MenuItem';
import { useMenu } from '../../common/hooks/useMenu';
import { HealthStateIcon } from '../../icons/HealthStateIcon/HealthStateIcon';

interface SwitchExhibitMenuProps {
  exhibitId: number;
  projectId: number;
}

export const SwitchExhibitMenu: FunctionComponent<SwitchExhibitMenuProps> = ({
  exhibitId,
  projectId,
}) => {
  const navigate = useNavigate();
  const { data: exhibits } = useListExhibitsQuery({ projectId });
  const { anchorEl, open, handleOpenMenuAndStopPropagation, handleCloseMenu } =
    useMenu();

  const sortedExhibits = useMemo(() => {
    if (exhibits) {
      return exhibits
        .filter((exhibit) => exhibit.id !== exhibitId)
        .sort(sortCompareObjectByStringField('name'));
    }
    return undefined;
  }, [exhibitId, exhibits]);

  if (!sortedExhibits?.length) {
    return null;
  }

  return (
    <>
      <MenuItem
        leadingIcon={<SwapHorizIcon />}
        onClick={handleOpenMenuAndStopPropagation}
      >
        <ListItemText primary='Switch exhibits' />
        <ListItemSecondaryAction>
          <ChevronRight />
        </ListItemSecondaryAction>
      </MenuItem>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id='exhibits-menu'
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        {sortedExhibits.map((exhibit) => (
          <MenuItem
            key={exhibit.id}
            onClick={() =>
              navigate(
                generateExhibitPath({ exhibitId: exhibit.id.toString() })
              )
            }
          >
            <ListItemIcon>
              <HealthStateIcon healthState={exhibit.healthState} />
            </ListItemIcon>
            <ListItemText primary={exhibit.name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
