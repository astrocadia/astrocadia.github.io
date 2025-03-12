/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/material/styles';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateTime } from 'luxon';
import { type ComponentType } from 'react';
import {
  isBeginningOfWeek,
  isEndofWeek,
  isInSameWeek,
  isWeekday,
} from '../../../utils/date';
import './DatePickerWeekCalendar.css';

interface WeekPickerProps extends PickersDayProps<DateTime> {
  isSelected: boolean;
  isHovered: boolean;
}

export const WeekPickerStyle = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<WeekPickerProps>(({ isSelected, isHovered, day, today }) => ({
  borderRadius: 0,
  // Displays a blank border on the week
  ...(today &&
    isWeekday(day) && {
      '&.MuiPickersDay-root': {
        borderColor: 'var(--base-color-neutral-400) ',
        borderLeft: 'none !important',
        borderRight: 'none !important',
      },
    }),
  ...(today &&
    isBeginningOfWeek(day) && {
      '&.MuiPickersDay-root': {
        borderColor: 'var(--base-color-neutral-400)',
        borderRight: 'none !important',
      },
    }),
  ...(today &&
    isEndofWeek(day) && {
      '&.MuiPickersDay-root': {
        borderColor: 'var(--base-color-neutral-400)',
        borderLeft: 'none !important',
      },
    }),
  ...(isSelected && {
    backgroundColor: 'var(--datePickerCalendar-background-color-selected)',
    border: 'none',
    '&:focus, &:active': {
      backgroundColor: 'var(--datePickerCalendar-background-color-selected)',
    },
    '&:hover:focus, &:hover:active': {
      background: 'var(--datePickerCalendar-active background-selected)',
    },
  }),
  ...(isSelected &&
    !today && {
      '&.MuiPickersDay-root': {
        color: 'var(--datePickerCalendar-color-selected)',
        '&.MuiPickersDay-dayOutsideMonth': {
          color: 'var(--datePickerCalendar-color-selected)',
        },
      },
    }),
  ...(isSelected &&
    isHovered &&
    !today && {
      background: 'var(--datePickerCalendar-hover-background-selected)',
      '&:hover': {
        background: 'var(--datePickerCalendar-hover-background-selected)',
      },
    }),
  ...(isSelected &&
    today && {
      backgroundColor: 'var(--datePickerCalendar-background-color)',
      '&:focus': {
        backgroundColor: 'var(--datePickerCalendar-background-color)',
      },
    }),
  ...(!isSelected && {
    backgroundColor: 'var(--datePickerCalendar-background-color)',
    '&:focus': {
      '&.MuiPickersDay-root': {
        backgroundColor: 'var(--datePickerCalendar-background-color)',
      },
    },
  }),
  ...(isHovered &&
    (!isSelected || today) && {
      background: 'var(--datePickerCalendar-hover-background)',
      '&:hover, &:focus': {
        background: 'var(--datePickerCalendar-hover-background)',
        color: 'var(--datePickerCalendar-color)',
      },
    }),

  ...(day.weekday === 7 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(day.weekday === 6 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as ComponentType<WeekPickerProps>;

export const WeekPicker: ComponentType<PickersDayProps<DateTime>> = (
  props: PickersDayProps<DateTime> & {
    selectedDay?: DateTime | null;
    hoveredDay?: DateTime | null;
  }
) => {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <WeekPickerStyle
      {...other}
      day={day}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
      today={isInSameWeek(day, DateTime.now())}
    />
  );
};
