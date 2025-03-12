import { useMemo, type FunctionComponent, useCallback } from 'react';
import { type ExhibitComponentSummary } from '../../../app/entities/exhibitComponents';
import {
  SelectWithActions,
  type SelectWithActionsOption,
  type SelectWithActionsProps,
} from '../../common/SelectWithActions';
import {
  HardwareComponentIcon,
  SoftwareComponentIcon,
} from '../../common/icons';

const HARDWARE_PREFIX = 'hardware-' as const;
const SOFTWARE_PREFIX = 'software-' as const;

export interface ExhibitLogsComponentSelectValue {
  hardwareIds: Array<string>;
  softwareIds: Array<number | string>;
}

const makeInternalValue = (valueParam: ExhibitLogsComponentSelectValue) => {
  const { hardwareIds, softwareIds } = valueParam;
  const formattedHardwareIds = hardwareIds.map(
    (hardwareId) => `${HARDWARE_PREFIX}${hardwareId}`
  );
  const formattedSoftwareIds = softwareIds.map(
    (softwareId) => `${SOFTWARE_PREFIX}${softwareId}`
  );

  return [...formattedHardwareIds, ...formattedSoftwareIds];
};

export interface ExhibitLogsComponentSelectProps
  extends Omit<SelectWithActionsProps, 'onChange' | 'value' | 'initialValue'> {
  hardware?: Array<ExhibitComponentSummary>;
  software?: Array<ExhibitComponentSummary>;
  onChange?: (newValue: ExhibitLogsComponentSelectValue) => void;
  initialValue?: ExhibitLogsComponentSelectValue;
  value?: ExhibitLogsComponentSelectValue;
}

export const ExhibitLogsComponentSelect: FunctionComponent<
  ExhibitLogsComponentSelectProps
> = ({
  label = 'Component',
  hardware,
  software,
  onChange,
  initialValue,
  value,
  ...rest
}) => {
  // Need to combine the selected software and hardware components
  const internalValue = useMemo(() => {
    return makeInternalValue(value ?? { hardwareIds: [], softwareIds: [] });
  }, [value]);

  const internalInitialValue = useMemo(() => {
    return makeInternalValue(
      initialValue ?? { hardwareIds: [], softwareIds: [] }
    );
  }, [initialValue]);

  const componentOptions: Array<SelectWithActionsOption> = useMemo(() => {
    const hardwareOptions =
      hardware?.map((hardwareItem) => ({
        icon: <HardwareComponentIcon />,
        label: hardwareItem.name,
        value: `${HARDWARE_PREFIX}${hardwareItem.componentId}`,
      })) ?? [];

    const softwareOptions =
      software?.map((softwareItem) => ({
        icon: <SoftwareComponentIcon />,
        label: softwareItem.name,
        value: `${SOFTWARE_PREFIX}${softwareItem.componentId}`,
      })) ?? [];

    return [...softwareOptions, ...hardwareOptions];
  }, [hardware, software]);

  const handleChange = useCallback(
    (newValue: Array<string>) => {
      const hardwareIds = newValue
        .filter((valueItem) => valueItem.startsWith(HARDWARE_PREFIX))
        .map((hardwareIdString) =>
          hardwareIdString.replace(HARDWARE_PREFIX, '')
        );

      const softwareIds = newValue
        .filter((valueItem) => valueItem.startsWith(SOFTWARE_PREFIX))
        .map((softwareIdString) =>
          softwareIdString.replace(SOFTWARE_PREFIX, '')
        );

      onChange?.({ hardwareIds, softwareIds });
    },
    [onChange]
  );

  return (
    <SelectWithActions
      label={label}
      initialValue={internalInitialValue}
      value={internalValue}
      showFilterIcon={false}
      onChange={(newValue) => handleChange(newValue as Array<string>)}
      options={componentOptions}
      {...rest}
    />
  );
};
