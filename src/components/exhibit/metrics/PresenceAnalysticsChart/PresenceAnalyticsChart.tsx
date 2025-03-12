import { skipToken } from '@reduxjs/toolkit/query/react';
import { DateTime } from 'luxon';
import {
  useCallback,
  useMemo,
  useState,
  type FunctionComponent,
  type SyntheticEvent,
} from 'react';
import {
  useGetPresenceAnalyticsDataQuery,
  useListPresenceAnalyticsVersionsQuery,
  type GetPresenceAnalyticsDataParams,
} from '../../../../app/services/metrics';
import { useGetUserQuery } from '../../../../app/services/user';
import { isNil } from '../../../../utils/lang';
import { sortCompareStringWithNumbers } from '../../../../utils/sort';
import type { DatePeriod } from '../../../common/DateControl';
import { MetricsPanel } from '../../../common/MetricsPanel';
import { activityScoreDisplayGenerator } from '../../../common/PresenceTooltipContent/PresenceTooltipContent';
import { Tab } from '../../../common/Tab';
import { Tabs } from '../../../common/Tabs';
import { BarChart } from '../../../common/charts/BarChart';
import { getReportBucketingParameters } from '../common/chartUtils';
import { useGetExhibitQuery } from '../../../../app/services/exhibit';

interface PresenceAnalyticsChartProps {
  exhibitId: number;
  start: DateTime;
  period: DatePeriod;
}

const presenceAnalyticsDefaultColor = 'rgba(186, 177, 238, .6)';
const presenceAnalyticsHoverColor = 'rgba(186, 177, 238, 1)';
const presenceAnalyticsAllTimeDefaultColor = 'rgba(238, 177, 177, .6)';
const presenceAnalyticsAllTimeHoverColor = 'rgba(238, 177, 177, 1)';
const defaultBucketCount = 10;

export const PresenceAnalyticsChart: FunctionComponent<
  PresenceAnalyticsChartProps
> = ({ exhibitId, start, period }) => {
  const { data: user, isLoading: isUserLoading } = useGetUserQuery();
  const { data: exhibit } = useGetExhibitQuery({ exhibitId });
  const { data: rawVersions, isLoading: isVersionsLoading } =
    useListPresenceAnalyticsVersionsQuery(
      !isNil(exhibitId) && user?.dladmin ? { exhibitId } : skipToken
    );

  const sortedVersions = useMemo(() => {
    if (rawVersions) {
      return [...rawVersions].sort(sortCompareStringWithNumbers);
    }

    return undefined;
  }, [rawVersions]);

  const [versionTabIndex, setVersionTabIndex] = useState(0);

  const handleVersionTabChange = useCallback(
    (_e: SyntheticEvent, tabIndex: number) => {
      setVersionTabIndex(tabIndex);
    },
    [setVersionTabIndex]
  );

  const version = useMemo(
    () => sortedVersions?.[versionTabIndex],
    [sortedVersions, versionTabIndex]
  );

  const queryPayload: typeof skipToken | GetPresenceAnalyticsDataParams =
    useMemo(() => {
      if (
        isUserLoading ||
        isNil(exhibitId) ||
        !exhibit ||
        // only require version if user is dladmin
        (user?.dladmin && isNil(version))
      ) {
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
        version: user?.dladmin ? version : undefined,
      };
    }, [
      isUserLoading,
      exhibitId,
      exhibit,
      user?.dladmin,
      version,
      period,
      start,
    ]);

  const { data: presenceData, isLoading: isDataQueryLoading } =
    useGetPresenceAnalyticsDataQuery(queryPayload);

  const isLoading = isVersionsLoading || isDataQueryLoading;

  const { activity, allTimeActivity, buckets } = useMemo(() => {
    const newBuckets: Array<string> = [];
    const newActivity: Array<number> = [];
    const newAllTimeActivity: Array<number> = [];

    if (presenceData && presenceData.data) {
      presenceData.data.forEach((dataPoint) => {
        if (dataPoint.activityScore === null) {
          newActivity.push(0);
        } else {
          newActivity.push(Math.round(dataPoint.activityScore * 10) / 10);
        }

        if (dataPoint.activityScoreAllTime === null) {
          newAllTimeActivity.push(0);
        } else {
          newAllTimeActivity.push(
            Math.round(dataPoint.activityScoreAllTime * 10) / 10
          );
        }
        newBuckets.push(dataPoint.time);
      });
    }

    return {
      activity: newActivity,
      allTimeActivity: newAllTimeActivity,
      buckets: newBuckets,
    };
  }, [presenceData]);

  const averageActivityScore = useMemo(() => {
    if (presenceData && presenceData.averageActivityScore) {
      return Math.round(presenceData.averageActivityScore * 10) / 10;
    }

    return undefined;
  }, [presenceData]);

  const { activityIndexUnit, activityIndexIcon, textColor } = useMemo(() => {
    if (!isNil(averageActivityScore)) {
      return activityScoreDisplayGenerator(averageActivityScore);
    }

    return {
      activityIndexUnit: undefined,
      activityIndexIcon: undefined,
      textColor: 'var(--typography-primary-color)',
    };
  }, [averageActivityScore]);

  return (
    <>
      {!isLoading && user?.dladmin && sortedVersions && (
        <Tabs value={versionTabIndex} onChange={handleVersionTabChange}>
          {sortedVersions.map((versionOption) => (
            <Tab label={versionOption} key={versionOption} />
          ))}
        </Tabs>
      )}
      <MetricsPanel
        isLoading={isLoading}
        metricsCardProps={[
          {
            title: 'Avg. Activity Score',
            subtitle: 'In Selected Period',
            value: averageActivityScore?.toFixed(1),
            unit: activityIndexUnit,
            icon: activityIndexIcon,
            valueColor: textColor,
          },
        ]}
      >
        <BarChart
          datasets={[
            {
              data: activity,
              backgroundColor: presenceAnalyticsDefaultColor,
              hoverBackgroundColor: presenceAnalyticsHoverColor,
              label: 'Avg. Activity Score',
            },
            {
              data: allTimeActivity,
              backgroundColor: presenceAnalyticsAllTimeDefaultColor,
              hoverBackgroundColor: presenceAnalyticsAllTimeHoverColor,
              label: 'All Time Avg. Activity Score',
            },
          ]}
          buckets={buckets}
          isLoading={isLoading}
          bucketCount={defaultBucketCount}
          period={period || 'day'}
          tooltipConfiguration='presence'
          tooltipContextualData={[activity, allTimeActivity]}
          variant='grouped'
        />
      </MetricsPanel>
    </>
  );
};
