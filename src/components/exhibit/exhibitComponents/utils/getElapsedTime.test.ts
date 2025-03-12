import { DateTime } from 'luxon';
import { describe, expect, it } from 'vitest';
import { getElapsedTime } from './getElapsedTime';

describe('Exhibit Componenents - Utils - elapsedTime', () => {
  it('getElapsedTime', () => {
    const locale = 'en-US';
    const now = DateTime.fromObject(
      { year: 2024, month: 11, day: 1 },
      { zone: 'America/New_York' }
    );
    expect(getElapsedTime(now.toJSDate(), null, locale)).toBeNull();

    // Minutes
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ seconds: 10 }).toISO(), locale)
    ).toBe('0 minutes');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ minute: 1 }).toISO(), locale)
    ).toBe('1 minute');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ minute: 2 }).toISO(), locale)
    ).toBe('2 minutes');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ minute: 2.6 }).toISO(), locale)
    ).toBe('2 minutes');

    // Hours
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ hour: 1 }).toISO(), locale)
    ).toBe('1 hour');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ hour: 2 }).toISO(), locale)
    ).toBe('2 hours');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ hour: 2.6 }).toISO(), locale)
    ).toBe('2 hours');

    // Days

    expect(
      getElapsedTime(now.toJSDate(), now.minus({ day: 1 }).toISO(), locale)
    ).toBe('1 day');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ day: 8 }).toISO(), locale)
    ).toBe('8 days');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ day: 2.6 }).toISO(), locale)
    ).toBe('2 days');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ day: 32 }).toISO(), locale)
    ).toBe('1 month');

    // Months
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ month: 1 }).toISO(), locale)
    ).toBe('1 month');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ month: 2 }).toISO(), locale)
    ).toBe('2 months');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ month: 2.6 }).toISO(), locale)
    ).toBe('2 months');

    // Years
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ year: 1 }).toISO()),
      locale
    ).toBe('1 year');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ year: 2 }).toISO()),
      locale
    ).toBe('2 years');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ year: 2.6 }).toISO(), locale)
    ).toBe('2 years');

    // Different locale, zh-sg = Chinese (Singapore)
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ hour: 1 }).toISO(), 'zh-sg')
    ).toBe('1小时');
    expect(
      getElapsedTime(now.toJSDate(), now.minus({ hour: 2 }).toISO(), 'zh-sg')
    ).toEqual('2小时');

    // Negative duration
    expect(
      getElapsedTime(now.minus({ minute: 1 }).toJSDate(), now.toISO(), locale)
    ).toBe('0 minutes');

    // No duration
    expect(getElapsedTime(now.toJSDate(), now.toISO(), locale)).toBe(
      '0 minutes'
    );
  });
});
