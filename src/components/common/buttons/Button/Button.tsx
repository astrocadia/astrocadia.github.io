import cx from 'classnames';
import './Button.css';
import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from '@mui/material';
import { ButtonVariant } from '../common/buttonTypes';

export interface ButtonProps extends Omit<MUIButtonProps, 'variant' | 'color'> {
  variant?: ButtonVariant;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  variant = 'primary',
  ...rest
}) => (
  <MUIButton
    disableRipple
    className={cx('Button', className, variant)}
    {...rest}
  />
);
