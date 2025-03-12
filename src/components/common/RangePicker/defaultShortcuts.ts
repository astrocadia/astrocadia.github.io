import { DateTime, type DurationLike } from 'luxon';
import type { DateRangeShortcutItem, DateTimeRangeValue } from './RangePicker';

/**
 * Returns a range starting from now minus duration to undefined.
 * We return undefined for the end of the range to indicate that it is open-ended.
 * This is useful because the user can refresh the page and still get new logs.
 */
const getFromToNowRange = (duration: DurationLike): DateTimeRangeValue => {
  const now = DateTime.now();
  return [now.minus(duration), undefined];
};

export const defaultShortcuts: DateRangeShortcutItem[] = [
  {
    getValue: () => getFromToNowRange({ hours: 1 }),
    label: 'Last 1 hour',
  },
  {
    getValue: () => getFromToNowRange({ days: 1 }),
    label: 'Last 1 day',
    default: true,
  },
  {
    getValue: () => getFromToNowRange({ days: 3 }),
    label: 'Last 3 days',
  },
  {
    getValue: () => getFromToNowRange({ days: 7 }),
    label: 'Last 7 days',
  },
];

export const getDefaultShortcut = (
  shortcuts: DateRangeShortcutItem[] = defaultShortcuts
): DateRangeShortcutItem | null => {
  return shortcuts.find((shortcut) => shortcut.default) ?? null;
};

export const defaultShortcut = getDefaultShortcut();
