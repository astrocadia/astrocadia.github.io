import { FunctionComponent } from 'react';
import cx from 'classnames';
import { addOnEnterOrSpaceHandler } from '../utils/eventHelpers';
import './BreadcrumbItem.css';

export interface BreadcrumbItemProps {
  onClick?: () => void;
  label: string;
  disabled?: boolean;
}

export const BreadcrumbItem: FunctionComponent<BreadcrumbItemProps> = ({
  label,
  onClick,
  disabled,
}) => {
  return onClick ? (
    <span
      role='button'
      className={cx('BreadcrumbItem', 'BreadcrumbItem__clickable', {
        BreadcrumbItem__disabled: disabled,
      })}
      onClick={!disabled ? addOnEnterOrSpaceHandler(onClick) : undefined}
      tabIndex={!disabled ? 0 : -1}
      onKeyDown={!disabled ? addOnEnterOrSpaceHandler(onClick) : undefined}
    >
      {label}
    </span>
  ) : (
    <span
      className={cx('BreadcrumbItem', { BreadcrumbItem__disabled: disabled })}
    >
      {label}
    </span>
  );
};
