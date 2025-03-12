import type { FunctionComponent, ReactNode } from 'react';
import cx from 'classnames';
import './ActionTriggerCardList.css';

export interface ActionTriggerCardListProps {
  className?: string;
  children?: ReactNode;
  title?: string;
}

export const ActionTriggerCardList: FunctionComponent<
  ActionTriggerCardListProps
> = ({ className, children, title }) => (
  <div className={cx('ActionTriggerCardList', className)}>
    {title && <div className='ActionTriggerCardList__title'>{title}</div>}
    <div className='ActionTriggerCardList__cards'>{children}</div>
  </div>
);
