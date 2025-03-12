import { DateTime } from 'luxon';
import { useMemo, type FunctionComponent } from 'react';
import { ExhibitHardwareComponentDetails } from '../../../../../../app/entities/exhibitComponents';
import { formatDateTime } from '../../../../../../utils/date';
import type { DetailTableProps } from '../../../../../DetailTable';
import { useInterval } from '../../../../../common/hooks/useInterval';
import { ExhibitComponentDetailsHeader } from '../../../ExhibitComponentDetailsHeader';

export interface CustomHardwareComponentStatusProps {
  exhibitId: number;
  component: ExhibitHardwareComponentDetails;
}

export const CustomHardwareComponentStatus: FunctionComponent<
  CustomHardwareComponentStatusProps
> = ({ exhibitId, component }) => {
  const tick = useInterval();

  const connectionData: DetailTableProps['data'] = useMemo(() => {
    if (component) {
      let connectedDisplayValue;
      if (component.connectedChangedAt) {
        const dateTimeStr = formatDateTime(
          DateTime.fromISO(component.connectedChangedAt),
          {
            hideMilliseconds: true,
          }
        );
        const lastSpaceIndex = dateTimeStr.lastIndexOf(' ');
        const dateTimeFirstPart = dateTimeStr.slice(0, lastSpaceIndex);
        const dateTimeSecondPart = dateTimeStr.slice(lastSpaceIndex + 1);
        connectedDisplayValue = (
          <>
            {dateTimeFirstPart} <br /> {dateTimeSecondPart}
          </>
        );
      }

      return [
        {
          label:
            component.connected || !connectedDisplayValue
              ? 'Connected'
              : 'Disconnected',
          value: connectedDisplayValue || '—',
        },
        {
          label: 'Runtime',
          value: false || '—',
        },
        {
          label: 'TLS Encryption',
          value: false || '—',
        },
      ];
    }
    return undefined;
  }, [component]);

  const infoData: DetailTableProps['data'] = useMemo(() => {
    if (component) {
      const dateTimeStr = formatDateTime(
        DateTime.fromISO(component.createdAt),
        {
          hideMilliseconds: true,
        }
      );
      const lastSpaceIndex = dateTimeStr.lastIndexOf(' ');
      const dateTimeFirstPart = dateTimeStr.slice(0, lastSpaceIndex);
      const dateTimeSecondPart = dateTimeStr.slice(lastSpaceIndex + 1);

      return [
        {
          label: 'IP',
          value: component.ip || '—',
        },
        {
          label: 'MAC',
          value: component.mac || '—',
        },
        {
          label: 'Version',
          value: false || '—',
        },
        {
          label: 'Created',
          value: (
            <>
              {dateTimeFirstPart} <br /> {dateTimeSecondPart}
            </>
          ),
        },
      ];
    }
    return undefined;
  }, [component]);

  return component ? (
    <ExhibitComponentDetailsHeader
      name={component.name}
      type='custom-hardware'
      category='hardware'
      connected={component.connected}
      connectedChangedAt={component.connectedChangedAt}
      tick={tick}
      connectionData={connectionData}
      infoData={infoData}
      exhibitId={exhibitId}
      componentId={component.componentId}
    />
  ) : null;
};
