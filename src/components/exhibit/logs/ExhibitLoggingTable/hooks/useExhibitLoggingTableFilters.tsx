import type { DateTime } from 'luxon';
import { useState } from 'react';
import type { LogEventType } from '../../../../../app/services/logs';
import type { ExhibitLogsComponentSelectValue } from '../../ExhibitLogsComponentSelect';
import type { ExhibitLoggingTableFilters } from '../ExhibitLoggingTable';

export const useExhibitLoggingTableFilters = (): ExhibitLoggingTableFilters => {
  const [eventTypes, setEventTypes] = useState<LogEventType[]>([]);
  const [range, setRange] =
    useState<[DateTime | undefined, DateTime | undefined]>();
  const [components, setComponents] = useState<ExhibitLogsComponentSelectValue>(
    { hardwareIds: [], softwareIds: [] }
  );

  return {
    range,
    eventTypes,
    components,
    setEventTypes,
    setRange,
    setComponents,
  };
};
