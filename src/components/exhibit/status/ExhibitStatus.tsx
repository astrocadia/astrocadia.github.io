import { useMemo, type FunctionComponent } from 'react';
import { useGetExhibitManifestQuery } from '../../../app/services/exhibit';
import { MainPanelContent, MainPanelHeader } from '../../MainPanel';
import { CloudConnectErrorMessagePanel } from '../../feedback/CloudConnectErrorMessagePanel/CloudConnectErrorMessagePanel';
import { NoExhibitItemsFeedbackMessagePanel } from '../common/feedback/NoExhibitItemsFeedbackMessagePanel';
import './ExhibitStatus.css';
import { ExhibitStatusItem } from './ExhibitStatusItem';
import { ExhibitStatusGroup } from './ExhibitStatusGroup';
import { sortStatuses } from './common/exhibitStatusUtils';
import { STATUS_TYPE } from '../../../app/entities/exhibitManifest';

interface ExhibitStatusProps {
  exhibitId: number;
}

export const ExhibitStatus: FunctionComponent<ExhibitStatusProps> = ({
  exhibitId,
}) => {
  const {
    data: manifest,
    error,
    isLoading,
  } = useGetExhibitManifestQuery({ exhibitId });

  const allStatuses = useMemo(
    () => [...(manifest?.statuses || [])].sort(sortStatuses),
    [manifest?.statuses]
  );

  return (
    <>
      <MainPanelHeader title='Status' />
      {error && <CloudConnectErrorMessagePanel title='Unable To Load Status' />}
      {!error && !isLoading && !allStatuses?.length && (
        <NoExhibitItemsFeedbackMessagePanel
          exhibitId={exhibitId}
          message='Please ensure that your application is set up to use Statuses and has
          been connected to the Gumband Cloud.'
          title='No Statuses Found'
        />
      )}
      {!error && !isLoading && !!allStatuses?.length && (
        <MainPanelContent className='ExhibitStatus__content'>
          {!!allStatuses?.length && (
            <div>
              {allStatuses?.map((status) => {
                switch (status.type) {
                  case STATUS_TYPE.STRING:
                    return (
                      <ExhibitStatusItem key={status.id} status={status} />
                    );
                  case STATUS_TYPE.GROUP:
                    return (
                      <ExhibitStatusGroup key={status.id} status={status} />
                    );
                  default:
                    return null;
                }
              })}
            </div>
          )}
        </MainPanelContent>
      )}
    </>
  );
};
