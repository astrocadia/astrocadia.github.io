import cx from 'classnames';
import { FunctionComponent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../common/buttons';
import { useGumbandSupportWidget } from '../../common/hooks/useGumbandSupportWidget';
import { FeedbackMessagePanel } from '../common/FeedbackMessagePanel';
import PageNotFoundImageSrcUrl from './assets/PageNotFound.png?url';
import { generateHomePath } from '../../../views/routes/helpers/simpleNavigationPaths';
import { FeedbackMessagePanelActions } from '../common/FeedbackMessagePanelActions';
import { FeedbackMessagePanelContent } from '../common/FeedbackMessagePanelContent';

export interface PageNotFoundMessagePanelProps {
  className?: string;
}

export const PageNotFoundMessagePanel: FunctionComponent<
  PageNotFoundMessagePanelProps
> = ({ className }) => {
  const navigate = useNavigate();
  const onOpenSupportTicketWindow = useGumbandSupportWidget();

  const navigateToHome = useCallback(() => {
    navigate(generateHomePath());
  }, [navigate]);

  const handleOnOpenSupportTicketWindow = useCallback(() => {
    onOpenSupportTicketWindow();
  }, [onOpenSupportTicketWindow]);

  return (
    <FeedbackMessagePanel
      className={cx('PageNotFoundMessagePanel', className)}
      title='Page Not Found'
      imageProps={{
        alt: 'Page not found',
        src: PageNotFoundImageSrcUrl,
        width: 180,
        height: 141,
      }}
    >
      <FeedbackMessagePanelContent>
        <div>The page at this URL doesn&rsquo;t exist or has been moved.</div>
        <FeedbackMessagePanelActions>
          <Button variant='primary' onClick={navigateToHome}>
            Back to Home
          </Button>
          <Button onClick={handleOnOpenSupportTicketWindow} variant='primary'>
            Contact Support
          </Button>
        </FeedbackMessagePanelActions>
      </FeedbackMessagePanelContent>
    </FeedbackMessagePanel>
  );
};
