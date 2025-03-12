import { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectSummary } from '../../../app/services/workspace';
import { generateProjectPath } from '../../../views/routes/projectRoutePaths';
import { EntityCard } from '../../EntityCard';
import { ProjectIcon } from '../../common/icons';
import './ProjectCard.css';
import ProjectBannerImageSrcUrl from '../assets/ProjectBanner.svg?url';

export interface ProjectCardProps extends Pick<ProjectSummary, 'name'> {
  projectId: ProjectSummary['id'];
  exhibitCount: number;
}

export const ProjectCard: FunctionComponent<ProjectCardProps> = ({
  name,
  projectId,
  exhibitCount,
}) => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    navigate(generateProjectPath({ projectId: projectId.toString() }));
  }, [navigate, projectId]);

  return (
    <EntityCard
      className='ProjectCard'
      CardHeaderIcon={<ProjectIcon />}
      bannerImageProps={{
        alt: 'Project',
        src: ProjectBannerImageSrcUrl,
      }}
      label={name}
      onClick={onClick}
    >
      <span>
        {exhibitCount === 1 ? '1 Exhibit' : `${exhibitCount} Exhibits`}
      </span>
    </EntityCard>
  );
};
