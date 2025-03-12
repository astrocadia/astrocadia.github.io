import {
  DateView,
  StaticDatePicker as MUIDateCalendar,
  PickersActionBarAction,
  type StaticDatePickerProps as MUIDateCalendarProps,
} from '@mui/x-date-pickers';
import cx from 'classnames';
import { DateTime } from 'luxon';
import type { FunctionComponent } from 'react';
import { IconButton } from '../buttons/IconButton';
import { ArrowBackIcon, ArrowForwardIcon, ChevronIcon } from '../icons';
import './DatePickerCalendar.css';
import { DatePickerWeekCalendar } from './DatePickerWeekCalendar';
import { DatePickerActionBar } from './common/DatePickerActionBar';
import { DatePickerCalendarHeader } from './common/DatePickerCalendarHeader';

export type DatePickerCalendarProps = Omit<
  MUIDateCalendarProps<DateTime>,
  'sx' | 'view' | 'slotProps'
> & { view?: 'week' | DateView };

export const DatePickerCalendar: FunctionComponent<DatePickerCalendarProps> = ({
  className,
  view,
  slots,
  openTo,
  ...props
}) => {
  let views: Array<DateView> = [];
  let calendarType: DateView = 'day';
  let actions: Array<PickersActionBarAction> | undefined;

  if (view === 'day') {
    views = ['year', 'month', 'day'];
    actions = ['today'];
  } else if (view === 'week') {
    return (
      <DatePickerWeekCalendar
        className={cx('DatePickerCalendar', className)}
        slots={slots}
        views={['year', 'month', 'day']}
        {...props}
      />
    );
  } else if (view === 'month') {
    calendarType = 'month';
    views = ['year', 'month'];
    actions = ['today'];
  } else if (view === 'year') {
    calendarType = 'year';
    views = ['year'];
  }

  return (
    <MUIDateCalendar
      className={cx('DatePickerCalendar', className)}
      slotProps={{
        actionBar: {
          actions,
        },
        day: {
          disableRipple: true,
        },
      }}
      showDaysOutsideCurrentMonth
      slots={{
        actionBar: DatePickerActionBar,
        calendarHeader: DatePickerCalendarHeader,
        previousIconButton: IconButton,
        leftArrowIcon: ArrowBackIcon,
        nextIconButton: IconButton,
        rightArrowIcon: ArrowForwardIcon,
        switchViewButton: ChevronIcon,
        toolbar: undefined,
        ...slots,
      }}
      disableFuture
      openTo={calendarType}
      views={views}
      {...props}
    />
  );
};
