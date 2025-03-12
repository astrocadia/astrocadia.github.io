import { type FunctionComponent } from 'react';
import { useGetExhibitManifestQuery } from '../../../app/services/exhibit';
import { MainPanelContent, MainPanelHeader } from '../../MainPanel';
import { ActionTriggerCardList } from '../../common/ActionTriggerCardList';
import { Alert } from '../../common/Alert';
import { CloudConnectErrorMessagePanel } from '../../feedback/CloudConnectErrorMessagePanel';
import { NoExhibitItemsFeedbackMessagePanel } from '../common/feedback/NoExhibitItemsFeedbackMessagePanel';
import { useOrganizedControls } from '../common/hooks/useOrganizedControls';
import { ExhibitControlActionTriggerCard } from './ExhibitControlActionTriggerCard';
import './ExhibitControls.css';
import { NO_CONTROLS } from '../common/feedback/constants';

interface ExhibitControlsProps {
  exhibitId: number;
}

/**
 *  The `ExhibitControls` component displays a list of controls for an exhibit.
 *
 *  All users with access to the exhibit can view the controls.
 *
 *  Controls are only enabled when all the following conditions are met:
 *  - The exhibit is online
 *  - The control is writeable (user permission)
 *  - The control is enabled for the current op mode (if applicable)
 *
 */
export const ExhibitControls: FunctionComponent<ExhibitControlsProps> = ({
  exhibitId,
}) => {
  const {
    data: manifest,
    error,
    isLoading,
  } = useGetExhibitManifestQuery({
    exhibitId,
  });

  const [singleControls, groupControls] = useOrganizedControls(
    manifest?.controls
  );

  return (
    <>
      <MainPanelHeader
        title='Controls'
        subtitle='Send updates to the exhibit in real-time'
      />
      {error && (
        <CloudConnectErrorMessagePanel title='Unable To Load Controls' />
      )}
      {!error && !manifest?.controls?.length && (
        <NoExhibitItemsFeedbackMessagePanel
          exhibitId={exhibitId}
          {...NO_CONTROLS}
        />
      )}
      {!error && manifest && !!manifest.controls?.length && (
        <MainPanelContent className='ExhibitControls__content'>
          {!isLoading && (
            <>
              {!manifest?.online && (
                <Alert className='ExhibitControls__alert' severity='error'>
                  The exhibit is disconnected from the Gumband Cloud and is
                  unable to receive controls.
                </Alert>
              )}
              {!!singleControls?.length && (
                <ActionTriggerCardList>
                  {singleControls.map((control) => (
                    <ExhibitControlActionTriggerCard
                      key={control.id}
                      exhibitId={exhibitId}
                      controlId={control.id}
                      disabled={!manifest.online || !control.write}
                      fullWidth
                      display={control.display}
                    />
                  ))}
                </ActionTriggerCardList>
              )}

              {groupControls?.map((control) => (
                <ActionTriggerCardList key={control.id} title={control.display}>
                  {control.items.map((item) => (
                    <ExhibitControlActionTriggerCard
                      key={item.id}
                      exhibitId={exhibitId}
                      controlId={control.id}
                      itemId={item.id}
                      disabled={!manifest?.online || !control.write}
                      fullWidth
                      display={item.display}
                    />
                  ))}
                </ActionTriggerCardList>
              ))}
            </>
          )}
        </MainPanelContent>
      )}
    </>
  );
};
