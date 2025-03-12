import { useCallback, useMemo, FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { ControlledTextField } from '../../common/TextField';
import {
  useCreateProjectMutation,
  useListProjectsQuery,
} from '../../../app/services/workspace';
import {
  getCreateProjectFormSchema,
  type CreateProjectFormSchema,
} from './utils';
import { generateProjectPath } from '../../../views/routes/projectRoutePaths';
import { useToggle } from '../../common/hooks/useToggle';
import ProjectImgSrc from '../assets/ProjectBanner.svg?url';
import { Button } from '../../common/buttons';
import { PlusIcon } from '../../common/icons';
import { CreateEntityDialog } from '../../CreateEntityDialog';
import type { ErrorResultDataResponse } from '../../../app/services/common/responses';
import './CreateProjectButton.css';

const NEW_PROJECT = 'New Project' as const;
const PROJECT_NAME = 'Project name' as const;
const FOREGROUND_IMAGE_ALT = 'An abstract image of a Gumband Project' as const;

export interface CreateProjectButtonProps {
  workspaceId: number;
  className?: string;
}

export const CreateProjectButton: FunctionComponent<
  CreateProjectButtonProps
> = ({ workspaceId, className }) => {
  const navigate = useNavigate();
  const {
    toggled: isModalOpen,
    setOn: openModal,
    setOff: closeModal,
  } = useToggle();

  const { data: projects } = useListProjectsQuery({ workspaceId });
  const [createProject] = useCreateProjectMutation();

  const schema = useMemo(() => {
    const projectNames = projects?.map((project) => project.name) ?? [];
    return getCreateProjectFormSchema(projectNames);
  }, [projects]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    clearErrors,
    reset: resetForm,
    setError,
  } = useForm<CreateProjectFormSchema>({
    defaultValues: { name: '' },
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (formValues: CreateProjectFormSchema) => {
      const { name } = formValues;

      const result = await createProject({ workspaceId, name });
      if ('data' in result) {
        navigate(generateProjectPath({ projectId: result.data.id.toString() }));
        resetForm();
        return result.data;
      }

      if (
        'error' in result &&
        'data' in result.error &&
        (result?.error?.data as ErrorResultDataResponse)
      ) {
        const { response } = result.error.data as ErrorResultDataResponse;
        setError('name', { message: response, type: 'server' });
      }

      return null;
    },
    [createProject, navigate, resetForm, setError, workspaceId]
  );

  const handleCancel = useCallback(() => {
    clearErrors();
    closeModal();
  }, [clearErrors, closeModal]);

  return (
    <>
      <Button
        startIcon={<PlusIcon />}
        onClick={openModal}
        aria-label={NEW_PROJECT}
        className={classNames('CreateProjectButton', className)}
      >
        {NEW_PROJECT}
      </Button>
      <CreateEntityDialog
        open={isModalOpen}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        canSubmit={!isSubmitting && isValid}
        title={NEW_PROJECT}
        entityCardBannerProps={{
          className: 'CreateProjectButton__entityCardBanner',
          imageProps: {
            src: ProjectImgSrc,
            alt: FOREGROUND_IMAGE_ALT,
          },
        }}
      >
        <ControlledTextField
          autoFocus
          name='name'
          control={control}
          placeholder={PROJECT_NAME}
          fullWidth
        />
      </CreateEntityDialog>
    </>
  );
};
