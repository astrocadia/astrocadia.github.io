import cx from 'classnames';
import { DateTime, Duration } from 'luxon';
import { useCallback, useMemo, type FunctionComponent } from 'react';
import { startOf } from '../../../utils/date';
import {
  DateControl,
  type DateControlProps,
  type DatePeriod,
} from '../DateControl';
import {
  DatePickerDropdown,
  type DatePickerDropdownProps,
} from '../DatePickerDropdown';
import { IconButton } from '../buttons/IconButton';
import { ArrowBackIcon, ArrowForwardIcon } from '../icons';
import './DatePickerBar.css';

type DatePickerPropNames = 'onChange' | 'value' | 'view';
export interface DatePickerBarProps
  extends Pick<DatePickerDropdownProps, DatePickerPropNames>,
    Pick<DateControlProps, 'period'> {
  className?: string;
  DatePickerProps?: Omit<DatePickerDropdownProps, DatePickerPropNames>;
  DateControlProps?: Omit<DateControlProps, 'onChange'>;
  maxDate?: DateTime;
  minDate?: DateTime;
  onPeriodChange: DateControlProps['onChange'];
}

export const DatePickerBar: FunctionComponent<DatePickerBarProps> = ({
  className,
  DatePickerProps = {},
  DateControlProps = {},
  maxDate,
  minDate,
  onChange,
  onPeriodChange,
  value,
  period,
}) => {
  const backDisabled = useMemo(() => {
    if (!value || !period) {
      return true;
    }

    if (!minDate) {
      return false;
    }

    return value.minus({ [period]: 1 }) < startOf(minDate, period);
  }, [minDate, period, value]);

  const forwardDisabled = useMemo(() => {
    if (!value || !period) {
      return true;
    }

    if (!maxDate) {
      return false;
    }

    return value.plus({ [period]: 1 }) > maxDate;
  }, [maxDate, period, value]);

  const onBack = useCallback(() => {
    if (value && period) {
      onChange(value.minus({ [period]: 1 }));
    }
  }, [onChange, period, value]);

  const onForward = useCallback(() => {
    if (value && period) {
      onChange(value.plus({ [period]: 1 }));
    }
  }, [onChange, period, value]);

  const handleOnChange = useCallback(
    (newValue: DateTime | null) => {
      if (newValue && period) {
        onChange(startOf(newValue, period));
      } else {
        onChange(newValue);
      }
    },
    [onChange, period]
  );

  // If the period changes and the new period is smaller than the current period,
  // we need to update the value to the most current date in the new period.
  // If the new period is larger than the current period, we need to update the value to the start of the new period.
  const handleOnPeriodChange = useCallback(
    (newPeriod: DatePeriod) => {
      if (
        period &&
        Duration.fromObject({ [newPeriod]: 1 }) <
          Duration.fromObject({ [period]: 1 })
      ) {
        onChange(startOf(DateTime.now(), newPeriod));
      } else if (value) {
        onChange(startOf(value, newPeriod));
      }

      onPeriodChange(newPeriod);
    },
    [onChange, onPeriodChange, value, period]
  );

  return (
    <div className={cx('DatePickerBar', className)}>
      <IconButton disabled={backDisabled} onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
      <IconButton disabled={forwardDisabled} onClick={onForward}>
        <ArrowForwardIcon />
      </IconButton>
      <div className='DatePickerBar__datePicker'>
        <DatePickerDropdown
          onChange={handleOnChange}
          value={value}
          view={period}
          minDate={minDate}
          maxDate={maxDate}
          {...DatePickerProps}
        />
      </div>
      <DateControl
        onChange={handleOnPeriodChange}
        period={period}
        {...DateControlProps}
      />
    </div>
  );
};
