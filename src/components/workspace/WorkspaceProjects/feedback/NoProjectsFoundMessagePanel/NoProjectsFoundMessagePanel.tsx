import { type FunctionComponent } from 'react';
import { FeedbackMessagePanel } from '../../../../feedback/common/FeedbackMessagePanel';

export const NoProjectsFoundMessagePanel: FunctionComponent = () => (
  <FeedbackMessagePanel title='No Projects Found'>
    <div>Create a new project to get started.</div>
  </FeedbackMessagePanel>
);
