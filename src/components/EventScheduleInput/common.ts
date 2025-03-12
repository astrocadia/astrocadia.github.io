import { ObjectValues } from '@deeplocal/gumband-public-shared-lib';
import { DurationLike } from 'luxon';

export const DATE_FORMAT = 'MM/dd/yyyy' as const;
export const TIME_FORMAT = 'hh:mm a' as const;
export const REPEAT = 'Repeat' as const;
export const END = 'End' as const;
export const NEVER = 'Never' as const;
export const DAILY = 'Every day' as const;
export const WEEKDAYS = 'Every weekday' as const;
export const WEEKENDS = 'Every weekend' as const;
export const WEEKLY_PREFIX = 'Every ' as const; // TEMP
export const WEEKLY_PLACEHOLDER = 'week' as const;
export const CUSTOM = 'Custom' as const;

export const REPEAT_MODE = {
  NEVER: 'never',
  DAILY: 'daily',
  WEEKDAYS: 'weekdays',
  WEEKENDS: 'weekends',
  WEEKLY: 'weekly',
  CUSTOM: 'custom',
} as const;
export type RepeatMode = ObjectValues<typeof REPEAT_MODE>;
export const isRepeatMode = (value: string): value is RepeatMode =>
  (Object.values(REPEAT_MODE) as Array<string>).includes(value);

export const WEEKDAY = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
} as const;
export type Weekday = ObjectValues<typeof WEEKDAY>;

export function isWeekday(weekday: unknown): weekday is Weekday {
  return (
    typeof weekday === 'number' &&
    Object.values(WEEKDAY).includes(weekday as Weekday)
  );
}

export const WEEKDAY_LABEL = {
  [WEEKDAY.SUNDAY]: 'S',
  [WEEKDAY.MONDAY]: 'M',
  [WEEKDAY.TUESDAY]: 'T',
  [WEEKDAY.WEDNESDAY]: 'W',
  [WEEKDAY.THURSDAY]: 'T',
  [WEEKDAY.FRIDAY]: 'F',
  [WEEKDAY.SATURDAY]: 'S',
} as const;

export const getWeekdayLabel = (weekday: Weekday): string => {
  if (!isWeekday(weekday)) {
    return '';
  }

  return WEEKDAY_LABEL[weekday];
};

export interface EventScheduleShortcutItem {
  label: string; // Future Improvement - perhaps this can be generated from the offset value
  endAfter: DurationLike;
}

export const defaultShortcuts: Array<EventScheduleShortcutItem> = [
  {
    label: 'After 1 week',
    endAfter: {
      weeks: 1,
    },
  },
  {
    label: 'After 1 month',
    endAfter: {
      months: 1,
    },
  },
  {
    label: 'After 3 months',
    endAfter: {
      months: 3,
    },
  },
  {
    label: 'After 1 year',
    endAfter: {
      years: 1,
    },
  },
];
