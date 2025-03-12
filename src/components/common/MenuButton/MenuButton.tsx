import type { FunctionComponent } from 'react';
import cx from 'classnames';
import { Button, type ButtonProps } from '../buttons';
import './MenuButton.css';

interface MenuButtonProps extends Omit<ButtonProps, 'size'> {
  size?: 'small' | 'medium';
}

export const MenuButton: FunctionComponent<MenuButtonProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <Button className={cx('MenuButton', className)} variant='ghost' {...rest}>
      {children}
    </Button>
  );
};
