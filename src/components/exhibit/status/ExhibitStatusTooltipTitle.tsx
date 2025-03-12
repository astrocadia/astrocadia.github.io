import { type FunctionComponent } from 'react';
import { DateTime } from 'luxon';
import { type Status } from '../../../app/entities/exhibitManifest';
import { List } from '../../common/List';
import { ListItem } from '../../common/ListItem';
import './ExhibitStatusTooltipTitle.css';

interface ExhibitStatusTooltipTitleProps {
  status: Status;
}

export const ExhibitStatusTooltipTitle: FunctionComponent<
  ExhibitStatusTooltipTitleProps
> = ({ status }) => (
  <List className='ExhibitStatusTooltipTitle' disablePadding>
    <ListItem disableGutters className='ExhibitStatusTooltipTitle__displayName'>
      {status.display}
    </ListItem>
    <ListItem disableGutters>
      <span>ID:</span>
      <span className='ExhibitStatusTooltipTitle__value'>
        {status.manifestId}
      </span>
    </ListItem>
    <ListItem disableGutters>
      <span>Last Updated:</span>
      <span className='ExhibitStatusTooltipTitle__value'>
        {DateTime.fromISO(status.updatedAt).toLocaleString(
          DateTime.DATETIME_SHORT_WITH_SECONDS
        )}
      </span>
    </ListItem>
  </List>
);
