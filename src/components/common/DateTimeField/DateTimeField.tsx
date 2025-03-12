import { FunctionComponent } from 'react';
import {
  DateTimeFieldProps as MuiDateTimeFieldProps,
  DateTimeField as MuiDateTimeField,
} from '@mui/x-date-pickers';
import type { DateTime } from 'luxon';
import cx from 'classnames';
import { TextField } from '../TextField';

export type DateTimeFieldProps = MuiDateTimeFieldProps<DateTime>;

export const DateTimeField: FunctionComponent<DateTimeFieldProps> = ({
  className,
  ...props
}) => {
  return (
    <MuiDateTimeField
      className={cx('DateTimeField', className)}
      slots={{ textField: TextField }}
      {...props}
    />
  );
};
