import { type FunctionComponent, type ReactNode } from 'react';
import cx from 'classnames';
import './ComponentDetailsHeaderSubtitle.css';

export interface ComponentDetailsHeaderSubtitleProps {
  className?: string;
  subtitle: string;
  icon?: ReactNode;
}

export const ComponentDetailsHeaderSubtitle: FunctionComponent<
  ComponentDetailsHeaderSubtitleProps
> = ({ className, subtitle, icon }) => {
  return (
    <div className={cx('ComponentDetailsHeaderSubtitle', className)}>
      <div className='ComponentDetailsHeaderSubtitle__iconWrapper'>{icon}</div>
      <div className='ComponentDetailsHeaderSubtitle__subtitleWrapper'>
        {subtitle}
      </div>
    </div>
  );
};
