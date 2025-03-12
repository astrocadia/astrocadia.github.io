import { DateTime } from 'luxon';
import type { DatePeriod } from '../components/common/DateControl';

export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd' as const;
export const DEFAULT_TIME_FORMAT = 'HH:mm:ss:SSS' as const;
export const DEFAULT_DATE_TIME_FORMAT = `${DEFAULT_DATE_FORMAT} ${DEFAULT_TIME_FORMAT}`;
/** Pittsburgh should return -04:00 during Daylight Savings. */
export const DEFAULT_TIMEZONE_OFFSET_FORMAT = "'UTC'ZZ" as const;

export const isInSameWeek = (
  dayA: DateTime,
  dayB: DateTime | null | undefined
) => {
  if (dayB == null) {
    return false;
  }

  return dayA.plus({ day: 1 }).hasSame(dayB.plus({ day: 1 }), 'week');
};

export const isBeginningOfWeek = (day: DateTime | null | undefined) => {
  if (day == null) {
    return false;
  }
  return day.weekday === 7;
};

export const isEndofWeek = (day: DateTime | null | undefined) => {
  if (day == null) {
    return false;
  }
  return day.weekday === 6;
};

export const isWeekday = (day: DateTime | null | undefined) => {
  return !isBeginningOfWeek(day) && !isEndofWeek(day);
};

export const startOf = (
  date: DateTime,
  period: DatePeriod,
  startOfWeek: 'Sunday' | 'Monday' = 'Sunday'
) => {
  if (period === 'week' && startOfWeek === 'Sunday') {
    // DANGER: Luxon has Monday as the first day of the week, however, our calendar shows Sunday
    return date.startOf('week').minus({ days: 1 });
  }

  return date.startOf(period);
};

interface FormatDateTimeOptions {
  hideTime?: boolean;
  hideSeconds?: boolean;
  hideMilliseconds?: boolean;
  hideUTCOffset?: boolean;
}

export const formatDateTime = (
  date: Date | DateTime,
  options: FormatDateTimeOptions = {}
): string => {
  const internalDate = DateTime.isDateTime(date)
    ? date
    : DateTime.fromJSDate(date);

  let format = DEFAULT_DATE_FORMAT;
  if (!options.hideTime) {
    format += ' HH:mm';

    if (!options.hideSeconds) {
      format += ':ss';

      if (!options.hideMilliseconds) {
        format += ':SSS';
      }
    }

    if (!options.hideUTCOffset) {
      format += ` (${DEFAULT_TIMEZONE_OFFSET_FORMAT})`;
    }
  }

  return internalDate.toFormat(format);
};
