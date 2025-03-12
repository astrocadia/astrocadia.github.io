import type { DateTime, WeekdayNumbers } from 'luxon';
import {
  isRepeatMode,
  isWeekday,
  REPEAT_MODE,
  WEEKDAY,
  type RepeatMode,
  type Weekday,
} from '../../../../EventScheduleInput';

export const SUNDAY_STARTING_WEEK: Array<Weekday> = [
  WEEKDAY.SUNDAY,
  WEEKDAY.MONDAY,
  WEEKDAY.TUESDAY,
  WEEKDAY.WEDNESDAY,
  WEEKDAY.THURSDAY,
  WEEKDAY.FRIDAY,
  WEEKDAY.SATURDAY,
] as const;

export const REPEAT_MODE_ALT_VALUE: Record<RepeatMode, string> = {
  [REPEAT_MODE.NEVER]: '0000000',
  [REPEAT_MODE.DAILY]: '1111111',
  [REPEAT_MODE.WEEKDAYS]: '0111110',
  [REPEAT_MODE.WEEKENDS]: '1000001',
  [REPEAT_MODE.WEEKLY]: '0000000',
  [REPEAT_MODE.CUSTOM]: '0000000',
} as const;

/** Checks to see if UTC day is ahead, the same as, or behind local date.  */
export const getDayShift = (date: DateTime | null): number => {
  if (!date) return 0;
  // Luxon's weekdays: 1 (Monday) to 7 (Sunday)
  const localDay = date.weekday % 7; // Adjust Sunday from 7 to 0
  const utcDay = date.toUTC().weekday % 7;

  const dayDifference = utcDay - localDay;
  return dayDifference;
};

export const rotateString = (string: string, shift: number): string => {
  const { length } = string;
  const wrappedShift = ((shift % length) + length) % length;
  return string.slice(wrappedShift) + string.slice(0, wrappedShift);
};

const isAltValueValid = (altValue: string) => {
  if (altValue.length !== 7) {
    return false;
  }

  return altValue.match(/^[01]{7}$/) !== null;
};

export const convertAltValueToLocalAltValue = ({
  startDate,
  altValue,
}: {
  startDate?: DateTime | null;
  altValue: string;
}): string => {
  if (!isAltValueValid(altValue) || !startDate) {
    return altValue;
  }

  const dayShift = getDayShift(startDate);
  return rotateString(altValue, dayShift);
};

export const convertLocalAltValueToAltValue = ({
  startDate,
  localAltValue,
}: {
  startDate?: DateTime | null;
  localAltValue: string;
}): string => {
  if (!isAltValueValid(localAltValue) || !startDate) {
    return localAltValue;
  }

  const dayShift = getDayShift(startDate);
  return rotateString(localAltValue, -dayShift);
};

export const convertAltValueToWeekdaySet = (altValue: string): Set<Weekday> => {
  if (!isAltValueValid(altValue)) {
    return new Set();
  }

  const weekdays = new Set<Weekday>();

  altValue.split('').forEach((char, index) => {
    if (char === '1') {
      const weekday = SUNDAY_STARTING_WEEK[index];
      weekdays.add(weekday);
    }
  });
  return weekdays;
};

export const convertAltValueToLocalWeekdaySet = (
  startDate: DateTime,
  altValue: string
): Set<Weekday> => {
  const localAltValue = convertAltValueToLocalAltValue({ startDate, altValue });
  return convertAltValueToWeekdaySet(localAltValue);
};

/** Luxon DateTime weekdays start on Mondays at 1 and ends on Sunday at 7, where our weeks start on Sunday at 0.  */
export const convertDateTimeWeekdayToWeekday = (
  weekday: WeekdayNumbers | number
): Weekday | null => {
  const convertedWeekday = weekday % 7;

  if (!isWeekday(convertedWeekday)) {
    return null;
  }

  return convertedWeekday;
};

export const getRepeatModeAltValue = (
  repeatMode: RepeatMode,
  startDate: DateTime | null = null,
  weekdaySet: Set<Weekday> = new Set()
): string => {
  if (!isRepeatMode(repeatMode)) {
    return REPEAT_MODE_ALT_VALUE[REPEAT_MODE.NEVER];
  }

  const altValue = REPEAT_MODE_ALT_VALUE[repeatMode];
  const altValueParts = altValue.split('');

  if (repeatMode === REPEAT_MODE.WEEKLY) {
    if (!startDate) return altValue;

    const dateTimeWeekday = startDate.weekday;
    const weekday = convertDateTimeWeekdayToWeekday(dateTimeWeekday);

    if (weekday === null) {
      return altValue;
    }

    altValueParts[weekday] = '1';
  }

  if (repeatMode === REPEAT_MODE.CUSTOM) {
    altValueParts.forEach((_char, index) => {
      if (isWeekday(index) && weekdaySet.has(index)) {
        altValueParts[index] = '1';
      } else {
        altValueParts[index] = '0';
      }
    });
  }

  return altValueParts.join('');
};
