import cx from 'classnames';
import type { CSSProperties, FunctionComponent } from 'react';
import { SvgIconComponent, SvgIconProps } from '../../icons';
import './Badge.css';

export type BadgeVariant = 'rounded' | 'circle';

export type BadgeSize = 'medium' | 'large';

export interface BadgeProps {
  className?: string;
  Icon?: SvgIconComponent;
  IconProps?: SvgIconProps;
  label?: string;
  style?: CSSProperties;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

export const Badge: FunctionComponent<BadgeProps> = ({
  className,
  Icon,
  IconProps = {},
  label,
  style,
  variant = 'rounded',
  size = 'medium',
}) => {
  return (
    <div
      className={cx(
        'Badge',
        {
          Badge__iconOnly: !label && Icon,
          Badge__noIcon: !Icon,
          Badge__circle: variant === 'circle',
          Badge__rounded: variant === 'rounded',
          Badge__large: size === 'large',
        },
        className
      )}
      style={style}
    >
      {Icon && <Icon {...IconProps} />}
      {label && <span className='Badge__label'>{label}</span>}
    </div>
  );
};
