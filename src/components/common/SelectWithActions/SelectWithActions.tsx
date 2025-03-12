import {
  type FunctionComponent,
  type ReactElement,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react';
import cx from 'classnames';
import isEqual from 'lodash.isequal';
import { MenuItem } from '../MenuItem';
import { Checkbox } from '../Checkbox';
import { type TextFieldProps, TextField } from '../TextField';
import { SelectProps as SelectComponentProps } from '../Select';
import { SelectWithActionsButton } from '../SelectWithActionsButton';
import { ListItemText } from '../ListItemText';
import { ListItemIcon } from '../ListItemIcon';
import { MenuButton } from '../MenuButton';
import { ChevronIcon } from '../icons';
import './SelectWithActions.css';

export interface SelectWithActionsOption {
  /** The icon to be displayed at the front of the option container. */
  icon?: ReactElement;
  /** The main text for the option. */
  label: string;
  /** The small text that appears under the label text. */
  caption?: string;
  /** The value of the option. */
  value: string;
}

export type SelectWithActionsInternalValue = Array<string>;
export type SelectWithActionsValue = string | Array<string>;

export interface SelectWithActionsProps
  extends Omit<TextFieldProps, 'select' | 'onChange' | 'value'> {
  /** The actions to be displayed in the menu. */
  actions?: ReactNode;
  /** Determines if the menu items show check marks or not. @default true */
  checkmarks?: boolean;
  /** The value that is reset to. If the sorted value does not equal this sorted value, the reset button is enabled. @default []  */
  initialValue?: SelectWithActionsValue;
  /** The label for the input. @default 'Label' */
  label?: string;
  /** Emitted when the value changes. String if multiple is false and string array if true. */
  onChange?: (value: SelectWithActionsValue) => void;
  /** The options in the dropdown. */
  options?: Array<SelectWithActionsOption>;
  /** Class to be appended to classNames of menu. */
  menuClasses?: string;
  /** The position of the menu relative to the select input. @default 'left' */
  menuPosition?: 'left' | 'right';
  /** Determines if multiple options can be selected. @default true */
  multiple?: boolean;
  /** The label for the reset button. @default 'Reset' */
  resetLabel?: string;
  /** Determines if the filter icon should be shown in the input. @default true */
  showFilterIcon?: boolean;
  /** Determines if the reset button should be shown. @default true */
  showResetButton?: boolean;
  /** Determines if the number of selected options should be shown. @default true */
  showSelectedCount?: boolean;
  /** The value of the input. */
  value?: SelectWithActionsValue;
}

/**
 * A multi-select dropdown that can be used to filter data.
 * @emits onChange - When the value of the input changes.
 * @see  https://www.figma.com/file/8xUvzKzZu36xPmO8C0Cg3t/Exhibit-Logging-V1?type=design&node-id=1682-86268
 */
export const SelectWithActions: FunctionComponent<SelectWithActionsProps> = ({
  actions,
  checkmarks = true,
  className,
  disabled,
  initialValue = [],
  label = 'Label',
  menuClasses,
  menuPosition = 'left',
  multiple = true,
  onChange,
  options = [],
  resetLabel = 'Reset',
  SelectProps,
  showFilterIcon = true,
  showResetButton = true,
  showSelectedCount = true,
  value = '',
  ...props
}) => {
  /** Ensures that the internalValue is an array. */
  const internalValue = useMemo(() => {
    const result = Array.isArray(value) ? value : [value];

    return result;
  }, [value]);

  const internalInitialValue = useMemo(() => {
    const result = Array.isArray(initialValue) ? initialValue : [initialValue];
    return result.sort();
  }, [initialValue]);

  const isResetButtonDisabled = useMemo(() => {
    return isEqual(internalValue, internalInitialValue);
  }, [internalValue, internalInitialValue]);

  /** Determines if the option is currently selected. */
  const isOptionSelected = useCallback(
    (option: SelectWithActionsOption): boolean => {
      return internalValue.includes(option.value);
    },
    [internalValue]
  );

  /**
   * Emits the onChange event with the selected values.
   * Note that the value is an array if multiple is true, otherwise it is a string.
   */
  const handleChange = useCallback(
    (newValue: SelectWithActionsInternalValue): void => {
      const changedValue = multiple ? newValue : newValue[0];
      onChange?.(changedValue);
    },
    [multiple, onChange]
  );

  /** Resets the selected values. */
  const handleReset = useCallback((): void => {
    handleChange(internalInitialValue);
  }, [handleChange, internalInitialValue]);

  /** Toggles the given value in the selectedValues array. */
  const handleMenuItemClick = useCallback(
    (menuItemValue: string): void => {
      // Regardles of the multiple prop, if the value is already selected, we want to deselect it.
      if (internalValue.includes(menuItemValue)) {
        handleChange(internalValue.filter((v) => v !== menuItemValue));
      } else if (!multiple) {
        handleChange([menuItemValue]);
      } else {
        handleChange([...internalValue, menuItemValue]);
      }
    },
    [handleChange, internalValue, multiple]
  );

  const updatedSelectProps: SelectComponentProps = useMemo(() => {
    return {
      classes: {
        icon: 'SelectWithActions__chevron',
      },
      displayEmpty: true,
      MenuProps: {
        anchorOrigin: { vertical: 'bottom', horizontal: menuPosition },
        transformOrigin: { vertical: 'top', horizontal: menuPosition },
        classes: {
          paper: cx('SelectWithActions__menuPaper', menuClasses),
        },
      },
      multiple: true,
      renderValue: () => (
        // The actual input component. Broke this out into its own component for clarity.
        <SelectWithActionsButton
          className='SelectWithActions__select'
          label={label}
          showFilterIcon={showFilterIcon}
          showSelectedCount={showSelectedCount}
          selectedCount={internalValue.length}
        />
      ),
      IconComponent: ChevronIcon,
      ...SelectProps,
    };
  }, [
    label,
    menuClasses,
    menuPosition,
    internalValue.length,
    SelectProps,
    showFilterIcon,
    showSelectedCount,
  ]);

  return (
    <TextField
      className={cx('SelectWithActions', className)}
      disabled={disabled}
      select
      SelectProps={updatedSelectProps}
      value={internalValue}
      {...props}
    >
      <div className='SelectWithActions__optionsContainer' tabIndex={-1}>
        {options.map((option) => (
          <MenuItem
            className={cx('SelectWithActions__option', {
              // This is a hack to get it to match the design, which didn't
              // seem to have a consistent strategy for height if we did or
              // didn't have an icon.
              SelectWithActions__optionLarge: option.caption,
            })}
            key={`option.value-${option.value}`}
            onClick={
              !disabled ? () => handleMenuItemClick(option.value) : undefined
            }
            selected={isOptionSelected(option)}
            tabIndex={0}
            value={option.value}
            disabled={disabled}
          >
            {option.icon && (
              <ListItemIcon className='SelectWithActions__optionIconContainer'>
                {option.icon}
              </ListItemIcon>
            )}
            <ListItemText
              className='SelectWithActions__optionTextContainer'
              classes={{
                primary: 'SelectWithActions__optionTextPrimary',
                secondary: 'SelectWithActions__optionTextSecondary',
              }}
              primary={option.label}
              secondary={option.caption}
            />
            {checkmarks && (
              <Checkbox
                checked={isOptionSelected(option)}
                className='SelectWithActions__optionCheckbox'
                disableRipple
                disabled={disabled}
              />
            )}
          </MenuItem>
        ))}
      </div>
      {(actions || showResetButton) && (
        <div className='SelectWithActions__actionsContainer'>
          {actions}
          {showResetButton && (
            <MenuButton disabled={isResetButtonDisabled} onClick={handleReset}>
              {resetLabel}
            </MenuButton>
          )}
        </div>
      )}
    </TextField>
  );
};
