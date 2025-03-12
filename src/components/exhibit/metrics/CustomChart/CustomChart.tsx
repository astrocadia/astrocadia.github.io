import { skipToken } from '@reduxjs/toolkit/query/react';
import { FunctionComponent, useMemo } from 'react';
import { DateTime } from 'luxon';
import {
  useGetCustomChartDataQuery,
  useGetCustomChartFormatQuery,
  type CustomChartId,
  type GetCustomChartDataParams,
} from '../../../../app/services/metrics';
import { CustomChartComponent } from './component';
import { isNil } from '../../../../utils/lang';
import { getReportBucketingParameters } from '../common/chartUtils';
import type { DatePeriod } from '../../../common/DateControl';
import { useGetExhibitQuery } from '../../../../app/services/exhibit';

interface CustomChartProps extends CustomChartId {
  start: DateTime;
  period: DatePeriod;
}
export const CustomChart: FunctionComponent<CustomChartProps> = ({
  chartId,
  exhibitId,
  start,
  period,
}) => {
  const { data: exhibit } = useGetExhibitQuery({ exhibitId });
  const queryPayload: typeof skipToken | GetCustomChartDataParams =
    useMemo(() => {
      if (isNil(exhibitId) || isNil(chartId) || !exhibit) {
        return skipToken;
      }

      const bucketingParameters = getReportBucketingParameters(period, start);

      // TODO: This should be refactored into a utils function
      // calcualate timezone offset based on exhibit
      const dt = DateTime.fromJSDate(
        bucketingParameters.end ? new Date(bucketingParameters.end) : new Date()
      ).setZone(exhibit.timeZone || 'America/New_York');

      // Luxon's offset is backwards from what we need
      const timezoneOffset = -dt.offset;

      return {
        ...bucketingParameters,
        chartId,
        exhibitId,
        timezoneOffset,
      };
    }, [exhibitId, chartId, exhibit, period, start]);

  const { data: chartConfiguration, isLoading: isConfigLoading } =
    useGetCustomChartFormatQuery(
      !isNil(exhibitId) && !isNil(chartId)
        ? {
            exhibitId,
            chartId,
          }
        : skipToken
    );

  const { data: chartData, isLoading: isDataLoading } =
    useGetCustomChartDataQuery(queryPayload);

  return (
    <CustomChartComponent
      isConfigLoading={isConfigLoading}
      isDataLoading={isDataLoading}
      chartConfiguration={chartConfiguration}
      chartData={chartData}
      period={period}
    />
  );
};
