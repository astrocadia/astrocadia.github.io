import type { FunctionComponent } from 'react';
import { PageNotFoundMessagePanel } from '../../components/feedback/PageNotFoundMessagePanel/PageNotFoundMessagePanel';
import { MainPanel } from '../../components/MainPanel';

export const NotFoundView: FunctionComponent = () => (
  <MainPanel>
    <PageNotFoundMessagePanel />
  </MainPanel>
);
