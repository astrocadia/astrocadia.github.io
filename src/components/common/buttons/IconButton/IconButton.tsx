import cx from 'classnames';
import './IconButton.css';
import {
  IconButton as MUIIconButton,
  IconButtonProps as MUIIconButtonProps,
  Tooltip as MUITooltip,
  TooltipProps as MuiTooltipProps,
} from '@mui/material';
import { ButtonVariant } from '../common/buttonTypes';

export type IconButtonTooltipProps = Omit<
  MuiTooltipProps,
  'children' | 'size' | 'title'
>;

export interface IconButtonProps
  extends Omit<MUIIconButtonProps, 'color' | 'size' | 'title' | 'variant'> {
  size?: 'small' | 'medium';
  title?: MuiTooltipProps['title'];
  TooltipProps?: IconButtonTooltipProps;
  variant?: ButtonVariant;
}

export const IconButton: React.FunctionComponent<IconButtonProps> = ({
  className,
  size = 'medium',
  title,
  TooltipProps,
  variant = 'primary',
  ...rest
}) => {
  let iconButton = (
    <MUIIconButton
      disableRipple
      className={cx('IconButton', className, variant)}
      size={size}
      {...rest}
    />
  );

  if (title || TooltipProps) {
    iconButton = (
      <MUITooltip title={title} {...TooltipProps}>
        {iconButton}
      </MUITooltip>
    );
  }

  return iconButton;
};
