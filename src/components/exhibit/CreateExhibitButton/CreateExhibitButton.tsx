import { useCallback, FunctionComponent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { ControlledTextField } from '../../common/TextField';
import {
  getCreateExhibitFormSchema,
  type CreateExhibitFormSchema,
} from './utils';
import {
  useCreateExhibitWithTokenMutation,
  useListExhibitsQuery,
} from '../../../app/services/exhibit';
import { generateExhibitPath } from '../../../views/routes/exhibitRoutePaths';
import { useToggle } from '../../common/hooks/useToggle';
import ExhibitBannerSrc from '../assets/ExhibitBanner.svg?url';
import { Button } from '../../common/buttons';
import { PlusIcon } from '../../common/icons';
import { CreateEntityDialog } from '../../CreateEntityDialog';
import type { ErrorResultDataResponse } from '../../../app/services/common/responses';
import './CreateExhibitButton.css';

const NEW_EXHIBIT = 'New Exhibit' as const;
const EXHIBIT_NAME = 'Exhibit name' as const;
const FOREGROUND_IMAGE_ALT = 'An abstract image of a Gumband Exhibit' as const;

export interface CreateExhibitButtonProps {
  projectId: number;
  className?: string;
}

export const CreateExhibitButton: FunctionComponent<
  CreateExhibitButtonProps
> = ({ projectId, className }) => {
  const navigate = useNavigate();
  const {
    setOn: openDialog,
    setOff: closeDialog,
    toggled: isDialogOpen,
  } = useToggle();

  // const [createExhibit] = useCreateExhibitMutation();
  const [createExhibitWithToken] = useCreateExhibitWithTokenMutation();
  const { data: exhibits } = useListExhibitsQuery({ projectId });

  const exhibitSchema = useMemo(() => {
    const exhibitNames = exhibits?.map((exhibit) => exhibit.name) ?? [];
    return getCreateExhibitFormSchema(exhibitNames);
  }, [exhibits]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    clearErrors,
    setError,
    reset: resetForm,
  } = useForm<CreateExhibitFormSchema>({
    defaultValues: { name: '' },
    mode: 'onChange',
    resolver: zodResolver(exhibitSchema),
  });

  const onSubmit = async (formValues: CreateExhibitFormSchema) => {
    const result = await createExhibitWithToken({
      projectId,
      name: formValues.name,
    });

    if ('data' in result) {
      navigate({
        pathname: generateExhibitPath({
          exhibitId: result.data.id.toString(),
        }),
      });

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
  };

  const handleCancel = useCallback(() => {
    clearErrors();
    closeDialog();
  }, [clearErrors, closeDialog]);

  return (
    <>
      <Button
        startIcon={<PlusIcon />}
        onClick={openDialog}
        aria-label={NEW_EXHIBIT}
        className={classNames('CreateExhibitButton', className)}
      >
        {NEW_EXHIBIT}
      </Button>
      <CreateEntityDialog
        open={isDialogOpen}
        onSubmit={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        canSubmit={!isSubmitting && isValid}
        title={NEW_EXHIBIT}
        entityCardBannerProps={{
          className: 'CreateExhibitButton__entityCardBanner',
          imageProps: {
            src: ExhibitBannerSrc,
            alt: FOREGROUND_IMAGE_ALT,
          },
        }}
      >
        <ControlledTextField
          autoFocus
          name='name'
          control={control}
          placeholder={EXHIBIT_NAME}
          fullWidth
        />
      </CreateEntityDialog>
    </>
  );
};
