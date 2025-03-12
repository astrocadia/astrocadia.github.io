import { DateTime } from 'luxon';

export const getWeekStart = (date: DateTime): DateTime => {
  const { weekday } = date; // Luxon uses 1 for Monday and 7 for Sunday
  const daysToSubtract = weekday % 7; // Sunday is 7, so % 7 will result in 0 for Sunday, otherwise, subtract the remainder
  return date.minus({ days: daysToSubtract }).startOf('day');
};

/**
 * Formats the time of the event. If it's on the hour, it will only show the hour.
 */
export const formatTime = (dateTime: DateTime): string => {
  if (!dateTime || !dateTime.isValid) return '';

  const format = dateTime.minute ? 'h:mm a' : 'h a';

  return dateTime.toFormat(format);
};

export const formatUtcOffset = (dateTime = DateTime.local()) => {
  const { offset } = dateTime; // Offset in minutes
  const offsetHours = Math.floor(Math.abs(offset) / 60);
  const sign = offset >= 0 ? '+' : '-';

  // Combine sign with padded hours
  return `UTC${sign}${offsetHours.toString().padStart(2, '0')}`;
};
