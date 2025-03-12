import cx from 'classnames';
import type { FunctionComponent } from 'react';
import { InfoIcon } from '../../icons';
import { Badge } from '../Badge';

interface InfoIconBadgeProps {
  className?: string;
}

export const InfoIconBadge: FunctionComponent<InfoIconBadgeProps> = ({
  className,
}) => {
  return <Badge className={cx('InfoIconBadge', className)} Icon={InfoIcon} />;
};
