import { exhaustiveGuard } from '@deeplocal/gumband-public-shared-lib';
import { Fade } from '@mui/material';
import { styled, useThemeProps } from '@mui/material/styles';
import { unstable_composeClasses as composeClasses } from '@mui/utils';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers';
import { PickersCalendarHeaderOwnerState } from '@mui/x-date-pickers/PickersCalendarHeader/PickersCalendarHeader.types';
import { getPickersCalendarHeaderUtilityClass } from '@mui/x-date-pickers/PickersCalendarHeader/pickersCalendarHeaderClasses';
import {
  PickersArrowSwitcher,
  useLocaleText,
  useNextMonthDisabled,
  usePreviousMonthDisabled,
  useUtils,
} from '@mui/x-date-pickers/internals';
import cx from 'classnames';
import { Ref, RefAttributes, forwardRef } from 'react';
import { FlowButton } from '../../buttons/Button/FlowButton';
import './DatePickerCalendarHeader.css';

const useUtilityClasses = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ownerState: PickersCalendarHeaderOwnerState<any>
) => {
  const { classes } = ownerState;
  const slots = {
    root: ['root'],
    labelContainer: ['labelContainer'],
    label: ['label'],
    switchViewButton: ['switchViewButton'],
    switchViewIcon: ['switchViewIcon'],
  };

  return composeClasses(slots, getPickersCalendarHeaderUtilityClass, classes);
};

const PickersCalendarHeaderRoot = styled('div', {
  name: 'MuiPickersCalendarHeader',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root,
})<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ownerState: PickersCalendarHeaderOwnerState<any>;
}>({
  display: 'flex',
  alignItems: 'center',
  marginTop: 16,
  marginBottom: 8,
  paddingLeft: 24,
  paddingRight: 24,
  // prevent jumping in safari
  maxHeight: 30,
  minHeight: 30,
});

type PickersCalendarHeaderComponent = (<TDate>(
  props: PickersCalendarHeaderProps<TDate> & RefAttributes<HTMLButtonElement>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => React.JSX.Element) & { propTypes?: any };

const PickersCalendarHeaderLabelContainer = styled('div', {
  name: 'MuiPickersCalendarHeader',
  slot: 'LabelContainer',
  overridesResolver: (_, styles) => styles.labelContainer,
})<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ownerState: PickersCalendarHeaderOwnerState<any>;
}>(() => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'center',
  marginRight: 'auto',
}));

export const DatePickerCalendarHeader = forwardRef(
  function DatePickerCalendarHeader<TDate>(
    inProps: PickersCalendarHeaderProps<TDate>,
    ref: Ref<HTMLDivElement>
  ) {
    const localText = useLocaleText<TDate>();
    const utils = useUtils<TDate>();
    const props = useThemeProps({
      props: inProps,
      name: 'MuiPickersCalendarHeader',
    });

    const {
      slots,
      slotProps,
      currentMonth: month,
      disabled,
      disableFuture,
      disablePast,
      maxDate,
      minDate,
      onMonthChange,
      onViewChange,
      view,
      views,
      className,
      timezone,
      // Need to pull the next two props out as they are both unneeded and invalid for where `other` is used
      // eslint-disable-next-line @typescript-eslint/naming-convention
      reduceAnimations: _reduceAnimations,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      labelId: _labelId,
      ...other
    } = props;

    const ownerState = props;

    const classes = useUtilityClasses(props);

    const selectNextMonth = () => {
      switch (view) {
        case 'day':
          onMonthChange(utils.addMonths(month, 1), 'left');
          break;
        case 'month':
          onMonthChange(utils.addYears(month, 1), 'left');
          break;
        case 'year':
          // No Action
          break;
        default:
          exhaustiveGuard(view);
      }
    };

    const selectPreviousMonth = () => {
      switch (view) {
        case 'day':
          onMonthChange(utils.addMonths(month, -1), 'right');
          break;
        case 'month':
          onMonthChange(utils.addYears(month, -1), 'right');
          break;
        case 'year':
          // No Action
          break;
        default:
          exhaustiveGuard(view);
      }
    };

    const isNextMonthDisabled = useNextMonthDisabled(month, {
      disableFuture,
      maxDate,
      timezone,
    });

    const isPreviousMonthDisabled = usePreviousMonthDisabled(month, {
      disablePast,
      minDate,
      timezone,
    });

    const handleToggleView = () => {
      if (views.length === 1 || !onViewChange || disabled) {
        return undefined;
      }

      if (views.length === 2) {
        onViewChange(views.find((el) => el !== view) || views[0]);
      } else {
        // switching only between first 2
        const nextIndexToOpen = views.indexOf(view) !== 0 ? 0 : 1;
        onViewChange(views[nextIndexToOpen]);
      }

      return undefined;
    };

    return (
      <PickersCalendarHeaderRoot
        {...other}
        ownerState={ownerState}
        className={cx('DatePickerCalendarHeader', className, classes.root)}
        ref={ref}
        style={view === 'year' ? { display: 'none' } : {}}
      >
        <PickersCalendarHeaderLabelContainer
          ownerState={ownerState}
          className={classes.labelContainer}
        >
          <FlowButton onClick={handleToggleView} onKeyUp={handleToggleView}>
            {view === 'month'
              ? utils.format(month, 'year')
              : utils.format(month, 'monthAndYear')}
          </FlowButton>
        </PickersCalendarHeaderLabelContainer>
        <Fade in={view !== 'year'}>
          <PickersArrowSwitcher
            slots={slots}
            slotProps={slotProps}
            onGoToPrevious={selectPreviousMonth}
            isPreviousDisabled={isPreviousMonthDisabled}
            previousLabel={localText.previousMonth}
            onGoToNext={selectNextMonth}
            isNextDisabled={isNextMonthDisabled}
            nextLabel={localText.nextMonth}
          />
        </Fade>
      </PickersCalendarHeaderRoot>
    );
  }
) as PickersCalendarHeaderComponent;
