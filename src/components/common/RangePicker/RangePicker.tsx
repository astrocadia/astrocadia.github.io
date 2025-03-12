import {
  PickersShortcutsItem,
  PickersShortcutsItemContext,
} from '@mui/x-date-pickers';
import cx from 'classnames';
import { DateTime } from 'luxon';
import {
  type FunctionComponent,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';
import { Button } from '../buttons';
import { GumbandDateProvider } from '../DatePickerCalendar/gumbandDateProvider';
import {
  DateTimeAccordionPicker,
  type DateTimeAccordionPickerFields,
  type DateTimeValidationError,
} from '../DateTimeAccordionPicker';
import { useMenu } from '../hooks/useMenu';
import { DateRangeIcon } from '../icons';
import { MenuToggleButton } from '../MenuToggleButton';
import { PickersShortcuts } from '../PickersShortcuts';
import { Popover } from '../Popover';
import type { MouseOrKeyboardEvent } from '../utils/eventHelpers';
import { defaultShortcuts } from './defaultShortcuts';
import './RangePicker.css';

/**
 * This essentially implements the Mui `DateRange` type that's only in the Pro version.
 * Keeping it as a tuple as opposed to an object, we'll be able to work with the Mui DateRange
 * better if we ever get access to it.
 */
export type DateTimeRangeValue = [DateTime | undefined, DateTime | undefined];
export const DEFAULT_DATE_RANGE: DateTimeRangeValue = [undefined, undefined];

export interface DateRangeShortcutItem
  // This is me faking the Mui `DateRangeShortcutItem` type.
  // see https://mui.com/x/react-date-pickers/shortcuts/#range-shortcuts
  extends PickersShortcutsItem<DateTimeRangeValue> {
  /** The first item with `default === true` will be the default. */
  default?: boolean;
}
export type Shortcut = DateRangeShortcutItem | null;
type AccordionState = 'start' | 'end' | '';

interface RangePickerProps {
  className?: string;
  /**
   * The format of the date and time labels. See the Luxon documentation for the full list of tokens.
   * @default 'MMM dd, yyyy tt'
   * @see https://moment.github.io/luxon/#/formatting?id=table-of-tokens
   */
  appliedShortcut?: Shortcut;
  buttonDateTimeFormat?: string;
  disabled?: boolean;
  defaultErrorMessage?: string;
  minDateTime?: DateTime;
  maxDateTime?: DateTime;
  onApplyShortcut?: (shortcut: Shortcut) => void;
  onChange?: (value: DateTimeRangeValue) => void;
  shortcuts?: DateRangeShortcutItem[];
  value?: DateTimeRangeValue;
}

export const RangePicker: FunctionComponent<RangePickerProps> = ({
  className,
  buttonDateTimeFormat = 'MMM dd, yyyy T',
  disabled,
  defaultErrorMessage = 'Invalid Date and Time',
  minDateTime = DateTime.fromMillis(0),
  maxDateTime = DateTime.now(),
  onChange,
  shortcuts = defaultShortcuts,
  onApplyShortcut = () => {},
  appliedShortcut = null,
  value = [...DEFAULT_DATE_RANGE],
  ...props
}) => {
  const popoverId = useId();
  const {
    anchorEl,
    open,
    handleOpenMenu: openMenu,
    handleCloseMenu: closeMenu,
  } = useMenu();

  const [unappliedShortcut, setUnappliedShortcut] = useState<Shortcut>(null);
  const [hasClickedShortcut, setHasClickedShortcut] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasChangedRange, setHasChangedRange] = useState(false);

  /**
   * We don't want to enforce a hard "end date" for shortcuts because if we do that,
   * refreshing the page will not show new logs. However, we don't want to show an empty date
   * to the user, so we'll use the current date as the end date. This doesn't affect the
   * actual value of the range. */
  const internalValue = useMemo(() => {
    const [start, end] = value;

    if (!end) {
      return [start, maxDateTime] as DateTimeRangeValue;
    }

    return value;
  }, [value, maxDateTime]);

  const [startDate, endDate] = internalValue;
  const [unappliedDateTimeRange, setUnappliedDateTimeRange] =
    useState<DateTimeRangeValue>(internalValue);
  const [newStartDate, newEndDate] = unappliedDateTimeRange;

  const showError = useMemo(() => {
    // Since a range can include an undefined value, if both don't exist then we can
    // just return whether the error state is false.
    if (!newStartDate || !newEndDate) {
      return hasError;
    }

    const newDatesAreSequential = newStartDate <= newEndDate;
    return !newDatesAreSequential || hasError;
  }, [hasError, newEndDate, newStartDate]);

  const canApply = useMemo(() => {
    return !showError && (hasClickedShortcut || hasChangedRange);
  }, [hasChangedRange, hasClickedShortcut, showError]);

  const helperText: string | undefined = useMemo(() => {
    if (showError) {
      return defaultErrorMessage;
    }

    return undefined;
  }, [defaultErrorMessage, showError]);

  const formattedDateRange = useMemo(() => {
    const formattedStartDate = startDate?.toFormat(buttonDateTimeFormat) || '';
    const formattedEndDate = endDate?.toFormat(buttonDateTimeFormat) || '';

    if (!formattedStartDate || !formattedEndDate) {
      return 'Select Date Range';
    }

    return `${formattedStartDate} - ${formattedEndDate}`;
  }, [endDate, startDate, buttonDateTimeFormat]);

  const computedButtonLabel = useMemo(() => {
    if (appliedShortcut) {
      return appliedShortcut.label;
    }

    return formattedDateRange;
  }, [appliedShortcut, formattedDateRange]);

  const [accordionState, setAccordionState] = useState<AccordionState>('');
  const [visiblePicker, setVisiblePicker] =
    useState<DateTimeAccordionPickerFields>('date');

  /// Event Handlers
  const handleOpenMenu = useCallback(
    (event: MouseOrKeyboardEvent) => {
      setUnappliedShortcut(appliedShortcut);
      setUnappliedDateTimeRange(internalValue);
      setAccordionState('');

      if (
        event.type === 'click' ||
        (event instanceof KeyboardEvent &&
          (event.key === 'Enter' || event.key === ' '))
      ) {
        openMenu(event);
      }
    },
    [appliedShortcut, openMenu, internalValue]
  );

  const handleShortcutsChange = useCallback(
    (
      newValue: DateTimeRangeValue,
      _changeImportance: unknown,
      shortcut: PickersShortcutsItemContext | undefined
    ) => {
      setUnappliedShortcut(
        shortcut
          ? {
              label: shortcut.label,
              getValue: () => newValue,
            }
          : null
      );
      setHasClickedShortcut(true);

      const [maybeStart, maybeEnd] = newValue;
      const start = maybeStart ?? minDateTime;
      const end = maybeEnd ?? maxDateTime;

      setUnappliedDateTimeRange([start, end]);
    },
    [maxDateTime, minDateTime]
  );

  const handleDateTimeChange = useCallback(
    (date: DateTime | undefined, period: Omit<AccordionState, ''>) => {
      setHasChangedRange(true);

      if (period === 'start') {
        setUnappliedDateTimeRange([date, newEndDate]);
      } else {
        setUnappliedDateTimeRange([newStartDate, date]);
      }

      // Since we're using custom times, we need to show that a shortcut isn't being applied.
      setUnappliedShortcut(null);
    },
    [newEndDate, newStartDate]
  );

  const handleError = useCallback((errorType: DateTimeValidationError) => {
    setHasError(!!errorType);
  }, []);

  const handleCloseMenu = useCallback(() => {
    closeMenu();
    setHasError(false);
    setHasClickedShortcut(false);
    setHasChangedRange(false);
  }, [closeMenu]);

  const handleApply = useCallback(() => {
    if (!canApply) return;

    if (unappliedDateTimeRange) {
      onChange?.(unappliedDateTimeRange);
      onApplyShortcut(unappliedShortcut);
    } else if (unappliedShortcut) {
      onApplyShortcut(unappliedShortcut);
    }

    setUnappliedShortcut(null);
    handleCloseMenu();
  }, [
    canApply,
    onChange,
    onApplyShortcut,
    unappliedDateTimeRange,
    unappliedShortcut,
    handleCloseMenu,
  ]);

  const handleFocusWithin = useCallback(
    (focusedField: DateTimeAccordionPickerFields, period: AccordionState) => {
      // If we're focusing on a different field, we should close the accordion.
      if (accordionState !== period || visiblePicker !== focusedField) {
        setAccordionState('');
      }
    },
    [accordionState, visiblePicker]
  );

  const handleAdornmentClick = useCallback(
    (field: DateTimeAccordionPickerFields, period: AccordionState) => {
      if (visiblePicker === field && accordionState === period) {
        setAccordionState('');
      } else {
        setAccordionState(period);
      }

      setVisiblePicker(field);
    },
    [accordionState, visiblePicker]
  );

  return (
    <>
      {/* Activator Button */}
      <MenuToggleButton
        className={cx('RangePicker', className)}
        disabled={disabled}
        onClick={handleOpenMenu}
        onKeyUp={handleOpenMenu}
        open={open}
        startIcon={<DateRangeIcon />}
        {...props}
      >
        {computedButtonLabel}
      </MenuToggleButton>
      {/* Dropdown Content */}
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className='RangePicker__popover'
        classes={{ paper: 'RangePicker__popoverPaper' }}
        id={popoverId}
        open={open}
        onClose={handleCloseMenu}
      >
        {/* Shortcuts (Quick Select) */}
        <PickersShortcuts
          label='Quick Select'
          items={shortcuts.map((shortcut) => {
            return {
              ...shortcut,
              selected: unappliedShortcut?.label === shortcut.label,
            };
          })}
          onChange={handleShortcutsChange}
          isValid={() => true}
        />
        {/* DateTime selectors */}
        <div className='RangePicker__dateTimePickers'>
          <GumbandDateProvider>
            {/* Start Time container */}
            <div>
              <div className='RangePicker__heading'>Start Time</div>
              <DateTimeAccordionPicker
                error={showError}
                helperText={helperText}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
                onAdornmentClick={(field) =>
                  handleAdornmentClick(field, 'start')
                }
                onChange={(date) =>
                  handleDateTimeChange(date ?? undefined, 'start')
                }
                onError={handleError}
                onFocusWithin={(field) => handleFocusWithin(field, 'start')}
                open={accordionState === 'start'}
                value={newStartDate || startDate}
              />
            </div>
            {/* End Time container */}
            <div>
              <div className='RangePicker__heading'>End Time</div>
              <DateTimeAccordionPicker
                error={showError}
                helperText={helperText}
                maxDateTime={maxDateTime}
                minDateTime={minDateTime}
                onAdornmentClick={(field) => handleAdornmentClick(field, 'end')}
                onChange={(date) =>
                  handleDateTimeChange(date ?? undefined, 'end')
                }
                onError={handleError}
                onFocusWithin={(field) => handleFocusWithin(field, 'end')}
                open={accordionState === 'end'}
                value={newEndDate ?? endDate}
              />
            </div>
          </GumbandDateProvider>
          <div className='RangePicker__actionButtonsContainer'>
            <Button onClick={handleCloseMenu}>Cancel</Button>
            <Button
              disabled={!canApply}
              onClick={handleApply}
              variant='secondary'
            >
              Apply
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
};
