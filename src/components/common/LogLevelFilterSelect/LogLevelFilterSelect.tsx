import cx from 'classnames';
import { FunctionComponent } from 'react';
import type { LogEventType } from '../../../app/services/logs';
import {
  SelectWithActions,
  SelectWithActionsOption,
  SelectWithActionsProps,
} from '../SelectWithActions';
import {
  DebugIconBadge,
  InfoIconBadge,
  WarningIconBadge,
  ErrorIconBadge,
} from '../badges';

export type LogLevelFilterSelectValue = Array<LogEventType>;

export interface LogLevelFilterSelectProps
  extends Omit<SelectWithActionsProps, 'options' | 'onChange'> {
  onChange?: (value: LogLevelFilterSelectValue) => void;
}

/**
 * Returns the caption for the given retention length string.
 * This will probably change somehow in the future once we get the
 * retention length from the backend.
 */
const getCaption = (retentionLength: string) => {
  return `Retention: ${retentionLength}`;
};

const logLevelOptions: Array<SelectWithActionsOption> = [
  {
    label: 'Error',
    caption: getCaption('User-managed'),
    value: 'error',
    icon: <ErrorIconBadge />,
  },
  {
    label: 'Warning',
    caption: getCaption('1 week'),
    value: 'warn',
    icon: <WarningIconBadge />,
  },
  {
    label: 'Info',
    caption: getCaption('72 hours'),
    value: 'info',
    icon: <InfoIconBadge />,
  },
  {
    label: 'Debug',
    caption: getCaption('48 hours'),
    value: 'debug',
    icon: <DebugIconBadge />,
  },
];

/**
 * A select for filtering log levels.
 * @emits onChange(React.ChangeEvent<HTMLInputElement>) - When the value of the input changes.
 * @todo This might need some work once we get the data shape and implement this.
 */
export const LogLevelFilterSelect: FunctionComponent<
  LogLevelFilterSelectProps
> = ({ className, label = 'Event Type', onChange, ...props }) => {
  return (
    <SelectWithActions
      className={cx('LogLevelFilterSelect', className)}
      label={label}
      menuClasses='LogLevelFilterSelect__menu'
      options={logLevelOptions}
      showFilterIcon={false}
      onChange={(value) => onChange?.(value as LogLevelFilterSelectValue)}
      {...props}
    />
  );
};
