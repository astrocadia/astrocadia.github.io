import useId from '@mui/material/utils/useId';
import cx from 'classnames';
import { FunctionComponent, ReactNode, useCallback, useEffect } from 'react';
import { useBlocker } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogTitleProps,
} from '../common/Dialog';
import { Button } from '../common/buttons';

export interface NavigationBlockerDialogProps
  extends Pick<DialogTitleProps, 'title'> {
  children?: ReactNode;
  className?: string;
  blockNavigation?: boolean;
}

export const NavigationBlockerDialog: FunctionComponent<
  NavigationBlockerDialogProps
> = ({ blockNavigation, children, className, title }) => {
  const titleId = useId();

  // The blocker from React-router will work for all internal navigation, but it will not work when you
  // manually change the URL in the browser. This effect will add a beforeunload event listener to block
  // navigation in that case.
  // NOTE: It is not possiblie to change the message of the dialog that appears when you try to navigate away
  // from the page. This is a browser feature and cannot be changed.
  useEffect(() => {
    let beforeUnloadHandler: OnBeforeUnloadEventHandler;
    if (blockNavigation) {
      beforeUnloadHandler = (event: BeforeUnloadEvent) => {
        event.preventDefault();

        // Included for legacy support, e.g. Chrome/Edge < 119
        // eslint-disable-next-line no-param-reassign
        event.returnValue = true;
        return null;
      };
      window.addEventListener('beforeunload', beforeUnloadHandler);
    }
    return () => {
      if (beforeUnloadHandler) {
        window.removeEventListener('beforeunload', beforeUnloadHandler);
      }
    };
  }, [blockNavigation]);

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      currentLocation.pathname !== nextLocation.pathname && !!blockNavigation
  );

  const onProceed = useCallback(() => {
    blocker.proceed?.();
  }, [blocker]);

  const onCancel = useCallback(() => {
    blocker.reset?.();
  }, [blocker]);

  return (
    <Dialog
      className={cx('navigation-blocker-dialog', className)}
      open={blocker.state === 'blocked'}
      onClose={onCancel}
      aria-labelledby={`navigation-blocker-dialog-title-${titleId}`}
    >
      <DialogTitle
        id={`navigation-blocker-dialog-title-${titleId}`}
        title={title}
      />
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button variant='primary' onClick={onCancel}>
          Return
        </Button>
        <Button variant='secondary' onClick={onProceed}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};
