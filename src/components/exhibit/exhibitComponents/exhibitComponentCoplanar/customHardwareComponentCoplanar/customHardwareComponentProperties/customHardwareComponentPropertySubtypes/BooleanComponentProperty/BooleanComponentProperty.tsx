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
import {
  TOAST_TYPES,
  type ToastType,
} from '../../../../../../../../app/services/toast';
import { BooleanProperty } from '../../../../../../../../app/entities/exhibitComponents';
import { CustomHardwarePropertyArrayWrapper } from '../../CustomHardwarePropertyArrayWrapper';
import { ActionTriggerButton } from '../../../../../../../common/ActionTriggerButton';
import { TextField } from '../../../../../../../common/TextField';
import { IconButton } from '../../../../../../../common/buttons/IconButton';
import { RefreshIcon } from '../../../../../../../common/icons';
import { Dot } from '../../../../../../../common/Dot';
import { ToggleSwitch } from '../../../../../../../common/ToggleSwitch/ToggleSwitch';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import { SettingLabelWrapper } from '../../../../../../settings/SettingLabelWrapper';
import {
  SUCCESS_INDICATOR_TIMEOUT_MS,
  ARRAY_SUBPAGE_MAX_RENDERED_FIELDS,
  ARRAY_PREVIEW_MAX_RENDERED_FIELDS,
} from '../../../../../utils/constants';
import './BooleanComponentProperty.css';

interface BooleanComponentPropertyProps {
  property: BooleanProperty;
  propertyName: string;
  disabled?: boolean;
  onSendValue: (values: BooleanProperty['value']) => void;
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

export const BooleanComponentProperty: FunctionComponent<
  BooleanComponentPropertyProps
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
  const [updatedValue, setUpdatedValue] = useState<Array<boolean | null>>(
    Array(property.arrayLength).fill(null)
  );
  const [previousValue, setPreviousValue] = useState<Array<boolean | null>>(
    Array(property.arrayLength).fill(null)
  );
  const [showRefreshButton, setShowRefreshButton] = useState<boolean>(false);
  const [renderedFieldsEndIndex, setRenderedFieldsEndIndex] = useState<number>(
    Math.min(property.arrayLength, ARRAY_PREVIEW_MAX_RENDERED_FIELDS)
  );

  const valueEdited = useRef<boolean>(false);

  const { isSuccess, isLoading, resetUpdatePropertyMutation } =
    mutationStateAndActions;

  const handleChange = useCallback(
    (index: number, _: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      const newValue = checked;
      setUpdatedValue((prev) =>
        prev.map((val, i) => (i === index ? newValue : val ?? previousValue[i]))
      );

      valueEdited.current = true;
    },
    [previousValue]
  );

  const renderedFieldsStartIndex = useMemo(() => {
    return renderedFieldsEndIndex > ARRAY_SUBPAGE_MAX_RENDERED_FIELDS
      ? renderedFieldsEndIndex - ARRAY_SUBPAGE_MAX_RENDERED_FIELDS
      : 0;
  }, [renderedFieldsEndIndex]);

  // we can't depend on property values existing, so the arrayLength is the best way to determine the number
  // of fields to render.
  const renderedFields = useMemo(() => {
    const fields: Array<ReactNode> = [];
    if (property.arrayLength < 2) {
      return fields;
    }
    for (let i = renderedFieldsStartIndex; i < renderedFieldsEndIndex; i++) {
      fields.push(
        <div key={i} className='BooleanComponentProperty__row'>
          <TextField
            className='BooleanComponentProperty__rowIndex'
            placeholder={i.toString()}
            disabled
          />
          <div className='BooleanComponentProperty__rowToggleContainer'>
            <div className='BooleanComponentProperty__dotContainer'>
              {!(previousValue[i] === null && updatedValue[i] === false) &&
                updatedValue[i] !== null &&
                updatedValue[i] !== previousValue[i] && (
                  <Dot color='var(--base-color-orange-400)' />
                )}
            </div>
            <ToggleSwitch
              className='BooleanComponentProperty__toggle'
              checked={
                (updatedValue[i] !== null
                  ? updatedValue[i]
                  : previousValue[i]) === true
              }
              onChange={(event, checked) => handleChange(i, event, checked)}
              disabled={
                !property.settable || disabled || isLoading || isSuccess
              }
            />
          </div>
        </div>
      );
    }
    return (
      <div className='BooleanComponentProperty__propertyValues'> {fields} </div>
    );
  }, [
    disabled,
    handleChange,
    isLoading,
    isSuccess,
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
        property.value ?? Array(property.arrayLength).fill(null)
      );
    }
    setShowRefreshButton(valueEdited.current);
  }, [property.value, property.arrayLength]);

  // this is to set the changed dot for the whole property
  const propertyChanged = useMemo(
    () =>
      updatedValue.some(
        (val, i) =>
          !(previousValue[i] === null && updatedValue[i] === false) &&
          val !== null &&
          val !== previousValue[i]
      ),
    [updatedValue, previousValue]
  );

  const handleSendValue = useCallback(() => {
    onSendValue(
      updatedValue.map(
        (val, i) => (val !== null ? val : previousValue[i]) === true
      )
    );
  }, [onSendValue, previousValue, updatedValue]);

  useEffect(() => {
    // after a successful update, reset the updated value
    if (isSuccess) {
      valueEdited.current = false;
      if (property.arrayLength > 1) {
        onAddToast(`${propertyName} values sent`, TOAST_TYPES.SUCCESS);
      }
      setTimeout(() => {
        setPreviousValue((prevValue) =>
          prevValue.map(
            (val, i) =>
              (updatedValue[i] !== null ? updatedValue[i] : val) === true
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
    property.arrayLength,
    resetUpdatePropertyMutation,
    onAddToast,
    propertyName,
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
          (dataValue) =>
            !['true', 'false', 't', 'f', '0', '1'].includes(
              dataValue.toLowerCase()
            )
        )
      ) {
        onAddToast('File failed to upload', TOAST_TYPES.ERROR);
        return;
      }
      setUpdatedValue(
        data.map((dataValue) => {
          return ['true', 't', '1'].includes(dataValue.toLowerCase());
        })
      );
      onAddToast('File Uploaded', TOAST_TYPES.SUCCESS);
    },
    [setUpdatedValue, onAddToast]
  );

  return property.arrayLength > 1 ? (
    <CustomHardwarePropertyArrayWrapper
      className='BooleanComponentProperty'
      propertyName={propertyName}
      propertyLength={property.arrayLength}
      propertyChanged={propertyChanged}
      settable={property.settable}
      downloadData={previousValue
        .map((prev, i) => updatedValue[i] ?? prev ?? false)
        .join(',')}
      disabled={disabled}
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
    <MainPanelCoplanarSubpageBlockRow className='BooleanComponentProperty'>
      <div className='BooleanComponentProperty__labelAndActionWrapper'>
        <SettingLabelWrapper
          className='BooleanComponentProperty__labelWrapper'
          changed={propertyChanged}
        >
          {propertyName}
        </SettingLabelWrapper>
        <div className='BooleanComponentProperty__buttonWrapper'>
          <ToggleSwitch
            className='BooleanComponentProperty__toggle'
            checked={
              (updatedValue[0] !== null
                ? updatedValue[0]
                : previousValue[0]) === true
            }
            onChange={(event, checked) => handleChange(0, event, checked)}
            disabled={!property.settable || disabled || isLoading || isSuccess}
          />
          {property.settable &&
            showRefreshButton &&
            !(isLoading || isSuccess) && (
              <IconButton onClick={handleRefresh} disabled={disabled}>
                <RefreshIcon />
              </IconButton>
            )}
          {property.settable && (
            <ActionTriggerButton
              busy={isLoading}
              success={isSuccess}
              disabled={disabled}
              onClick={handleSendValue}
            />
          )}
        </div>
      </div>
    </MainPanelCoplanarSubpageBlockRow>
  );
};
