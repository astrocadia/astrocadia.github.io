import { DateTime } from 'luxon';
import cx from 'classnames';
import { useCallback, useState, type FunctionComponent } from 'react';
import {
  ToolbarProps as RbcToolbarProps,
  Navigate,
  type NavigateAction,
} from 'react-big-calendar';
import { ArrowBackIcon, ArrowForwardIcon } from '../common/icons';
import { Button } from '../common/buttons';
import { IconButton } from '../common/buttons/IconButton';
import { GumbandDateProvider } from '../common/DatePickerCalendar/gumbandDateProvider';
import { getWeekStart } from './utils/date';
import { DatePickerDropdown } from '../common/DatePickerDropdown';
import './BigCalendarToolbar.css';

const TODAY_LABEL = 'Today' as const;

export interface ToolbarProps extends RbcToolbarProps {
  className?: string;
}

/**
 * A toolbar component that replaces the built-in toolbar for React Big Calendar.
 * @see https://github.com/jquense/react-big-calendar/blob/master/src/Toolbar.js
 */
export const BigCalendarToolbar: FunctionComponent<ToolbarProps> = ({
  className,
  onNavigate,
  label,
  ...rest
}) => {
  const [date, setDate] = useState(DateTime.now());

  /** This sets the week range based on date selected. */
  const handleNavigate = useCallback(
    (navigate: NavigateAction, newDate?: DateTime | null) => {
      let dateToUse = newDate ?? date;

      switch (navigate) {
        case Navigate.PREVIOUS:
          dateToUse = dateToUse.minus({ weeks: 1 });
          break;
        case Navigate.NEXT:
          dateToUse = dateToUse.plus({ weeks: 1 });
          break;
        case Navigate.TODAY:
          dateToUse = DateTime.now();
          break;
        default:
          break;
      }

      const weekStartDate = getWeekStart(dateToUse);
      setDate(weekStartDate);
      onNavigate(Navigate.DATE, dateToUse.toJSDate());
    },
    [setDate, onNavigate, date]
  );

  return (
    <GumbandDateProvider>
      <div className={cx('BigCalendarToolbar', className)} {...rest}>
        <IconButton onClick={() => handleNavigate(Navigate.PREVIOUS)}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={() => handleNavigate(Navigate.NEXT)}>
          <ArrowForwardIcon />
        </IconButton>
        <Button onClick={() => handleNavigate(Navigate.TODAY)}>
          {TODAY_LABEL}
        </Button>
        <DatePickerDropdown
          value={date}
          onChange={(dateTime) => handleNavigate(Navigate.DATE, dateTime)}
          view='week'
          DatePickerCalendarProps={{
            disableFuture: false,
          }}
        />
      </div>
    </GumbandDateProvider>
  );
};
