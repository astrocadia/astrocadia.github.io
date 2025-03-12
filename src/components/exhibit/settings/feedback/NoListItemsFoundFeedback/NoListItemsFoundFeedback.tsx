import { type FunctionComponent } from 'react';
import { FeedbackMessagePanel } from '../../../../feedback/common/FeedbackMessagePanel';

export const NoListItemsFoundFeedback: FunctionComponent = () => (
  <FeedbackMessagePanel noPanel title='No List items Found'>
    Press &quot;New&quot; to create your first item within this list.
  </FeedbackMessagePanel>
);
