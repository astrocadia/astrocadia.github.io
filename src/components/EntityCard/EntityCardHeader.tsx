import cx from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import { CardHeader, type CardHeaderProps } from '../common/CardHeader';
import './EntityCardHeader.css';

export interface EntityCardHeaderProps extends CardHeaderProps {
  Icon: ReactNode;
  label: string;
}

export const EntityCardHeader: FunctionComponent<EntityCardHeaderProps> = ({
  className,
  Icon,
  label,
  ...CardHeaderProps
}) => (
  <CardHeader
    className={cx('EntityCardHeader', className)}
    title={
      <>
        <span className='EntityCardHeader__title'>{label}</span>
        {Icon}
      </>
    }
    {...CardHeaderProps}
  />
);
