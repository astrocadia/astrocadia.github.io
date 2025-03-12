import cx from 'classnames';
import type { HTMLAttributes, ImgHTMLAttributes } from 'react';
import './EntityCardBanner.css';

export interface EntityCardBannerProps extends HTMLAttributes<HTMLDivElement> {
  imageProps?: ImgHTMLAttributes<HTMLImageElement>;
}

export const EntityCardBanner: React.FunctionComponent<
  EntityCardBannerProps
> = ({ className, imageProps, ...divProps }) => (
  <div className={cx('EntityCardBanner', className)} {...divProps}>
    {!!imageProps && <img alt={imageProps.alt} {...imageProps} />}
  </div>
);
