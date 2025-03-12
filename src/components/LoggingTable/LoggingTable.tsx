import cx from 'classnames';
import { DateTime } from 'luxon';
import {
  type FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ExhibitComponentSummary,
  ExhibitHardwareComponentSummary,
} from '../../app/entities/exhibitComponents';
import type { LogType } from '../../app/services/logs';
import {
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_TIMEZONE_OFFSET_FORMAT,
} from '../../utils/date';
import { Badge } from '../common/badges';
import { Fab } from '../common/Fab';
import { useIntersectionObserver } from '../common/hooks/useIntersectionObserver';
import { useMobileMediaQuery } from '../common/hooks/useMobileMediaQuery';
import {
  BackToTopIcon,
  HardwareComponentIcon,
  SoftwareComponentIcon,
} from '../common/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  type TableContainerProps,
  TableHead,
  TableRow,
} from '../common/table';
import { EventTypeIcon } from '../EventTypeIcon';
import './LoggingTable.css';
import { LoggingTableMessage } from './LoggingTableMessage';
import { LoggingTableSkeletonRow } from './LoggingTableSkeletonRow';

const SKELETON_ROW_COUNT = 30 as const;
const DEFAULT_INITIAL_DISPLAY_COUNT = 100 as const;

export type LoggingTableProps = {
  classNames?: string;
  errorMessage?: string;
  loading?: boolean;
  logs?: Array<LogType>;
  initialDisplayCount?: number;
  TableContainerProps?: TableContainerProps;
  hardware?: Array<ExhibitHardwareComponentSummary>;
  software?: Array<ExhibitComponentSummary>;
};

export const LoggingTable: FunctionComponent<LoggingTableProps> = ({
  classNames,
  errorMessage = '',
  initialDisplayCount = DEFAULT_INITIAL_DISPLAY_COUNT,
  loading = false,
  logs = [],
  TableContainerProps,
  hardware,
  software,
}) => {
  const firstRowRef = useRef<HTMLTableRowElement | null>(null);
  const loadingRef = useRef<HTMLTableRowElement | null>(null);

  const softwareById = useMemo(
    () => new Map(software?.map((item) => [item.componentId, item])),
    [software]
  );

  const hardwareById = useMemo(
    () => new Map(hardware?.map((item) => [item.componentId, item])),
    [hardware]
  );

  const getComponentName = useCallback(
    (log: LogType): string => {
      if ('componentId' in log) {
        const foundHardware = hardwareById.get(log.componentId);
        return foundHardware?.name ?? 'Unknown Hardware';
      }

      const foundSoftware = softwareById.get(log.exhibitId);
      return foundSoftware?.name ?? 'Unknown Software';
    },
    [hardwareById, softwareById]
  );

  const [isFirstRowVisible, setIsFirstRowVisible] = useState(true);
  const hasFab = useMemo(() => {
    return logs.length > 0 && !loading && !isFirstRowVisible;
  }, [isFirstRowVisible, loading, logs]);
  /** Returns firstRowRef or undefined. */
  const getRowRefOrUndefined = useCallback((index: number) => {
    if (index === 0) {
      return firstRowRef;
    }

    return undefined;
  }, []);

  useIntersectionObserver(
    firstRowRef,
    { root: null, rootMargin: '0px', threshold: 0.5 },
    (entry) => {
      if (entry.target === firstRowRef.current) {
        setIsFirstRowVisible(entry.isIntersecting);
      }
    }
  );

  const [visibleLogs, setVisibleLogs] = useState<Array<LogType>>([]);
  const hasMoreLogs = useMemo(
    () => logs.length > visibleLogs.length,
    [logs.length, visibleLogs.length]
  );

  useEffect(() => {
    setVisibleLogs(logs.slice(0, initialDisplayCount));
  }, [logs, initialDisplayCount]);

  // This can be used in the future to trigger a callback from the parent component
  // to fetch more logs when the user scrolls to the bottom of the table.
  useIntersectionObserver(
    loadingRef,
    { root: null, rootMargin: '0px', threshold: 0.5 },
    (entry) => {
      if (entry.isIntersecting && !loading) {
        setVisibleLogs(logs.slice(0, visibleLogs.length + initialDisplayCount));
      }
    }
  );

  // Headers are only supposed to be shown on desktop...
  const isMobile = useMobileMediaQuery();

  /**
   * Creates a formatted timestamp offset to display in table header.
   * @example 'Timestamp (UTC-4:00)'
   */
  const timestampColumnHeader = useMemo(() => {
    return `Timestamp (${DateTime.now().toFormat(DEFAULT_TIMEZONE_OFFSET_FORMAT)})`;
  }, []);

  const handleFabClick = useCallback(() => {
    if (firstRowRef.current) {
      firstRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);

  const formatTimestamp = useCallback((timestamp: number): string => {
    return DateTime.fromMillis(timestamp).toFormat(DEFAULT_DATE_TIME_FORMAT);
  }, []);

  return (
    <div className={cx('LoggingTable', classNames)}>
      <TableContainer
        className={cx({
          LoggingTable__noData: logs.length === 0 && !loading,
          LoggingTable__loading: loading,
        })}
        tabIndex={0}
        {...TableContainerProps}
      >
        <Table stickyHeader={!isMobile}>
          <TableHead>
            <TableRow>
              <TableCell className='LoggingTable__logLevelHeaderCell' />
              <TableCell className='LoggingTable__componentHeaderCell'>
                <span>Component</span>
              </TableCell>
              <TableCell className='LoggingTable__timestampHeaderCell'>
                <span>{timestampColumnHeader}</span>
              </TableCell>
              <TableCell className='LoggingTable__messageHeaderCell'>
                <span>Message</span>
              </TableCell>
              <TableCell
                className='LoggingTable__countHeaderCell'
                align='right'
              >
                {/* {logs.length > 0 && !loading && (
                  // TODO: Will make this dynamic in the future
                  <span>Showing 120 of 289 logs</span>
                )} */}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Skeleton Rows for Loading */}
            {loading &&
              Array.from({ length: SKELETON_ROW_COUNT }, (_, index) => (
                <LoggingTableSkeletonRow
                  className='LoggingTable__logRow'
                  key={index}
                />
              ))}
            {/* Log Rows */}
            {!loading &&
              visibleLogs.map((log, index) => (
                <TableRow
                  ref={getRowRefOrUndefined(index)}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={cx('LoggingTable__logRow', {
                    LoggingTable__errorRow: log.event_type === 'error',
                  })}
                  role='row'
                >
                  <TableCell className='LoggingTable__logLevelCell'>
                    <EventTypeIcon type={log.event_type} />
                  </TableCell>
                  <TableCell className='LoggingTable__componentCell'>
                    {/* Displayed desktop and above */}
                    <div className='LoggingTable__componentBadge'>
                      <Badge
                        Icon={
                          'componentId' in log
                            ? HardwareComponentIcon
                            : SoftwareComponentIcon
                        }
                        label={getComponentName(log)}
                      />
                    </div>
                    {/* Only displayed on mobile */}
                    <div className='LoggingTable__componentName'>
                      {getComponentName(log)}
                    </div>
                  </TableCell>
                  <TableCell className='LoggingTable__timestampCell'>
                    <div className='LoggingTable__timestampWrapper'>
                      {formatTimestamp(log.timestamp)}
                    </div>
                  </TableCell>
                  <TableCell className='LoggingTable__messageCell' colSpan={2}>
                    <div className='LoggingTable__messageWrapper'>
                      <LoggingTableMessage
                        message={
                          'componentId' in log
                            ? log.log.message.message
                            : log.log.message
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            {/* Loading Row */}
            {hasMoreLogs && (
              <LoggingTableSkeletonRow
                ref={loadingRef}
                key='loading'
                className='LoggingTable__logRow'
              />
            )}
          </TableBody>
        </Table>
        {!loading && errorMessage && (
          <div className='LoggingTable__errorMessage'>{errorMessage}</div>
        )}
      </TableContainer>
      {hasFab && (
        <Fab
          className='LoggingTable__fab'
          disableRipple
          onClick={handleFabClick}
          variant='extended'
        >
          <BackToTopIcon className='LoggingTable__backToTopIcon' />
          <div className='LoggingTable__backToTopLabel'>Back to Top</div>
        </Fab>
      )}
    </div>
  );
};
