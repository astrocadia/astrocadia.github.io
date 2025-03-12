import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, type FunctionComponent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Exhibit } from '../../../../app/entities/exhibit';
import { SettingList } from '../../../../app/entities/exhibitManifest';
import { useCreateExhibitManifestSettingsListItemMutation } from '../../../../app/services/exhibit';
import { attachDuplicateStringRefinement } from '../../../../utils/zod';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '../../../common/Dialog';
import { ControlledTextField } from '../../../common/TextField';
import { Button } from '../../../common/buttons';
import { useToggle } from '../../../common/hooks/useToggle';
import { PlusIcon } from '../../../common/icons';
import type { ErrorResultDataResponse } from '../../../../app/services/common/responses';
import './ExhibitSettingListItemCreateButton.css';

// Regex that matches a string that does not include a '"' or '/' character
const itemNameRegex = /^[^"/]*$/;

export interface ExhibitSettingListItemCreateButtonProps {
  exhibitId: Exhibit['id'];
  itemNames?: Array<string>;
  settingListId: SettingList['id'];
}

export const ExhibitSettingListItemCreateButton: FunctionComponent<
  ExhibitSettingListItemCreateButtonProps
> = ({ exhibitId, itemNames = [], settingListId }) => {
  const [createListItem] = useCreateExhibitManifestSettingsListItemMutation();
  const { toggled: open, setOn: onOpen, setOff: onClose } = useToggle(false);
  const formSchema = useMemo(
    () =>
      z.object({
        itemName: attachDuplicateStringRefinement(
          z.string().min(1, 'Item Name is required').regex(itemNameRegex, {
            message:
              'List item names may not contain forward slashes or double quotes',
          }),
          itemNames,
          'Item Name must be unique'
        ),
      }),
    [itemNames]
  );

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    setError,
    setFocus,
  } = useForm<FormSchemaType>({
    defaultValues: { itemName: '' },
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (open) {
      // Focus the input after the dialog opens, we have to wait for the dialog to render
      // because MUI doesn't provide a way to detect if the dialog is rendered yet
      setTimeout(() => setFocus('itemName'), 100);
    }
  }, [open, setFocus]);

  const handleOnClose = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  const onSubmit: SubmitHandler<FormSchemaType> = useCallback(
    async ({ itemName }) => {
      const result = await createListItem({
        exhibitId,
        itemName,
        settingListId,
      });
      if ('error' in result && 'data' in result.error) {
        if ((result.error.data as ErrorResultDataResponse).response) {
          setError(
            'itemName',
            {
              type: 'server',
              message: (result.error.data as ErrorResultDataResponse)?.response,
            },
            { shouldFocus: true }
          );
          return;
        }
      }
      handleOnClose();
    },
    [createListItem, exhibitId, handleOnClose, setError, settingListId]
  );

  return (
    <>
      <Button startIcon={<PlusIcon />} variant='primary' onClick={onOpen}>
        New
      </Button>
      <Dialog
        className='ExhibitSettingListItemCreateButton__Dialog'
        open={open}
        onClose={isSubmitting ? undefined : handleOnClose}
      >
        <DialogTitle title='New List Item' />
        <DialogContent>
          <p>
            This will create a new list item with default values. Please enter a
            name for the new item below.
          </p>

          <ControlledTextField
            name='itemName'
            control={control}
            fullWidth
            placeholder='Item Name'
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isSubmitting}
            variant='primary'
            onClick={handleOnClose}
          >
            Cancel
          </Button>
          <Button
            disabled={isSubmitting || !isValid}
            variant='secondary'
            onClick={handleSubmit(onSubmit)}
            type='submit'
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
