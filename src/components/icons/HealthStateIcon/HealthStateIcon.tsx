import type { SvgIconProps } from '@mui/material';
import cx from 'classnames';
import { memo, type FunctionComponent } from 'react';
import { ExhibitHealthState } from '../../../app/entities/exhibit';
import { Badge } from '../../common/badges';
import { CheckCircleIcon, ErrorIcon } from '../../common/icons';
import './HealthStateIcon.css';

export interface HealthStateIconProps extends SvgIconProps {
  healthState: ExhibitHealthState;
}

export const HealthStateIcon: FunctionComponent<HealthStateIconProps> = memo(
  ({ className, healthState, ...props }) => (
    <Badge
      className={cx(
        'HealthStateIcon',
        {
          HealthStateIcon__ok: healthState === 'ALL_CONNECTIONS_OK',
          HealthStateIcon__warning: healthState === 'SOME_CONNECTIONS_OK',
          HealthStateIcon__error: healthState === 'NO_CONNECTIONS',
        },
        className
      )}
      Icon={healthState === 'ALL_CONNECTIONS_OK' ? CheckCircleIcon : ErrorIcon}
      IconProps={props}
      variant='circle'
    />
  )
);

HealthStateIcon.displayName = 'HealthStateIcon';
