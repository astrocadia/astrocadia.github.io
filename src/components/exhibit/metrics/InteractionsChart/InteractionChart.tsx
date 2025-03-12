import { skipToken } from '@reduxjs/toolkit/query/react';
import { useMemo, type FunctionComponent } from 'react';
import { DateTime } from 'luxon';
import {
  type GetInteractionParams,
  useGetInteractionsQuery,
} from '../../../../app/services/metrics';
import { humanize } from '../../../../utils/humanizeDuration';
import { MetricsPanel } from '../../../common/MetricsPanel';
import { BarChart } from '../../../common/charts/BarChart';
import type { DatePeriod } from '../../../common/DateControl';
import { getReportBucketingParameters } from '../common/chartUtils';
import { isNil } from '../../../../utils/lang';
import { useGetExhibitQuery } from '../../../../app/services/exhibit';

interface InteractionChartProps {
  exhibitId: number;
  start: DateTime;
  period: DatePeriod;
}

const interactionDefaultColor = 'rgba(158, 196, 253, .6)';
const interactionHoverColor = 'rgba(158, 196, 253, 1)';
const defaultBucketCount = 10;

export const InteractionChart: FunctionComponent<InteractionChartProps> = ({
  exhibitId,
  start,
  period,
}) => {
  const { data: exhibit } = useGetExhibitQuery({ exhibitId });
  const queryPayload: typeof skipToken | GetInteractionParams = useMemo(() => {
    if (isNil(exhibitId) || !exhibit) {
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
      exhibitIds: [exhibitId],
      timezoneOffset,
    };
  }, [exhibitId, exhibit, period, start]);

  const { data: interactionData, isLoading: interactionsLoading } =
    useGetInteractionsQuery(queryPayload);

  const { interactions, buckets } = useMemo(() => {
    const newInteractions: Array<number> = [];
    const newBuckets: Array<string> = [];

    if (interactionData && interactionData.data) {
      interactionData.data.forEach((dataPoint) => {
        newInteractions.push(dataPoint.interactions);
        newBuckets.push(dataPoint.time);
      });
    }

    return {
      interactions: newInteractions,
      buckets: newBuckets,
    };
  }, [interactionData]);

  const averageInteractionDuration = useMemo(() => {
    if (interactionData && interactionData.totalInteractions) {
      return humanize(Math.round(interactionData.averageInteractionDuration));
    }

    return undefined;
  }, [interactionData]);

  const totalInteractionDuration = useMemo(() => {
    if (interactionData && interactionData.totalInteractions) {
      return humanize(Math.round(interactionData.totalInteractionDuration));
    }

    return undefined;
  }, [interactionData]);

  const totalInteractions = useMemo(() => {
    if (interactionData && interactionData.totalInteractions) {
      return interactionData.totalInteractions.toString();
    }

    return undefined;
  }, [interactionData]);

  return (
    <MetricsPanel
      isLoading={interactionsLoading}
      metricsCardProps={[
        {
          title: 'Total Interactions',
          subtitle: 'In Selected Period',
          DotProps: { color: interactionDefaultColor },
          value: totalInteractions,
        },
        {
          title: 'Avg. Session Duration',
          subtitle: 'Per Session',
          value: averageInteractionDuration,
        },
        {
          title: 'Total Session Duration',
          subtitle: 'In Selected Period',
          value: totalInteractionDuration,
        },
      ]}
    >
      <BarChart
        datasets={[
          {
            data: interactions,
            backgroundColor: interactionDefaultColor,
            hoverBackgroundColor: interactionHoverColor,
            label: 'Interactions',
          },
        ]}
        buckets={buckets}
        isLoading={interactionsLoading}
        bucketCount={defaultBucketCount}
        period={period || 'day'}
      />
    </MetricsPanel>
  );
};
