import { useCallback, FunctionComponent, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { ControlledTextField } from '../../../common/TextField';
import {
  exhibitComponentSchema,
  type ExhibitComponentSchema,
} from './schema/componentSchema';
import { useGetExhibitQuery } from '../../../../app/services/exhibit';
import {
  useCreateExhibitHardwareComponentMutation,
  useCreateExhibitSoftwareComponentMutation,
} from '../../../../app/services/exhibitComponents';
import {
  EXHIBIT_COMPONENT_TYPE,
  type ExhibitComponentType,
} from '../../../../app/entities/exhibitComponents';
import { MenuItem } from '../../../common/MenuItem';
import type { SelectProps } from '../../../common/Select';
import { CreateEntityDialog } from '../../../CreateEntityDialog';
import { PlusIcon } from '../../../common/icons';
import { Button } from '../../../common/buttons';
import { useToggle } from '../../../common/hooks/useToggle';
import { getImageSource } from '../utils';
import { useGetUserQuery } from '../../../../app/services/user';
import './CreateExhibitComponentButton.css';

const TITLE = 'New Component' as const;
const NAME_PLACEHOLDER = 'Component name' as const;
const TYPE_PLACEHOLDER = 'Component type' as const;
const FOREGROUND_IMAGE_ALT =
  'An image representing a Gumband Component' as const;
const INVALID_COMPONENT_TYPE_ERROR = 'Invalid component type' as const;
const SERVER_ERROR =
  'There was an server error while trying to create your component' as const;
/** Only DL Admins can create this component type for the time being */
const DL_ADMIN_COMPONENTS: Array<ExhibitComponentType> = [
  'custom-application',
] as const;

type CreateComponentOption = {
  label: string;
  value: Extract<
    ExhibitComponentType,
    'custom-hardware' | 'custom-application'
  >;
};

const CREATE_COMPONENT_OPTIONS: Array<CreateComponentOption> = [
  { label: 'Hardware', value: 'custom-hardware' },
  { label: 'Software', value: 'custom-application' },
  // { label: 'OS Monitor', value: 'os-monitor' },
  // { label: 'Presence Sensor', value: 'presence-sensor' },
] as const;

export interface CreateExhibitComponentButtonProps {
  exhibitId: number;
  className?: string;
}

export const CreateExhibitComponentButton: FunctionComponent<
  CreateExhibitComponentButtonProps
> = ({ exhibitId, className }) => {
  const {
    setOn: openDialog,
    setOff: closeDialog,
    toggled: isDialogOpen,
  } = useToggle();
  const { data: exhibit } = useGetExhibitQuery({ exhibitId });
  const { data: currentUser } = useGetUserQuery();
  const [createHardwareComponent] = useCreateExhibitHardwareComponentMutation();
  const [createSoftwareComponent] = useCreateExhibitSoftwareComponentMutation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    clearErrors,
    setError,
    watch,
    reset,
  } = useForm<ExhibitComponentSchema>({
    defaultValues: {
      name: '',
      type: '',
    },
    mode: 'onChange',
    resolver: zodResolver(exhibitComponentSchema),
  });

  const createComponentOptions = useMemo(() => {
    return CREATE_COMPONENT_OPTIONS.reduce(
      (prev: Array<CreateComponentOption>, current) => {
        if (
          DL_ADMIN_COMPONENTS.includes(current.value) &&
          !currentUser?.dladmin
        ) {
          return prev;
        }

        return [...prev, current];
      },
      []
    );
  }, [currentUser]);

  const watchedComponentType = watch('type') as ExhibitComponentType;

  const bannerImageProps = useMemo(() => {
    if (Object.values(EXHIBIT_COMPONENT_TYPE).includes(watchedComponentType)) {
      return {
        src: getImageSource(watchedComponentType),
        alt: FOREGROUND_IMAGE_ALT,
        className: `CreateExhibitComponentButton__entityCardBannerImage__${watchedComponentType}`,
      };
    }
    return undefined;
  }, [watchedComponentType]);

  const selectProps = useMemo<SelectProps>(
    () => ({
      displayEmpty: true,
      renderValue: (value) => {
        const selectedOption = createComponentOptions.find(
          (option) => option.value === value
        );

        return (
          selectedOption?.label || (
            <span className='CreateExhibitComponentButton__select__placeholder'>
              {TYPE_PLACEHOLDER}
            </span>
          )
        );
      },
    }),
    [createComponentOptions]
  );

  const handleFormSubmit = async (formValues: ExhibitComponentSchema) => {
    if (!exhibit) return;

    try {
      switch (formValues.type) {
        case EXHIBIT_COMPONENT_TYPE.CUSTOM_HARDWARE:
          await createHardwareComponent({
            exhibitId: exhibit.id,
            // TODO: update this when this is supplied by the exhibit
            exhibitApi: 'v1',
            name: formValues.name,
          }).unwrap();
          break;
        case EXHIBIT_COMPONENT_TYPE.CUSTOM_APPLICATION:
          await createSoftwareComponent({
            exhibitId: exhibit.id,
            name: formValues.name,
            type: formValues.type,
          });
          break;
        default:
          setError('type', { message: INVALID_COMPONENT_TYPE_ERROR });
      }

      closeDialog();
      reset();
    } catch (error) {
      // This would be a great place for a toast
      setError('name', { message: SERVER_ERROR });
    }
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
        aria-label={TITLE}
        className={classNames('CreateExhibitComponentButton', className)}
      >
        {TITLE}
      </Button>
      <CreateEntityDialog
        dialogClassName='CreateExhibitComponentButton__dialog'
        onSubmit={handleSubmit(handleFormSubmit)}
        onCancel={handleCancel}
        canSubmit={!isSubmitting && isValid}
        title={TITLE}
        open={isDialogOpen}
        entityCardBannerProps={{
          className: 'CreateExhibitComponentButton__entityCardBanner',
          imageProps: bannerImageProps,
        }}
      >
        <ControlledTextField
          name='type'
          autoFocus
          select
          control={control}
          fullWidth
          SelectProps={selectProps}
        >
          {createComponentOptions.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </ControlledTextField>
        <ControlledTextField
          name='name'
          autoFocus
          control={control}
          placeholder={NAME_PLACEHOLDER}
          fullWidth
        />
      </CreateEntityDialog>
    </>
  );
};
