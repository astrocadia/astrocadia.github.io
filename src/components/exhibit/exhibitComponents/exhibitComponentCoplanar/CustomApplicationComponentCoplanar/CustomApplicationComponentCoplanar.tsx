import type { FunctionComponent } from 'react';
import { MainPanelCoplanarTitle } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarTitle';
import { CustomApplicationComponentStatus } from './CustomApplicationComponentStatus';

export interface CustomApplicationCoponentCoplanarProps {
  exhibitId: number;
  componentId: number | string;
  onClose: () => void;
}

export const CustomApplicationComponentCoplanar: FunctionComponent<
  CustomApplicationCoponentCoplanarProps
> = ({ exhibitId, onClose, componentId }) => {
  return (
    <>
      <MainPanelCoplanarTitle titleText='Component Details' onClose={onClose} />
      <CustomApplicationComponentStatus
        exhibitId={exhibitId}
        componentId={componentId}
      />
    </>
  );
};
