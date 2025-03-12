import cx from 'classnames';
import type { FunctionComponent } from 'react';
import { WarningIcon } from '../../icons';
import { Badge } from '../Badge';
import './WarningIconBadge.css';

interface WarningIconBadgeProps {
  className?: string;
}

export const WarningIconBadge: FunctionComponent<WarningIconBadgeProps> = ({
  className,
}) => {
  return (
    <Badge className={cx('WarningIconBadge', className)} Icon={WarningIcon} />
  );
};
