import { describe, expect, test } from 'vitest';
import { DateTime } from 'luxon';
import {
  formatArray,
  parseArray,
  parseNumberArray,
  formatDateTime,
  parseDateTime,
} from './formatters';

describe('formatters', {}, () => {
  test('formatArray', () => {
    expect(formatArray(['test', 'test2'])).toBe('test,test2');
    expect(formatArray([])).toBe('');
    expect(formatArray(null)).toBe(null);
    expect(formatArray(['test'])).toBe('test');
    expect(formatArray(['test', '', ''])).toBe('test,,');
    // @ts-expect-error - testing for null param
    expect(formatArray(['test', null])).toBe('test');
    expect(formatArray(['test', 9])).toBe('test,9');
  });

  test('parseArray', () => {
    expect(parseArray('test,test2')).toEqual(['test', 'test2']);
    expect(parseArray(null)).toBe(null);
    expect(parseArray('')).toEqual(null);
    expect(parseArray('test')).toEqual(['test']);
    expect(parseArray('test,,')).toEqual(['test', '', '']);
  });

  test('parseNumberArray', () => {
    expect(parseNumberArray('1,2')).toEqual([1, 2]);
    expect(parseNumberArray(null)).toBe(null);
    expect(parseNumberArray('')).toEqual(null);
    expect(parseNumberArray('1')).toEqual([1]);
    expect(parseNumberArray('1,2,')).toEqual([1, 2]);
    expect(parseNumberArray('cat,dog')).toEqual([]);
    expect(parseNumberArray('1,cat')).toEqual([1]);
    expect(parseNumberArray('1,2,,')).toEqual([1, 2]);
  });

  test('formatDateTime', () => {
    const mockIsoString = '2021-09-01T00:00:00.000Z';
    const dateTime = DateTime.fromISO(mockIsoString).setZone('utc');
    expect(formatDateTime(dateTime)).toBe(mockIsoString);
    expect(formatDateTime(null)).toBe(null);
  });

  test('parseDateTime', () => {
    const mockIsoString = '2021-09-01T00:00:00.000Z';
    const dateTime = DateTime.fromISO(mockIsoString);
    expect(parseDateTime(dateTime.toISO())?.equals(dateTime)).toBe(true);
    expect(parseDateTime(null)).toBe(null);
  });
});
