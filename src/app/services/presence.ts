import { api, getHTTPEndpoint } from './api';
import { SuccessResponse } from './common/responses';

export type DwellRateBucket = {
  // Full DateTime in an ISO string format
  time: string;
  impressions: number;
  dwells: number;
  dwellRate: number;
};

export type GetDwellRateParams = {
  hardwareIds: Array<number>;
  minimumDwellTime?: number;
  intervalSize?: string;
  intervalUnit?: string;
  intervals?: number;
  timezone?: string;
  end?: Date;
};

export interface DwellRateMetrics {
  totalImpressions: number;
  totalDwells: number;
  averageDwellRate: number;
  data: Array<DwellRateBucket>;
}

export interface DwellRateMetricsResponse
  extends SuccessResponse,
    DwellRateMetrics {}

export const presenceMetricsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getImpressions: build.query<DwellRateMetrics, GetDwellRateParams>({
      query: (body) => ({
        url: `${getHTTPEndpoint('presence')}/presence/metrics/dwell-rate`,
        method: 'PUT',
        body,
      }),
      transformResponse: (res: DwellRateMetricsResponse) => {
        const { response, ...rest } = res;
        return rest;
      },
    }),
  }),
});

export const { useGetImpressionsQuery } = presenceMetricsApi;
