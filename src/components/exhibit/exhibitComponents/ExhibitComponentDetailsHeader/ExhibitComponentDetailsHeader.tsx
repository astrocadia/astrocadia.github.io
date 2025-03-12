import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import cx from 'classnames';
import { type FunctionComponent, useMemo } from 'react';
import { type ExhibitComponentSummary } from '../../../../app/entities/exhibitComponents';
import { ComponentDetailsHeader } from '../../../ComponentDetailsHeader';
import { DetailTable, type DetailTableProps } from '../../../DetailTable';
import { IconAccordion } from '../../../IconAccordion/IconAccordion';
import { IconAccordionDetails } from '../../../IconAccordionDetails/IconAccordionDetails';
import { Badge } from '../../../common/badges';
import { HardwareComponentIcon } from '../../../common/icons/HardwareComponentIcon';
import { SoftwareComponentIcon } from '../../../common/icons/SoftwareComponentIcon';
import { ExhibitComponentConnectedIcon } from '../ExhibitComponentConnectedIcon';
import {
  getConnectedStatusLabel,
  getElapsedTime,
  getImageSource,
} from '../utils';
import './ExhibitComponentDetailsHeader.css';

export interface ExhibitComponentDetailsHeaderProps
  extends Omit<ExhibitComponentSummary, 'createdAt' | 'order'> {
  tick: Date;
  className?: string;
  connectionData?: DetailTableProps['data'];
  infoData?: DetailTableProps['data'];
}

export const ExhibitComponentDetailsHeader: FunctionComponent<
  ExhibitComponentDetailsHeaderProps
> = ({
  name,
  category,
  type,
  connected,
  connectedChangedAt,
  tick,
  className,
  connectionData,
  infoData,
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
    <ComponentDetailsHeader
      className={cx('ExhibitComponentDetailsHeader', className)}
      mainImageProps={{
        src: imgSrc,
        alt: type,
      }}
      title={name}
      subtitleIcon={
        category === 'software' ? (
          <SoftwareComponentIcon />
        ) : (
          <HardwareComponentIcon />
        )
      }
      subtitle={category === 'software' ? 'Custom Software' : 'Custom Hardware'}
    >
      <IconAccordion
        icon={
          <ExhibitComponentConnectedIcon
            connected={connected}
            connectedChangedAt={connectedChangedAt}
          />
        }
        label={connectedStatusLabel}
      >
        {connectionData && (
          <IconAccordionDetails>
            <DetailTable data={connectionData} />
          </IconAccordionDetails>
        )}
      </IconAccordion>
      {infoData && (
        <IconAccordion
          icon={<Badge Icon={InfoOutlinedIcon} variant='circle' />}
          label='Info'
        >
          <IconAccordionDetails>
            <DetailTable data={infoData} />
          </IconAccordionDetails>
        </IconAccordion>
      )}
    </ComponentDetailsHeader>
  );
};
