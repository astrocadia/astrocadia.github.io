import { SvgIconProps } from '@mui/material';
import cx from 'classnames';
import { memo, useMemo } from 'react';
import { OpMode } from '../../../app/entities/exhibit';
import { Badge } from '../../common/badges';
import { BoltIcon, BoltOffIcon } from '../../common/icons';
import { IconMap } from '../common';
import './OperatingModeIcon.css';

const statusIconMap: IconMap<Exclude<OpMode, null>> = {
  On: {
    className: 'OperatingModeIcon__On',
    Icon: BoltIcon,
  },
  Off: {
    className: 'OperatingModeIcon__Off',
    Icon: BoltOffIcon,
  },
};
const defaultStatus = { ...statusIconMap.Off };

export interface ConnectedIconProps extends SvgIconProps {
  status: OpMode;
}

export interface OperatingModeIconProps extends SvgIconProps {
  opMode: OpMode;
}

export const OperatingModeIcon: React.FunctionComponent<OperatingModeIconProps> =
  memo(({ className, opMode, ...props }) => {
    const statusIcon = useMemo(
      () => (opMode !== null ? statusIconMap[opMode] : defaultStatus),
      [opMode]
    );

    return (
      <Badge
        className={cx('OperatingModeIcon', statusIcon.className, className)}
        Icon={statusIcon.Icon}
        IconProps={props}
        variant='circle'
        size='large'
      />
    );
  });

OperatingModeIcon.displayName = 'OperatingModeIcon';
