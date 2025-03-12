import { DateTime } from 'luxon';
import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as formatters from '../utils/formatters';

export interface SetParamOptions {
  /** If setting more than one param, use this to stack multiple params at once.  @default false  */
  skipNavigate?: boolean;
}

export type GetParamFunction<T> = (key: string) => T | null;

export type SetParamFunction<T> = (
  key: string,
  value: T | null,
  options?: SetParamOptions
) => void;

/**
 *  This hook is a wrapper around
 * `useSearchParams` from `react-router-dom` that provides a more convenient
 * and consistent API for setting and getting search params and tries to handle
 * edge cases like empty strings and arrays.
 */
export const useSearchParamState = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  /** The main getter. Could also be thought of as getString.  */
  const getParam: GetParamFunction<string | null> = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const getArray: GetParamFunction<Array<string>> = useCallback(
    (key) => {
      return formatters.parseArray(getParam(key)) ?? [];
    },
    [getParam]
  );

  const getNumberArray: GetParamFunction<Array<number>> = useCallback(
    (key) => {
      return formatters.parseNumberArray(getParam(key)) ?? [];
    },
    [getParam]
  );

  const getDateTime: GetParamFunction<DateTime | null> = useCallback(
    (key) => {
      return formatters.parseDateTime(getParam(key));
    },
    [getParam]
  );

  /**
   * Sets a search parameter and navigates to it. Deletes it if not.
   * This is the base setter. It is ultimately used by the other setters.
   */
  const setParam: SetParamFunction<string> = useCallback(
    (
      key,
      value,
      config = {
        skipNavigate: false,
      }
    ) => {
      // The regex /^(,*)$/ tests if the value is an empty string or contains only commas.
      // If the value is not empty, contains at least one non-comma character, and is not null,
      // it will be set as the value for the search parameter.
      if (
        value &&
        value.trim() !== '' &&
        !/^(,*)$/.test(value) &&
        value !== null
      ) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }

      if (!config?.skipNavigate) {
        navigate(`?${searchParams.toString()}`);
      }
    },
    [searchParams, navigate]
  );

  const setArray: SetParamFunction<Array<string | number>> = useCallback(
    (key, value, config) => {
      setParam(key, formatters.formatArray(value), config);
    },
    [setParam]
  );

  const setDateTime: SetParamFunction<DateTime> = useCallback(
    (key, value, config) => {
      setParam(key, formatters.formatDateTime(value), config);
    },
    [setParam]
  );

  return {
    setParam,
    getParam,
    getArray,
    getNumberArray,
    setArray,
    getDateTime,
    setDateTime,
  };
};
