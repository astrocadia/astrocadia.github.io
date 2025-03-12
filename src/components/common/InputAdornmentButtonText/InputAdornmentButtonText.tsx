import { FunctionComponent } from 'react';
import cx from 'classnames';
import { Button, type ButtonProps } from '../buttons/Button';
import './InputAdornmentButtonText.css';

export interface InputAdornmentButtonTextProps
  extends Omit<ButtonProps, 'size'> {
  title: string;
}

export const InputAdornmentButtonText: FunctionComponent<
  InputAdornmentButtonTextProps
> = ({ title, className, ...props }) => {
  return (
    <Button
      className={cx('InputAdornmentButtonText', className)}
      size='small'
      {...props}
    >
      {title}
    </Button>
  );
};
