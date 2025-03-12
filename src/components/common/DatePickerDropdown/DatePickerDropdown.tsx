import { DateTime, Interval } from 'luxon';
import { ComponentProps, FunctionComponent, useId, useMemo } from 'react';
import { exhaustiveGuard } from '../../../utils/usefulTS';
import {
  DatePickerCalendar,
  type DatePickerCalendarProps,
} from '../DatePickerCalendar/DatePickerCalendar';
import { Popover } from '../Popover';
import { FlowButton } from '../buttons/Button/FlowButton';
import { useMenu } from '../hooks/useMenu';

export interface DatePickerDropdownProps
  extends Pick<DatePickerCalendarProps, 'view'> {
  className?: string;
  DatePickerCalendarProps?: ComponentProps<typeof DatePickerCalendar>;
  fullWidth?: boolean;
  minDate?: DateTime;
  maxDate?: DateTime;
  onChange: (date: DateTime | null) => void;
  PopoverProps?: Omit<ComponentProps<typeof Popover>, 'children' | 'open'>;
  value: DateTime | null;
}

export const DatePickerDropdown: FunctionComponent<DatePickerDropdownProps> = ({
  className,
  DatePickerCalendarProps = {},
  fullWidth,
  onChange,
  minDate,
  maxDate,
  PopoverProps = {},
  value,
  view = 'day',
}) => {
  const popoverId = useId();
  const { anchorEl, open, handleOpenMenu, handleCloseMenu } = useMenu();

  const label = useMemo(() => {
    if (!value) {
      return 'Select a date';
    }

    switch (view) {
      case 'day':
        return value.toLocaleString(DateTime.DATE_FULL);
      case 'week':
        return Interval.fromDateTimes(
          value,
          value.plus({ days: 6 })
        ).toLocaleString({ day: 'numeric', month: 'long', year: 'numeric' });
      case 'month':
        return value.toLocaleString({ month: 'long', year: 'numeric' });
      case 'year':
        return value.toFormat('yyyy');
      default:
        exhaustiveGuard(view);
    }
    return value.toLocaleString(DateTime.DATE_FULL);
  }, [value, view]);

  const handleOnChange = useMemo(
    () => (newDate: DateTime | null) => {
      onChange?.(newDate);
      handleCloseMenu();
    },
    [onChange, handleCloseMenu]
  );

  return (
    <>
      <FlowButton
        className='DatePickerDropdown'
        fullWidth={fullWidth}
        open={open}
        onClick={handleOpenMenu}
        onKeyUp={handleOpenMenu}
      >
        {label}
      </FlowButton>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        id={popoverId}
        open={open}
        onClose={handleCloseMenu}
        {...PopoverProps}
      >
        <DatePickerCalendar
          className={className}
          view={view}
          value={value}
          onChange={handleOnChange}
          minDate={minDate}
          maxDate={maxDate}
          {...DatePickerCalendarProps}
        />
      </Popover>
    </>
  );
};
