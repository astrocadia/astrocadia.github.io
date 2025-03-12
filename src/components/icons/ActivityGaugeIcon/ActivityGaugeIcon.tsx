import type { SvgIconProps } from '@mui/material';
import cx from 'classnames';
import { memo, type FunctionComponent } from 'react';
import { Badge } from '../../common/badges';
import { GaugeLow, GaugeMed, GaugeHigh } from '../../common/icons';
import './ActivityGaugeIcon.css';

export type ActivityGaugeState = 'low' | 'med' | 'high';
export interface ActivityGaugeIconProps extends SvgIconProps {
  gaugeState: ActivityGaugeState;
}

export const ActivityGaugeIcon: FunctionComponent<ActivityGaugeIconProps> =
  memo(({ className, gaugeState, ...props }) => {
    let gaugeIcon;
    switch (gaugeState) {
      case 'low':
        gaugeIcon = GaugeLow;
        break;
      case 'med':
        gaugeIcon = GaugeMed;
        break;
      case 'high':
      default:
        gaugeIcon = GaugeHigh;
        break;
    }
    return (
      <Badge
        className={cx(
          'ActivityGaugeIcon',
          {
            ActivityGaugeIcon__low: gaugeState === 'low',
            ActivityGaugeIcon__med: gaugeState === 'med',
            ActivityGaugeIcon__high: gaugeState === 'high',
          },
          className
        )}
        Icon={gaugeIcon}
        IconProps={props}
        variant='circle'
      />
    );
  });

ActivityGaugeIcon.displayName = 'ActivityGaugeIcon';
