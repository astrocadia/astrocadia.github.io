import { type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateExhibitPath } from '../../../../views/routes/exhibitRoutePaths';
import { Button } from '../../../common/buttons';
import { ExhibitComponentIcon } from '../../../common/icons';
import { FeedbackMessagePanel } from '../../../feedback/common/FeedbackMessagePanel';
import { FeedbackMessagePanelActions } from '../../../feedback/common/FeedbackMessagePanelActions';
import { FeedbackMessagePanelContent } from '../../../feedback/common/FeedbackMessagePanelContent';
import { FeedbackMessage } from './constants';

export interface NoExhibitItemsFeedbackMessagePanelProps
  extends FeedbackMessage {
  exhibitId: number;
}

export const NoExhibitItemsFeedbackMessagePanel: FunctionComponent<
  NoExhibitItemsFeedbackMessagePanelProps
> = ({ exhibitId, message, title }) => {
  const navigate = useNavigate();

  const onNavigateToComponents = () => {
    navigate(
      generateExhibitPath({
        exhibitId: exhibitId.toString(),
        tabId: 'components',
      })
    );
  };

  return (
    <FeedbackMessagePanel title={title}>
      <FeedbackMessagePanelContent>
        <div>{message}</div>
        <FeedbackMessagePanelActions>
          <Button
            variant='primary'
            onClick={onNavigateToComponents}
            startIcon={<ExhibitComponentIcon />}
          >
            View Components
          </Button>
        </FeedbackMessagePanelActions>
      </FeedbackMessagePanelContent>
    </FeedbackMessagePanel>
  );
};
