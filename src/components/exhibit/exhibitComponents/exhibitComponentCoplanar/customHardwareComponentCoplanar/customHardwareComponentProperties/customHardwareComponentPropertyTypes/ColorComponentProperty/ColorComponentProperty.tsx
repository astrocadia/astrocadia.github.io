import {
  type FunctionComponent,
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  ReactNode,
  KeyboardEvent,
} from 'react';
import { matchIsValidColor } from 'mui-color-input';
import {
  TOAST_TYPES,
  type ToastType,
} from '../../../../../../../../app/services/toast';
import {
  SUCCESS_INDICATOR_TIMEOUT_MS,
  ARRAY_SUBPAGE_MAX_RENDERED_FIELDS,
  ARRAY_PREVIEW_MAX_RENDERED_FIELDS,
} from '../../../../../utils/constants';
import { CustomHardwareFieldPropertyWrapper } from '../../CustomHardwareFieldPropertyWrapper';
import { CustomHardwarePropertyArrayWrapper } from '../../CustomHardwarePropertyArrayWrapper';
import { ColorInput } from '../../../../../../../common/ColorInput';
import { TextField } from '../../../../../../../common/TextField';
import {
  ColorProperty,
  isColorPropertyValue,
} from '../../../../../../../../app/entities/exhibitComponents';
import {
  convertWRGBColorPropertyValueToRGBAHex,
  convertRGBAHexToWRGBColorPropertyValue,
} from '../../utils';
import './ColorComponentProperty.css';

const PLACEHOLDER_TEXT = 'Select or enter color value' as const;

interface ColorComponentPropertyProps {
  property: ColorProperty;
  propertyName: string;
  disabled?: boolean;
  onSendValue: (values: ColorProperty['value']) => void;
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

// Note: alpha is set to full value 'ff' by default if a fourth hex byte is not specified in the UI.
// This may cause confusion when intended use is RBGW instead of RGBA.

export const ColorComponentProperty: FunctionComponent<
  ColorComponentPropertyProps
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
  const [updatedValue, setUpdatedValue] = useState<Array<string | null>>(
    Array(property.arrayLength).fill(null)
  );
  const [previousValue, setPreviousValue] = useState<Array<string | null>>(
    Array(property.arrayLength).fill(null)
  );
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [renderedFieldsEndIndex, setRenderedFieldsEndIndex] = useState<number>(
    Math.min(property.arrayLength, ARRAY_PREVIEW_MAX_RENDERED_FIELDS)
  );

  const valueEdited = useRef<boolean>(false);

  const { isSuccess, isLoading, resetUpdatePropertyMutation } =
    mutationStateAndActions;

  const handleChange = useCallback((index: number, color: string) => {
    const newValue = color;
    setUpdatedValue((prev) =>
      prev.map((val, i) => (i === index ? newValue : val))
    );
    valueEdited.current = true;
  }, []);

  const lastPopulatedIndex = useMemo(
    () =>
      Math.max(
        updatedValue.findLastIndex((val) => val && val !== ''),
        previousValue.findLastIndex((val) => val && val !== '')
      ),
    [updatedValue, previousValue]
  );

  const propertyChanged = useMemo(
    () => updatedValue.some((val, i) => val && val !== previousValue[i]),
    [updatedValue, previousValue]
  );

  // prevent send if a field is null or if there is an error in one of the fields
  const sendDisabled = useMemo(() => {
    return (
      lastPopulatedIndex < 0 ||
      !updatedValue
        .slice(0, lastPopulatedIndex + 1)
        .every((val, i) =>
          val !== null
            ? matchIsValidColor(val)
            : previousValue[i] && matchIsValidColor(previousValue[i] as string)
        )
    );
  }, [updatedValue, previousValue, lastPopulatedIndex]);

  const handleSendValue = useCallback(() => {
    if (sendDisabled || disabled || isLoading || isSuccess) {
      return;
    }
    onSendValue(
      updatedValue
        .slice(0, lastPopulatedIndex + 1)
        .map((val, i) =>
          convertRGBAHexToWRGBColorPropertyValue(
            val && val !== '' ? val : previousValue[i]
          )
        )
    );
  }, [
    onSendValue,
    previousValue,
    updatedValue,
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

  // prevent send on enter key press if focus is on popover button
  const handleEnterPress =
    (sendValueCallback: () => void) => (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        const target = event.target as HTMLElement;
        const isAdornmentButton =
          target.classList.contains('MuiButtonBase-root');
        if (isAdornmentButton) {
          return;
        }
        sendValueCallback();
      }
    };

  // we can't depend on property values existing, so the arrayLength is the best way to determine the number
  // of fields to render.
  const renderedFields = useMemo(() => {
    const fields: Array<ReactNode> = [];
    for (let i = renderedFieldsStartIndex; i < renderedFieldsEndIndex; i++) {
      fields.push(
        <div key={i} className='ColorComponentProperty__row'>
          {property.arrayLength > 1 && (
            <TextField
              className='ColorComponentProperty__rowIndex'
              placeholder={i.toString()}
              disabled
            />
          )}
          <ColorInput
            format='hex8'
            onChange={(event) => handleChange(i, event)}
            placeholder={property.settable ? PLACEHOLDER_TEXT : '—'}
            disabled={disabled || !property.settable}
            value={updatedValue[i] ?? previousValue[i] ?? ''}
            // this sets the changed dot for the individual field
            changed={
              property.arrayLength > 1 &&
              !!updatedValue[i] &&
              updatedValue[i] !== previousValue[i]
            }
            onKeyDown={handleEnterPress(handleSendValue)}
          />
        </div>
      );
    }
    return (
      <div className='ColorComponentProperty__propertyValues'>{fields}</div>
    );
  }, [
    disabled,
    handleChange,
    handleSendValue,
    renderedFieldsStartIndex,
    renderedFieldsEndIndex,
    updatedValue,
    previousValue,
    property.arrayLength,
    property.settable,
  ]);

  // set the property value when it changes and show the refresh button if the value is being edited
  useEffect(() => {
    if (!valueEdited.current) {
      setPreviousValue(
        property.value
          ? property.value.map((val) => {
              return isColorPropertyValue(val)
                ? convertWRGBColorPropertyValueToRGBAHex(val)
                : null;
            })
          : Array(property.arrayLength).fill(null)
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
            updatedValue[i] && updatedValue[i] !== ''
              ? updatedValue[i]
              : val ?? ''
          )
        );
        setUpdatedValue(Array(property.arrayLength).fill(null));
        setShowRefreshButton(false);
        resetUpdatePropertyMutation();
      }, SUCCESS_INDICATOR_TIMEOUT_MS);
    }
  }, [
    isSuccess,
    isLoading,
    updatedValue,
    onAddToast,
    propertyName,
    resetUpdatePropertyMutation,
    property.arrayLength,
  ]);

  const handleRefresh = useCallback(() => {
    valueEdited.current = false;
    setUpdatedValue(Array(property.arrayLength).fill(null));
    setPreviousValue(property.value ?? Array(property.arrayLength).fill(null));
    setShowRefreshButton(false);
  }, [property.value, property.arrayLength]);

  const setUploadData = useCallback(
    (data: Array<string>) => {
      if (
        data.some(
          (dataValue) => !matchIsValidColor(dataValue) && dataValue !== ''
        )
      ) {
        onAddToast('File failed to upload', TOAST_TYPES.ERROR);
        return;
      }
      setUpdatedValue((prevUpdated) => {
        return prevUpdated.map((prev, i) =>
          data[i] && data[i] !== '' ? data[i] : prev
        );
      });
      onAddToast('File Uploaded', TOAST_TYPES.SUCCESS);
    },
    [setUpdatedValue, onAddToast]
  );

  return property.arrayLength > 1 ? (
    <CustomHardwarePropertyArrayWrapper
      className='ColorComponentProperty'
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
      className='ColorComponentProperty'
      settable={property.settable}
      propertyName={propertyName}
      propertyChanged={propertyChanged}
      disabled={disabled || sendDisabled || updatedValue[0] === ''}
      loading={isLoading}
      success={isSuccess}
      showRefreshButton={showRefreshButton}
      onRefresh={handleRefresh}
      onSendValue={handleSendValue}
    >
      {property.settable ? (
        renderedFields
      ) : (
        <ColorInput
          format='hex8'
          value={
            property.value && isColorPropertyValue(property.value[0])
              ? convertWRGBColorPropertyValueToRGBAHex(property.value[0])
              : ''
          }
          placeholder='—'
          disabled
        />
      )}
    </CustomHardwareFieldPropertyWrapper>
  );
};
