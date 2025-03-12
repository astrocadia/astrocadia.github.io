import { api, getHTTPEndpoint } from './api';
import type { SuccessResponse } from './common/responses';

export type LogEventType = 'info' | 'warn' | 'error' | 'debug';

export interface Log {
  event_type: LogEventType;
  timestamp: number;
  exhibitId: number;
}

export interface ExhibitLog extends Log {
  log: {
    message: string;
  };
}

export interface HardwareLog extends Log {
  componentId: string;
  log: {
    message: {
      message: string;
    };
  };
}

export type LogType = ExhibitLog | HardwareLog;

export interface GetComponentLogsParameters {
  /** Start timestamp to filter logs from. ISO format */
  start: number;
  /** The exhibit ID to filter logs from. */
  exhibitIds: Array<number>;
  /** The hardware IDs to filter logs from. */
  componentIds: Array<string>;
  /** End timestamp to filter logs from. */
  end?: number;
  /** The current page index. */
  pageIdx?: number;
  /** Logs to display per page. */
  logsPerPage?: number;
  /** Whether to return info-type logs. @default false */
  info?: boolean;
  /** Whether to return warn-type logs. @default false */
  warn?: boolean;
  /** Whether to return error-type logs. @default false */
  error?: boolean;
  /** Whether to return debug-type logs. @default false */
  debug?: boolean;
}

export interface GetComponentLogsResponse extends SuccessResponse {
  numLogs: number;
  logs: Array<LogType>;
}

export const logApi = api.injectEndpoints({
  endpoints: (build) => ({
    getComponentLogs: build.query<
      GetComponentLogsResponse,
      GetComponentLogsParameters
    >({
      query: (params) => ({
        url: `${getHTTPEndpoint('log')}/logging/components/logs`,
        body: params,
        method: 'PUT',
      }),
    }),
  }),
});

export const { useGetComponentLogsQuery } = logApi;
