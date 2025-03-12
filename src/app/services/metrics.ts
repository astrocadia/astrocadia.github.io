import { api, getHTTPEndpoint } from './api';

export interface InteractionDataPoint {
  time: string;
  interactions: number;
}

export interface InteractionData {
  totalInteractions: number;
  averageInteractionDuration: number;
  totalInteractionDuration: number;
  data: Array<InteractionDataPoint>;
}

export interface InteractionDataGetResponse {
  interactionData: InteractionData;
}

export type ReportTimeUnit = 'hour' | 'day' | 'week' | 'month';

export interface GetInteractionParams {
  end?: string; // ISO Date string
  buckets: number;
  exhibitIds: Array<number>;
  timezoneOffset: number;
  reportType: ReportTimeUnit;
}

export interface ListChartsParams {
  exhibitId: number;
}

export interface CustomChartSummary {
  name: string;
  chartId: number;
  type: 'custom';
}

export interface ChartSummary {
  name: string;
  type: 'presence' | 'visitors' | 'interactions';
}

export type ChartList = Array<ChartSummary | CustomChartSummary>;

export interface ListChartsResponse {
  charts: ChartList;
}

export interface CustomChartId {
  exhibitId: number;
  chartId: number;
}

export type GetCustomChartFormatParams = CustomChartId;

export type MetricsCardDataType = 'number' | 'int' | 'duration' | 'text';

export interface MetricsCardConfiguration {
  title: string;
  metricScope: 'period' | 'bucket' | 'session' | 'user'; // Determines whether the subtitle should be 'In Selected Period' or 'Per Day/Hour/Week'
  dataType: MetricsCardDataType;
  datasetName?: string;
  unit?: string;
}

export interface ChartConfiguration {
  graphType: 'stackedBar' | 'groupedBar';
  metricsCards: Array<MetricsCardConfiguration>;
  chartOptions?: {
    hiddenLegend?: boolean;
    yAxisOptions?: 'count' | 'duration';
    topNDatasets?: number;
  };
}

export interface GetCustomChartFormatResponse {
  chartConfiguration: ChartConfiguration;
}

export interface GetCustomChartDataParams extends CustomChartId {
  end?: string; // ISO Date string
  buckets: number;
  timezoneOffset: number;
  reportType: ReportTimeUnit;
}

export interface GetPresenceAnalyticsDataParams {
  exhibitId: number;
  binType: ReportTimeUnit;
  start?: string; // ISO Date string
  endTime?: string; // ISO Date string
  buckets: number;
  timeZone: string;
  version?: string;
}
export interface GetComparableExhibitsParams {
  exhibitId: number;
  siteId: number;
}

export interface ListPresenceAnalyticsVersionsParams {
  exhibitId: number;
}

export interface ListPresenceAnalyticsVersionsResponse {
  versions: Array<string>;
}

export interface GetBulkChartDataParams
  extends Omit<GetCustomChartDataParams, 'exhibitId'> {
  exhibitIds: Array<number>;
}

export interface GetVisitorsDataParams {
  exhibitId: number;
  binType: ReportTimeUnit;
  start?: string; // ISO Date string
  endTime?: string; // ISO Date string
  buckets: number;
  timeZone: string;
  version?: string;
}

export type ChartColor =
  | 'pink'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple';

export interface DatasetConfiguration {
  name: string; // For easy matching when the data arrives and to show in the legend
  hue: ChartColor;
}

export interface CustomChartDataPoint {
  datasetName: string;
  value: number;
}

export interface CustomChartBucket {
  label: string; // Expected to be ISO Date string. If these are ever not Dates, we need to update this object and the CustomChartComponent to allow for configurable bucket label parsing.
  data: Array<CustomChartDataPoint>;
}

export type CustomChartCardValueResponse =
  | number
  | string
  | Array<string>
  | null;

export interface CustomTooltipDataPoints {
  label: string;
  value: string | number;
}
export interface CustomChartData {
  cardValues: Array<CustomChartCardValueResponse>;
  datasets: Array<DatasetConfiguration>;
  buckets: Array<CustomChartBucket>;
  tooltipData?: Array<Array<CustomTooltipDataPoints>>;
}

export interface BulkCustomChartData {
  chartData: CustomChartData;
  exhibitId: number;
}

export interface PresenceAnalyticDataEntry {
  time: string;
  occupancy: number;
  activityScore: number | null;
  activityScoreAllTime: number | null;
}
export interface PresenceAnalyticData {
  averageActivityScore: number;
  data: Array<PresenceAnalyticDataEntry>;
}

export type ComparableChartSummary = Pick<
  CustomChartSummary,
  'name' | 'chartId'
>;
export interface ComparableExhibitSummary {
  exhibitId: number;
  charts: Array<ComparableChartSummary>;
}
export interface ComparableExhibitsInSiteResponse {
  comparableExhibits: Array<ComparableExhibitSummary>;
}

export interface VisitorsDataEntry {
  time: string;
  dwellCount: number;
  passerbyCount: number;
}

export interface VisitorsData {
  averageActivityScore: number;
  averageVisitorCount: number;
  averageDwellCount: number;
  dwellRate: number;
  data: Array<VisitorsDataEntry>;
}

export interface GetCustomChartDataResponse {
  chartData: CustomChartData;
}
export interface GetBulkChartDataResponse {
  chartsData: Array<BulkCustomChartData>;
}

export const exhibitMetricsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getInteractions: build.query<InteractionData, GetInteractionParams>({
      query: (body) => ({
        url: `${getHTTPEndpoint(
          'reporting'
        )}/reporting/metrics/chart/data/interaction`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: InteractionDataGetResponse) =>
        response.interactionData,
    }),
    listCharts: build.query<ChartList, ListChartsParams>({
      query: ({ exhibitId }) => ({
        url: `${getHTTPEndpoint('reporting')}/reporting/analytics/charts/${exhibitId}`,
        method: 'GET',
      }),
      transformResponse: (response: ListChartsResponse) => response.charts,
    }),
    getCustomChartFormat: build.query<
      ChartConfiguration,
      GetCustomChartFormatParams
    >({
      query: ({ exhibitId, chartId }) => ({
        url: `${getHTTPEndpoint(
          'reporting'
        )}/reporting/custom-chart/${exhibitId}/chart-format/${chartId}`,
        method: 'GET',
      }),
      transformResponse: (response: GetCustomChartFormatResponse) =>
        response.chartConfiguration,
    }),
    getCustomChartData: build.query<CustomChartData, GetCustomChartDataParams>({
      query: ({ exhibitId, chartId, ...body }) => ({
        url: `${getHTTPEndpoint(
          'reporting'
        )}/reporting/custom-chart/${exhibitId}/chart-data/${chartId}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: GetCustomChartDataResponse) =>
        response.chartData,
    }),
    getPresenceAnalyticsData: build.query<
      PresenceAnalyticData,
      GetPresenceAnalyticsDataParams
    >({
      query: ({ exhibitId, ...params }) => ({
        url: `${getHTTPEndpoint('reporting')}/reporting/presence-analytics/data/${exhibitId}`,
        method: 'GET',
        params,
      }),
    }),
    getComparableExhibits: build.query<
      ComparableExhibitsInSiteResponse,
      GetComparableExhibitsParams
    >({
      query: ({ exhibitId, siteId }) => ({
        url: `${getHTTPEndpoint('reporting')}/reporting/analytics/comparable/${siteId}/exhibit/${exhibitId}`,
        method: 'GET',
      }),
    }),
    getBulkChartData: build.query<
      GetBulkChartDataResponse,
      GetBulkChartDataParams
    >({
      query: ({ chartId, ...body }) => ({
        url: `${getHTTPEndpoint('reporting')}/reporting/custom-chart/bulk-chart-data/${chartId}`,
        method: 'PUT',
        body,
      }),
    }),
    getVisitorsData: build.query<VisitorsData, GetVisitorsDataParams>({
      query: ({ exhibitId, ...params }) => ({
        url: `${getHTTPEndpoint('reporting')}/reporting/visitors/data/${exhibitId}`,
        method: 'GET',
        params,
      }),
    }),
    listPresenceAnalyticsVersions: build.query<
      ListPresenceAnalyticsVersionsResponse['versions'],
      ListPresenceAnalyticsVersionsParams
    >({
      query: ({ exhibitId }) => ({
        url: `${getHTTPEndpoint('reporting')}/reporting/presence-analytics/versions/${exhibitId}`,
        method: 'GET',
      }),
      transformResponse: (response: ListPresenceAnalyticsVersionsResponse) =>
        response.versions,
    }),
  }),
});

export const {
  useGetInteractionsQuery,
  useListChartsQuery,
  useGetCustomChartFormatQuery,
  useGetCustomChartDataQuery,
  useGetPresenceAnalyticsDataQuery,
  useGetComparableExhibitsQuery,
  useGetBulkChartDataQuery,
  useGetVisitorsDataQuery,
  useListPresenceAnalyticsVersionsQuery,
} = exhibitMetricsApi;
