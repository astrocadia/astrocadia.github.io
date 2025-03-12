import { FunctionComponent, useMemo, useState } from 'react';
import { DateTime } from 'luxon';
import { skipToken } from '@reduxjs/toolkit/query';
import { DatePickerBar } from '../../common/DatePickerBar/DatePickerBar';
import { startOf } from '../../../utils/date';
import { DatePeriod } from '../../common/DateControl';
import {
  GetBulkChartDataParams,
  useGetBulkChartDataQuery,
  useGetCustomChartFormatQuery,
} from '../../../app/services/metrics';
import { getReportBucketingParameters } from '../../exhibit/metrics/common/chartUtils';
import { isNil } from '../../../utils/lang';
import { CustomChartComponent } from '../../exhibit/metrics/CustomChart/component';

interface CustomComparisonChartProps {
  chartId: number;
  exhibitIds: Array<number>;
  primaryExhibit: number;
}
export const CustomComparisonChart: FunctionComponent<
  CustomComparisonChartProps
> = ({ chartId, exhibitIds, primaryExhibit }) => {
  const [date, setDate] = useState<DateTime | null>(
    startOf(DateTime.now(), 'week')
  );
  const [period, setPeriod] = useState<DatePeriod>('week');

  const queryPayload: typeof skipToken | GetBulkChartDataParams =
    useMemo(() => {
      if (exhibitIds.length === 0 || isNil(chartId)) {
        return skipToken;
      }

      const bucketingParameters = getReportBucketingParameters(
        period,
        date !== null ? date : startOf(DateTime.now(), period)
      );

      return {
        ...bucketingParameters,
        chartId,
        exhibitIds,
        timezoneOffset: bucketingParameters.end
          ? new Date(bucketingParameters.end).getTimezoneOffset()
          : new Date().getTimezoneOffset(),
      };
    }, [exhibitIds, chartId, period, date]);

  const { data: chartConfiguration, isLoading: isConfigLoading } =
    useGetCustomChartFormatQuery(
      !isNil(primaryExhibit) && !isNil(chartId)
        ? {
            exhibitId: primaryExhibit,
            chartId,
          }
        : skipToken
    );
  const comparisonChartConfiguration = useMemo(() => {
    if (chartConfiguration) {
      const { ...newChartConfiguration } = chartConfiguration;
      newChartConfiguration.graphType = 'stackedBar';
      newChartConfiguration.metricsCards = [];
      return newChartConfiguration;
    }
    return undefined;
  }, [chartConfiguration]);
  const { data: chartData, isLoading: isDataLoading } =
    useGetBulkChartDataQuery(queryPayload);
  const sortedChartData = useMemo(() => {
    if (chartData) {
      return [...chartData.chartsData].sort((a, b) => {
        return a.exhibitId - b.exhibitId;
      });
    }
    return undefined;
  }, [chartData]);
  return (
    <>
      <DatePickerBar
        DateControlProps={{
          disableDay: true,
        }}
        maxDate={DateTime.now()}
        onChange={setDate}
        onPeriodChange={setPeriod}
        period={period}
        value={date}
      />
      <CustomChartComponent
        isConfigLoading={isConfigLoading}
        isDataLoading={isDataLoading}
        chartConfiguration={comparisonChartConfiguration}
        comparisonChartData={sortedChartData}
        period={period}
      />
    </>
  );
};
