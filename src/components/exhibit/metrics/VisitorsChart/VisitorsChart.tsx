import { skipToken } from '@reduxjs/toolkit/query/react';
import { DateTime } from 'luxon';
import { useMemo, type FunctionComponent } from 'react';
import {
  useGetVisitorsDataQuery,
  type GetVisitorsDataParams,
} from '../../../../app/services/metrics';
import { isNil } from '../../../../utils/lang';
import type { DatePeriod } from '../../../common/DateControl';
import { MetricsPanel } from '../../../common/MetricsPanel';
import { activityScoreDisplayGenerator } from '../../../common/PresenceTooltipContent/PresenceTooltipContent';
import { BarChart } from '../../../common/charts/BarChart';
import { getReportBucketingParameters } from '../common/chartUtils';
import { useGetExhibitQuery } from '../../../../app/services/exhibit';

interface VisitorsChartProps {
  exhibitId: number;
  start: DateTime;
  period: DatePeriod;
}

const dwellDefaultColor = 'rgba(186, 177, 238, 1)';
const dwellHoverColor = 'rgba(186, 177, 238, 1)';
const passerbyDefaultColor = 'rgba(186, 177, 238, 0.6)';
const passerbyHoverColor = 'rgba(186, 177, 238, 0.6)';
const defaultBucketCount = 10;

export const VisitorsChart: FunctionComponent<VisitorsChartProps> = ({
  exhibitId,
  start,
  period,
}) => {
  const { data: exhibit } = useGetExhibitQuery({ exhibitId });
  const queryPayload: typeof skipToken | GetVisitorsDataParams = useMemo(() => {
    if (isNil(exhibitId) || !exhibit) {
      return skipToken;
    }

    const bucketingParameters = getReportBucketingParameters(period, start);

    return {
      endTime:
        bucketingParameters.end === undefined
          ? undefined
          : DateTime.fromISO(bucketingParameters.end).toUTC().toString(),
      startTime: start.toUTC().toString() || undefined,
      buckets: bucketingParameters.buckets,
      binType: bucketingParameters.reportType,
      exhibitId,
      timeZone: exhibit.timeZone || 'America/New_York',
    };
  }, [exhibitId, exhibit, period, start]);

  const { data: visitorsData, isLoading } =
    useGetVisitorsDataQuery(queryPayload);

  const { dwellCount, passerbyCount, buckets } = useMemo(() => {
    const newDwellCount: Array<number> = [];
    const newBuckets: Array<string> = [];
    const newPasserbyCount: Array<number> = [];

    if (visitorsData && visitorsData.data) {
      visitorsData.data.forEach((dataPoint) => {
        newDwellCount.push(Math.round(dataPoint.dwellCount));
        newPasserbyCount.push(Math.round(dataPoint.passerbyCount));
        newBuckets.push(dataPoint.time);
      });
    }

    return {
      dwellCount: newDwellCount,
      passerbyCount: newPasserbyCount,
      buckets: newBuckets,
    };
  }, [visitorsData]);

  const averageVisitors = useMemo(() => {
    if (!isNil(visitorsData?.averageVisitorCount)) {
      if (visitorsData.averageVisitorCount > 1) {
        return Math.round(visitorsData.averageVisitorCount).toString();
      }

      return (
        Math.round(visitorsData.averageVisitorCount * 10) / 10
      ).toString();
    }

    return undefined;
  }, [visitorsData]);

  const averageDwells = useMemo(() => {
    if (!isNil(visitorsData?.averageDwellCount)) {
      if (visitorsData.averageDwellCount > 1) {
        return Math.round(visitorsData.averageDwellCount).toString();
      }

      return (Math.round(visitorsData.averageDwellCount * 10) / 10).toString();
    }

    return undefined;
  }, [visitorsData]);

  const dwellRate = useMemo(() => {
    if (!isNil(visitorsData?.dwellRate)) {
      return `${Math.round(visitorsData.dwellRate * 100).toString()}%`;
    }

    return undefined;
  }, [visitorsData]);

  const averageActivityScore = useMemo(() => {
    if (!isNil(visitorsData?.averageActivityScore)) {
      return (Math.round(visitorsData.averageActivityScore * 10) / 10).toFixed(
        1
      );
    }

    return undefined;
  }, [visitorsData]);

  const { activityIndexUnit, activityIndexIcon, textColor } = useMemo(
    () => activityScoreDisplayGenerator(visitorsData?.averageActivityScore),
    [visitorsData]
  );

  const averagePeriodLabel = useMemo(() => {
    switch (period) {
      case 'day':
        return 'Per Hour';
      case 'week':
      case 'month':
        return 'Per Day';
      case 'year':
        return 'Per Month';
      default:
        return 'In Selected Period';
    }
  }, [period]);

  return (
    <MetricsPanel
      isLoading={isLoading}
      metricsCardProps={[
        {
          title: 'Avg. Visitors',
          subtitle: averagePeriodLabel,
          value: averageVisitors,
          unit: 'People',
        },
        {
          title: 'Avg. Dwells',
          subtitle: averagePeriodLabel,
          value: averageDwells,
          DotProps: { color: dwellDefaultColor },
          unit: 'People',
        },
        {
          title: 'Dwell Rate',
          subtitle: 'In Selected Period',
          value: dwellRate,
          unit: 'of visitors dwell',
        },
        {
          title: 'Avg. Activity Score',
          subtitle: 'In Selected Period',
          value: averageActivityScore,
          unit: activityIndexUnit,
          icon: activityIndexIcon,
          valueColor: textColor,
        },
      ]}
    >
      <BarChart
        datasets={[
          {
            data: dwellCount,
            backgroundColor: dwellDefaultColor,
            hoverBackgroundColor: dwellHoverColor,
            label: 'Dwell Count',
          },
          {
            data: passerbyCount,
            backgroundColor: passerbyDefaultColor,
            hoverBackgroundColor: passerbyHoverColor,
            label: 'Passerby Count',
          },
        ]}
        buckets={buckets}
        isLoading={isLoading}
        bucketCount={defaultBucketCount}
        period={period || 'day'}
        tooltipContextualData={[passerbyCount]}
      />
    </MetricsPanel>
  );
};
