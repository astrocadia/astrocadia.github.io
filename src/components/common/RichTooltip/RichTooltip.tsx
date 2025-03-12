import cx from 'classnames';
import { FunctionComponent } from 'react';
import { Tooltip, TooltipProps } from '../Tooltip';
import './RichTooltip.css';

export type RichTooltipProps = TooltipProps;

export const RichTooltip: FunctionComponent<RichTooltipProps> = ({
  className,
  PopperProps = {},
  ...rest
}) => (
  <Tooltip
    className={cx('RichTooltip', className)}
    PopperProps={{
      ...PopperProps,
      className: cx('RichTooltipPopper', PopperProps.className),
    }}
    {...rest}
  />
);
