import { type FunctionComponent } from 'react';
import { MainPanelCoplanarTitle } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarTitle';
import { NO_CONTROLS } from '../../../common/feedback/constants';
import { FeedbackMessagePanel } from '../../../../feedback/common/FeedbackMessagePanel';
import {
  AddRemoveExhibitControlsList,
  AddRemoveExhibitControlsListProps,
} from '../SelectedExhibitControlsCard/AddRemoveExhibitControlsList';
import './AddControlsSubpage.css';

const ADD_CONTROLS_SUBPAGE_TITLE = 'Add Controls' as const;

export interface AddControlsSubpageProps
  extends AddRemoveExhibitControlsListProps {
  onClose: () => void;
  onBack: () => void;
  titleText: string;
}

export const AddControlsSubpage: FunctionComponent<AddControlsSubpageProps> = ({
  onClose,
  onBack,
  controls,
  selectedControls,
  onSelectedControlsChange,
  titleText,
}) => {
  return (
    <div className='AddControlsSubpage'>
      <MainPanelCoplanarTitle
        className='AddControlsSubpage__title'
        titleText={titleText}
        subtitleText={ADD_CONTROLS_SUBPAGE_TITLE}
        onClose={onClose}
        onBack={onBack}
      />
      <div className='AddControlsSubpage__contentWrapper'>
        {controls?.length > 0 ? (
          <AddRemoveExhibitControlsList
            controls={controls}
            selectedControls={selectedControls}
            onSelectedControlsChange={onSelectedControlsChange}
          />
        ) : (
          <FeedbackMessagePanel title={NO_CONTROLS.title}>
            {NO_CONTROLS.message}
          </FeedbackMessagePanel>
        )}
      </div>
    </div>
  );
};
