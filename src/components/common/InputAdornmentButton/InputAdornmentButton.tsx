import { FunctionComponent } from 'react';
import cx from 'classnames';
import { IconButton, type IconButtonProps } from '../buttons/IconButton';
import './InputAdornmentButton.css';

export type InputAdornmentButtonProps = Omit<
  IconButtonProps,
  'size' | 'variant'
>;

export const InputAdornmentButton: FunctionComponent<
  Omit<InputAdornmentButtonProps, 'size' | 'variant'>
> = ({ children, className, ...props }) => {
  return (
    <IconButton
      className={cx('InputAdornmentButton', className)}
      size='small'
      variant='ghost'
      {...props}
    >
      {children}
    </IconButton>
  );
};
