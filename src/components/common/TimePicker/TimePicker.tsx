import {
  TimePicker as MuiTimePicker,
  type TimePickerProps as MuiTimePickerProps,
  type TimePickerSlotsComponentsProps as MuiTimePickerSlotProps,
} from '@mui/x-date-pickers';
import cx from 'classnames';
import type { DateTime } from 'luxon';
import { type FunctionComponent } from 'react';
import { DatePickerActionBar } from '../DatePickerCalendar/common/DatePickerActionBar';
import { Dialog } from '../Dialog';
import { DigitalClockSectionItem } from '../DigitalClockSectionItem';
import { InputAdornment } from '../InputAdornment';
import { InputAdornmentButton } from '../InputAdornmentButton';
import '../MultiSectionDigitalClock/MultiSectionDigitalClock.css';
import { TextField } from '../TextField';
import './TimePicker.css';
import { PickersShortcuts, PickersShortcutsProps } from '../PickersShortcuts';

export interface DateTimePickerSlotProps<T>
  extends Omit<MuiTimePickerSlotProps<T>, 'shortcuts'> {
  shortcuts?: Partial<PickersShortcutsProps<T>>;
}

export interface TimePickerProps
  extends Omit<MuiTimePickerProps<DateTime>, 'slotProps'> {
  error?: boolean;
  helperText?: string;
  slotProps?: DateTimePickerSlotProps<DateTime>;
}

export const TimePicker: FunctionComponent<TimePickerProps> = ({
  className,
  error,
  helperText,
  slots = {},
  slotProps = {},
  ...rest
}) => {
  return (
    <MuiTimePicker
      className={cx('TimePicker', className)}
      slots={
        {
          inputAdornment: InputAdornment,
          textField: TextField,
          dialog: Dialog,
          // There are issues with typing the slots prop
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          openPickerButton: InputAdornmentButton as any,
          digitalClockSectionItem: DigitalClockSectionItem,
          actionBar: DatePickerActionBar,
          shortcuts: PickersShortcuts,
          ...slots,
          // slotProps isn't able to be typed correctly yet for custom items: https://github.com/mui/mui-x/issues/9775
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      }
      slotProps={
        {
          layout: {
            className: 'MultiSectionDigitalClock',
          },
          textField: {
            error,
            helperText,
          },
          ...slotProps,
          // slotProps isn't able to be typed correctly yet for custom items: https://github.com/mui/mui-x/issues/9775
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      }
      {...rest}
    />
  );
};
