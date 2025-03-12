import { SvgIconProps } from '@mui/material';
import cx from 'classnames';
import { memo, useMemo, type FunctionComponent } from 'react';
import type { ObjectValues } from '../../../utils/usefulTS';
import { Badge } from '../../common/badges';
import { CloudConnectedIcon, CloudDisconnectedIcon } from '../../common/icons';
import { IconMap } from '../common';
import './ConnectedIcon.css';

export const CONNECTED_STATUS = {
  CONNECTED: 'connected',
  NEVER_CONNECTED: 'never-connected',
  DISCONNECTED: 'disconnected',
} as const;

export type ConnectedStatus = ObjectValues<typeof CONNECTED_STATUS>;

type StatusIconMap = IconMap<ConnectedStatus>;

const statusIconMap: StatusIconMap = {
  [CONNECTED_STATUS.CONNECTED]: {
    className: 'ConnectedIcon__connected',
    Icon: CloudConnectedIcon,
  },
  [CONNECTED_STATUS.DISCONNECTED]: {
    className: 'ConnectedIcon__disconnected',
    Icon: CloudDisconnectedIcon,
  },
  [CONNECTED_STATUS.NEVER_CONNECTED]: {
    className: 'ConnectedIcon__neverConnected',
    Icon: CloudDisconnectedIcon,
  },
};
const defaultStatus = { ...statusIconMap['never-connected'] };

export interface ConnectedIconProps extends SvgIconProps {
  status: ConnectedStatus;
}

export const ConnectedIcon: FunctionComponent<ConnectedIconProps> = memo(
  ({ className, status, ...props }) => {
    const statusIcon = useMemo(
      () => statusIconMap[status] ?? defaultStatus,
      [status]
    );

    return (
      <Badge
        className={cx('ConnectedIcon', statusIcon.className, className)}
        Icon={statusIcon.Icon}
        IconProps={props}
        variant='circle'
      />
    );
  }
);

ConnectedIcon.displayName = 'ConnectedIcon';
