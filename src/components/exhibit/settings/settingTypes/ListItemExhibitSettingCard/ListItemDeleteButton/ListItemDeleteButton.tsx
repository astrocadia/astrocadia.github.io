import { useCallback, type FunctionComponent } from 'react';
import { Exhibit } from '../../../../../../app/entities/exhibit';
import type {
  SettingList,
  SettingListItem,
} from '../../../../../../app/entities/exhibitManifest';
import type { ErrorResultDataResponse } from '../../../../../../app/services/common/responses';
import { useDeleteExhibitManifestSettingsListItemMutation } from '../../../../../../app/services/exhibit';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '../../../../../common/Dialog';
import { Button } from '../../../../../common/buttons';
import { IconButton } from '../../../../../common/buttons/IconButton';
import { useToggle } from '../../../../../common/hooks/useToggle';
import { DeleteIcon } from '../../../../../common/icons';
import './ListItemDeleteButton.css';

export interface ListItemDeleteButtonProps {
  exhibitId: Exhibit['id'];
  settingListId: SettingList['id'];
  manifestId: SettingList['manifestId'];
  itemName: SettingListItem['listName'];
}

export const ListItemDeleteButton: FunctionComponent<
  ListItemDeleteButtonProps
> = ({ exhibitId, itemName, settingListId, manifestId }) => {
  const { toggled: open, setOn: onOpen, setOff: onClose } = useToggle(false);
  const [deleteListItem, { error, isLoading }] =
    useDeleteExhibitManifestSettingsListItemMutation();

  const handleOnClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const onSubmit = useCallback(async () => {
    await deleteListItem({
      exhibitId,
      settingListId,
      manifestId,
      itemName,
    })
      .unwrap()
      .then(() => {
        onClose();
      });
  }, [deleteListItem, exhibitId, itemName, manifestId, onClose, settingListId]);

  return (
    <>
      <IconButton variant='primary' onClick={onOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        className='ListItemDeleteButton__Dialog'
        open={open}
        onClose={isLoading ? undefined : handleOnClose}
      >
        <DialogTitle title='Remove List Item?' />
        <DialogContent>
          <p>
            This will remove the list item{' '}
            <span className='ListItemDeleteButton__Dialog-itemName'>
              {itemName}
            </span>{' '}
            and cannot be undone.
          </p>

          {error &&
            'data' in error &&
            (error.data as ErrorResultDataResponse)?.response && (
              <p className='ListItemDeleteButton__Error'>
                {(error.data as ErrorResultDataResponse)?.response}
              </p>
            )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isLoading}
            variant='primary'
            onClick={handleOnClose}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant='secondary'
            onClick={onSubmit}
            type='submit'
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
