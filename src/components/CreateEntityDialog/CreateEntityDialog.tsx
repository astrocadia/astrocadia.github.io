import { memo, FunctionComponent, ReactNode } from 'react';
import cx from 'classnames';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '../common/Dialog';
import { Button } from '../common/buttons';
import { EntityCardBanner, type EntityCardBannerProps } from '../EntityCard';
import './CreateEntityDialog.css';

const CANCEL_BUTTON_LABEL = 'Cancel';
const CREATE_BUTTON_LABEL = 'Create';

export interface CreateEntityDialogProps {
  open: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  canSubmit: boolean;
  title?: string;
  entityCard?: ReactNode;
  entityCardBannerProps?: EntityCardBannerProps;
  createButtonLabel?: string;
  cancelButtonLabel?: string;
  dialogClassName?: string;
  children: ReactNode;
}

export const CreateEntityDialog: FunctionComponent<CreateEntityDialogProps> =
  memo(
    ({
      open,
      onSubmit,
      onCancel,
      canSubmit = false,
      title,
      entityCardBannerProps,
      createButtonLabel = CREATE_BUTTON_LABEL,
      cancelButtonLabel = CANCEL_BUTTON_LABEL,
      dialogClassName,
      children,
    }) => {
      return (
        <Dialog
          open={open}
          title={title}
          className={cx('CreateEntityDialog', dialogClassName)}
        >
          <DialogTitle title={title} />
          <DialogContent>
            {entityCardBannerProps && (
              <EntityCardBanner {...entityCardBannerProps} />
            )}
            {children}
          </DialogContent>
          <DialogActions>
            <Button title='Cancel' onClick={onCancel}>
              {cancelButtonLabel}
            </Button>
            <Button
              title='Create'
              variant='secondary'
              onClick={onSubmit}
              disabled={!canSubmit}
            >
              {createButtonLabel}
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
  );

CreateEntityDialog.displayName = 'CreateEntityDialog';
