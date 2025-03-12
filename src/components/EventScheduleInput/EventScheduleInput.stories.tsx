import type { Meta, StoryObj } from '@storybook/react';
import { DateTime } from 'luxon';
import { useCallback, useMemo, useState } from 'react';
import { exhaustiveGuard } from '@deeplocal/gumband-public-shared-lib';
import { ThemeProviderWrapper } from '../../styles/helpers/ThemeProviderWrapper';
import { EventScheduleInput } from './EventScheduleInput';
import { isWeekday, REPEAT_MODE, RepeatMode, WEEKDAY, Weekday } from './common';

const meta: Meta<typeof EventScheduleInput> = {
  title: 'Design System/Composite Components/EventScheduleInput',
  tags: ['autodocs'],
  component: EventScheduleInput,
  decorators: [
    (Story) => (
      <ThemeProviderWrapper>
        <Story />
      </ThemeProviderWrapper>
    ),
  ],
  render: (args) => {
    const [repeatMode, setRepeatMode] = useState<RepeatMode>(REPEAT_MODE.NEVER);
    const [customRepeatDays, setCustomRepeatDays] = useState<Set<Weekday>>(
      new Set()
    );
    const [startDateTime, setStartDateTime] = useState<DateTime | null>(null);
    const [endDateTime, setEndDateTime] = useState<DateTime | null>(null);
    const endDateError = useMemo(() => {
      if (endDateTime && startDateTime) {
        if (endDateTime.toMillis() < startDateTime.toMillis()) {
          return {
            error: true,
            helperText: 'End date must be after Start date',
          };
        }

        if (
          endDateTime.toMillis() > startDateTime.plus({ years: 1 }).toMillis()
        ) {
          return {
            error: true,
            helperText: 'Event duration cannot exceed 1 year',
          };
        }
      }
      return {
        error: false,
        helperText: undefined,
      };
    }, [startDateTime, endDateTime]);

    const handleRepeatModeChange = useCallback(
      (newRepeatMode: RepeatMode) => {
        let newCustomRepeatDays: Set<Weekday> = new Set();
        const startDateWeekday = startDateTime?.weekdayLong?.toLowerCase();
        switch (newRepeatMode) {
          case 'custom':
            newCustomRepeatDays = new Set(customRepeatDays);
            if (isWeekday(startDateWeekday)) {
              newCustomRepeatDays.add(startDateWeekday);
            }
            break;
          case 'daily':
            newCustomRepeatDays = new Set(Object.values(WEEKDAY));
            break;
          case 'weekdays':
            newCustomRepeatDays = new Set<Weekday>([
              WEEKDAY.MONDAY,
              WEEKDAY.TUESDAY,
              WEEKDAY.WEDNESDAY,
              WEEKDAY.THURSDAY,
              WEEKDAY.FRIDAY,
            ]);
            break;
          case 'weekends':
            newCustomRepeatDays = new Set<Weekday>([
              WEEKDAY.SATURDAY,
              WEEKDAY.SUNDAY,
            ]);
            break;
          case 'weekly':
          case 'never':
            if (isWeekday(startDateWeekday)) {
              newCustomRepeatDays = new Set([startDateWeekday]);
            }
            break;
          default:
            exhaustiveGuard(newRepeatMode);
        }
        setRepeatMode(newRepeatMode);
        setCustomRepeatDays(newCustomRepeatDays);
      },
      [customRepeatDays, startDateTime]
    );

    const handleStartDateTimeChange = useCallback(
      (newStartDateTime: DateTime | null) => {
        if (
          DateTime.isDateTime(newStartDateTime) &&
          (!endDateTime ||
            endDateTime.toMillis() - newStartDateTime.toMillis() >
              1000 * 60 * 60 * 24 * 365) // 1 year in milliseconds
        ) {
          setEndDateTime(
            DateTime.fromObject(newStartDateTime.toObject()).plus({
              years: 1,
            })
          );
        }
        setStartDateTime(newStartDateTime);

        if (repeatMode === REPEAT_MODE.CUSTOM) {
          const newStartDateWeekday =
            newStartDateTime?.weekdayLong?.toLowerCase();
          const startDateWeekday = startDateTime?.weekdayLong?.toLowerCase();
          const newCustomRepeatDays = new Set(customRepeatDays);
          if (isWeekday(startDateWeekday)) {
            newCustomRepeatDays.delete(startDateWeekday);
          }
          if (isWeekday(newStartDateWeekday)) {
            newCustomRepeatDays.add(newStartDateWeekday);
          }
          setCustomRepeatDays(newCustomRepeatDays);
        }
      },
      [
        startDateTime,
        endDateTime,
        repeatMode,
        customRepeatDays,
        setEndDateTime,
        setStartDateTime,
        setCustomRepeatDays,
      ]
    );

    return (
      <EventScheduleInput
        {...args}
        repeatMode={repeatMode}
        customRepeatDays={customRepeatDays}
        startDateTime={startDateTime}
        endDateTime={endDateTime}
        onChangeRepeatMode={handleRepeatModeChange}
        onChangeCustomRepeatDays={setCustomRepeatDays}
        onChangeStartDateTime={handleStartDateTimeChange}
        onChangeEndDateTime={setEndDateTime}
        endDateError={endDateError.error}
        endDateHelperText={endDateError.helperText}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof EventScheduleInput>;

export const Default: Story = {};
