import { FunctionComponent } from 'react';
import { IndividualStatus } from '../../../app/entities/exhibitManifest';
import { isNil } from '../../../utils/lang';
import { LinkDecorator } from '../../common/LinkDecorator';
import { ListItem } from '../../common/ListItem';
import { useMobileMediaQuery } from '../../common/hooks/useMobileMediaQuery';
import './ExhibitStatusItem.css';
import { ExhibitStatusTooltip } from './ExhibitStatusTooltip';

interface ExhibitStatusItemProps {
  status: IndividualStatus;
}

export const ExhibitStatusItem: FunctionComponent<ExhibitStatusItemProps> = ({
  status,
}) => {
  const mobile = useMobileMediaQuery();

  const displayComponent = (
    <span className='ExhibitStatusItem__statusDisplay'>{status.display}</span>
  );

  const valueComponent = (
    <LinkDecorator className='ExhibitStatusItem__link'>
      <span className='ExhibitStatusItem__statusValue'>
        {isNil(status.value) || status.value === '' ? '-' : status.value}
      </span>
    </LinkDecorator>
  );

  return (
    <ListItem className='ExhibitStatusItem'>
      {!mobile && (
        <>
          <div className='ExhibitStatusItem__horizontalChildren'>
            <ExhibitStatusTooltip status={status}>
              {displayComponent}
            </ExhibitStatusTooltip>
          </div>
          <div className='ExhibitStatusItem__horizontalChildren'>
            <ExhibitStatusTooltip status={status}>
              {valueComponent}
            </ExhibitStatusTooltip>
          </div>
        </>
      )}
      {mobile && (
        <ExhibitStatusTooltip
          className='ExhibitStatusItem__veriticalChildren'
          status={status}
          followCursor={false}
        >
          {displayComponent}
          {valueComponent}
        </ExhibitStatusTooltip>
      )}
    </ListItem>
  );
};
