import { FunctionComponent, useMemo } from 'react';
import { useGetAllExhibitsQuery } from '../../../app/services/exhibit';
import {
  ProjectSummary,
  useListProjectsQuery,
} from '../../../app/services/workspace';
import { sortCompareObjectByStringField } from '../../../utils/sort';
import { WORKSPACE_TAB } from '../../../views/routes/workspaceRoutePaths';
import { MainPanelContent, MainPanelHeader } from '../../MainPanel';
import { CardList } from '../../common/CardList';
import { CloudConnectErrorMessagePanel } from '../../feedback/CloudConnectErrorMessagePanel/CloudConnectErrorMessagePanel';
import { ProjectCard, ProjectCardSkeleton } from '../../project/ProjectCard';
import { NoProjectsFoundMessagePanel } from './feedback';
import { CreateProjectButton } from '../../project/CreateProjectButton';

const DEFAULT_NUMBER_OF_SKELETONS = 3 as const;

export interface WorkspaceProjectsProps {
  workspaceId: number;
}

export const WorkspaceProjects: FunctionComponent<WorkspaceProjectsProps> = ({
  workspaceId,
}) => {
  const {
    data: projects,
    error: projectsError,
    isLoading: isProjectsLoading,
  } = useListProjectsQuery({ workspaceId });

  const {
    data: exhibits,
    error: exhibitsError,
    isLoading: isExhibitsLoading,
  } = useGetAllExhibitsQuery();

  const isLoading = useMemo(() => {
    return isProjectsLoading || isExhibitsLoading;
  }, [isProjectsLoading, isExhibitsLoading]);

  const error = useMemo(() => {
    return projectsError || exhibitsError;
  }, [projectsError, exhibitsError]);

  const sortedProjects = useMemo(() => {
    if (projects) {
      return [...projects].sort(
        sortCompareObjectByStringField<ProjectSummary>('name', true)
      );
    }
    return undefined;
  }, [projects]);

  const isEmptyList = useMemo(
    () => !isProjectsLoading && sortedProjects && sortedProjects.length === 0,
    [isProjectsLoading, sortedProjects]
  );

  const projectIdToExhibitCount = useMemo(() => {
    if (!exhibits) {
      return {};
    }
    const workspaceExhibits = exhibits.filter(
      (exhibit) => exhibit.organizationId === workspaceId
    );
    return workspaceExhibits.reduce<Record<number, number>>((acc, exhibit) => {
      const projectId = exhibit.siteId;
      // eslint-disable-next-line no-param-reassign
      acc[projectId] = (acc[projectId] || 0) + 1;
      return acc;
    }, {});
  }, [exhibits, workspaceId]);

  return (
    <>
      <MainPanelHeader
        title={WORKSPACE_TAB.projects}
        actions={[
          <CreateProjectButton
            key='CreateProjectButton'
            workspaceId={workspaceId}
          />,
        ]}
      />
      {error && (
        <CloudConnectErrorMessagePanel title='Unable To Load Projects' />
      )}
      {!error && isEmptyList && <NoProjectsFoundMessagePanel />}
      {!error && !isEmptyList && (
        <MainPanelContent>
          <CardList>
            {isLoading &&
              Array.from({ length: DEFAULT_NUMBER_OF_SKELETONS }, (_, i) => (
                <ProjectCardSkeleton key={i} />
              ))}
            {!isLoading &&
              !isEmptyList &&
              sortedProjects?.map((project) => (
                <ProjectCard
                  key={project.id}
                  projectId={project.id}
                  name={project.name}
                  exhibitCount={projectIdToExhibitCount[project.id] || 0}
                />
              ))}
          </CardList>
        </MainPanelContent>
      )}
    </>
  );
};
