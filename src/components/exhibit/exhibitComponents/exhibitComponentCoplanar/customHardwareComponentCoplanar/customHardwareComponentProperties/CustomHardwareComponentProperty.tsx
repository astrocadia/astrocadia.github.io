import { type FunctionComponent, useCallback } from 'react';
import { useAppDispatch } from '../../../../../../app/store';
import { addToast, type ToastType } from '../../../../../../app/services/toast';
import { exhaustiveGuard } from '../../../../../../utils/usefulTS';
import {
  ExhibitHardwareComponentIndividualProperty,
  ExhibitHardwareComponentPropertyTypes,
  ExhibitHardwareComponentPropertySubtypes as PropertySubtypes,
  type ExhibitHardwareComponentPropertySubtype as PropertySubtype,
  isStringProperty,
  isBooleanProperty,
  isNumberProperty,
  isTriggerProperty,
  type BooleanProperty,
  type StringProperty,
  type NumberProperty,
  type ColorProperty,
} from '../../../../../../app/entities/exhibitComponents';
import { useUpdateExhibitHardwareComponentPropertyMutation } from '../../../../../../app/services/exhibitComponents';
import { ColorComponentProperty } from './customHardwareComponentPropertyTypes/ColorComponentProperty';
import {
  StringComponentProperty,
  BooleanComponentProperty,
  TriggerComponentProperty,
  NumberComponentProperty,
} from './customHardwareComponentPropertySubtypes';

export interface CustomHardwareComponentPropertyProps<
  T extends
    ExhibitHardwareComponentIndividualProperty = ExhibitHardwareComponentIndividualProperty,
> {
  disabled?: boolean;
  property: T;
  propertyName: string;
  arraySubpage: ExhibitHardwareComponentIndividualProperty['path'] | null;
  onSetArraySubpage: (
    arrayProperty: ExhibitHardwareComponentIndividualProperty['path'] | null
  ) => void;
}

const getPropertySubtype = (
  property: ExhibitHardwareComponentIndividualProperty
): PropertySubtype | null => {
  if (isStringProperty(property)) {
    return PropertySubtypes.STRING_PROPERTY;
  }
  if (isBooleanProperty(property)) {
    return PropertySubtypes.BOOLEAN_PROPERTY;
  }
  if (isNumberProperty(property)) {
    return PropertySubtypes.NUMBER_PROPERTY;
  }
  if (isTriggerProperty(property)) {
    return PropertySubtypes.TRIGGER_PROPERTY;
  }
  return null;
};

export const CustomHardwareComponentProperty: FunctionComponent<
  CustomHardwareComponentPropertyProps
> = ({ property, propertyName, disabled, arraySubpage, onSetArraySubpage }) => {
  const [
    onUpdateProperty,
    { isSuccess, isLoading, reset: resetUpdatePropertyMutation },
  ] = useUpdateExhibitHardwareComponentPropertyMutation();

  const dispatch = useAppDispatch();

  const mutationStateAndActions = {
    isSuccess,
    isLoading,
    resetUpdatePropertyMutation,
  };

  const handleAddToast = useCallback(
    (message: string, type: ToastType) => {
      dispatch(addToast({ message, type }));
    },
    [dispatch]
  );

  const handleSetArraySubpage = useCallback(
    () => onSetArraySubpage(property.path),
    [property.path, onSetArraySubpage]
  );

  const handleArraySubpageBack = useCallback(
    () => onSetArraySubpage(null),
    [onSetArraySubpage]
  );

  const handleSendValue = useCallback(
    (values: ExhibitHardwareComponentIndividualProperty['value']) => {
      onUpdateProperty({
        componentId: property.componentId,
        propertyPath: property.path,
        values,
        source: property.source,
      });
    },
    [property.componentId, property.path, property.source, onUpdateProperty]
  );

  const propertyType =
    property.type === ExhibitHardwareComponentPropertyTypes.GMBND_PRIMITIVE
      ? getPropertySubtype(property)
      : property.type;
  if (
    !propertyType ||
    !Object.values(ExhibitHardwareComponentPropertyTypes).includes(
      property.type
    )
  ) {
    return null;
  }

  switch (propertyType) {
    case PropertySubtypes.STRING_PROPERTY:
      return (
        <StringComponentProperty
          key={property.index}
          property={property as StringProperty}
          propertyName={propertyName}
          disabled={disabled}
          onSendValue={handleSendValue}
          mutationStateAndActions={mutationStateAndActions}
        />
      );
    case PropertySubtypes.BOOLEAN_PROPERTY:
      return (
        <BooleanComponentProperty
          key={property.index}
          propertyName={propertyName}
          disabled={disabled}
          property={property as BooleanProperty}
          onSendValue={handleSendValue}
          mutationStateAndActions={mutationStateAndActions}
          onAddToast={handleAddToast}
          arraySubpage={property.path === arraySubpage}
          onSetArraySubpage={handleSetArraySubpage}
          onArraySubpageBack={handleArraySubpageBack}
        />
      );
    case PropertySubtypes.NUMBER_PROPERTY:
      return (
        <NumberComponentProperty
          key={property.index}
          property={property as NumberProperty}
          propertyName={propertyName}
          disabled={disabled}
          onSendValue={handleSendValue}
          mutationStateAndActions={mutationStateAndActions}
          onAddToast={handleAddToast}
          arraySubpage={property.path === arraySubpage}
          onSetArraySubpage={handleSetArraySubpage}
          onArraySubpageBack={handleArraySubpageBack}
        />
      );
    case PropertySubtypes.TRIGGER_PROPERTY:
      return (
        <TriggerComponentProperty
          key={property.index}
          propertyName={propertyName}
          disabled={disabled}
          onSendValue={handleSendValue}
          loading={isLoading}
          success={isSuccess}
        />
      );
    case ExhibitHardwareComponentPropertyTypes.GMBND_COLOR:
      return (
        <ColorComponentProperty
          key={property.index}
          property={property as ColorProperty}
          propertyName={propertyName}
          disabled={disabled}
          onSendValue={handleSendValue}
          mutationStateAndActions={mutationStateAndActions}
          onAddToast={handleAddToast}
          arraySubpage={property.path === arraySubpage}
          onSetArraySubpage={handleSetArraySubpage}
          onArraySubpageBack={handleArraySubpageBack}
        />
      );
    default:
      return exhaustiveGuard(propertyType);
  }
};
