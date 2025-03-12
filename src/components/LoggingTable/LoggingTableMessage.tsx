import { memo, useMemo, type FunctionComponent } from 'react';
import { formatJsonByLine } from './utils';
import { CopyIconButton } from '../CopyIconButton/CopyIconButton';

export interface LoggingTableMessageProps {
  message: string;
}

export const LoggingTableMessage: FunctionComponent<LoggingTableMessageProps> =
  memo(({ message }) => {
    const formattedMessage = useMemo(() => {
      if (typeof message === 'object' && message !== null) {
        return JSON.stringify(message, null, 2);
      }

      return message;
    }, [message]);

    return (
      <div className='LoggingTableMessage'>
        <pre>
          {formatJsonByLine(message)}
          <CopyIconButton value={formattedMessage} />
        </pre>
      </div>
    );
  });

LoggingTableMessage.displayName = 'LoggingTableMessage';
