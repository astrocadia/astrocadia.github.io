import { useMemo, type FunctionComponent } from 'react';
import { FeedbackMessagePanel } from '../../../../feedback/common/FeedbackMessagePanel';
import { MainPanelCoplanarTitle } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarTitle';
import { NO_SETTINGS } from '../../../common/feedback/constants';
import {
  AddRemoveExhibitSettingsList,
  AddRemoveExhibitSettingsListProps,
} from '../SelectedExhibitSettingsCard/AddRemoveExhibitSettingsList';
import './AddSettingsSubpage.css';

const ADD_SETTINGS_SUBPAGE_TITLE = 'Add Settings' as const;

export interface AddSettingsSubpageProps
  extends AddRemoveExhibitSettingsListProps {
  onClose: () => void;
  onBack: () => void;
  titleText: string;
}

export const AddSettingsSubpage: FunctionComponent<AddSettingsSubpageProps> = ({
  onClose,
  onBack,
  opModeChecked,
  onOpModeClick,
  settingsManifest,
  selectedSettings,
  onSelectedSettingsChange,
  titleText,
}) => {
  const hasSettings = useMemo(() => {
    return (
      !!settingsManifest.opMode !== null ||
      !!settingsManifest.settings.length ||
      !!settingsManifest.strapiContent.length ||
      !!settingsManifest.settingGroups.length ||
      !!settingsManifest.settingLists.length
    );
  }, [settingsManifest]);

  return (
    <div className='AddControlsSubpage'>
      <MainPanelCoplanarTitle
        className='AddControlsSubpage__title'
        titleText={titleText}
        subtitleText={ADD_SETTINGS_SUBPAGE_TITLE}
        onClose={onClose}
        onBack={onBack}
      />
      <div className='AddControlsSubpage__contentWrapper'>
        {hasSettings ? (
          <AddRemoveExhibitSettingsList
            opModeChecked={opModeChecked}
            onOpModeClick={onOpModeClick}
            settingsManifest={settingsManifest}
            selectedSettings={selectedSettings}
            onSelectedSettingsChange={onSelectedSettingsChange}
          />
        ) : (
          <FeedbackMessagePanel title={NO_SETTINGS.title}>
            {NO_SETTINGS.message}
          </FeedbackMessagePanel>
        )}
      </div>
    </div>
  );
};
