import { DateTime } from 'luxon';

export type FormatterFunction<T> = (value: T | null) => string | null;
export type ParserFunction<T> = (valueStr: string | null) => T | null;

export const formatArray: FormatterFunction<Array<string | number> | null> = (
  values
) => {
  if (!values) {
    return null;
  }

  const filteredValues = values.filter((value) => value !== null).join(',');
  return filteredValues;
};

export const parseArray: ParserFunction<Array<string>> = (valueString) =>
  valueString ? valueString.split(',') : null;

export const parseNumberArray: ParserFunction<Array<number>> = (
  valueString
) => {
  if (!valueString) {
    return null;
  }

  const parsedValues = parseArray(valueString)?.filter(Boolean);
  return parsedValues
    ? parsedValues.map(Number)?.filter((value) => !Number.isNaN(value))
    : [];
};

export const formatDateTime: FormatterFunction<DateTime> = (value) =>
  value?.toISO() ?? null;
export const parseDateTime: ParserFunction<DateTime> = (isoString) =>
  isoString ? DateTime.fromISO(isoString) : null;
