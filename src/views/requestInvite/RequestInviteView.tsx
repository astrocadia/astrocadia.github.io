import type { FunctionComponent } from 'react';
import { WorkspaceNotFoundMessagePanel } from '../../components/feedback/WorkspaceNotFoundMessagePanel/WorkspaceNotFoundMessagePanel';
import { MainPanel } from '../../components/MainPanel';

export const RequestInviteView: FunctionComponent = () => (
  <MainPanel>
    <WorkspaceNotFoundMessagePanel />
  </MainPanel>
);
