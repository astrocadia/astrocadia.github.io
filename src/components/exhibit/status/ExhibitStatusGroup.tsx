import { useMemo, type FunctionComponent } from 'react';
import {
  IndividualStatus,
  type GroupStatus,
} from '../../../app/entities/exhibitManifest';
import './ExhibitStatusGroup.css';
import { ExhibitStatusItem } from './ExhibitStatusItem';
import { ActionTriggerCardList } from '../../common/ActionTriggerCardList';
import { sortStatuses } from './common/exhibitStatusUtils';

interface ExhibitStatusGroupProps {
  status: GroupStatus;
}

export const ExhibitStatusGroup: FunctionComponent<ExhibitStatusGroupProps> = ({
  status,
}) => {
  const sortedStatusArray: IndividualStatus[] = useMemo<IndividualStatus[]>(
    () => (status.items ? [...status.items] : []).sort(sortStatuses),
    [status.items]
  );

  return (
    <div className='ExhibitStatusGroup'>
      <ActionTriggerCardList key={status.id} title={status.display} />
      <div>
        {sortedStatusArray.map((item) => (
          <ExhibitStatusItem key={item.id} status={item} />
        ))}
      </div>
    </div>
  );
};
