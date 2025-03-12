import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type MockInstance,
} from 'vitest';
import { DateTime } from 'luxon';
import { getWeekStart, formatUtcOffset } from './date';

describe('getWeekStart', () => {
  it('should return the same date if the input date is a Sunday', () => {
    const sunday = DateTime.fromISO('2024-09-15'); // Sunday
    const result = getWeekStart(sunday);
    expect(result.toISO()).toBe(sunday.startOf('day').toISO());
  });

  it('should return the previous Sunday if the input date is a Monday', () => {
    const monday = DateTime.fromISO('2024-09-16'); // Monday
    const result = getWeekStart(monday);
    const expectedSunday = DateTime.fromISO('2024-09-15'); // Previous Sunday
    expect(result.toISO()).toBe(expectedSunday.startOf('day').toISO());
  });

  it('should return the previous Sunday if the input date is a Wednesday', () => {
    const wednesday = DateTime.fromISO('2024-09-18'); // Wednesday
    const result = getWeekStart(wednesday);
    const expectedSunday = DateTime.fromISO('2024-09-15'); // Previous Sunday
    expect(result.toISO()).toBe(expectedSunday.startOf('day').toISO());
  });

  it('should return the same date if the input date is exactly midnight on Sunday', () => {
    const sundayMidnight = DateTime.fromISO('2024-09-15T00:00:00'); // Sunday midnight
    const result = getWeekStart(sundayMidnight);
    expect(result.toISO()).toBe(sundayMidnight.toISO());
  });

  it('should handle end of year dates correctly', () => {
    const newYearEve = DateTime.fromISO('2024-12-31'); // Tuesday
    const result = getWeekStart(newYearEve);
    const expectedSunday = DateTime.fromISO('2024-12-29'); // Previous Sunday
    expect(result.toISO()).toBe(expectedSunday.startOf('day').toISO());
  });

  it('should handle leap year dates correctly', () => {
    const leapDay = DateTime.fromISO('2024-02-29'); // Thursday in a leap year
    const result = getWeekStart(leapDay);
    const expectedSunday = DateTime.fromISO('2024-02-25'); // Previous Sunday
    expect(result.toISO()).toBe(expectedSunday.startOf('day').toISO());
  });

  it('should return Sunday when input date is the first day of the year and it is not Sunday', () => {
    const janFirst = DateTime.fromISO('2024-01-01'); // Monday
    const result = getWeekStart(janFirst);
    const expectedSunday = DateTime.fromISO('2023-12-31'); // Previous Sunday
    expect(result.toISO()).toBe(expectedSunday.startOf('day').toISO());
  });

  it('should handle dates in different time zones', () => {
    const dateInTimezone = DateTime.fromISO('2024-09-18T12:00:00', {
      zone: 'America/New_York',
    }); // Wednesday in EST
    const result = getWeekStart(dateInTimezone);
    const expectedSunday = DateTime.fromISO('2024-09-15T00:00:00', {
      zone: 'America/New_York',
    });
    expect(result.toISO()).toBe(expectedSunday.startOf('day').toISO());
  });

  it('should ensure the result is at the start of the day', () => {
    const wednesday = DateTime.fromISO('2024-09-18T15:30:00'); // Random time on Wednesday
    const result = getWeekStart(wednesday);
    const expectedSunday = DateTime.fromISO('2024-09-15').startOf('day');
    expect(result.hour).toBe(0);
    expect(result.minute).toBe(0);
    expect(result.second).toBe(0);
    expect(result.toISO()).toBe(expectedSunday.toISO());
  });
});

describe('formatUtcOffset', () => {
  // Spy on DateTime.local before each test
  let localSpy: MockInstance;

  beforeEach(() => {
    localSpy = vi.spyOn(DateTime, 'local');
  });

  // Restore the original implementation after each test
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return UTC+00 when offset is 0 minutes', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC' });
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC+00');
  });

  it('should return UTC+05 for a positive 300 minutes offset', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC+5' });
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC+05');
  });

  it('should return UTC-04 for a negative 240 minutes offset', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC-4' });
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC-04');
  });

  it('should return UTC+14 for the maximum positive offset', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC+14' });
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC+14');
  });

  it('should return UTC-12 for the maximum negative offset', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC-12' });
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC-12');
  });

  it('should pad single-digit positive hours with a leading zero', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC+9' });
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC+09');
  });

  it('should pad single-digit negative hours with a leading zero', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC-7' });
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC-07');
  });

  it('should floor the offset to the nearest hour when offset includes minutes', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC+5:30' }); // 5 hours 30 minutes
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC+05');
  });

  it('should handle half-hour negative offsets correctly', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC-3:30' }); // -3 hours 30 minutes
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC-03');
  });

  it('should handle offsets with additional minutes correctly by flooring', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC+2:45' }); // 2 hours 45 minutes
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC+02');
  });

  it('should return UTC+00 for positive offsets less than an hour', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC+0:30' }); // 30 minutes
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC+00');
  });

  it('should return UTC-00 for negative offsets less than an hour', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC-0:30' }); // -30 minutes
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC-00');
  });

  it('should handle zero offset correctly regardless of the DateTime instance', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC+0' }); // UTC time
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC+00');
  });

  it('should correctly format for offsets with exactly 60 minutes', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC+1' });
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC+01');
  });

  it('should correctly format for offsets with exactly -60 minutes', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC-1' });
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC-01');
  });

  it('should return UTC+00 for positive offsets less than 60 minutes', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC+0:45' });
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC+00');
  });

  it('should return UTC-00 for negative offsets less than 60 minutes', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC-0:15' });
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC-00');
  });

  it('should correctly handle non-integer hour offsets by flooring', () => {
    const mockDateTime = DateTime.fromObject({}, { zone: 'UTC+5:59' }); // 5 hours 59 minutes
    localSpy.mockReturnValue(mockDateTime);

    expect(formatUtcOffset()).toBe('UTC+05');
  });
});
