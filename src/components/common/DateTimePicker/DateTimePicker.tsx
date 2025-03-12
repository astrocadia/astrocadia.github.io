import {
  DateTimePicker as MuiDateTimePicker,
  type DateTimePickerProps as MuiDateTimePickerProps,
  type DateTimePickerSlotsComponentsProps as MuiDateTimePickerSlotProps,
} from '@mui/x-date-pickers';
import cx from 'classnames';
import { DateTime } from 'luxon/src/luxon';
import { useRef, type FunctionComponent } from 'react';
import { IconButton } from '../buttons/IconButton';
import { DatePickerActionBar } from '../DatePickerCalendar/common/DatePickerActionBar';
import { DatePickerCalendarHeader } from '../DatePickerCalendar/common/DatePickerCalendarHeader';
import '../DatePickerCalendar/DatePickerCalendar.css';
import { Dialog } from '../Dialog';
import { DigitalClockSectionItem } from '../DigitalClockSectionItem';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CalendarClockIcon,
  ChevronIcon,
} from '../icons';
import '../MultiSectionDigitalClock/MultiSectionDigitalClock.css';
import { TextField } from '../TextField';
import './DateTimePicker.css';
import { InputAdornmentButton } from '../InputAdornmentButton';
import { PickersShortcuts, PickersShortcutsProps } from '../PickersShortcuts';

export interface DateTimePickerSlotProps<T>
  extends Omit<MuiDateTimePickerSlotProps<T>, 'shortcuts'> {
  shortcuts?: Partial<PickersShortcutsProps<T>>;
}

export interface DateTimePickerProps
  extends Omit<
    MuiDateTimePickerProps<DateTime>,
    'sx' | 'orientation' | 'slotProps'
  > {
  fullWidth?: boolean;
  orientation?: 'horizontal' | 'vertical';
  slotProps?: DateTimePickerSlotProps<DateTime | null>;
  error?: boolean;
  helperText?: string;
}

export const DateTimePicker: FunctionComponent<DateTimePickerProps> = ({
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
    <MuiDateTimePicker
      className={cx('DateTimePicker', className)}
      inputRef={inputRef}
      showDaysOutsideCurrentMonth
      slots={
        {
          ...slots,
          actionBar: DatePickerActionBar,
          calendarHeader: DatePickerCalendarHeader,
          previousIconButton: IconButton,
          leftArrowIcon: ArrowBackIcon,
          nextIconButton: IconButton,
          rightArrowIcon: ArrowForwardIcon,
          switchViewButton: ChevronIcon,
          toolbar: undefined,
          dialog: Dialog,
          textField: TextField,
          digitalClockSectionItem: DigitalClockSectionItem,
          shortcuts: PickersShortcuts,
          openPickerIcon: CalendarClockIcon,
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
            className: cx(
              'DatePickerCalendar',
              'DateTimePicker__CalendarClockLayout'
            ),
          },
          // slotProps isn't able to be typed correctly yet for custom items: https://github.com/mui/mui-x/issues/9775
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      }
      {...rest}
    />
  );
};
