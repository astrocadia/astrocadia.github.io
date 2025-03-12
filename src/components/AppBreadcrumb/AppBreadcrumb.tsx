import { useMediaQuery } from '@mui/material';
import cx from 'classnames';
import { FunctionComponent, useMemo } from 'react';
import { MOBILE_DEVICE_WIDTH_PX } from '../../styles/constants';
import { isNil } from '../../utils/lang';
import { HierarchicalBackButton } from '../HierarchicalBackButton';
import { ExhibitBreadcrumb } from './ExhibitBreadcrumb';
import { ProjectBreadcrumb } from './ProjectBreadcrumb';
import { UserAvatarMenu } from './UserAvatarMenu/UserAvatarMenu';
import { WorkspaceBreadcrumb } from './WorkspaceBreadcrumb';
import './AppBreadcrumb.css';

export interface AppBreadcrumbProps {
  workspaceId?: number;
  projectId?: number;
  exhibitId?: number;
}

export const AppBreadcrumb: FunctionComponent<AppBreadcrumbProps> = ({
  workspaceId,
  projectId,
  exhibitId,
}) => {
  const mobile = useMediaQuery(`(max-width: ${MOBILE_DEVICE_WIDTH_PX}px)`);

  const hierarchicalBackButtonProps = useMemo(() => {
    if (!mobile) {
      return undefined;
    }

    if (!isNil(exhibitId) && !isNil(projectId)) {
      return { projectId };
    }

    if (!isNil(projectId) && !isNil(workspaceId)) {
      return { workspaceId };
    }

    return undefined;
  }, [exhibitId, mobile, projectId, workspaceId]);

  return (
    <header
      role='banner'
      className={cx('AppBreadcrumb', {
        AppBreadcrumb__workspace:
          !isNil(workspaceId) && isNil(projectId) && isNil(exhibitId),
        AppBreadcrumb__project: !isNil(projectId) && isNil(exhibitId),
        AppBreadcrumb__exhibit: !isNil(exhibitId),
      })}
    >
      {mobile && !!hierarchicalBackButtonProps && (
        <HierarchicalBackButton
          className='AppBreadcrumb__backButton'
          {...hierarchicalBackButtonProps}
        />
      )}
      {/* TODO - Replace with data lookup */}
      {
        /* Display if:
         * - WorkspaceId is supplied
         * - and
         *   - Mobile is false
         *   - or Mobile is true and we are at the workspace level
         */
        !isNil(workspaceId) && (!mobile || (mobile && isNil(projectId))) && (
          <WorkspaceBreadcrumb
            primary={isNil(projectId)}
            workspaceId={workspaceId}
          />
        )
      }
      {
        /* Display if:
         * - projectId is supplied
         * - workspaceId is supplied
         * - and
         *   - Mobile is false
         *   - or Mobile is true and we are at the project level
         */
        !isNil(projectId) &&
          !isNil(workspaceId) &&
          (!mobile || (mobile && isNil(exhibitId))) && (
            <ProjectBreadcrumb
              primary={isNil(exhibitId)}
              projectId={projectId}
            />
          )
      }
      {
        /* Display if:
         * - exhibitId is supplied
         * - projectId is supplied
         * - workspaceId is supplied
         * - and we are at the exhibit level
         */
        !isNil(exhibitId) && !isNil(projectId) && !isNil(workspaceId) && (
          <ExhibitBreadcrumb exhibitId={exhibitId} />
        )
      }
      <div className='AppBreadcrumb__spacer' />
      <UserAvatarMenu />
    </header>
  );
};
