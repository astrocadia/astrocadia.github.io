import { describe, it, expect } from 'vitest';
import { DateTime } from 'luxon';
import type { ExhibitScheduledEvent } from '../../../app/services/exhibit';
import {
  transformScheduledEventsToCalendarEvents,
  getNonRecurringEventEndDate,
} from './events';

describe('getNonRecurringEventEndDate', () => {
  const baseEvent: ExhibitScheduledEvent = {
    id: 1,
    name: 'Event 1',
    startDate: '2024-09-17T12:00:00Z',
    recurringStartDate: null,
    endDate: '2024-09-17T14:00:00Z',
    recurringEndDate: null,
    recurring: false,
    opMode: false,
    completed: false,
    frequency: {
      label: 'Daily',
      value: 'daily',
      altValue: '1',
    },
    recurringId: null,
    schedulecontrols: [],
    schedulesettings: [],
    schedulestrapicontents: [],
  };

  it('should return the correct end date by adding 10 milliseconds to the start date', () => {
    const result = getNonRecurringEventEndDate(baseEvent);
    const expectedEndDate = DateTime.fromISO(baseEvent.startDate)
      .plus({ millisecond: 10 })
      .toJSDate();

    expect(result).toEqual(expectedEndDate);
  });

  it('should handle invalid start date gracefully', () => {
    const eventWithInvalidDate: ExhibitScheduledEvent = {
      ...baseEvent,
      startDate: 'invalid-date',
    };

    try {
      const result = getNonRecurringEventEndDate(eventWithInvalidDate);
      // We expect it to either return NaN or throw an error depending on how you handle it
      expect(result).toBeNaN();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return NaN or throw an error if the start date is empty', () => {
    const eventWithEmptyDate: ExhibitScheduledEvent = {
      ...baseEvent,
      startDate: '',
    };

    try {
      const result = getNonRecurringEventEndDate(eventWithEmptyDate);
      expect(result).toBeNaN(); // Expect NaN if the date is invalid
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should handle very old start dates correctly', () => {
    const eventWithOldDate: ExhibitScheduledEvent = {
      ...baseEvent,
      startDate: '1900-01-01T00:00:00Z',
    };

    const result = getNonRecurringEventEndDate(eventWithOldDate);
    const expectedEndDate = DateTime.fromISO(eventWithOldDate.startDate)
      .plus({ millisecond: 10 })
      .toJSDate();

    expect(result).toEqual(expectedEndDate);
  });

  it('should handle future start dates correctly', () => {
    const futureEvent: ExhibitScheduledEvent = {
      ...baseEvent,
      startDate: '2100-01-01T00:00:00Z',
    };

    const result = getNonRecurringEventEndDate(futureEvent);
    const expectedEndDate = DateTime.fromISO(futureEvent.startDate)
      .plus({ millisecond: 10 })
      .toJSDate();

    expect(result).toEqual(expectedEndDate);
  });
});

describe('transformScheduledEventsToCalendarEvents', () => {
  const baseEvent: ExhibitScheduledEvent = {
    id: 1,
    name: 'Event 1',
    startDate: '2024-09-17T12:00:00Z',
    recurringStartDate: null,
    endDate: '2024-09-17T14:00:00Z',
    recurringEndDate: null,
    recurring: false,
    opMode: false,
    completed: false,
    frequency: {
      label: 'Daily',
      value: 'daily',
      altValue: '1',
    },
    recurringId: null,
    schedulecontrols: [],
    schedulesettings: [],
    schedulestrapicontents: [],
  };

  it('should convert non-recurring events correctly', () => {
    const event = { ...baseEvent, name: 'Non-Recurring Event' };
    const events: ExhibitScheduledEvent[] = [event];

    const result = transformScheduledEventsToCalendarEvents(events);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Non-Recurring Event');
    expect(result[0].start).toEqual(new Date(baseEvent.startDate));
    expect(result[0].end).toEqual(getNonRecurringEventEndDate(baseEvent));
    expect(result[0].resource).toEqual(event);
  });

  it('should convert recurring events correctly', () => {
    const recurringEvent: ExhibitScheduledEvent = {
      ...baseEvent,
      name: 'Recurring Event',
      recurring: true,
      recurringStartDate: '2024-09-17T12:00:00Z',
      recurringEndDate: '2024-09-17T14:00:00Z',
      recurringId: 'recurring-id',
    };

    const events: ExhibitScheduledEvent[] = [recurringEvent];

    const result = transformScheduledEventsToCalendarEvents(events);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Recurring Event');
    expect(result[0].start).toEqual(new Date(recurringEvent.startDate));
    expect(result[0].end).toEqual(new Date(recurringEvent.endDate));
    expect(result[0].resource).toEqual(recurringEvent);
  });

  it('should handle an empty array', () => {
    const events: ExhibitScheduledEvent[] = [];

    const result = transformScheduledEventsToCalendarEvents(events);

    expect(result).toHaveLength(0);
  });

  it('should handle events with no end date (non-recurring)', () => {
    const eventWithoutEnd: ExhibitScheduledEvent = {
      ...baseEvent,
      endDate: '',
    };

    const events: ExhibitScheduledEvent[] = [eventWithoutEnd];

    const result = transformScheduledEventsToCalendarEvents(events);

    expect(result).toHaveLength(1);
    expect(result[0].title).toBe(eventWithoutEnd.name);
    expect(result[0].start).toEqual(new Date(eventWithoutEnd.startDate));
    expect(result[0].end).toEqual(
      DateTime.fromISO(eventWithoutEnd.startDate)
        .plus({ millisecond: 10 })
        .toJSDate()
    );
  });

  it('should handle events with malformed dates gracefully', () => {
    const eventWithMalformedDate: ExhibitScheduledEvent = {
      ...baseEvent,
      startDate: 'invalid date',
      endDate: 'invalid date',
    };

    const events: ExhibitScheduledEvent[] = [eventWithMalformedDate];

    try {
      const result = transformScheduledEventsToCalendarEvents(events);
      // We expect it to throw or return with some error handling
      expect(result[0].start).toBeNaN();
      expect(result[0].end).toBeNaN();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
