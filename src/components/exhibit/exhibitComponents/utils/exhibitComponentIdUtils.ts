import {
  EXHIBIT_COMPONENT_TYPE,
  EXHIBIT_HARDWARE_COMPONENT_TYPE,
  type ExhibitComponentKey,
  type ExhibitComponentKeyParts,
  type ExhibitHardwareComponentType,
  type ExhibitSoftwareComponentType,
} from '../../../../app/entities/exhibitComponents';

const KEY_SEPARATOR = '_' as const;

export const encodeExhibitComponentKey = (
  componentKeyParts: ExhibitComponentKeyParts
): ExhibitComponentKey =>
  `${componentKeyParts.type}${KEY_SEPARATOR}${componentKeyParts.componentId}` as ExhibitComponentKey;

export const isExhibitComponentKey = (
  componentKey: string
): componentKey is ExhibitComponentKey => {
  const [type, componentId] = componentKey.split(KEY_SEPARATOR);

  if (
    Object.values(EXHIBIT_HARDWARE_COMPONENT_TYPE).includes(
      type as ExhibitHardwareComponentType
    )
  ) {
    return componentId !== '' && typeof componentId === 'string';
  }

  return (
    componentId !== '' &&
    Number.isInteger(Number(componentId)) &&
    Object.values(EXHIBIT_COMPONENT_TYPE).includes(
      type as ExhibitSoftwareComponentType
    )
  );
};

export const decodeExhibitComponentKey = (
  componentKey: ExhibitComponentKey
): ExhibitComponentKeyParts => {
  const [type, componentId] = componentKey.split(KEY_SEPARATOR);
  if (
    Object.values(EXHIBIT_HARDWARE_COMPONENT_TYPE).includes(
      type as ExhibitHardwareComponentType
    )
  ) {
    return {
      componentId: componentId as string,
      type: type as ExhibitHardwareComponentType,
    };
  }

  return {
    componentId,
    type: type as ExhibitSoftwareComponentType,
  };
};
