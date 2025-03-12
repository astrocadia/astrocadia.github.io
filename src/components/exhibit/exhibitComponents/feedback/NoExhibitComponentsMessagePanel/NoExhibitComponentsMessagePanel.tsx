import { FunctionComponent, memo } from 'react';
import { FeedbackMessagePanel } from '../../../../feedback/common/FeedbackMessagePanel';
import { FeedbackMessagePanelContent } from '../../../../feedback/common/FeedbackMessagePanelContent';

export const NoExhibitComponentsMessagePanel: FunctionComponent = memo(() => (
  <FeedbackMessagePanel title='No Components Found'>
    <FeedbackMessagePanelContent>
      <div>Add Components here to use Exhibit features.</div>
    </FeedbackMessagePanelContent>
  </FeedbackMessagePanel>
));

NoExhibitComponentsMessagePanel.displayName = 'NoExhibitComponentsMessagePanel';
