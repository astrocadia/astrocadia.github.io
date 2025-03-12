import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
  type ChangeEvent,
  type FunctionComponent,
} from 'react';
import { z } from 'zod';
import {
  TOAST_TYPES,
  type ToastType,
} from '../../../../../../../../app/services/toast';
import {
  NumberProperty,
  ExhibitHardwareComponentPropertyFormats,
} from '../../../../../../../../app/entities/exhibitComponents';
import { TextField } from '../../../../../../../common/TextField';
import { InputAdornment } from '../../../../../../../common/InputAdornment';
import { Dot } from '../../../../../../../common/Dot';
import { CustomHardwarePropertyArrayWrapper } from '../../CustomHardwarePropertyArrayWrapper';
import { CustomHardwareFieldPropertyWrapper } from '../../CustomHardwareFieldPropertyWrapper';
import {
  MAXIMUM_VALUE_STRING,
  MINIMUM_VALUE_STRING,
  SUCCESS_INDICATOR_TIMEOUT_MS,
  BYTE_VALUE_PLACEHOLDER,
  INTEGER_VALUE_PLACEHOLDER,
  FLOAT_VALUE_PLACEHOLDER,
  ARRAY_SUBPAGE_MAX_RENDERED_FIELDS,
  ARRAY_PREVIEW_MAX_RENDERED_FIELDS,
} from '../../../../../utils/constants';
import { isNil } from '../../../../../../../../utils/lang';
import { addOnEnterHandler } from '../../../../../../../common/utils/eventHelpers';
import './NumberComponentProperty.css';

export interface NumberComponentPropertyProps {
  property: NumberProperty;
  propertyName: string;
  disabled?: boolean;
  onSendValue: (values: NumberProperty['value']) => void;
  mutationStateAndActions: {
    isLoading: boolean;
    isSuccess: boolean;
    resetUpdatePropertyMutation: () => void;
  };
  onAddToast: (message: string, type: ToastType) => void;
  arraySubpage: boolean;
  onSetArraySubpage: () => void;
  onArraySubpageBack: () => void;
}

export const NumberComponentProperty: FunctionComponent<
  NumberComponentPropertyProps
> = ({
  property,
  propertyName,
  disabled,
  onSendValue,
  mutationStateAndActions,
  onAddToast,
  arraySubpage,
  onSetArraySubpage,
  onArraySubpageBack,
}) => {
  const [updatedValue, setUpdatedValue] = useState<
    Array<number | null | undefined>
  >(Array(property.arrayLength).fill(undefined));
  const [previousValue, setPreviousValue] = useState<Array<number | null>>(
    Array(property.arrayLength).fill(null)
  );
  const [error, setError] = useState<Array<string | null>>(
    Array(property.arrayLength).fill(null)
  );
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [renderedFieldsEndIndex, setRenderedFieldsEndIndex] = useState<number>(
    Math.min(property.arrayLength, ARRAY_PREVIEW_MAX_RENDERED_FIELDS)
  );

  const valueEdited = useRef<boolean>(false);
  const { min, max } = property;
  const inputSchema = z
    .number()
    .gte(min ?? -Infinity, `${MINIMUM_VALUE_STRING} ${min}`)
    .lte(max ?? Infinity, `${MAXIMUM_VALUE_STRING} ${max}`)
    .nullable();

  const { isSuccess, isLoading, resetUpdatePropertyMutation } =
    mutationStateAndActions;

  const handleChange = useCallback(
    (
      index: number,
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const newValue = event.target.value ? Number(event.target.value) : null;
      setUpdatedValue((prev) =>
        prev.map((val, i) => (i === index ? newValue : val))
      );

      valueEdited.current = true;
      const result = inputSchema.safeParse(newValue);
      setError((prev) => {
        const newErrors = [...prev];
        if (result.success) {
          newErrors[index] = null;
        } else {
          newErrors[index] = result.error.issues[0].message;
        }
        return newErrors;
      });
    },
    [inputSchema]
  );

  const lastPopulatedIndex = useMemo(
    () =>
      Math.max(
        updatedValue.findLastIndex((val) => !isNil(val)),
        previousValue.findLastIndex((val) => val !== null)
      ),
    [updatedValue, previousValue]
  );

  const placeholderText = useMemo(() => {
    switch (property.format) {
      case ExhibitHardwareComponentPropertyFormats.BYTE:
        return BYTE_VALUE_PLACEHOLDER;
      case ExhibitHardwareComponentPropertyFormats.FLOAT:
        return FLOAT_VALUE_PLACEHOLDER;
      case ExhibitHardwareComponentPropertyFormats.INTEGER:
        return INTEGER_VALUE_PLACEHOLDER;
      default:
        return '—';
    }
  }, [property.format]);

  // this is to set the changed dot for the whole property
  const propertyChanged = useMemo(
    () =>
      updatedValue.some((val, i) => !isNil(val) && val !== previousValue[i]),
    [updatedValue, previousValue]
  );

  // prevent send if a field is null or there is an error in one of the fields
  const sendDisabled = useMemo(() => {
    return (
      error.some((errorMsg) => {
        return !!errorMsg;
      }) ||
      lastPopulatedIndex < 0 ||
      !updatedValue
        .slice(0, lastPopulatedIndex + 1)
        .every(
          (val, i) =>
            val !== null && (val !== undefined || previousValue[i] !== null)
        )
    );
  }, [error, updatedValue, previousValue, lastPopulatedIndex]);

  const handleSendValue = useCallback(() => {
    if (sendDisabled || disabled || isLoading || isSuccess) {
      return;
    }
    onSendValue(
      updatedValue
        .slice(0, lastPopulatedIndex + 1)
        .map((val, i) =>
          !isNil(val) ? val : previousValue[i]
        ) as NumberProperty['value']
    );
  }, [
    onSendValue,
    updatedValue,
    previousValue,
    lastPopulatedIndex,
    sendDisabled,
    disabled,
    isLoading,
    isSuccess,
  ]);

  const renderedFieldsStartIndex = useMemo(() => {
    return renderedFieldsEndIndex > ARRAY_SUBPAGE_MAX_RENDERED_FIELDS
      ? renderedFieldsEndIndex - ARRAY_SUBPAGE_MAX_RENDERED_FIELDS
      : 0;
  }, [renderedFieldsEndIndex]);

  // we can't depend on property values existing, so the arrayLength is the best way to determine the number
  // of fields to render.
  const renderedFields = useMemo(() => {
    const fields: Array<ReactNode> = [];
    for (let i = renderedFieldsStartIndex; i < renderedFieldsEndIndex; i++) {
      fields.push(
        <div key={i} className='NumberComponentProperty__row'>
          {property.arrayLength > 1 && (
            <TextField
              // workaround to translate index container upwards with input field on error
              helperText={error[i] ? ' ' : ''}
              className='NumberComponentProperty__rowIndex'
              placeholder={i.toString()}
              disabled
            />
          )}
          <TextField
            // prevent scroll wheel from adjusting number value
            onWheel={(e) => (e.target as HTMLElement).blur()}
            error={!!error[i]}
            helperText={error[i]}
            fullWidth
            orientation='horizontal'
            type='number'
            placeholder={property.settable ? placeholderText : '—'}
            disabled={disabled || !property.settable}
            value={
              (updatedValue[i] !== undefined
                ? updatedValue[i]
                : previousValue[i]) ?? ''
            }
            onChange={(event) => handleChange(i, event)}
            onKeyDown={addOnEnterHandler(handleSendValue)}
            // this sets the changed dot for the individual field
            InputProps={
              property.arrayLength > 1 &&
              !isNil(updatedValue[i]) &&
              updatedValue[i] !== previousValue[i]
                ? {
                    endAdornment: (
                      <InputAdornment
                        className='NumberComponentProperty__adornmentDot'
                        position='end'
                      >
                        <Dot color='var(--base-color-orange-400)' />
                      </InputAdornment>
                    ),
                  }
                : {}
            }
          />
        </div>
      );
    }
    return (
      <div className='NumberComponentProperty__propertyValues'>{fields}</div>
    );
  }, [
    disabled,
    error,
    handleChange,
    handleSendValue,
    renderedFieldsStartIndex,
    renderedFieldsEndIndex,
    updatedValue,
    previousValue,
    property.arrayLength,
    property.settable,
    placeholderText,
  ]);

  // set the property value when it changes and show the refresh button if the value is being edited
  useEffect(() => {
    if (!valueEdited.current) {
      setPreviousValue(
        property.value ?? Array(property.arrayLength).fill(null)
      );
    } else {
      setShowRefreshButton(true);
    }
  }, [property.value, property.arrayLength]);

  useEffect(() => {
    // after a successful update, reset the updated value
    if (isSuccess) {
      valueEdited.current = false;
      if (property.arrayLength > 1) {
        onAddToast(`${propertyName} values sent`, TOAST_TYPES.SUCCESS);
      }
      setTimeout(() => {
        setPreviousValue((prevValue) =>
          prevValue.map((val, i) =>
            !isNil(updatedValue[i]) ? (updatedValue[i] as number) : val
          )
        );
        setUpdatedValue(Array(property.arrayLength).fill(undefined));
        setShowRefreshButton(false);
        resetUpdatePropertyMutation();
      }, SUCCESS_INDICATOR_TIMEOUT_MS);
    }
  }, [
    isSuccess,
    isLoading,
    updatedValue,
    property.arrayLength,
    resetUpdatePropertyMutation,
    onAddToast,
    propertyName,
  ]);

  const handleRefresh = useCallback(() => {
    valueEdited.current = false;
    setUpdatedValue(Array(property.arrayLength).fill(undefined));
    setPreviousValue(property.value ?? Array(property.arrayLength).fill(null));
    setShowRefreshButton(false);
    setError(Array(property.arrayLength).fill(null));
  }, [property.value, property.arrayLength]);

  const setUploadData = useCallback(
    (data: Array<string>) => {
      if (
        data.some(
          (dataValue) => !inputSchema.safeParse(Number(dataValue)).success
        )
      ) {
        onAddToast('File failed to upload', TOAST_TYPES.ERROR);
        return;
      }
      setUpdatedValue((prevUpdated) => {
        return prevUpdated.map((prev, i) =>
          data[i] && data[i] !== '' ? Number(data[i]) : prev
        );
      });
      onAddToast('File Uploaded', TOAST_TYPES.SUCCESS);
    },
    [setUpdatedValue, inputSchema, onAddToast]
  );

  return property.arrayLength > 1 ? (
    <CustomHardwarePropertyArrayWrapper
      className='NumberComponentProperty'
      propertyName={propertyName}
      propertyLength={property.arrayLength}
      propertyChanged={propertyChanged}
      settable={property.settable}
      downloadData={previousValue
        .map((prev, i) => updatedValue[i] ?? prev)
        .join(',')}
      disabled={disabled}
      sendDisabled={sendDisabled}
      loading={isLoading}
      success={isSuccess}
      showRefreshButton={showRefreshButton}
      onRefresh={handleRefresh}
      onSendValue={handleSendValue}
      onUpdate={setUploadData}
      arraySubpage={!!arraySubpage}
      onSetArraySubpage={onSetArraySubpage}
      onArraySubpageBack={onArraySubpageBack}
      renderedFieldsEndIndex={renderedFieldsEndIndex}
      setRenderedFieldsEndIndex={setRenderedFieldsEndIndex}
    >
      {renderedFields}
    </CustomHardwarePropertyArrayWrapper>
  ) : (
    <CustomHardwareFieldPropertyWrapper
      className='NumberComponentProperty'
      settable={property.settable}
      propertyName={propertyName}
      propertyChanged={propertyChanged}
      disabled={disabled || sendDisabled}
      loading={isLoading}
      success={isSuccess}
      showRefreshButton={showRefreshButton}
      onRefresh={handleRefresh}
      onSendValue={handleSendValue}
    >
      {property.settable
        ? renderedFields
        : (property.value && property.value[0]) ?? '—'}
    </CustomHardwareFieldPropertyWrapper>
  );
};
