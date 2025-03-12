import cx from 'classnames';
import { FunctionComponent, ReactNode } from 'react';
import './FeedbackMessagePanelActions.css';

export const FeedbackMessagePanelActions: FunctionComponent<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cx('FeedbackMessagePanelActions', className)}>{children}</div>
);
