import cx from 'classnames';
import { FunctionComponent, useCallback } from 'react';
import { useAppDispatch } from '../../../app/store';
import { logout } from '../../../utils/logout';
import { Button } from '../../common/buttons';
import { useGumbandSupportWidget } from '../../common/hooks/useGumbandSupportWidget';
import { FeedbackMessagePanel } from '../common/FeedbackMessagePanel';
import { FeedbackMessagePanelActions } from '../common/FeedbackMessagePanelActions';
import { FeedbackMessagePanelContent } from '../common/FeedbackMessagePanelContent';

export interface WorkspaceNotFoundMessagePanelProps {
  className?: string;
}

export const WorkspaceNotFoundMessagePanel: FunctionComponent<
  WorkspaceNotFoundMessagePanelProps
> = ({ className }) => {
  const onOpenSupportTicketWindow = useGumbandSupportWidget();
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    logout(dispatch);
  }, [dispatch]);

  const handleOnOpenSupportTicketWindow = useCallback(() => {
    onOpenSupportTicketWindow();
  }, [onOpenSupportTicketWindow]);

  return (
    <FeedbackMessagePanel
      className={cx('WorkspaceNotFoundMessagePanel', className)}
      title='No Workspace Found'
    >
      <FeedbackMessagePanelContent>
        <div>
          Please contact a member of your Gumband workspace to gain access. If
          you have already been invited, please check your inbox for a
          registration link.
        </div>
        <FeedbackMessagePanelActions>
          <Button variant='primary' onClick={handleLogout}>
            Sign Out
          </Button>
          <Button onClick={handleOnOpenSupportTicketWindow} variant='primary'>
            Contact Support
          </Button>
        </FeedbackMessagePanelActions>
      </FeedbackMessagePanelContent>
    </FeedbackMessagePanel>
  );
};
