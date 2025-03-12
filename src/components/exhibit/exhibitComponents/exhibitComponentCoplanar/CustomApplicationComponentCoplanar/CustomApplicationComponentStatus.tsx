import { DateTime } from 'luxon';
import { useMemo, type FunctionComponent } from 'react';
import { useGetExhibitQuery } from '../../../../../app/services/exhibit';
import { formatDateTime } from '../../../../../utils/date';
import type { DetailTableProps } from '../../../../DetailTable';
import { useInterval } from '../../../../common/hooks/useInterval';
import { ExhibitComponentDetailsHeader } from '../../ExhibitComponentDetailsHeader';

export interface CustomApplicationComponentStatusProps {
  exhibitId: number;
  componentId: number | string;
}

export const CustomApplicationComponentStatus: FunctionComponent<
  CustomApplicationComponentStatusProps
> = ({ exhibitId, componentId }) => {
  // NOTE: At some point this should probably be swapped out for an api that is specific to custom applications
  // but for now, exhibits and custom applications are one and the same.
  const { data: exhibit } = useGetExhibitQuery({ exhibitId });
  const tick = useInterval();

  const infoData: DetailTableProps['data'] = useMemo(() => {
    if (exhibit) {
      const dateTimeStr = formatDateTime(DateTime.fromISO(exhibit.createdAt), {
        hideMilliseconds: true,
      });
      const lastSpaceIndex = dateTimeStr.lastIndexOf(' ');
      const dateTimeFirstPart = dateTimeStr.slice(0, lastSpaceIndex);
      const dateTimeSecondPart = dateTimeStr.slice(lastSpaceIndex + 1);

      return [
        {
          label: 'IP & MQTT Port',
          value: exhibit.mqttPath || '—',
        },
        {
          label: 'SDK Version',
          value: exhibit.sdkVersion || '—',
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
  }, [exhibit]);

  return exhibit ? (
    <ExhibitComponentDetailsHeader
      name={exhibit.name}
      type='custom-application'
      category='software'
      connected={exhibit.online}
      connectedChangedAt={exhibit.lastOnlineChange}
      tick={tick}
      infoData={infoData}
      exhibitId={exhibitId}
      componentId={componentId}
    />
  ) : null;
};
