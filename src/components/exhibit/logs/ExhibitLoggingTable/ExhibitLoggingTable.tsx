import { skipToken } from '@reduxjs/toolkit/query';
import { DateTime } from 'luxon';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FunctionComponent,
} from 'react';
import {
  type ExhibitHardwareComponentSummary,
  type ExhibitSoftwareComponentSummary,
} from '../../../../app/entities/exhibitComponents';
import {
  useGetComponentLogsQuery,
  type GetComponentLogsParameters,
  type LogEventType,
} from '../../../../app/services/logs';
import { LoggingTable } from '../../../LoggingTable';
import { LogLevelFilterSelect } from '../../../common/LogLevelFilterSelect';
import {
  RangePicker,
  defaultShortcut,
  type DateTimeRangeValue,
  type Shortcut,
} from '../../../common/RangePicker';
import { useExhibitComponentsList } from '../../common/hooks/useExhibitComponents';
import {
  ExhibitLogsComponentSelect,
  type ExhibitLogsComponentSelectValue,
} from '../ExhibitLogsComponentSelect';

export type ExhibitLoggingTableError = 'loading-error' | 'no-component' | '';

export interface ExhibitLoggingTableFilters {
  range?: DateTimeRangeValue;
  eventTypes?: LogEventType[];
  components?: ExhibitLogsComponentSelectValue;
  setEventTypes?: (value: Array<LogEventType>) => void;
  setRange?: (value: DateTimeRangeValue) => void;
  setComponents?: (value: ExhibitLogsComponentSelectValue) => void;
}

const DEFAULT_EVENT_TYPES: Array<LogEventType> = [
  'info',
  'warn',
  'error',
  'debug',
] as const;

const DEFAULT_RANGE: DateTimeRangeValue = [
  DateTime.now().minus({ days: 1 }),
  undefined,
];

export interface ExhibitLoggingTableProps {
  exhibitId: number;
  onLoading?: (loading: boolean) => void;
  onError?: (error: ExhibitLoggingTableError) => void;
  filters?: ExhibitLoggingTableFilters;
}

export const ExhibitLogTable: FunctionComponent<ExhibitLoggingTableProps> = ({
  exhibitId,
  onLoading = () => {},
  onError = () => {},
  filters,
}) => {
  const {
    components: exhibitComponents,
    isError: isExhibitComponentsError,
    isLoading: areExhibitComponentsLoading,
  } = useExhibitComponentsList(exhibitId);

  const { softwareQuery, hardwareQuery } = useMemo(() => {
    if (
      areExhibitComponentsLoading ||
      isExhibitComponentsError ||
      !exhibitComponents
    ) {
      const emptyQueries = { softwareQuery: [], hardwareQuery: [] };
      return emptyQueries;
    }

    const softwareComponents = exhibitComponents.filter(
      (component) => component.category === 'software'
    ) as Array<ExhibitSoftwareComponentSummary>;

    const hardwareComponents = exhibitComponents.filter(
      (component) => component.category === 'hardware'
    ) as Array<ExhibitHardwareComponentSummary>;

    return {
      softwareQuery: softwareComponents,
      hardwareQuery: hardwareComponents,
    };
  }, [
    exhibitComponents,
    areExhibitComponentsLoading,
    isExhibitComponentsError,
  ]);

  const exhibitHardwareIds = useMemo(() => {
    return hardwareQuery.map((item) => item.componentId) ?? [];
  }, [hardwareQuery]);

  const exhibitSoftwareIds = useMemo(() => {
    return softwareQuery.map((item) => item.componentId) ?? [];
  }, [softwareQuery]);

  const exhibitComponentCount = useMemo(() => {
    return exhibitHardwareIds.length + exhibitSoftwareIds.length;
  }, [exhibitHardwareIds, exhibitSoftwareIds]);

  const internalEventTypes = useMemo(() => {
    if (filters?.eventTypes?.length) {
      return filters.eventTypes;
    }

    return DEFAULT_EVENT_TYPES;
  }, [filters?.eventTypes]);

  const isEventTypeSet = useCallback(
    (type: LogEventType) => {
      return internalEventTypes.includes(type);
    },
    [internalEventTypes]
  );

  const [appliedRangeShortcut, setAppliedRangeShortcut] = useState<Shortcut>(
    () => {
      const [start, end] = filters?.range ?? [];
      if (start || end) {
        return null;
      }

      return defaultShortcut;
    }
  );

  const internalRange = useMemo(() => {
    const [startRangeParam, endRangeParam] = filters?.range ?? [];

    if (startRangeParam || endRangeParam) {
      return filters?.range;
    }

    if (appliedRangeShortcut) {
      const shortcutValue = appliedRangeShortcut.getValue({
        isValid: () => true,
      });

      return shortcutValue;
    }

    return DEFAULT_RANGE;
  }, [filters?.range, appliedRangeShortcut]);

  const internalSelectedComponentIds = useMemo(() => {
    // If there aren't any components selected, use all components
    const filteredHardwareIds = filters?.components?.hardwareIds ?? [];
    const filteredSoftwareIds = filters?.components?.softwareIds ?? [];
    const filteredComponentCount =
      filteredHardwareIds.length + filteredSoftwareIds.length;

    if (!filteredComponentCount) {
      return {
        hardwareIds: exhibitHardwareIds,
        softwareIds: exhibitSoftwareIds,
      };
    }

    return filters?.components ?? { hardwareIds: [], softwareIds: [] };
  }, [filters?.components, exhibitHardwareIds, exhibitSoftwareIds]);

  const logsQueryParams: GetComponentLogsParameters | typeof skipToken =
    useMemo(() => {
      if (areExhibitComponentsLoading || isExhibitComponentsError) {
        return skipToken;
      }

      const [internalRangeStart, internalRangeEnd] = internalRange ?? [
        DateTime.now().minus({ days: 1 }),
        undefined,
      ];

      return {
        start: internalRangeStart?.valueOf() ?? 0,
        end: internalRangeEnd?.valueOf(),
        info: isEventTypeSet('info'),
        debug: isEventTypeSet('debug'),
        warn: isEventTypeSet('warn'),
        error: isEventTypeSet('error'),
        componentIds: [
          ...internalSelectedComponentIds.hardwareIds,
          // unless a componentId is specified, the new logging component endpoint returns all logs
          // associated with the exhibitId. Hence, we need to supply a componentId for the software
          // in the case that only the software component is selected in the filter
          ...internalSelectedComponentIds.softwareIds.map((id) =>
            id.toString()
          ),
        ],
        exhibitIds: [exhibitId],
        hardwareIds: [],
      };
    }, [
      areExhibitComponentsLoading,
      isExhibitComponentsError,
      internalRange,
      isEventTypeSet,
      internalSelectedComponentIds,
      exhibitId,
    ]);

  const logsQuery = useGetComponentLogsQuery(logsQueryParams, {
    refetchOnMountOrArgChange: true,
  });

  const isLoading = useMemo(() => {
    return (
      logsQuery.isLoading || logsQuery.isFetching || areExhibitComponentsLoading
    );
  }, [logsQuery.isLoading, logsQuery.isFetching, areExhibitComponentsLoading]);
  useEffect(() => onLoading(isLoading), [isLoading, onLoading]);

  const error: ExhibitLoggingTableError = useMemo(() => {
    if (logsQuery.isError || isExhibitComponentsError) {
      return 'loading-error';
    }

    if (!isLoading && !exhibitComponents?.length) {
      return 'no-component';
    }

    return '';
  }, [
    logsQuery.isError,
    isExhibitComponentsError,
    isLoading,
    exhibitComponents?.length,
  ]);

  useEffect(() => onError(error), [error, onError]);

  const loggingTableMessage = useMemo(() => {
    if (logsQuery.data?.logs.length === 0 && !logsQuery.isLoading) {
      return 'No logs available';
    }

    return '';
  }, [logsQuery.data, logsQuery.isLoading]);

  const minDateTime: DateTime | undefined = useMemo(() => {
    const timestamp =
      softwareQuery?.find((software) => software.componentId === exhibitId)
        ?.createdAt ?? '0';

    if (timestamp) {
      return DateTime.fromISO(timestamp);
    }

    return undefined;
  }, [softwareQuery, exhibitId]);

  const handleRangeChange = useCallback(
    (newRange: DateTimeRangeValue) => {
      filters?.setRange?.(newRange);
      setAppliedRangeShortcut(null);
    },
    [filters]
  );

  const handleApplyRangeShortcutChange = useCallback(
    (shortcut: Shortcut) => {
      if (shortcut) {
        const shortcutValue = shortcut.getValue({ isValid: () => true });
        filters?.setRange?.(shortcutValue);
      }

      setAppliedRangeShortcut(shortcut);
    },
    [filters, setAppliedRangeShortcut]
  );

  return (
    <>
      <div className='ExhibitLoggingTable__toolbar'>
        <RangePicker
          onChange={handleRangeChange}
          value={internalRange}
          appliedShortcut={appliedRangeShortcut}
          onApplyShortcut={handleApplyRangeShortcutChange}
          minDateTime={minDateTime}
          disabled={isLoading}
        />
        <div className='ExhibitLoggingTable__toolbar__right'>
          {exhibitComponentCount > 1 && (
            <ExhibitLogsComponentSelect
              hardware={hardwareQuery}
              software={softwareQuery}
              value={filters?.components}
              onChange={filters?.setComponents}
              initialValue={{ hardwareIds: [], softwareIds: [] }}
              disabled={isLoading}
              menuPosition='right'
            />
          )}
          <LogLevelFilterSelect
            initialValue={[]}
            onChange={filters?.setEventTypes}
            value={filters?.eventTypes}
            disabled={isLoading}
            menuPosition='right'
          />
        </div>
      </div>
      <div className='ExhibitLoggingTable__tableWrapper'>
        <LoggingTable
          logs={logsQuery.data?.logs}
          loading={isLoading}
          errorMessage={loggingTableMessage}
          hardware={hardwareQuery}
          software={softwareQuery}
        />
      </div>
    </>
  );
};
