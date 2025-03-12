import cx from 'classnames';
import { type FunctionComponent } from 'react';
import { ObjectValues } from '../../../utils/usefulTS';
import { Dot } from '../Dot';
import { ListItemSecondaryAction } from '../ListItemSecondaryAction';
import { ListItemText } from '../ListItemText';
import { MenuItem } from '../MenuItem';
import type { SelectProps } from '../Select';
import { TextField, type TextFieldProps } from '../TextField';
import {
  CalendarDayIcon,
  CalendarMonthIcon,
  CalendarWeekIcon,
  CalendarYearIcon,
} from '../icons';
import './DateControl.css';

export const DATE_PERIOD = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
} as const;

export type DatePeriod = ObjectValues<typeof DATE_PERIOD>;
export type DateControlLabels = Record<DatePeriod, string>;

const DatePeriodOrder: Readonly<Array<DatePeriod>> = [
  'day',
  'week',
  'month',
  'year',
] as const;

const DatePeriodIcons: Readonly<Record<DatePeriod, JSX.Element>> = {
  day: <CalendarDayIcon />,
  week: <CalendarWeekIcon />,
  month: <CalendarMonthIcon />,
  year: <CalendarYearIcon />,
};

const DefaultPrimaryLabels: DateControlLabels = {
  day: 'Day',
  week: 'Week',
  month: 'Month',
  year: 'Year',
};

const DefaultSecondaryLabels: DateControlLabels = {
  day: 'Data by hour',
  week: 'Data by day',
  month: 'Data by day',
  year: 'Data by month',
};

type IncludedTextFieldProps =
  | 'autoFocus'
  | 'error'
  | 'fullWidth'
  | 'helperText'
  | 'label'
  | 'name'
  | 'orientation'
  | 'required';

export interface DateControlProps
  extends Pick<TextFieldProps, IncludedTextFieldProps> {
  className?: string;
  disableDay?: boolean;
  disableWeek?: boolean;
  disableMonth?: boolean;
  disableYear?: boolean;
  displayEmpty?: SelectProps['displayEmpty'];
  onChange: (period: DatePeriod) => void;
  period?: DatePeriod;
  primaryLabels?: DateControlLabels;
  secondaryLabels?: DateControlLabels;
  TextFieldProps?: TextFieldProps;
}

export const DateControl: FunctionComponent<DateControlProps> = ({
  className,
  disableDay = false,
  disableWeek = false,
  disableMonth = false,
  disableYear = false,
  displayEmpty,
  onChange,
  period,
  primaryLabels = DefaultPrimaryLabels,
  secondaryLabels = DefaultSecondaryLabels,
  TextFieldProps = {},
  ...rest
}) => {
  const disabledOptions: Record<DatePeriod, boolean> = {
    day: disableDay,
    week: disableWeek,
    month: disableMonth,
    year: disableYear,
  };

  return (
    <TextField
      select
      className={cx('DateControl', className)}
      onChange={(event) => onChange(event.target.value as DatePeriod)}
      value={period || ''}
      SelectProps={{
        displayEmpty,
        renderValue: (value) =>
          value ? (
            <div className='DateControl__currentValue'>
              {DatePeriodIcons[value as DatePeriod]}

              <span>{primaryLabels?.[value as DatePeriod]}</span>
            </div>
          ) : undefined,
      }}
      {...rest}
      {...TextFieldProps}
    >
      {DatePeriodOrder.map((datePeriod) => {
        if (disabledOptions[datePeriod]) {
          return null;
        }

        return (
          <MenuItem
            key={datePeriod}
            leadingIcon={DatePeriodIcons[datePeriod]}
            value={datePeriod}
          >
            <ListItemText
              primary={primaryLabels?.[datePeriod]}
              secondary={secondaryLabels?.[datePeriod]}
            />
            {datePeriod === period && (
              <ListItemSecondaryAction>
                <Dot />
              </ListItemSecondaryAction>
            )}
          </MenuItem>
        );
      })}
    </TextField>
  );
};
