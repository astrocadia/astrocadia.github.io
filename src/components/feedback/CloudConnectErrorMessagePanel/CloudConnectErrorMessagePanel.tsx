import cx from 'classnames';
import { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/buttons';
import { RefreshIcon } from '../../common/icons';
import { useGumbandSupportWidget } from '../../common/hooks/useGumbandSupportWidget';
import { FeedbackMessagePanel } from '../common/FeedbackMessagePanel';
import { FeedbackMessagePanelContent } from '../common/FeedbackMessagePanelContent';
import { FeedbackMessagePanelActions } from '../common/FeedbackMessagePanelActions';

export interface CloudConnectErrorMessagePanelProps {
  className?: string;
  title?: string;
}

export const CloudConnectErrorMessagePanel: FunctionComponent<
  CloudConnectErrorMessagePanelProps
> = ({ className, title = 'Unable To Load From Gumband Cloud Servers' }) => {
  const navigate = useNavigate();
  const onOpenSupportTicketWindow = useGumbandSupportWidget();

  const onRefresh = useCallback(() => {
    navigate(0);
  }, [navigate]);

  const handleOnOpenSupportTicketWindow = useCallback(() => {
    onOpenSupportTicketWindow();
  }, [onOpenSupportTicketWindow]);

  return (
    <FeedbackMessagePanel
      className={cx('CloudConnectErrorMessagePanel', className)}
      title={title}
    >
      <FeedbackMessagePanelContent>
        <div>
          Could not reach the Gumband Cloud server. Try refreshing the page. If
          the error persists, please contact support.
        </div>
        <FeedbackMessagePanelActions>
          <Button
            variant='primary'
            onClick={onRefresh}
            startIcon={<RefreshIcon />}
          >
            Refresh
          </Button>
          <Button onClick={handleOnOpenSupportTicketWindow} variant='primary'>
            Contact Support
          </Button>
        </FeedbackMessagePanelActions>
      </FeedbackMessagePanelContent>
    </FeedbackMessagePanel>
  );
};
