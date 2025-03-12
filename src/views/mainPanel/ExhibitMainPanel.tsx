import { SvgIconComponent } from '@mui/icons-material';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { skipToken } from '@reduxjs/toolkit/query/react';
import {
  createElement,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { EXHIBIT_COMPONENT_TYPE } from '../../app/entities/exhibitComponents';
import { useGetExhibitQuery } from '../../app/services/exhibit';
import {
  deleteExhibitComponentAuthToken,
  selectExhibitAuthToken,
  type ExhibitComponentAuthToken,
} from '../../app/services/exhibitComponentAuthTokens';
import { useGetProjectQuery } from '../../app/services/workspace';
import { useAppDispatch } from '../../app/store';
import { MainPanel } from '../../components/MainPanel';
import { type NavItem } from '../../components/MainPanel/MainPanelNavigation/common/navigation';
import { MainPanelSkeleton } from '../../components/MainPanel/MainPanelSkeleton';
import { useMobileMediaQuery } from '../../components/common/hooks/useMobileMediaQuery';
import {
  DataObjectIcon,
  ExhibitComponentIcon,
  ExhibitControlsIcon,
  ExhibitFilesIcon,
  ExhibitScheduleIcon,
} from '../../components/common/icons';
import { ExhibitSettingsIcon } from '../../components/common/icons/ExhibitSettingIcon';
import { ExhibitStatusIcon } from '../../components/common/icons/ExhibitStatusIcon';
import { ExhibitControls } from '../../components/exhibit/controls';
import { ExhibitComponents } from '../../components/exhibit/exhibitComponents';
import { ExhibitComponentAuthInfoDialog } from '../../components/exhibit/exhibitComponents/ExhibitComponentAuthInfoDialog';
import { ExhibitComponentCoplanar } from '../../components/exhibit/exhibitComponents/exhibitComponentCoplanar';
import { isExhibitComponentKey } from '../../components/exhibit/exhibitComponents/utils/exhibitComponentIdUtils';
import { ExhibitFiles } from '../../components/exhibit/files';
import { ExhibitLogs } from '../../components/exhibit/logs';
import { ExhibitMetrics } from '../../components/exhibit/metrics';
import { ExhibitScheduling } from '../../components/exhibit/scheduling';
import { ExhibitSchedulingCoplanar } from '../../components/exhibit/scheduling/ExhibitSchedulingCoplanar';
import {
  decodeScheduleCoplanarId,
  isValidScheduleCoplanarId,
} from '../../components/exhibit/scheduling/utils/coplanarId';
import { ExhibitSettings } from '../../components/exhibit/settings';
import { ExhibitStatus } from '../../components/exhibit/status';
import { exhaustiveGuard } from '../../utils/usefulTS';
import { isValidRequiredInteger } from '../../utils/validation';
import { NotFoundView } from '../notFound/NotFoundView';
import {
  EXHIBIT_TAB,
  EXHIBIT_TAB_ORDER,
  ExhibitTab,
  generateExhibitPath,
  isExhibitTab,
} from '../routes/exhibitRoutePaths';

const EXHIBIT_TAB_ICONS: Record<ExhibitTab, SvgIconComponent> = {
  controls: ExhibitControlsIcon,
  settings: ExhibitSettingsIcon,
  files: ExhibitFilesIcon,
  logs: DataObjectIcon,
  status: ExhibitStatusIcon,
  analytics: AnalyticsOutlinedIcon,
  components: ExhibitComponentIcon,
  schedule: ExhibitScheduleIcon,
} as const;

const DELAY = 300 as const;

export const ExhibitMainPanel = () => {
  const { exhibitId, tabId, coplanarId, subpageId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMobile = useMobileMediaQuery();

  const [displayedAuthToken, setDisplayedAuthToken] = useState<
    ExhibitComponentAuthToken | undefined
  >(undefined);
  const [showAuthTokenDialog, setShowAuthTokenDialog] = useState(false);

  const {
    data: exhibit,
    isLoading: isExhibitLoading,
    error,
  } = useGetExhibitQuery(
    isValidRequiredInteger(exhibitId)
      ? { exhibitId: Number(exhibitId) }
      : skipToken
  );
  const { data: project, isLoading: isProjectLoading } = useGetProjectQuery(
    exhibit ? { projectId: exhibit.siteId } : skipToken
  );

  useEffect(() => {
    if (!tabId && exhibitId) {
      navigate(generateExhibitPath({ exhibitId }));
    }
  }, [exhibitId, navigate, tabId]);

  const isLoading = useMemo(
    () => isExhibitLoading || isProjectLoading,
    [isExhibitLoading, isProjectLoading]
  );

  const exhibitNavItems = useMemo((): Array<NavItem> | undefined => {
    if (exhibitId) {
      return EXHIBIT_TAB_ORDER.map((exhibitTab) => ({
        id: exhibitTab,
        label: EXHIBIT_TAB[exhibitTab],
        icon: createElement(EXHIBIT_TAB_ICONS[exhibitTab]),
        onClick: () =>
          navigate(generateExhibitPath({ exhibitId, tabId: exhibitTab })),
      }));
    }

    return undefined;
  }, [exhibitId, navigate]);

  const [coplanarContent, setCoplanarContent] = useState<{
    coplanarContent: ReactElement;
    coplanarId: string;
    subpageId?: string;
  } | null>(null);

  const onCoplanarExited = useCallback(() => {
    setCoplanarContent(null);
  }, []);

  const onCoplanarClose = useCallback(() => {
    if (!exhibitId || !isExhibitTab(tabId)) return;

    // Since mobile doesn't use a collapse component and doesn't have a delay,
    // we don't trigger the onCoplanarExited callback to clear the content after a collapse.
    // Therefore, we need to clear the content here.
    if (isMobile) {
      setCoplanarContent(null);
    }

    navigate(
      generateExhibitPath({
        exhibitId,
        tabId,
      })
    );
  }, [exhibitId, navigate, isMobile, tabId]);

  const isCoplanarOpen = useMemo(() => {
    if (!coplanarId) return false;

    const isCoplanarIdValid =
      isExhibitComponentKey(coplanarId) ||
      isValidScheduleCoplanarId(coplanarId);

    return isCoplanarIdValid;
  }, [coplanarId]);

  const incomingExhibitAuthToken = useSelector(
    (state) =>
      selectExhibitAuthToken(state, {
        exhibitId: exhibit?.id,
        componentId: exhibit?.id,
        componentType: EXHIBIT_COMPONENT_TYPE.CUSTOM_APPLICATION,
      }),
    {}
  );

  // If there is an incoming exhibit auth token and we don't have a displayed token,
  // set the displayed token and delete the incoming token from the store.
  useEffect(() => {
    if (incomingExhibitAuthToken && exhibit && !displayedAuthToken) {
      setDisplayedAuthToken(incomingExhibitAuthToken);
      setShowAuthTokenDialog(true);

      dispatch(
        deleteExhibitComponentAuthToken({
          exhibitId: exhibit.id,
          componentId: incomingExhibitAuthToken.componentId,
          componentType: EXHIBIT_COMPONENT_TYPE.CUSTOM_APPLICATION,
        })
      );
    }
  }, [incomingExhibitAuthToken, displayedAuthToken, exhibit, dispatch]);

  const handleAuthTokenDialogClose = useCallback(() => {
    setShowAuthTokenDialog(false);
    // Adds a delay to the token deletion to allow the dialog to animate out
    setTimeout(() => {
      setDisplayedAuthToken(undefined);
    }, DELAY);
  }, [setDisplayedAuthToken]);

  if (!isValidRequiredInteger(exhibitId) || !isExhibitTab(tabId)) {
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

  if (isLoading || !exhibit || !project) {
    return <MainPanelSkeleton />;
  }

  let content = null;

  if (isExhibitTab(tabId) && exhibit) {
    switch (tabId) {
      case 'controls': {
        content = <ExhibitControls exhibitId={exhibit.id} />;
        break;
      }
      case 'settings': {
        content = <ExhibitSettings exhibitId={exhibit.id} />;
        break;
      }
      case 'analytics': {
        content = <ExhibitMetrics exhibitId={exhibit.id} />;
        break;
      }
      case 'status': {
        content = <ExhibitStatus exhibitId={exhibit.id} />;
        break;
      }
      case 'files': {
        content = <ExhibitFiles exhibitId={exhibit.id} />;
        break;
      }
      case 'logs': {
        content = <ExhibitLogs exhibitId={exhibit.id} />;
        break;
      }
      case 'schedule':
        content = <ExhibitScheduling exhibitId={exhibit.id} tabId={tabId} />;

        if (
          coplanarId &&
          isValidScheduleCoplanarId(coplanarId) &&
          coplanarContent?.coplanarId !== coplanarId
        ) {
          const decodedCoplanar = decodeScheduleCoplanarId(coplanarId);
          if (!decodedCoplanar) {
            // TODO: throw toast here
            break;
          }
          const eventId = Number(decodedCoplanar.payload);

          setCoplanarContent({
            coplanarContent: (
              <ExhibitSchedulingCoplanar
                onClose={onCoplanarClose}
                exhibitId={exhibit.id}
                mode={decodedCoplanar.mode}
                eventId={eventId}
              />
            ),
            coplanarId,
            subpageId,
          });
        }
        break;
      case 'components': {
        content = (
          <ExhibitComponents
            exhibitId={exhibit.id}
            selectedExhibitComponentKey={
              coplanarContent?.coplanarId &&
              isExhibitComponentKey(coplanarContent.coplanarId)
                ? coplanarContent.coplanarId
                : undefined
            }
          />
        );
        if (
          coplanarId &&
          isExhibitComponentKey(coplanarId) &&
          // If no coplanar component,
          // or the coplanar component is not the same as the current coplanarId,
          // or the coplanar subpage is not the same as the current subpageId
          (!coplanarContent?.coplanarContent ||
            coplanarId !== coplanarContent?.coplanarId ||
            coplanarContent?.subpageId !== subpageId)
        ) {
          setCoplanarContent({
            coplanarId,
            coplanarContent: (
              <ExhibitComponentCoplanar
                exhibitId={exhibit.id}
                exhibitComponentKey={coplanarId}
                coplanarSubpage={subpageId}
                onClose={onCoplanarClose}
              />
            ),
            subpageId,
          });
        }
        break;
      }
      default: {
        exhaustiveGuard(tabId);
      }
    }
  }

  return (
    <MainPanel
      workspaceId={project.organizationId}
      projectId={exhibit.siteId}
      exhibitId={exhibit.id}
      navItems={exhibitNavItems}
      selectedTabId={tabId}
      coplanarContent={coplanarContent?.coplanarContent}
      onExited={onCoplanarExited}
      coplanarOpen={isCoplanarOpen}
    >
      {displayedAuthToken && (
        <ExhibitComponentAuthInfoDialog
          open={showAuthTokenDialog}
          onClose={handleAuthTokenDialogClose}
          {...displayedAuthToken}
        />
      )}
      {content}
    </MainPanel>
  );
};
