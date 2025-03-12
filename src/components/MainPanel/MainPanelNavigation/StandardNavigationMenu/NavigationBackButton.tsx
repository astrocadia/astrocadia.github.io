import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCallback, useMemo, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { isNil } from '../../../../utils/lang';
import { generateProjectPath } from '../../../../views/routes/projectRoutePaths';
import { generateWorkspacePath } from '../../../../views/routes/workspaceRoutePaths';
import { NavigationActionButton } from './NavigationActionButton';

interface NavigationBackButtonExhibitEntityProps {
  projectId: number;
}

interface NavigationBackButtonProjectEntityProps {
  workspaceId: number;
}

export type NavigationBackButtonEntityProps =
  | NavigationBackButtonExhibitEntityProps
  | NavigationBackButtonProjectEntityProps;

export const isNavigationBackButtonProjectEntityProps = (
  props: NavigationBackButtonEntityProps
): props is NavigationBackButtonProjectEntityProps =>
  !isNil((props as NavigationBackButtonProjectEntityProps).workspaceId);

export type NavigationBackButtonProps = {
  className?: string;
  collapsed?: boolean;
} & NavigationBackButtonEntityProps;

export const NavigationBackButton: FunctionComponent<
  NavigationBackButtonProps
> = ({ className, collapsed, ...navigationBackButtonEntityProps }) => {
  const navigate = useNavigate();

  const label = useMemo(
    () =>
      isNavigationBackButtonProjectEntityProps(navigationBackButtonEntityProps)
        ? 'Back to workspace'
        : 'Back to project',
    [navigationBackButtonEntityProps]
  );

  const onClick = useCallback(() => {
    if (
      isNavigationBackButtonProjectEntityProps(navigationBackButtonEntityProps)
    ) {
      navigate(
        generateWorkspacePath({
          workspaceId: navigationBackButtonEntityProps.workspaceId.toString(),
        })
      );
    } else {
      navigate(
        generateProjectPath({
          projectId: navigationBackButtonEntityProps.projectId.toString(),
        })
      );
    }
  }, [navigate, navigationBackButtonEntityProps]);

  return (
    <NavigationActionButton
      className={className}
      collapsed={collapsed}
      Icon={<ArrowBackIcon />}
      label={label}
      onClick={onClick}
    />
  );
};
