import { type FunctionComponent, useState } from 'react';
import { CloudConnectErrorMessagePanel } from '../../feedback/CloudConnectErrorMessagePanel';
import { MainPanelContent, MainPanelHeader } from '../../MainPanel';
import { NoComponentsErrorPanel } from './errorPanels/NoComponentsErrorPanel';
import './ExbibitLogs.css';
import {
  ExhibitLogTable,
  type ExhibitLoggingTableError,
} from './ExhibitLoggingTable/ExhibitLoggingTable';
import { useExhibitLoggingTableSearchParamFilters } from './ExhibitLoggingTable/hooks/useExhibitLoggingTableSearchParamFilters';

interface ExhibitLogsProps {
  exhibitId: number;
}

export const ExhibitLogs: FunctionComponent<ExhibitLogsProps> = ({
  exhibitId,
}) => {
  const [error, setError] = useState<ExhibitLoggingTableError>('');

  const filters = useExhibitLoggingTableSearchParamFilters();

  return (
    <div className='ExhibitLogs'>
      <MainPanelHeader title='Logs' />
      {error === 'loading-error' && (
        <CloudConnectErrorMessagePanel title='Unable To Load Logs' />
      )}
      {error === 'no-component' && (
        <NoComponentsErrorPanel exhibitId={exhibitId} />
      )}
      {!error && (
        <MainPanelContent>
          <ExhibitLogTable
            exhibitId={exhibitId}
            onError={setError}
            filters={filters}
          />
        </MainPanelContent>
      )}
    </div>
  );
};
