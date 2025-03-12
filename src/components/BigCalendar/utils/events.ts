import { DateTime } from 'luxon';
import type { Event } from 'react-big-calendar';
import type { ExhibitScheduledEvent } from '../../../app/services/exhibit';

export const getNonRecurringEventEndDate = (
  event: ExhibitScheduledEvent
): Date => {
  return DateTime.fromISO(event.startDate).plus({ millisecond: 10 }).toJSDate();
};

export const transformScheduledEventsToCalendarEvents = (
  events: Array<ExhibitScheduledEvent>
): Array<Event> => {
  return events.map((event) => {
    let end: Date | undefined;

    if (event.recurring) {
      end = new Date(event.endDate);
    } else {
      end = getNonRecurringEventEndDate(event);
    }

    return {
      title: event.name,
      start: new Date(event.startDate),
      end,
      resource: event,
    };
  });
};
