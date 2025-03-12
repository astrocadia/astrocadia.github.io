import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMemo, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { isNil } from '../../utils/lang';
import { generateProjectPath } from '../../views/routes/projectRoutePaths';
import { generateWorkspacePath } from '../../views/routes/workspaceRoutePaths';
import { IconButton, type IconButtonProps } from '../common/buttons/IconButton';

export interface BackToProjectHierarchicalBackButtonProps
  extends Omit<IconButtonProps, 'children'> {
  projectId: number;
}

export interface BackToWorkspaceHierarchicalBackButtonProps
  extends Omit<IconButtonProps, 'children'> {
  workspaceId: number;
}

export type HierarchicalBackButtonProps =
  | BackToProjectHierarchicalBackButtonProps
  | BackToWorkspaceHierarchicalBackButtonProps;

export const isBackToWorkspaceHierarchicalBackButtonProps = (
  props: HierarchicalBackButtonProps
): props is BackToWorkspaceHierarchicalBackButtonProps =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  !isNil((props as any).workspaceId);

export const HierarchicalBackButton: FunctionComponent<
  HierarchicalBackButtonProps
> = (props) => {
  const navigate = useNavigate();
  const { onClick } = props;
  const {
    projectId,
    onClick: onClickProject,
    ...projectRest
  } = props as BackToProjectHierarchicalBackButtonProps;
  const {
    workspaceId,
    onClick: onClickWorkspace,
    ...workspaceRest
  } = props as BackToWorkspaceHierarchicalBackButtonProps;

  const rest = useMemo(() => {
    if (!isNil(projectId)) {
      return projectRest;
    }

    if (!isNil(workspaceId)) {
      return workspaceRest;
    }

    return {};
  }, [projectId, projectRest, workspaceId, workspaceRest]);

  const ariaLabel = useMemo(
    () =>
      isBackToWorkspaceHierarchicalBackButtonProps(props)
        ? 'Back to workspace'
        : 'Back to project',
    [props]
  );

  const onHandleClick = useMemo(() => {
    if (onClick) {
      return onClick;
    }

    if (!isNil(projectId)) {
      return () => {
        navigate(generateProjectPath({ projectId: projectId.toString() }));
      };
    }

    if (!isNil(workspaceId)) {
      return () => {
        navigate(
          generateWorkspacePath({ workspaceId: workspaceId.toString() })
        );
      };
    }

    return undefined;
  }, [navigate, onClick, projectId, workspaceId]);

  return (
    <IconButton
      aria-label={ariaLabel}
      variant='ghost'
      onClick={onHandleClick}
      {...rest}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};
