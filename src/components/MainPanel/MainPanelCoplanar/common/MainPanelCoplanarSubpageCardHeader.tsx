import cx from 'classnames';
import { ReactNode, type FunctionComponent } from 'react';
import { Badge, BadgeProps } from '../../../common/badges';
import { CardContent } from '../../../common/CardContent';
import './MainPanelCoplanarSubpageCardHeader.css';

export interface MainPanelCoplanarSubpageCardHeaderProps {
  title: string;
  subtitle?: string;
  badgeProps?: BadgeProps;
  headerAction?: ReactNode;
  className?: string;
}

export const MainPanelCoplanarSubpageCardHeader: FunctionComponent<
  MainPanelCoplanarSubpageCardHeaderProps
> = ({ className, title, subtitle, badgeProps, headerAction }) => {
  return (
    <CardContent
      className={cx(className, 'MainPanelCoplanarSubpageCardHeader')}
      slot='button'
    >
      {badgeProps && <Badge {...badgeProps} />}
      <div className='MainPanelCoplanarSubpageCardHeader__textContainer'>
        <div className='MainPanelCoplanarSubpageCardHeader__title'>{title}</div>
        {subtitle && (
          <div className='MainPanelCoplanarSubpageCardHeader__subtitle'>
            {subtitle}
          </div>
        )}
      </div>
      {headerAction && (
        <div className='MainPanelCoplanarSubpageCardHeader__action'>
          {headerAction}
        </div>
      )}
    </CardContent>
  );
};
