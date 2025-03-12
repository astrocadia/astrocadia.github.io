import { type FunctionComponent, useState, useCallback } from 'react';
import cx from 'classnames';
import { DateTime } from 'luxon';
import { type DateTimeValidationError as MuiDateTimeValidationError } from '@mui/x-date-pickers';
import { DateTimeField, type DateTimeFieldProps } from '../DateTimeField';
import { DatePickerCalendar } from '../DatePickerCalendar/DatePickerCalendar';
import { MultiSectionDigitalClock } from '../MultiSectionDigitalClock';
import { FormHelperText } from '../FormHelperText';
import { InputAdornment } from '../InputAdornment';
import { CalendarMonthIcon, TimeIcon } from '../icons';
import { InputAdornmentButton } from '../InputAdornmentButton';
import './DateTimeAccordionPicker.css';

export type DateTimeAccordionPickerFields = 'date' | 'time';
export type DateTimeValidationError = MuiDateTimeValidationError;

interface DateTimeAccordionPickerProps {
  className?: string;
  error?: boolean;
  helperText?: string;
  minDateTime?: DateTime;
  maxDateTime?: DateTime;
  onAdornmentClick?: (period: DateTimeAccordionPickerFields) => void;
  onChange?: (date: DateTime | null) => void;
  onError?: DateTimeFieldProps['onError'];
  onFocusWithin?: (period: DateTimeAccordionPickerFields) => void;
  open?: boolean;
  value?: DateTime | null;
}

export const DateTimeAccordionPicker: FunctionComponent<
  DateTimeAccordionPickerProps
> = ({
  className,
  error = false,
  helperText,
  minDateTime,
  maxDateTime,
  onAdornmentClick,
  onChange,
  onError,
  onFocusWithin,
  open,
  value,
}) => {
  const [visiblePicker, setVisiblePicker] =
    useState<DateTimeAccordionPickerFields>('date');

  const handleChange = useCallback(
    (date: DateTime | null) => {
      onChange?.(date);
    },
    [onChange]
  );

  const handleFocus = useCallback(
    (timePeriod: DateTimeAccordionPickerFields) => {
      onFocusWithin?.(timePeriod);
    },
    [onFocusWithin]
  );

  const handleError = useCallback<
    NonNullable<DateTimeAccordionPickerProps['onError']>
  >(
    (fieldError, fieldValue) => {
      onError?.(fieldError, fieldValue);
    },
    [onError]
  );

  const handleAdornmentClick = useCallback(
    (timePeriod: DateTimeAccordionPickerFields) => {
      onAdornmentClick?.(timePeriod);
      setVisiblePicker(timePeriod);
    },
    [onAdornmentClick]
  );

  return (
    <div className={cx('DateTimeAccordionPicker', className)}>
      {/* Input Fields */}
      <div className='DateTimeAccordionPicker__inputContainer'>
        <DateTimeField
          format='yyyy-MM-dd'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <InputAdornmentButton
                  onClick={() => handleAdornmentClick('date')}
                >
                  <CalendarMonthIcon />
                </InputAdornmentButton>
              </InputAdornment>
            ),
            error,
          }}
          maxDateTime={maxDateTime}
          minDateTime={minDateTime}
          onChange={handleChange}
          onError={handleError}
          onFocus={() => handleFocus('date')}
          value={value}
        />
        <DateTimeField
          format='hh:mm a'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <InputAdornmentButton
                  onClick={() => handleAdornmentClick('time')}
                >
                  <TimeIcon />
                </InputAdornmentButton>
              </InputAdornment>
            ),
            error,
          }}
          maxDateTime={maxDateTime}
          minDateTime={minDateTime}
          onChange={handleChange}
          onError={handleError}
          onFocus={() => handleFocus('time')}
          value={value}
        />
        {helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </div>
      {/* Accordion */}
      {open && (
        <div
          className={cx('DateTimeAccordionPicker__accordion', {
            DateTimeAccordionPicker__accordionOpen: open,
          })}
        >
          {visiblePicker === 'date' && (
            <DatePickerCalendar
              autoFocus
              className='DateTimeAccordionPicker__calendar'
              maxDate={maxDateTime}
              minDate={minDateTime}
              onChange={handleChange}
              value={value}
              view='day'
            />
          )}
          {visiblePicker === 'time' && (
            <MultiSectionDigitalClock
              autoFocus
              className='DateTimeAccordionPicker__clock'
              disableIgnoringDatePartForTimeValidation
              maxTime={maxDateTime}
              minTime={minDateTime}
              onChange={handleChange}
              value={value}
            />
          )}
        </div>
      )}
    </div>
  );
};
