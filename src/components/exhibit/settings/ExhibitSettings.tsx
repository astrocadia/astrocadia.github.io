import { useCallback, useMemo, useState, type FunctionComponent } from 'react';
import {
  isSettingList,
  type Setting,
} from '../../../app/entities/exhibitManifest';
import {
  useGetExhibitManifestQuery,
  useUpdateExhibitOpModeMutation,
  useUpdateExhibitSettingsMutation,
  useUpdateExhibitStrapiSettingMutation,
  type ExhibitSettingUpdateRequestParameters,
  type ExhibitStrapiSettingUpdateRequestParameters,
} from '../../../app/services/exhibit';
import { MainPanelContent, MainPanelHeader } from '../../MainPanel';
import { NavigationBlockerDialog } from '../../NavigationBlockerDialog';
import { BreadcrumbItem } from '../../common/BreadcrumbItem';
import { Breadcrumbs } from '../../common/Breadcrumbs';
import { CloudConnectErrorMessagePanel } from '../../feedback/CloudConnectErrorMessagePanel';
import { NoExhibitItemsFeedbackMessagePanel } from '../common/feedback/NoExhibitItemsFeedbackMessagePanel';
import { ExhibitSetting } from './ExhibitSetting';
import { ExhibitSettingListItemCreateButton } from './ExhibitSettingListItemCreateButton';
import './ExhibitSettings.css';
import { ExhibitSettingsList } from './ExhibitSettingsList';
import { ExhibitSettingsRevertButton } from './ExhibitSettingsRevertButton';
import { ExhibitSettingsSaveButton } from './ExhibitSettingsSaveButton';
import {
  SETTING_CATEGORIES,
  encodeSettingKey,
  decodeSettingKey,
  type ExhibitSettingKey,
} from './common/utils/exhibitSettingIdUtils';
import { OperatingModeSetting } from './OperatingModeSetting';
import { OpMode } from '../../../app/entities/exhibit';
import { useOrganizedSettings } from '../common/hooks/useOrganizedSettings';
import { NO_SETTINGS } from '../common/feedback/constants';

interface ExhibitSettingsProps {
  exhibitId: number;
}

export const ExhibitSettings: FunctionComponent<ExhibitSettingsProps> = ({
  exhibitId,
}) => {
  const {
    data: manifest,
    isLoading: isManifestLoading,
    error,
  } = useGetExhibitManifestQuery({ exhibitId });
  const [onSaveSettings] = useUpdateExhibitSettingsMutation();
  const [onSaveStrapiSetting] = useUpdateExhibitStrapiSettingMutation();
  const [onSaveOpMode] = useUpdateExhibitOpModeMutation();
  const [settingsChanged, setSettingsChanged] = useState<
    Map<
      ExhibitSettingKey,
      { value: string | number | null; manifestId: string }
    >
  >(new Map());
  const [manifestIdsWithPendingChanges, setManifestIdsWithPendingChanges] =
    useState<Set<Setting['manifestId']>>(new Set());
  const [pendingOpMode, setPendingOpMode] = useState<OpMode | null>(null);

  const handleChange = (
    id: number,
    manifestId: string,
    value: string | number | null,
    reset: boolean,
    isStrapiSetting?: boolean
  ) => {
    const exhibitSettingKey = encodeSettingKey({
      id,
      category: isStrapiSetting
        ? SETTING_CATEGORIES.STRAPI_CONTENT
        : SETTING_CATEGORIES.DEFAULT_SETTING,
    });
    const newSettingsChanged = new Map(settingsChanged);
    if (reset) {
      newSettingsChanged.delete(exhibitSettingKey);
      if (manifestIdsWithPendingChanges.has(manifestId)) {
        setManifestIdsWithPendingChanges((prev) => {
          const newSet = new Set(prev);
          newSet.delete(manifestId);
          return newSet;
        });
      }
    } else {
      newSettingsChanged.set(exhibitSettingKey, { value, manifestId });
      if (!manifestIdsWithPendingChanges.has(manifestId)) {
        setManifestIdsWithPendingChanges((prev) => {
          const newSet = new Set(prev);
          newSet.add(manifestId);
          return newSet;
        });
      }
    }
    setSettingsChanged(newSettingsChanged);
  };

  const handleOpModeChange = (value: OpMode, reset: boolean) => {
    if (reset) {
      setPendingOpMode(null);
    } else {
      setPendingOpMode(value);
    }
  };

  const [resetChildManifests, setResetChildManifests] = useState(Date.now());

  const onHandleSaveSettings = useCallback(async () => {
    const updateList: ExhibitSettingUpdateRequestParameters['settings'] = [];
    const strapiUpdateList: Array<ExhibitStrapiSettingUpdateRequestParameters> =
      [];

    Array.from(settingsChanged).forEach(([key, { value, manifestId }]) => {
      const { id: settingId, category: settingCategory } =
        decodeSettingKey(key);
      if (settingCategory === SETTING_CATEGORIES.STRAPI_CONTENT) {
        strapiUpdateList.push({
          exhibitId,
          manifestId,
          contentId: value as string,
        });
      } else {
        updateList.push({
          ExhibitId: exhibitId,
          settingId,
          value: value === null ? undefined : value,
        });
      }
    });

    const promises = [];
    promises.push(
      ...strapiUpdateList.map((strapiUpdate) =>
        onSaveStrapiSetting(strapiUpdate)
      )
    );
    if (updateList.length) {
      promises.push(onSaveSettings({ settings: updateList }));
    }
    if (pendingOpMode !== null) {
      promises.push(onSaveOpMode({ exhibitId, opMode: pendingOpMode }));
    }
    await Promise.all(promises);

    setSettingsChanged(new Map());
    setManifestIdsWithPendingChanges(new Set());
    setResetChildManifests(Date.now());
    setPendingOpMode(null);
  }, [
    exhibitId,
    onSaveSettings,
    onSaveStrapiSetting,
    onSaveOpMode,
    pendingOpMode,
    settingsChanged,
    setSettingsChanged,
  ]);

  const onHandleRevertSettings = useCallback(() => {
    setSettingsChanged(new Map());
    setManifestIdsWithPendingChanges(new Set());
    setResetChildManifests(Date.now());
    setPendingOpMode(null);
  }, [setSettingsChanged, setResetChildManifests]);

  const cachedManifest = manifest;

  const {
    sortedSettings,
    breadcrumbs,
    setBreadcrumbs,
    handleSettingGroupOrListSelected,
    onClickBreadcrumbItem,
  } = useOrganizedSettings(cachedManifest);

  const listItemNames = useMemo(() => {
    if (isSettingList(sortedSettings)) {
      return sortedSettings.settinglistitems.map((item) => item.listName);
    }

    return [];
  }, [sortedSettings]);

  const showErrorPanel = useMemo(() => {
    const isListSetting = isSettingList(sortedSettings);
    const isSortedSettings =
      Array.isArray(sortedSettings) && !!sortedSettings?.length;

    return (
      !error &&
      cachedManifest &&
      cachedManifest.opMode === null &&
      !isManifestLoading &&
      !isListSetting &&
      !isSortedSettings
    );
  }, [error, cachedManifest, isManifestLoading, sortedSettings]);

  return (
    <>
      <MainPanelHeader
        title='Settings'
        actions={
          settingsChanged.size || pendingOpMode !== null
            ? [
                <ExhibitSettingsRevertButton
                  key='RevertButton'
                  onClick={onHandleRevertSettings}
                />,
                <ExhibitSettingsSaveButton
                  key='SaveButton'
                  onClick={onHandleSaveSettings}
                />,
              ]
            : undefined
        }
      />
      {error && (
        <CloudConnectErrorMessagePanel title='Unable To Load Settings' />
      )}
      {showErrorPanel && (
        <NoExhibitItemsFeedbackMessagePanel
          exhibitId={exhibitId}
          {...NO_SETTINGS}
        />
      )}

      {!showErrorPanel && (
        <>
          <MainPanelContent className='ExhibitSettings'>
            {!!breadcrumbs.length && (
              <div className='ExhibitSettings__breadCrumbAndActionsWrapper'>
                <Breadcrumbs>
                  <BreadcrumbItem
                    label='All'
                    onClick={() => setBreadcrumbs([])}
                  />
                  {breadcrumbs.map((breadcrumb, idx) => (
                    <BreadcrumbItem
                      key={breadcrumb.manifestId}
                      label={breadcrumb.label}
                      onClick={() => onClickBreadcrumbItem(breadcrumb, idx)}
                    />
                  ))}
                </Breadcrumbs>
                {isSettingList(sortedSettings) && (
                  <ExhibitSettingListItemCreateButton
                    exhibitId={exhibitId}
                    itemNames={listItemNames}
                    settingListId={sortedSettings.id}
                  />
                )}
              </div>
            )}
            {breadcrumbs.length === 0 &&
              cachedManifest &&
              cachedManifest.opMode !== null && (
                <OperatingModeSetting
                  onChange={handleOpModeChange}
                  value={cachedManifest.opMode}
                  updatedValue={pendingOpMode}
                />
              )}
            <div
              key={resetChildManifests}
              className='ExhibitSettings__settingWrapper'
            >
              {isSettingList(sortedSettings) ? (
                <ExhibitSettingsList
                  exhibitId={exhibitId}
                  manifestIdsWithPendingChanges={manifestIdsWithPendingChanges}
                  settingsList={sortedSettings}
                  settingsChanged={settingsChanged}
                  onChange={handleChange}
                  onSelect={handleSettingGroupOrListSelected}
                />
              ) : (
                sortedSettings?.map((setting) => (
                  <ExhibitSetting
                    key={`setting-${setting.manifestId}`}
                    exhibitId={exhibitId}
                    manifestIdsWithPendingChanges={
                      manifestIdsWithPendingChanges
                    }
                    setting={setting}
                    updatedValue={
                      settingsChanged.get(
                        encodeSettingKey({
                          id: setting.id,
                          category:
                            setting.type === 'StrapiContent'
                              ? SETTING_CATEGORIES.STRAPI_CONTENT
                              : SETTING_CATEGORIES.DEFAULT_SETTING,
                        })
                      )?.value
                    }
                    onChange={handleChange}
                    onSelect={handleSettingGroupOrListSelected}
                  />
                ))
              )}
            </div>
          </MainPanelContent>
          <NavigationBlockerDialog
            blockNavigation={settingsChanged.size > 0 || pendingOpMode !== null}
            title='Continue Without Saving?'
          >
            Unsaved changes will be discarded upon exiting this page. Return to
            Settings if you would like to save your changes.
          </NavigationBlockerDialog>
        </>
      )}
    </>
  );
};
