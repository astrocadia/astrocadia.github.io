import cx from 'classnames';
import type { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import { Card, type CardProps } from '../common/Card';
import { type CardHeaderProps } from '../common/CardHeader';
import './EntityCard.css';
import {
  EntityCardBanner,
  type EntityCardBannerProps,
} from './EntityCardBanner';
import {
  EntityCardHeader,
  type EntityCardHeaderProps,
} from './EntityCardHeader';

export interface EntityCardProps extends Pick<EntityCardHeaderProps, 'label'> {
  className?: string;
  children?: ReactNode;
  bannerImageProps?: EntityCardBannerProps['imageProps'];
  CardBannerProps?: HTMLAttributes<HTMLDivElement>;
  CardHeaderIcon?: EntityCardHeaderProps['Icon'];
  CardHeaderProps?: CardHeaderProps;
  selected?: boolean;
  onClick?: CardProps['onClick'];
}

export const EntityCard: FunctionComponent<EntityCardProps> = ({
  className,
  children,
  bannerImageProps: bannerImage,
  CardBannerProps = {},
  CardHeaderIcon,
  CardHeaderProps = {},
  label,
  selected,
  onClick,
}) => (
  <Card
    className={cx('EntityCard', className, {
      EntityCard__clickable: !!onClick,
      EntityCard__selected: selected,
    })}
    onClick={onClick}
    tabIndex={0}
  >
    <EntityCardBanner imageProps={bannerImage} {...CardBannerProps} />
    <div className='EntityCard__content'>
      <EntityCardHeader
        Icon={CardHeaderIcon}
        label={label}
        {...CardHeaderProps}
      />
      {children}
    </div>
  </Card>
);
