import {
  type ChangeEvent,
  type FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import z from 'zod';
import { type StringProperty } from '../../../../../../../../app/entities/exhibitComponents';
import { isNil } from '../../../../../../../../utils/lang';
import { TextField } from '../../../../../../../common/TextField';
import { CustomHardwareFieldPropertyWrapper } from '../../CustomHardwareFieldPropertyWrapper';
import {
  MAXIMUM_CHARACTER_LENGTH_STRING,
  SUCCESS_INDICATOR_TIMEOUT_MS,
} from '../../../../../utils/constants';
import { addOnEnterHandler } from '../../../../../../../common/utils/eventHelpers';
import './StringComponentProperty.css';

interface StringComponentPropertyProps {
  property: StringProperty;
  propertyName: string;
  disabled?: boolean;
  onSendValue: (values: StringProperty['value']) => void;
  mutationStateAndActions: {
    isLoading: boolean;
    isSuccess: boolean;
    resetUpdatePropertyMutation: () => void;
  };
}

export const StringComponentProperty: FunctionComponent<
  StringComponentPropertyProps
> = ({
  property,
  propertyName,
  disabled,
  onSendValue,
  mutationStateAndActions,
}) => {
  const [updatedValue, setUpdatedValue] = useState<string | null>(null);
  const [showRefreshButton, setShowRefreshButton] = useState<boolean>(false);
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const valueEdited = useRef<boolean>(false);

  const inputSchema = z
    .string()
    .max(
      property.arrayLength ?? Infinity,
      `${MAXIMUM_CHARACTER_LENGTH_STRING} ${property.arrayLength ?? Infinity}`
    )
    .nullish();

  const { isSuccess, isLoading, resetUpdatePropertyMutation } =
    mutationStateAndActions;

  const propertyValue = useMemo(() => {
    return property.value && !Array.isArray(property.value[0])
      ? property.value[0]
      : null;
  }, [property.value]);

  // set the property value when it changes and show the refresh button if the value is being edited
  useEffect(() => {
    if (!valueEdited.current) {
      setPreviousValue(propertyValue);
    }
    setShowRefreshButton(valueEdited.current);
  }, [propertyValue]);

  const propertyChanged = useMemo(() => {
    return updatedValue !== null && updatedValue !== previousValue;
  }, [updatedValue, previousValue]);

  const handleSendValue = useCallback(() => {
    if (disabled || isLoading || isSuccess) {
      return;
    }
    onSendValue([
      !propertyChanged ? previousValue : updatedValue ?? '',
    ] as StringProperty['value']);
  }, [
    onSendValue,
    propertyChanged,
    previousValue,
    updatedValue,
    disabled,
    isLoading,
    isSuccess,
  ]);

  useEffect(() => {
    // after a successful update, reset the updated value
    if (isSuccess) {
      valueEdited.current = false;
      setTimeout(() => {
        setPreviousValue(
          updatedValue !== null ? updatedValue ?? '' : previousValue ?? ''
        );
        setUpdatedValue(null);
        setShowRefreshButton(false);
        resetUpdatePropertyMutation();
      }, SUCCESS_INDICATOR_TIMEOUT_MS);
    }
  }, [
    isSuccess,
    isLoading,
    updatedValue,
    previousValue,
    resetUpdatePropertyMutation,
  ]);

  const handleRefresh = useCallback(() => {
    valueEdited.current = false;
    setUpdatedValue(null);
    setPreviousValue(propertyValue ?? null);
    setShowRefreshButton(false);
    setError(null);
  }, [propertyValue]);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value || '';
      setUpdatedValue(newValue);
      valueEdited.current = true;

      const result = inputSchema.safeParse(newValue);
      if (!isNil(newValue) && !result.success) {
        setError(result.error.issues[0].message);
        return;
      }
      setError(null);
    },
    [inputSchema]
  );

  return (
    <CustomHardwareFieldPropertyWrapper
      className='StringComponentProperty'
      propertyName={propertyName}
      propertyChanged={propertyChanged}
      settable={property.settable}
      disabled={disabled || !!error}
      loading={isLoading}
      success={isSuccess}
      showRefreshButton={showRefreshButton}
      onRefresh={handleRefresh}
      onSendValue={handleSendValue}
    >
      {property.settable ? (
        <TextField
          error={!!error}
          helperText={error}
          fullWidth
          orientation='horizontal'
          placeholder='Enter a new text value'
          disabled={disabled}
          value={updatedValue !== null ? updatedValue : previousValue || ''}
          onChange={handleChange}
          onKeyDown={
            !disabled && !isLoading && !isSuccess
              ? addOnEnterHandler(handleSendValue)
              : undefined
          }
        />
      ) : (
        propertyValue ?? '—'
      )}
    </CustomHardwareFieldPropertyWrapper>
  );
};
