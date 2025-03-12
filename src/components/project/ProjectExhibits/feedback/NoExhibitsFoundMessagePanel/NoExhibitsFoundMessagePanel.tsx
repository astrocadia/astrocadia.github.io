import { type FunctionComponent } from 'react';
import { FeedbackMessagePanel } from '../../../../feedback/common/FeedbackMessagePanel';

export const NoExhibitsFoundMessagePanel: FunctionComponent = () => (
  <FeedbackMessagePanel title='No Exhibits Found'>
    <div>Create a new exhibit to get started.</div>
  </FeedbackMessagePanel>
);
