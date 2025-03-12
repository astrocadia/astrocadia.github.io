import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconProps } from '@mui/material';
import cx from 'classnames';
import type { FunctionComponent, ReactElement } from 'react';
import type { AvatarProps } from '../../../common/Avatar';
import { MouseOrKeyboardEventHandler } from '../../../common/utils/eventHelpers';
import { BreadcrumbWrapper } from '../BreadcrumbWrapper';
import './Breadcrumb.css';

interface BreadcrumbProps {
  avatar?: ReactElement<AvatarProps>;
  label: string;
  onClick?: MouseOrKeyboardEventHandler;
  primary?: boolean;
  selected?: boolean;
  statusIcon?: ReactElement<IconProps>;
}

export const Breadcrumb: FunctionComponent<BreadcrumbProps> = ({
  avatar,
  label,
  onClick,
  primary,
  selected,
  statusIcon,
}) => {
  return (
    <BreadcrumbWrapper
      className={cx('Breadcrumb', {
        Breadcrumb__primary: primary,
        Breadcrumb__selected: selected,
      })}
      onClick={onClick}
      selected={selected}
    >
      {avatar && <span className='Breadcrumb__avatar'>{avatar}</span>}
      {statusIcon && (
        <span className='Breadcrumb__statusIcon'>{statusIcon}</span>
      )}
      <span className='Breadcrumb__name'>{label}</span>
      <ChevronRightIcon className='Breadcrumb__chevron' />
    </BreadcrumbWrapper>
  );
};
