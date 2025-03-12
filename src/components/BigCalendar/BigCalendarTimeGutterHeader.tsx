import { useMemo, type FunctionComponent } from 'react';
import { formatUtcOffset } from './utils/date';

export const BigCalendarTimeGutterHeader: FunctionComponent = () => {
  const utcOffset = useMemo(() => formatUtcOffset(), []);

  return <div className='BigCalendarTimeGutterHeader'>{utcOffset}</div>;
};
