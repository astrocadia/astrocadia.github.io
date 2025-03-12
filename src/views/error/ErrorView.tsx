import copy from 'copy-to-clipboard';
import { useCallback, useMemo, type FunctionComponent } from 'react';
import { useRouteError } from 'react-router-dom';
import { MainPanel } from '../../components/MainPanel';
import { Button } from '../../components/common/buttons';
import { useGumbandSupportWidget } from '../../components/common/hooks/useGumbandSupportWidget';
import { useToggle } from '../../components/common/hooks/useToggle';
import { FeedbackMessagePanel } from '../../components/feedback/common/FeedbackMessagePanel';
import { FeedbackMessagePanelActions } from '../../components/feedback/common/FeedbackMessagePanelActions';
import { FeedbackMessagePanelContent } from '../../components/feedback/common/FeedbackMessagePanelContent';
import './ErrorView.css';

export const ErrorView: FunctionComponent = () => {
  const { toggle, toggled } = useToggle();
  const error = useRouteError();
  const onOpenSupportTicketWindow = useGumbandSupportWidget();

  const errorMessage = useMemo(() => {
    const url = window.location.href;
    const utcDate = new Date().toUTCString();

    return `Gumband Error:\n\nOccurred at: ${utcDate}\nURL: ${url}\n\n${(error as Error)?.stack}`;
  }, [error]);

  const handleOnCopyErrorToClipboard = useCallback(() => {
    copy(errorMessage, { format: 'text/plain' });
  }, [errorMessage]);

  const handleOnOpenSupportTicketWindow = useCallback(() => {
    const subject = 'Gumband Error';
    onOpenSupportTicketWindow({ description: errorMessage, subject });
  }, [errorMessage, onOpenSupportTicketWindow]);

  return (
    <MainPanel className='ErrorView'>
      <FeedbackMessagePanel title={"Oops... that's embarrassing"}>
        <FeedbackMessagePanelContent>
          <div>Something has gone wrong.</div>
          {toggled && (
            <div className='ErrorView__errorContainer'>
              {(error as Error)?.stack}
            </div>
          )}
          <FeedbackMessagePanelActions>
            <Button onClick={handleOnOpenSupportTicketWindow} variant='primary'>
              Report Error
            </Button>
            <Button onClick={toggle} variant='primary'>
              {toggled ? 'Hide' : 'Show'} Error Details
            </Button>
            <Button onClick={handleOnCopyErrorToClipboard} variant='primary'>
              Copy Error to Clipboard
            </Button>
          </FeedbackMessagePanelActions>
        </FeedbackMessagePanelContent>
      </FeedbackMessagePanel>
    </MainPanel>
  );
};
