import cx from 'classnames';
import type { FunctionComponent, ImgHTMLAttributes, ReactNode } from 'react';
import { MainPanelContent } from '../../../MainPanel';
import './FeedbackMessagePanel.css';

export interface FeedbackMessagePanelProps {
  className?: string;
  children?: ReactNode;
  noPanel?: boolean;
  title: string;
  imageProps?: ImgHTMLAttributes<HTMLImageElement>;
}

export const FeedbackMessagePanel: FunctionComponent<
  FeedbackMessagePanelProps
> = ({ className, children, noPanel, title, imageProps }) => {
  const content = (
    <div className='FeedbackMessagePanel__wrapper'>
      {imageProps && (
        <div className='FeedbackMessagePanel__imageWrapper'>
          <img alt='checked' {...imageProps} />
        </div>
      )}
      <div className='FeedbackMessagePanel__title'>{title}</div>
      <div className='FeedbackMessagePanel__message'>{children}</div>
    </div>
  );

  if (noPanel) {
    return (
      <div className={cx('FeedbackMessagePanel', className)}>{content}</div>
    );
  }

  return (
    <MainPanelContent className={cx('FeedbackMessagePanel', className)}>
      {content}
    </MainPanelContent>
  );
};
