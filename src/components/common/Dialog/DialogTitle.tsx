import CloseIcon from '@mui/icons-material/Close';
import cx from 'classnames';
import type { FunctionComponent } from 'react';
import { IconButton } from '../buttons/IconButton';
import './DialogTitle.css';

export interface DialogTitleProps {
  className?: string;
  id?: string;
  onClose?: () => void;
  title?: string;
  subTitle?: string;
}

export const DialogTitle: FunctionComponent<DialogTitleProps> = ({
  className,
  id,
  onClose,
  title,
  subTitle,
  ...props
}) => (
  <div id={id} className={cx('DialogTitle', className)} {...props}>
    <div>
      {title && <h2>{title}</h2>}
      {title && subTitle && <h3>{subTitle}</h3>}
    </div>
    {onClose && (
      <IconButton
        className='DialogTitle__closeButton'
        aria-label='Close'
        variant='ghost'
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    )}
  </div>
);
