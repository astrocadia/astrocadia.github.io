import {
  memo,
  useCallback,
  type FunctionComponent,
  type ReactNode,
} from 'react';
import classNames from 'classnames';
import { Button } from '../../common/buttons';
import { FeedbackMessagePanel } from '../common/FeedbackMessagePanel';
import { FeedbackMessagePanelActions } from '../common/FeedbackMessagePanelActions';
import { FeedbackMessagePanelContent } from '../common/FeedbackMessagePanelContent';
import { useGumbandSupportWidget } from '../../common/hooks/useGumbandSupportWidget';
import './ErrorFeedbackPanel.css';

export interface ErrorPanelProps {
  className?: string;
  title?: string;
  message?: string;
  action?: ReactNode;
  contactSupportLabel?: string;
}

export const ErrorFeedbackPanel: FunctionComponent<ErrorPanelProps> = memo(
  ({
    title = '',
    message = '',
    action,
    className,
    contactSupportLabel = 'Contact Support',
  }) => {
    const contactSupport = useGumbandSupportWidget();

    const handleOnContactSupport = useCallback(() => {
      contactSupport();
    }, [contactSupport]);

    return (
      <FeedbackMessagePanel
        className={classNames('ErrorFeedbackPanel', className)}
        title={title}
      >
        <FeedbackMessagePanelContent>
          <div>{message}</div>
          <FeedbackMessagePanelActions>
            {action}
            <Button variant='primary' onClick={handleOnContactSupport}>
              {contactSupportLabel}
            </Button>
          </FeedbackMessagePanelActions>
        </FeedbackMessagePanelContent>
      </FeedbackMessagePanel>
    );
  }
);

ErrorFeedbackPanel.displayName = 'ErrorFeedbackPanel';
