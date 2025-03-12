import {
  Tooltip as MuiTooltip,
  type TooltipProps as MuiTooltipProps,
} from '@mui/material';
import cx from 'classnames';
import { type FunctionComponent } from 'react';
import './Tooltip.css';

export type TooltipProps = MuiTooltipProps;

export const Tooltip: FunctionComponent<TooltipProps> = ({
  className,
  slotProps,
  ...rest
}) => (
  <MuiTooltip
    className={cx('Tooltip', className)}
    slotProps={{
      ...slotProps,
      tooltip: {
        ...slotProps?.tooltip,
        className: cx('Tooltip__tooltip', slotProps?.tooltip?.className),
      },
    }}
    {...rest}
  />
);
