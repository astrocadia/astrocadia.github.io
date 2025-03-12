import { type FunctionComponent } from 'react';
import { Control } from '../../../../../../app/entities/exhibitManifest';
import { FormLabel } from '../../../../../common/FormLabel';
import { MainPanelCoplanarSubpageBlockRow } from '../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageBlockRow';
import './SelectedExhibitControlCard.css';

export interface SelectedExhibitControlCardProps {
  display: Control['display'];
}

export const SelectedExhibitControlCard: FunctionComponent<
  SelectedExhibitControlCardProps
> = ({ display = '' }) => {
  return (
    <MainPanelCoplanarSubpageBlockRow
      condensed
      className='SelectedExhibitControlCard'
    >
      <FormLabel>{display}</FormLabel>
    </MainPanelCoplanarSubpageBlockRow>
  );
};
