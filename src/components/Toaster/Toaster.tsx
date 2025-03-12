import { useCallback, useMemo, type FunctionComponent } from 'react';
import { Slide, type SnackbarCloseReason } from '@mui/material';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import {
  removeToast,
  closeToast,
  selectToasts,
  type Toast as ToastType,
} from '../../app/services/toast';
import { Toast } from '../Toast/Toast';
import { useAppDispatch } from '../../app/store';
import './Toaster.css';

const DEFAULT_MAX_TOASTS = 3 as const;
const ENTER_DURATION = 400 as const;
const EXIT_DURATION = 350 as const;
const EASING = 'cubic-bezier(0.2, 0, 0, 1)' as const;

const getStyles = (index: number) => {
  return {
    marginBottom: `${index * 3.5}rem`,
  };
};

export interface ToasterProps {
  maxToasts?: number;
  className?: string;
}

export const Toaster: FunctionComponent<ToasterProps> = ({
  maxToasts = DEFAULT_MAX_TOASTS,
  className,
}) => {
  const toasts = useSelector(selectToasts);
  const dispatch = useAppDispatch();

  const displayedToasts = useMemo(() => {
    // Return only the number of toasts that should currently be visible
    return toasts.slice(0, maxToasts);
  }, [toasts, maxToasts]);

  const handleClose = useCallback(
    (toastId: ToastType['id'], reason: SnackbarCloseReason) => {
      if (reason === 'clickaway') return;

      dispatch(closeToast(toastId));
    },
    [dispatch]
  );

  const handleExited = useCallback(
    (toastId: ToastType['id']) => {
      dispatch(removeToast(toastId));
    },
    [dispatch]
  );

  return (
    <div className={cx('Toaster', className)}>
      {displayedToasts.map((toast, index) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          autoHideDuration={toast.duration}
          open={toast.open}
          onClose={(_event, reason) => handleClose(toast.id, reason)}
          TransitionProps={{
            onExited: () => handleExited(toast.id),
            timeout: {
              enter: ENTER_DURATION,
              exit: EXIT_DURATION,
            },
            easing: {
              enter: EASING,
              exit: EASING,
            },
          }}
          TransitionComponent={Slide}
          style={getStyles(index)}
        />
      ))}
    </div>
  );
};
