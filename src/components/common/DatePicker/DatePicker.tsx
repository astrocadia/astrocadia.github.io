import {
  DatePicker as MuiDatePicker,
  type DatePickerProps as MuiDatePickerProps,
  type DatePickerSlotsComponentsProps as MuiDatePickerSlotProps,
} from '@mui/x-date-pickers';
import cx from 'classnames';
import { DateTime } from 'luxon/src/luxon';
import { useRef, type FunctionComponent } from 'react';
import { IconButton } from '../buttons/IconButton';
import { DatePickerActionBar } from '../DatePickerCalendar/common/DatePickerActionBar';
import { DatePickerCalendarHeader } from '../DatePickerCalendar/common/DatePickerCalendarHeader';
import '../DatePickerCalendar/DatePickerCalendar.css';
import { Dialog } from '../Dialog';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CalendarMonthIcon,
  ChevronIcon,
} from '../icons';
import '../MultiSectionDigitalClock/MultiSectionDigitalClock.css';
import { TextField } from '../TextField';
import './DatePicker.css';
import { InputAdornment } from '../InputAdornment';
import { InputAdornmentButton } from '../InputAdornmentButton';
import { PickersShortcuts, PickersShortcutsProps } from '../PickersShortcuts';

export interface DatePickerSlotProps<T>
  extends Omit<MuiDatePickerSlotProps<T>, 'shortcuts'> {
  shortcuts?: Partial<PickersShortcutsProps<T>>;
}

export interface DatePickerProps
  extends Omit<
    MuiDatePickerProps<DateTime>,
    'sx' | 'orientation' | 'slotProps'
  > {
  fullWidth?: boolean;
  orientation?: 'horizontal' | 'vertical';
  error?: boolean;
  helperText?: string;
  slotProps?: DatePickerSlotProps<DateTime | null>;
}

export const DatePicker: FunctionComponent<DatePickerProps> = ({
  className,
  fullWidth,
  orientation = 'horizontal',
  error,
  helperText,
  slots = {},
  slotProps = {},
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <MuiDatePicker
      className={cx('DatePicker', className)}
      inputRef={inputRef}
      showDaysOutsideCurrentMonth
      slots={
        {
          ...slots,
          inputAdornment: InputAdornment,
          actionBar: DatePickerActionBar,
          openPickerIcon: CalendarMonthIcon,
          calendarHeader: DatePickerCalendarHeader,
          previousIconButton: IconButton,
          leftArrowIcon: ArrowBackIcon,
          nextIconButton: IconButton,
          rightArrowIcon: ArrowForwardIcon,
          switchViewButton: ChevronIcon,
          toolbar: undefined,
          dialog: Dialog,
          textField: TextField,
          shortcuts: PickersShortcuts,
          // There are issues with typing the slots prop
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          openPickerButton: InputAdornmentButton as any,
          // slotProps isn't able to be typed correctly yet for custom items: https://github.com/mui/mui-x/issues/9775
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      }
      slotProps={
        {
          ...slotProps,
          textField: { orientation, fullWidth, error, helperText },
          popper: { anchorEl: () => inputRef.current },
          layout: {
            className: 'DatePickerCalendar',
          },
          // slotProps isn't able to be typed correctly yet for custom items: https://github.com/mui/mui-x/issues/9775
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      }
      {...rest}
    />
  );
};
