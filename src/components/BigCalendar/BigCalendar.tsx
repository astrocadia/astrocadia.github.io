import { type FunctionComponent } from 'react';
import cx from 'classnames';
import {
  Calendar,
  Event,
  luxonLocalizer,
  type CalendarProps,
  type View,
} from 'react-big-calendar';
import { DateTime } from 'luxon';
import { BigCalendarToolbar } from './BigCalendarToolbar';
import {
  BigCalendarWeekEvent,
  type BigCalendarEventEvent,
} from './BigCalendarWeekEvent';
import { BigCalendarTimeGutterHeader } from './BigCalendarTimeGutterHeader';
import './BigCalendar.css';

/** As we add more views, we need to add them here. */
const VIEWS: Array<View> = ['week'] as const;
const DEFAULT_VIEW: View = 'week' as const;
const DAY_FORMAT = 'ccc d';
const TIME_GUTTER_FORMAT = 'h a';

const defaultScrollToTime = DateTime.local()
  .set({
    hour: 7,
    minute: 0,
    second: 0,
    millisecond: 0,
  })
  .toJSDate();

export interface BigCalendarProps
  extends Omit<
    CalendarProps<BigCalendarEventEvent>,
    'localizer' | 'views' | 'defaultView'
  > {
  localizer?: CalendarProps['localizer'];
  selected?: Event;
}

/**
 * A wrapper component for React Big Calendar calendar.
 * @see https://github.com/jquense/react-big-calendar
 */
export const BigCalendar: FunctionComponent<BigCalendarProps> = ({
  className,
  localizer = luxonLocalizer(DateTime),
  scrollToTime = defaultScrollToTime,
  selected,
  ...rest
}) => {
  return (
    <Calendar<BigCalendarEventEvent>
      className={cx('BigCalendar', className)}
      localizer={localizer}
      components={{
        toolbar: BigCalendarToolbar,
        week: {
          event: BigCalendarWeekEvent,
        },
        timeGutterHeader: BigCalendarTimeGutterHeader,
      }}
      views={VIEWS}
      dayLayoutAlgorithm='no-overlap'
      formats={{
        dayFormat: DAY_FORMAT,
        timeGutterFormat: TIME_GUTTER_FORMAT,
      }}
      defaultView={DEFAULT_VIEW}
      scrollToTime={scrollToTime}
      selected={selected}
      {...rest}
    />
  );
};
