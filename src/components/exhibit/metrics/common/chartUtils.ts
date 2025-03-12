import type { DateTime } from 'luxon';
import type {
  GetInteractionParams,
  ReportTimeUnit,
} from '../../../../app/services/metrics';
import type { DatePeriod } from '../../../common/DateControl';
import { exhaustiveGuard } from '../../../../utils/usefulTS';

type ReportBucketingParameters = Pick<
  GetInteractionParams,
  'buckets' | 'reportType' | 'end'
>;

export const getReportBucketingParameters = (
  period: DatePeriod,
  start: DateTime
): ReportBucketingParameters => {
  let buckets = 7;
  let reportType: ReportTimeUnit = 'day';
  let end = start;
  switch (period) {
    case 'day':
      buckets = 24;
      reportType = 'hour';
      end = start.endOf('day');
      break;
    case 'week':
      buckets = 7;
      reportType = 'day';
      // Again, this weirdness it to translate between our view of start/end of week and Luxon's
      end = start.plus({ day: 1 }).endOf('week').minus({ day: 1 });
      break;
    case 'month':
      buckets = end.daysInMonth || 30;
      reportType = 'day';
      end = start.endOf('month');
      break;
    case 'year':
      buckets = 12;
      reportType = 'month';
      end = start.endOf('year');
      break;
    default:
      exhaustiveGuard(period);
  }

  return {
    buckets,
    reportType,
    end: end.toISO() || undefined,
  };
};
