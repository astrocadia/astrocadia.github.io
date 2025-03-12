import { skipToken } from '@reduxjs/toolkit/query/react';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { createElement, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Project,
  ProjectSettings,
  useGetProjectQuery,
} from '../../app/services/workspace';
import { MainPanel } from '../../components/MainPanel';
import { type NavItem } from '../../components/MainPanel/MainPanelNavigation/common/navigation';
import { MainPanelSkeleton } from '../../components/MainPanel/MainPanelSkeleton';
import { ExhibitIcon, SvgIconComponent } from '../../components/common/icons';
import { ProjectExhibits } from '../../components/project/ProjectExhibits';
import { ProjectAnalytics } from '../../components/project/ProjectAnalytics';
import { exhaustiveGuard } from '../../utils/usefulTS';
import { isValidRequiredInteger } from '../../utils/validation';
import { NotFoundView } from '../notFound/NotFoundView';
import {
  PROJECT_TAB,
  PROJECT_TAB_DEFAULT,
  PROJECT_TAB_ORDER,
  ProjectTab,
  generateProjectPath,
  isProjectTab,
} from '../routes/projectRoutePaths';
import { useGetUserQuery } from '../../app/services/user';
import { ProjectChartComparison } from '../../components/project/ProjectChartComparison';

// Commented out items are disabled until we have begun implementing them
// Here are the icons used for each tab
// NOTE: Please move to import section when enabling
// import HardwareIcon from '@mui/icons-material/Hardware';
// import PeopleIcon from '@mui/icons-material/People';
const PROJECT_TAB_ICONS: Record<ProjectTab, SvgIconComponent> = {
  exhibits: ExhibitIcon,
  // TODO: remove next line once the new TikTok analytics charts are complete
  analytics: AnalyticsOutlinedIcon,
  comparison: AnalyticsOutlinedIcon,
  // hardware: HardwareIcon,
  // users: PeopleIcon,
};

// Tabs get added as normal, list any DLAdmin only tabs here and they will be removed unless a user is proved to be DLAdmin
const DL_ADMIN_TABS: Array<ProjectTab> = ['comparison'];

export const ProjectMainPanel = () => {
  const { projectId, tabId } = useParams();
  const navigate = useNavigate();
  const {
    data: project,
    isLoading: isProjectLoading,
    error,
  } = useGetProjectQuery(
    isValidRequiredInteger(projectId)
      ? { projectId: Number(projectId) }
      : skipToken
  );
  const { data: user } = useGetUserQuery();
  const dlAdmin = useMemo(() => {
    if (user?.dladmin) {
      return true;
    }
    return false;
  }, [user]);
  useEffect(() => {
    if (!tabId && projectId) {
      navigate(
        generateProjectPath({
          projectId,
          tabId: PROJECT_TAB_DEFAULT,
        })
      );
    }
  }, [projectId, navigate, tabId]);

  const isLoading = useMemo(() => isProjectLoading, [isProjectLoading]);

  // TODO: remove code once the new TikTok analytics charts are complete
  const getDataStudioSetting = (arg: Project) => {
    if (arg.sitesettings.length < 1) {
      return null;
    }
    return arg.sitesettings.find(
      (setting: ProjectSettings) =>
        setting.idString === '$external-analytics-datastudio-url'
    );
  };

  const projectNavItems = useMemo((): Array<NavItem> | undefined => {
    if (projectId) {
      const tabOrder = dlAdmin
        ? PROJECT_TAB_ORDER
        : PROJECT_TAB_ORDER.filter((projectTab) => {
            return !DL_ADMIN_TABS.includes(projectTab);
          });
      let tabReturn = tabOrder.map((projectTab) => ({
        id: projectTab,
        label: PROJECT_TAB[projectTab],
        icon: createElement(PROJECT_TAB_ICONS[projectTab]),
        onClick: () =>
          navigate(generateProjectPath({ projectId, tabId: projectTab })),
      }));

      // TODO: remove code once the new TikTok analytics charts are complete
      if (
        project &&
        project.sitesettings.length &&
        getDataStudioSetting(project)
      ) {
        tabReturn = [
          ...tabReturn,
          {
            id: 'analytics',
            label: PROJECT_TAB.analytics,
            icon: createElement(PROJECT_TAB_ICONS.analytics),
            onClick: () =>
              navigate(generateProjectPath({ projectId, tabId: 'analytics' })),
          },
        ];
      }
      return tabReturn;
    }

    return undefined;
  }, [projectId, dlAdmin, project, navigate]);

  if (!isValidRequiredInteger(projectId) || !isProjectTab(tabId)) {
    return <NotFoundView />;
  }

  // TODO: need to investigate why not finding an exhibit returns a 400 instead of a 404.
  if (
    error &&
    'data' in error &&
    (error.status === 404 || error.status === 400)
  ) {
    return <NotFoundView />;
  }

  if (error) {
    // TODO: probably should have some sort of error screen.
    return null;
  }

  if (isLoading || !project || !project) {
    return <MainPanelSkeleton />;
  }

  let content = null;
  if (isProjectTab(tabId) && project) {
    switch (tabId) {
      case 'exhibits':
        content = <ProjectExhibits projectId={project.id} />;
        break;
      case 'analytics':
        content = <ProjectAnalytics project={project} />;
        break;
      case 'comparison':
        content = <ProjectChartComparison projectId={project.id} />;
        break;
      default: {
        exhaustiveGuard(tabId);
      }
    }
  }

  return (
    <MainPanel
      workspaceId={project.organizationId}
      projectId={project.id}
      navItems={projectNavItems}
      selectedTabId={tabId}
    >
      {content}
    </MainPanel>
  );
};
