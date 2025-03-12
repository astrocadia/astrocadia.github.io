import type { DateTime } from 'luxon';
import { useCallback, useMemo } from 'react';
import type { LogEventType } from '../../../../../app/services/logs';
import type { DateTimeRangeValue } from '../../../../common/RangePicker';
import type { ExhibitLogsComponentSelectValue } from '../../ExhibitLogsComponentSelect';
import type { ExhibitLoggingTableFilters } from '../ExhibitLoggingTable';
import { useSearchParamState } from './useSearchParamState';

const SEARCH_PARAMS = {
  Events: 'events',
  Hardware: 'hardware',
  Software: 'software',
  StartTime: 'start',
  EndTime: 'end',
} as const;

/**
 * Hook to manage the search param filters for the exhibit logging table and stores the values
 * in the URL search params.
 */
export const useExhibitLoggingTableSearchParamFilters =
  (): ExhibitLoggingTableFilters => {
    const params = useSearchParamState();

    const eventTypes: Array<LogEventType> = useMemo(() => {
      return params.getArray(SEARCH_PARAMS.Events) as Array<LogEventType>;
    }, [params]);

    const setEventTypes = useCallback(
      (value: Array<LogEventType>) => {
        params.setArray(SEARCH_PARAMS.Events, value.filter(Boolean));
      },
      [params]
    );

    const startDate: DateTime | undefined = useMemo(() => {
      return params.getDateTime(SEARCH_PARAMS.StartTime) ?? undefined;
    }, [params]);

    const endDate: DateTime | undefined = useMemo(() => {
      return params.getDateTime(SEARCH_PARAMS.EndTime) ?? undefined;
    }, [params]);

    const range: DateTimeRangeValue = useMemo(() => {
      return [startDate, endDate];
    }, [startDate, endDate]);

    const setRange = useCallback(
      (value: DateTimeRangeValue) => {
        const [start, end] = value;

        params.setDateTime(SEARCH_PARAMS.StartTime, start ?? null, {
          skipNavigate: true,
        });
        params.setDateTime(SEARCH_PARAMS.EndTime, end ?? null);
      },
      [params]
    );

    const components: ExhibitLogsComponentSelectValue = useMemo(() => {
      const hardwareIds = params.getArray(SEARCH_PARAMS.Hardware) ?? [];
      const softwareIds = params.getArray(SEARCH_PARAMS.Software) ?? [];

      return {
        hardwareIds,
        softwareIds,
      };
    }, [params]);

    const setComponents = useCallback(
      (value: ExhibitLogsComponentSelectValue) => {
        // Remove empty values
        params.setArray(SEARCH_PARAMS.Hardware, value.hardwareIds ?? [], {
          skipNavigate: true,
        });
        params.setArray(SEARCH_PARAMS.Software, value.softwareIds ?? []);
      },
      [params]
    );

    return {
      range,
      eventTypes,
      components,
      setEventTypes,
      setRange,
      setComponents,
    };
  };
