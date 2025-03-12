import {
  StaticDatePicker as MUIDateCalendar,
  type StaticDatePickerProps as MUIDateCalendarProps,
} from '@mui/x-date-pickers';
import cx from 'classnames';
import { DateTime } from 'luxon';
import { useState, type FunctionComponent } from 'react';
import { IconButton } from '../buttons/IconButton';
import { ArrowBackIcon, ArrowForwardIcon, ChevronIcon } from '../icons';
import './DatePickerWeekCalendar.css';
import { WeekPicker } from './WeekPicker';
import { DatePickerActionBar } from './common/DatePickerActionBar';
import { DatePickerCalendarHeader } from './common/DatePickerCalendarHeader';

export type DatePickerCalendarProps = Omit<
  MUIDateCalendarProps<DateTime>,
  'sx'
>;

export const DatePickerWeekCalendar: FunctionComponent<
  DatePickerCalendarProps
> = ({ className, slots, ...props }) => {
  const [hoveredDay, setHoveredDay] = useState<DateTime | null>(null);
  const [value, setValue] = useState<DateTime | null>(DateTime.now());

  return (
    <MUIDateCalendar
      className={cx('DatePickerWeekCalendar', className)}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      showDaysOutsideCurrentMonth
      slots={{
        actionBar: DatePickerActionBar,
        calendarHeader: DatePickerCalendarHeader,
        previousIconButton: IconButton,
        day: WeekPicker,
        leftArrowIcon: ArrowBackIcon,
        nextIconButton: IconButton,
        rightArrowIcon: ArrowForwardIcon,
        switchViewButton: ChevronIcon,
        toolbar: undefined,
        ...slots,
      }}
      disableFuture
      slotProps={{
        actionBar: {
          actions: ['today'],
        },
        day: (ownerState) => ({
          selectedDay: value,
          hoveredDay,
          onPointerEnter: () => setHoveredDay(ownerState.day),
          onPointerLeave: () => setHoveredDay(null),
          disableRipple: true,
        }),
        nextIconButton: {
          disableRipple: true,
        },
        previousIconButton: {
          disableRipple: true,
        },
      }}
      {...props}
    />
  );
};
