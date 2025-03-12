import { useMemo, type FunctionComponent } from 'react';
import { useListExhibitsQuery } from '../../../app/services/exhibit';
import type { ProjectSummary } from '../../../app/services/workspace';
import { sortCompareObjectByStringField } from '../../../utils/sort';
import { PROJECT_TAB } from '../../../views/routes/projectRoutePaths';
import { MainPanelContent, MainPanelHeader } from '../../MainPanel';
import { CardList } from '../../common/CardList';
import { CreateExhibitButton } from '../../exhibit/CreateExhibitButton';
import { ExhibitCard, ExhibitCardSkeleton } from '../../exhibit/ExhibitCard';
import { CloudConnectErrorMessagePanel } from '../../feedback/CloudConnectErrorMessagePanel/CloudConnectErrorMessagePanel';
import { NoExhibitsFoundMessagePanel } from './feedback';

const DEFAULT_NUMBER_OF_SKELETONS = 3;

export interface ProjectExhibitsProps {
  projectId: number;
}

export const ProjectExhibits: FunctionComponent<ProjectExhibitsProps> = ({
  projectId,
}) => {
  const {
    data: exhibits,
    error,
    isLoading,
  } = useListExhibitsQuery({ projectId });

  const sortedExhibits = useMemo(() => {
    if (exhibits) {
      return [...exhibits].sort(
        sortCompareObjectByStringField<ProjectSummary>('name', true)
      );
    }
    return undefined;
  }, [exhibits]);

  const isEmptyList = useMemo(
    () => !isLoading && sortedExhibits && sortedExhibits.length === 0,
    [isLoading, sortedExhibits]
  );

  return (
    <>
      <MainPanelHeader
        title={PROJECT_TAB.exhibits}
        actions={[
          <CreateExhibitButton key='create-exhibit' projectId={projectId} />,
        ]}
      />
      {error && (
        <CloudConnectErrorMessagePanel title='Unable To Load Exhibits' />
      )}
      {!error && isEmptyList && <NoExhibitsFoundMessagePanel />}
      {!error && !isEmptyList && (
        <MainPanelContent className='ProjectExhibits'>
          <CardList>
            {isLoading &&
              Array.from({ length: DEFAULT_NUMBER_OF_SKELETONS }, (_, i) => (
                <ExhibitCardSkeleton key={i} />
              ))}
            {!isLoading &&
              !isEmptyList &&
              sortedExhibits?.map((exhibit) => (
                <ExhibitCard
                  key={exhibit.id}
                  exhibitId={exhibit.id}
                  name={exhibit.name}
                  healthState={exhibit.healthState}
                  numberDisconnectedComponents={
                    exhibit.numberDisconnectedComponents
                  }
                />
              ))}
          </CardList>
        </MainPanelContent>
      )}
    </>
  );
};
