import cx from 'classnames';
import type { FunctionComponent } from 'react';
import './CountBadge.css';

export interface CountBadgeProps {
  className?: string;
  count: number;
}

export const CountBadge: FunctionComponent<CountBadgeProps> = ({
  className,
  count,
}) => {
  return (
    <div className={cx('CountBadge', className)}>
      <span className='CountBadge__count'>{count}</span>
    </div>
  );
};
