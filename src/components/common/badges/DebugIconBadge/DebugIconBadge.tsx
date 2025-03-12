import cx from 'classnames';
import type { FunctionComponent } from 'react';
import { BugReportIcon } from '../../icons';
import { Badge } from '../Badge';
import './DebugIconBadge.css';

interface DebugIconBadgeProps {
  className?: string;
}

export const DebugIconBadge: FunctionComponent<DebugIconBadgeProps> = ({
  className,
}) => {
  return (
    <Badge className={cx('DebugIconBadge', className)} Icon={BugReportIcon} />
  );
};
