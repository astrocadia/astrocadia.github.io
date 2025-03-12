import cx from 'classnames';
import { useMemo, type FunctionComponent } from 'react';
import { type ExhibitComponentSummary } from '../../../../app/entities/exhibitComponents';
import { EntityCard, type EntityCardProps } from '../../../EntityCard';
import { HardwareComponentIcon } from '../../../common/icons/HardwareComponentIcon';
import { SoftwareComponentIcon } from '../../../common/icons/SoftwareComponentIcon';
import {
  getConnectedStatusLabel,
  getElapsedTime,
  getImageSource,
} from '../utils';
import './ExhibitComponentCard.css';
import { ExhibitComponentConnectedIcon } from '../ExhibitComponentConnectedIcon';

export interface ExhibitComponentCardProps
  extends Omit<ExhibitComponentSummary, 'createdAt' | 'order'>,
    Pick<EntityCardProps, 'onClick' | 'selected'> {
  tick: Date;
  className?: string;
}

export const ExhibitComponentCard: FunctionComponent<
  ExhibitComponentCardProps
> = ({
  category,
  className,
  connected,
  connectedChangedAt,
  name,
  onClick,
  selected,
  tick,
  type,
}) => {
  const elapsedTimeString: string | null = useMemo(
    () => getElapsedTime(tick, connectedChangedAt),
    [tick, connectedChangedAt]
  );

  const connectedStatusLabel = useMemo(
    () => getConnectedStatusLabel(connected, elapsedTimeString),
    [connected, elapsedTimeString]
  );

  const imgSrc = useMemo(() => getImageSource(type), [type]);

  return (
    <EntityCard
      CardHeaderIcon={
        category === 'software' ? (
          <SoftwareComponentIcon />
        ) : (
          <HardwareComponentIcon />
        )
      }
      label={name}
      bannerImageProps={{
        src: imgSrc,
        alt: type,
      }}
      className={cx(
        'ExhibitComponentCard',
        {
          ExhibitComponetCard__svg:
            type === ('custom-application' || 'os-monitor'),
        },
        className
      )}
      onClick={onClick}
      selected={selected}
    >
      <div className='ExhibitComponentCard__content'>
        <ExhibitComponentConnectedIcon
          connected={connected}
          connectedChangedAt={connectedChangedAt}
        />
        {connectedStatusLabel}
      </div>
    </EntityCard>
  );
};
