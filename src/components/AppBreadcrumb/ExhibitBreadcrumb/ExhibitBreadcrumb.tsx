import { useCallback, useState, type FunctionComponent } from 'react';
import { useGetExhibitQuery } from '../../../app/services/exhibit';
import { ListItem } from '../../common/ListItem';
import { ListItemText } from '../../common/ListItemText';
import { Menu } from '../../common/Menu';
import { useMenu } from '../../common/hooks/useMenu';
import { HealthStateIcon } from '../../icons/HealthStateIcon/HealthStateIcon';
import { Breadcrumb } from '../common/Breadcrumb';
import { SwitchExhibitMenu } from './SwitchExhibitMenu';
import { UserBreadcrumbMenuItem } from '../../UserBreadcrumbMenuItem';
import { ExhibitUserManagementDialogs } from '../../ExhibitUserManagementDialogs';

interface ExhibitBreadcrumbProps {
  exhibitId: number;
}

export const ExhibitBreadcrumb: FunctionComponent<ExhibitBreadcrumbProps> = ({
  exhibitId,
}) => {
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  const { data: exhibit } = useGetExhibitQuery({ exhibitId });
  const { anchorEl, open, handleOpenMenu, handleCloseMenu } = useMenu();

  const handleDialogOpen = useCallback(() => {
    setUserDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setUserDialogOpen(false);
  }, []);

  if (!exhibit) {
    return null;
  }

  return (
    <>
      <Breadcrumb
        label={exhibit.name}
        onClick={handleOpenMenu}
        primary
        selected={open}
        statusIcon={<HealthStateIcon healthState={exhibit.healthState} />}
      />
      <Menu
        anchorEl={anchorEl}
        id='exhibit-menu'
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        <ListItem>
          <ListItemText primary={exhibit.name} />
        </ListItem>
        <UserBreadcrumbMenuItem onClick={handleDialogOpen} />
        {exhibit && (
          <SwitchExhibitMenu exhibitId={exhibitId} projectId={exhibit.siteId} />
        )}
      </Menu>
      <ExhibitUserManagementDialogs
        exhibitId={exhibitId}
        open={userDialogOpen}
        onClose={handleDialogClose}
      />
    </>
  );
};
