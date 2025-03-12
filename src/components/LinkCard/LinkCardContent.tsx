import cx from 'classnames';
import type { FunctionComponent, ReactNode } from 'react';
import { CardContent, type CardContentProps } from '../common/CardContent';
import './LinkCardContent.css';
import { Dot } from '../common/Dot';

export interface LinkCardContentProps extends CardContentProps {
  label: string;
  caption?: string;
  icon?: ReactNode;
  marked?: boolean;
}

export const LinkCardContent: FunctionComponent<LinkCardContentProps> = ({
  className,
  label,
  caption = '',
  icon,
  marked,
}) => (
  <CardContent className={cx('LinkCardContent', className)}>
    {icon && <div className='LinkCardContent__iconWrapper'>{icon}</div>}
    <div className='LinkCardContent__textWrapper'>
      <div className='LinkCardContent__labelWrapper'>{label}</div>
      {caption && (
        <div className='LinkCardContent__captionWrapper'>{caption}</div>
      )}
    </div>
    {marked && <Dot color='var(--base-color-orange-400)' />}
  </CardContent>
);
