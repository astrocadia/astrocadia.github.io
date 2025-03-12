import cx from 'classnames';
import { FunctionComponent, ReactNode } from 'react';
import './FeedbackMessagePanelContent.css';

export const FeedbackMessagePanelContent: FunctionComponent<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cx('FeedbackMessagePanelContent', className)}>{children}</div>
);
