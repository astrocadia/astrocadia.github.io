import cx from 'classnames';
import { DateTime } from 'luxon';
import { type FunctionComponent, memo, useCallback, useMemo } from 'react';
import { isNil } from '../../utils/lang';
import { Chip } from '../common/Chip';
import { DatePicker } from '../common/DatePicker';
import { GumbandDateProvider } from '../common/DatePickerCalendar/gumbandDateProvider';
import { TimePicker } from '../common/TimePicker';
import {
  SelectWithRemove,
  type SelectWithRemoveProps,
} from '../SelectWithRemove';
import {
  CUSTOM,
  DAILY,
  DATE_FORMAT,
  defaultShortcuts,
  END,
  type EventScheduleShortcutItem,
  getWeekdayLabel,
  NEVER,
  REPEAT,
  REPEAT_MODE,
  type RepeatMode,
  TIME_FORMAT,
  WEEKDAY,
  type Weekday,
  WEEKDAYS,
  WEEKENDS,
  WEEKLY_PLACEHOLDER,
  WEEKLY_PREFIX,
} from './common';
import './EventScheduleInput.css';

export interface EventScheduleInputProps {
  shortcuts?: Array<EventScheduleShortcutItem>;
  repeatMode: RepeatMode;
  customRepeatDays: Set<Weekday>;
  startDateTime: DateTime | null;
  endDateTime: DateTime | null;
  startDateError?: boolean;
  startDateHelperText?: string;
  startTimeError?: boolean;
  startTimeHelperText?: string;
  minStartDate?: DateTime;
  endDateError?: boolean;
  endDateHelperText?: string;
  maxEndDate?: DateTime;
  onChangeRepeatMode: (repeatMode: RepeatMode) => void;
  onChangeCustomRepeatDays: (customRepeatDays: Set<Weekday>) => void;
  onChangeStartDateTime: (startDateTime: DateTime | null) => void;
  onChangeEndDateTime: (endDateTime: DateTime | null) => void;
  className?: string;
}

export const EventScheduleInput: FunctionComponent<EventScheduleInputProps> =
  memo(
    ({
      className,
      repeatMode,
      customRepeatDays,
      startDateTime,
      endDateTime,
      shortcuts = defaultShortcuts,
      minStartDate,
      startDateError,
      startDateHelperText,
      startTimeError,
      startTimeHelperText,
      maxEndDate,
      endDateError,
      endDateHelperText,
      onChangeRepeatMode,
      onChangeCustomRepeatDays,
      onChangeStartDateTime,
      onChangeEndDateTime,
    }) => {
      const repeatOptions: SelectWithRemoveProps<RepeatMode>['options'] =
        useMemo(() => {
          const selectedWeekday =
            startDateTime?.weekdayLong ?? WEEKLY_PLACEHOLDER;

          return [
            { value: REPEAT_MODE.NEVER, label: NEVER },
            { value: REPEAT_MODE.DAILY, label: DAILY },
            { value: REPEAT_MODE.WEEKDAYS, label: WEEKDAYS },
            { value: REPEAT_MODE.WEEKENDS, label: WEEKENDS },
            {
              value: REPEAT_MODE.WEEKLY,
              label: `${WEEKLY_PREFIX}${selectedWeekday}`,
            },
            { value: REPEAT_MODE.CUSTOM, label: CUSTOM },
          ];
        }, [startDateTime?.weekdayLong]);

      const showEndDateTime = useMemo(() => {
        const modesWithEndDate: Array<RepeatMode> = [
          REPEAT_MODE.WEEKLY,
          REPEAT_MODE.WEEKENDS,
          REPEAT_MODE.DAILY,
          REPEAT_MODE.WEEKDAYS,
          REPEAT_MODE.CUSTOM,
        ];

        return modesWithEndDate.includes(repeatMode);
      }, [repeatMode]);

      const handleWeekdayClick = useCallback(
        (weekday: Weekday) => {
          const newCustomRepeatDays = new Set(customRepeatDays);
          if (newCustomRepeatDays.has(weekday)) {
            newCustomRepeatDays.delete(weekday);
          } else {
            newCustomRepeatDays.add(weekday);
          }

          onChangeCustomRepeatDays(newCustomRepeatDays);
        },
        [customRepeatDays, onChangeCustomRepeatDays]
      );

      return (
        <div className={cx('EventScheduleInput', className)}>
          <GumbandDateProvider>
            <div className='EventScheduleInput__splitRow'>
              <DatePicker
                value={startDateTime}
                onChange={onChangeStartDateTime}
                minDate={minStartDate}
                format={DATE_FORMAT}
                error={startDateError}
                helperText={startDateHelperText}
              />
              <TimePicker
                value={startDateTime}
                onChange={onChangeStartDateTime}
                format={TIME_FORMAT}
                error={startTimeError}
                helperText={startTimeHelperText}
              />
            </div>
            <div className='EventScheduleInput__repeatSection'>
              <div className='EventScheduleInput__splitRow'>
                <div className='EventScheduleInput__splitRowLabel'>
                  {REPEAT}
                </div>
                <SelectWithRemove
                  options={repeatOptions}
                  value={repeatMode}
                  onChange={onChangeRepeatMode}
                />
              </div>
              {repeatMode === REPEAT_MODE.CUSTOM && (
                <div className='EventScheduleInput__chipContainer'>
                  {Object.values(WEEKDAY).map((weekday) => (
                    <Chip
                      className='EventScheduleInput__weekdayChip'
                      key={weekday}
                      label={getWeekdayLabel(weekday)}
                      onClick={() => handleWeekdayClick(weekday)}
                      selected={customRepeatDays.has(weekday)}
                    />
                  ))}
                </div>
              )}
              {showEndDateTime && (
                <div className='EventScheduleInput__splitRow'>
                  <div className='EventScheduleInput__splitRowLabel'>{END}</div>
                  <DatePicker
                    value={endDateTime}
                    onChange={onChangeEndDateTime}
                    format={DATE_FORMAT}
                    minDate={startDateTime || undefined}
                    maxDate={maxEndDate}
                    error={endDateError}
                    helperText={endDateHelperText}
                    slotProps={{
                      shortcuts: {
                        label: 'Quick Select',
                        isValid: (value) => !isNil(value),
                        items: shortcuts.map((shortcut) => {
                          return {
                            label: shortcut.label,
                            getValue: () =>
                              startDateTime?.plus(shortcut.endAfter) || null,
                          };
                        }),
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </GumbandDateProvider>
        </div>
      );
    }
  );

EventScheduleInput.displayName = 'EventScheduleInput';
