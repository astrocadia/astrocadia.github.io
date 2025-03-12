import { type FunctionComponent, type ReactNode } from 'react';
import cx from 'classnames';
import {
  ComponentDetailsHeaderMainImage,
  type ComponentDetailsHeaderMainImageProps,
} from './ComponentDetailsHeaderMainImage';
import {
  ComponentDetailsHeaderSubtitle,
  type ComponentDetailsHeaderSubtitleProps,
} from './ComponentDetailsHeaderSubtitle';
import './ComponentDetailsHeader.css';

export interface ComponentDetailsHeaderProps {
  className?: string;
  children?: ReactNode;
  title: string;
  mainImageProps?: ComponentDetailsHeaderMainImageProps['imageProps'];
  subtitleIcon: ComponentDetailsHeaderSubtitleProps['icon'];
  subtitle: ComponentDetailsHeaderSubtitleProps['subtitle'];
}

export const ComponentDetailsHeader: FunctionComponent<
  ComponentDetailsHeaderProps
> = ({
  className,
  children,
  title,
  mainImageProps,
  subtitleIcon,
  subtitle,
}) => {
  return (
    <div className={cx('ComponentDetailsHeader', className)}>
      <div className='ComponentDetailsHeader__contentWrapper'>
        {mainImageProps && (
          <ComponentDetailsHeaderMainImage imageProps={mainImageProps} />
        )}
        <div className='ComponentDetailsHeader__titleWrapper'>{title}</div>
        <ComponentDetailsHeaderSubtitle
          icon={subtitleIcon}
          subtitle={subtitle}
        />
        {children}
      </div>
    </div>
  );
};
