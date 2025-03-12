import type { FunctionComponent } from 'react';
import {
  DebugIconBadge,
  InfoIconBadge,
  WarningIconBadge,
  ErrorIconBadge,
} from '../common/badges';
import { exhaustiveGuard } from '../../utils/usefulTS';
import type { LogEventType } from '../../app/services/logs';

export interface EventTypeIconProps {
  type: LogEventType;
}

export const EventTypeIcon: FunctionComponent<EventTypeIconProps> = ({
  type,
}) => {
  switch (type) {
    case 'warn':
      return <WarningIconBadge />;
    case 'error':
      return <ErrorIconBadge />;
    case 'debug':
      return <DebugIconBadge />;
    case 'info':
      return <InfoIconBadge />;
    default:
      return exhaustiveGuard(type);
  }
};
