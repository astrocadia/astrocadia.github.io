import cx from 'classnames';
import type { FunctionComponent } from 'react';
import { ErrorIcon } from '../../icons';
import { Badge } from '../Badge';
import './ErrorIconBadge.css';

interface ErrorIconBadgeProps {
  className?: string;
}

export const ErrorIconBadge: FunctionComponent<ErrorIconBadgeProps> = ({
  className,
}) => {
  return <Badge className={cx('ErrorIconBadge', className)} Icon={ErrorIcon} />;
};
