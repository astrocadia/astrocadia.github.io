import type { EventProps, Event } from 'react-big-calendar';
import { useMemo, type FunctionComponent } from 'react';
import { DateTime } from 'luxon';
import cx from 'classnames';
import type { ExhibitScheduledEvent } from '../../app/services/exhibit';
import { formatTime } from './utils/date';
import { RestartIcon } from '../common/icons/RestartIcon';
import './BigCalendarWeekEvent.css';

export interface BigCalendarEventEvent extends Event {
  resource?: ExhibitScheduledEvent;
}

export interface BigCalendarWeekEventProps
  extends EventProps<BigCalendarEventEvent> {}

export const BigCalendarWeekEvent: FunctionComponent<
  BigCalendarWeekEventProps
> = ({ event }) => {
  const formattedDateRange: string = useMemo(() => {
    const { start } = event;
    if (!start) return '';

    const startTime = formatTime(DateTime.fromJSDate(start));

    return startTime;
  }, [event]);

  const formattedTitle = useMemo(() => {
    const { resource: exhibitScheduledEvent } = event;
    return exhibitScheduledEvent?.name || '';
  }, [event]);

  return (
    <div
      className={cx('BigCalendarWeekEvent', {
        BigCalendarWeekEvent__recurring: event.resource?.recurring,
        BigCalendarWeekEvent__completed: event.resource?.completed,
      })}
    >
      <div className='BigCalendarWeekEvent__labelWrapper'>
        <div className='BigCalendarWeekEvent__time'>{formattedDateRange}</div>
        <div className='BigCalendarWeekEvent__title'>{formattedTitle}</div>
      </div>
      {event.resource?.recurring && (
        <RestartIcon className='BigCalendarWeekEvent__restartIcon' />
      )}
    </div>
  );
};
