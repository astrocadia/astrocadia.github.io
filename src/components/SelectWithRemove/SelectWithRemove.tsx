import { memo, useCallback, useMemo, useState } from 'react';
import cx from 'classnames';
import { TextField, type TextFieldProps } from '../common/TextField';
import { MenuItem } from '../common/MenuItem';
import { ListItemText } from '../common/ListItemText';
import { Dot } from '../common/Dot';
import { IconButton } from '../common/buttons/IconButton';
import { CheckIcon, ChevronIcon, DeleteIcon } from '../common/icons';
import { ListItemSecondaryAction } from '../common/ListItemSecondaryAction';
import './SelectWithRemove.css';

const DEFAULT_DELETE_LABEL = 'Remove' as const;
const DEFAULT_CONFIRM_LABEL = 'Confirm' as const;

export type SelectWithRemoveValues = string | number;

export interface SelectWithRemoveProps<T extends SelectWithRemoveValues>
  extends Omit<TextFieldProps, 'value' | 'onChange' | 'select' | 'classes'> {
  value: T;
  disableDotIndicator?: boolean;
  onChange?: (newValue: T) => void;
  onDelete?: () => void;
  options?: Array<{ value: T; label: string }>;
  confirmButtonLabel?: string;
  deleteButtonLabel?: string;
  classes?: {
    paper?: string;
    menu?: string;
    select?: string;
  };
}

const SelectWithRemoveComponent = <T extends SelectWithRemoveValues>({
  disabled,
  value,
  onChange,
  onDelete,
  disableDotIndicator = false,
  options,
  className,
  confirmButtonLabel = DEFAULT_CONFIRM_LABEL,
  deleteButtonLabel = DEFAULT_DELETE_LABEL,
  SelectProps,
  classes,
  ...props
}: SelectWithRemoveProps<T>) => {
  const [confirmMode, setConfirmMode] = useState(false);
  const [open, setOpen] = useState(false);

  const isOptionSelected = useCallback(
    (option: T) => {
      return option === value;
    },
    [value]
  );

  const handleClose = useCallback(() => {
    setConfirmMode(false);
    setOpen(false);
  }, []);

  const handleMenuItemClick = useCallback(
    (newValue: T) => {
      onChange?.(newValue);
    },
    [onChange]
  );

  const handleTabPress = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>) => {
      if (event.key === 'Tab') {
        event.stopPropagation();
      }
    },
    []
  );

  const handleDeleteClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (!confirmMode) {
        setConfirmMode(true);
      } else {
        onDelete?.();
        setConfirmMode(false);
        setOpen(false);
      }
    },
    [confirmMode, onDelete]
  );

  const handleRemoveMenuItemClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      event.stopPropagation();

      if (!confirmMode) {
        setConfirmMode(true);
      }
    },
    [confirmMode]
  );

  const handleDeconfirmClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setConfirmMode(false);
    },
    []
  );

  const removeButtonLabel = useMemo(
    () => (confirmMode ? confirmButtonLabel : deleteButtonLabel),
    [confirmMode, confirmButtonLabel, deleteButtonLabel]
  );
  const secondaryActionIcon = useMemo(
    () => (confirmMode ? <CheckIcon /> : <DeleteIcon />),
    [confirmMode]
  );

  return (
    <TextField
      className={cx('SelectWithRemove', className)}
      disabled={disabled}
      select
      SelectProps={{
        renderValue: () =>
          options?.find((option) => option.value === value)?.label || '',
        className: cx('SelectWithRemove__select', classes?.select),
        onClose: handleClose,
        open,
        onOpen: () => setOpen(true),
        MenuProps: {
          className: cx('SelectWithRemove__menu', classes?.menu),
          classes: {
            paper: cx('SelectWithRemove__paper', classes?.paper),
          },
        },
        ...SelectProps,
      }}
      value={value}
      {...props}
    >
      <div className='SelectWithRemove__optionContainer' tabIndex={-1}>
        {options?.map((option) => (
          <MenuItem
            className='SelectWithRemove__option'
            key={`option.value-${option.value}`}
            onClick={() => handleMenuItemClick(option.value)}
            onKeyUp={handleTabPress}
            selected={isOptionSelected(option.value)}
            tabIndex={0}
          >
            <ListItemText
              className='SelectWithRemove__optionTextContainer'
              primary={option.label}
            />
            {!disableDotIndicator && isOptionSelected(option.value) && <Dot />}
          </MenuItem>
        ))}
      </div>
      {onDelete && (
        <div>
          <div className='SelectWithRemove__divider' />
          <MenuItem
            className={cx('SelectWithRemove__removeContainer', {
              SelectWithRemove__removeContainer__confirm: confirmMode,
            })}
            onClick={handleRemoveMenuItemClick}
            onKeyUp={handleTabPress}
            tabIndex={confirmMode ? -1 : 0}
          >
            {confirmMode && (
              <ListItemSecondaryAction>
                <IconButton
                  aria-label='delete'
                  onClick={handleDeconfirmClick}
                  className='SelectWithRemove__removeButton'
                  size='small'
                  variant='ghost'
                >
                  <ChevronIcon className='SelectWithRemove__chevronLeftIcon' />
                </IconButton>
              </ListItemSecondaryAction>
            )}
            <div>{removeButtonLabel}</div>
            <ListItemSecondaryAction>
              <IconButton
                aria-label='delete'
                onClick={handleDeleteClick}
                className='SelectWithRemove__removeButton'
                size='small'
                variant='ghost'
              >
                {secondaryActionIcon}
              </IconButton>
            </ListItemSecondaryAction>
          </MenuItem>
        </div>
      )}
    </TextField>
  );
};

export const SelectWithRemove = memo(SelectWithRemoveComponent) as <
  T extends SelectWithRemoveValues,
>(
  props: SelectWithRemoveProps<T>
) => JSX.Element;
