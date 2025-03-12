import {
  DeepMap,
  FieldError,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { TextField, type TextFieldProps } from './TextField';

export interface ControlledTextFieldProps<T extends FieldValues>
  extends Omit<TextFieldProps, 'name' | 'defaultValue'>,
    UseControllerProps<T> {}

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...props
}: ControlledTextFieldProps<T>) => {
  const {
    // Need to destructure ref from fieldProps to avoid passing it to the TextField component's ref
    // the ref needs to actually be passed to the input element that is contained inside the TextField component
    field: { ref, ...fieldProps },
    formState: { errors },
  } = useController<T>({ name, control });

  // There likely is little need for this, but by calling props after fieldProps, we can allow the developer
  // to override the controlled inputs.
  return (
    <TextField
      inputRef={ref}
      {...fieldProps}
      {...props}
      error={!!errors[name]}
      helperText={(errors[name] as DeepMap<FieldValues, FieldError>)?.message}
    />
  );
};
