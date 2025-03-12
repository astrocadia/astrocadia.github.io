import cx from 'classnames';
import { useMemo, type FunctionComponent } from 'react';
import type { ToastType } from '../../app/services/toast';
import { type SvgIcon } from '../common/icons';
import { Snackbar, type SnackbarProps } from '../common/Snackbar';
import { TOAST_TYPE_ICONS } from './config/toastTypeIcons';
import './Toast.css';
import './toastTypes.css';

export type ToastTypeIconMap = Record<ToastType, typeof SvgIcon | undefined>;

export interface ToastProps extends SnackbarProps {
  type: ToastType;
}

export const Toast: FunctionComponent<ToastProps> = ({
  className,
  type,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  message,
  ...rest
}) => {
  const Icon = useMemo(() => TOAST_TYPE_ICONS[type], [type]);

  return (
    <Snackbar
      className={cx('Toast', className, `Toast__type__${type}`, {
        Toast__hasIcon: !!Icon,
      })}
      message={message}
      anchorOrigin={anchorOrigin}
      {...rest}
    >
      <div className='Toast__content'>
        {Icon && (
          <div className='Toast__icon'>
            <Icon />
          </div>
        )}
        <div className='Toast__message'>{message}</div>
      </div>
    </Snackbar>
  );
};
