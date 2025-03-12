import { type TextFieldProps as MUITextFieldProps } from '@mui/material';
import cx from 'classnames';
import { forwardRef, useCallback, useId, type FunctionComponent } from 'react';
import { FormControl, type FormControlProps } from '../FormControl';
import { FormHelperText, type FormHelperTextProps } from '../FormHelperText';
import { Input, type InputProps } from '../Input';
import { InputLabel, type InputLabelProps } from '../InputLabel';
import { Select, type SelectProps } from '../Select';
import './TextField.css';

export interface TextFieldProps
  extends Omit<
      MUITextFieldProps,
      | 'color'
      | 'FormHelperTextProps'
      | 'InputLabelProps'
      | 'InputProps'
      | 'margin'
      | 'ref'
      | 'SelectProps'
      | 'size'
      | 'sx'
      | 'variant'
    >,
    Pick<FormControlProps, 'orientation'> {
  FormHelperTextProps?: FormHelperTextProps;
  InputLabelProps?: InputLabelProps;
  InputProps?: InputProps;
  SelectProps?: SelectProps;
}

// Heavily used this as inspiration: https://github.com/mui/material-ui/blob/master/packages/mui-material/src/TextField/TextField.js
export const TextField: FunctionComponent<TextFieldProps> = forwardRef<
  HTMLDivElement,
  TextFieldProps
>(
  (
    {
      autoComplete,
      autoFocus,
      children,
      className,
      defaultValue,
      disabled,
      error,
      FormHelperTextProps,
      fullWidth,
      helperText,
      id: idOverride,
      InputLabelProps,
      inputProps,
      InputProps,
      inputRef,
      label,
      maxRows,
      minRows,
      multiline,
      name,
      onBlur,
      onChange,
      onClick,
      onFocus,
      orientation = 'vertical',
      placeholder,
      required,
      rows,
      select,
      SelectProps,
      type,
      value,
      ...other
    },
    ref
  ) => {
    const InputMore: Record<string, unknown> = {};
    let UpdatedSelectProps = SelectProps || {};

    if (select) {
      if (!UpdatedSelectProps?.native) {
        InputMore.id = undefined;
      }
      InputMore['aria-describedby'] = undefined;
      UpdatedSelectProps = {
        ...UpdatedSelectProps,
      };
    }

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (!disabled && onClick) {
          // The `onClick` is registered both on the root and the input elements.
          // Without stopping the propagation, the event could be triggered twice.
          event.stopPropagation();
          onClick(event);
        }
      },
      [disabled, onClick]
    );

    const selfAssignedId = useId();
    const id = idOverride || selfAssignedId;
    const helperTextId = `${id}-helper-text`;
    const inputLabelId = `${id}-label`;

    const InputElement = (
      <Input
        aria-describedby={helperTextId}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        error={error}
        fullWidth={fullWidth}
        multiline={multiline}
        name={name}
        rows={rows}
        maxRows={maxRows}
        minRows={minRows}
        type={type}
        value={value}
        id={id}
        inputRef={inputRef}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onClick={handleClick}
        placeholder={placeholder}
        inputProps={inputProps}
        {...InputMore}
        {...InputProps}
      />
    );

    const inputLabelElement = label && (
      <InputLabel
        htmlFor={id}
        id={inputLabelId}
        shrink={orientation === 'vertical'}
        {...InputLabelProps}
      >
        {label}
      </InputLabel>
    );

    const inputOrSelectElement = select ? (
      <Select
        aria-describedby={helperTextId}
        id={id}
        labelId={inputLabelId}
        value={value}
        input={InputElement}
        {...UpdatedSelectProps}
      >
        {children}
      </Select>
    ) : (
      InputElement
    );

    const helperTextElement = helperText && (
      <FormHelperText id={helperTextId} {...FormHelperTextProps}>
        {helperText}
      </FormHelperText>
    );

    return (
      <FormControl
        className={cx(className, 'TextField')}
        disabled={disabled}
        error={error}
        fullWidth={fullWidth}
        ref={ref}
        required={required}
        onClick={handleClick}
        orientation={orientation}
        {...other}
      >
        {inputLabelElement}
        <div>
          {inputOrSelectElement}
          {helperTextElement}
        </div>
      </FormControl>
    );
  }
);

TextField.displayName = 'TextField';
