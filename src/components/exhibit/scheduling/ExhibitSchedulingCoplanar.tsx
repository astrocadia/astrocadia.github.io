import {
  exhaustiveGuard,
  type ObjectValues,
} from '@deeplocal/gumband-public-shared-lib';
import { DateTime } from 'luxon';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FunctionComponent,
} from 'react';
import type { Exhibit, OpMode } from '../../../app/entities/exhibit';
import {
  Control,
  IndividualSetting,
  MANIFEST_ID_SEPARATOR,
} from '../../../app/entities/exhibitManifest';
import {
  ScheduleControlManifest,
  ScheduleSettingsManifest,
  ScheduleStrapiContentManifest,
  useCreateEventMutation,
  useDeleteEventMutation,
  useGetExhibitManifestWithoutStatusSubscriptionQuery,
  useGetScheduledEventById,
  useUpdateEventMutation,
  type ExhibitCreateEventRequestParameters,
  type ExhibitScheduledEvent,
  type ExhibitUpdateEventRequestParameters,
} from '../../../app/services/exhibit';
import { isNil } from '../../../utils/lang';
import {
  EventScheduleInput,
  isRepeatMode,
  REPEAT_MODE,
  type EventScheduleInputProps,
  type RepeatMode,
  type Weekday,
} from '../../EventScheduleInput';
import { MainPanelCoplanarTitle } from '../../MainPanel/MainPanelCoplanar/MainPanelCoplanarTitle';
import { ControlledTextField } from '../../common/TextField';
import { Badge } from '../../common/badges';
import { ActionsIcon, EventNoteIcon } from '../../common/icons';
import { FlattenedSettingsBlock } from '../common/utils/settings';
import './ExhibitSchedulingCoplanar.css';
import { ExhibitSchedulingCoplanarActions } from './ExhibitSchedulingCoplanarActions';
import { ExhibitSchedulingCoplanarConfirmationDialog } from './ExhibitSchedulingCoplanarConfirmationDialog';
import { useExhibitSchedulingCoplanarForm } from './hooks/useExhibitSchedulingCoplanarForm';
import { AddControlsSubpage } from './schedulingCoplanar/AddControlsSubpage';
import { AddSettingsSubpage } from './schedulingCoplanar/AddSettingsSubpage';
import { SelectedExhibitControlsCard } from './schedulingCoplanar/SelectedExhibitControlsCard';
import { SelectedExhibitSettingsCard } from './schedulingCoplanar/SelectedExhibitSettingsCard';
import {
  SCHEDULING_COPLANAR_MODE,
  SchedulingCoplanarMode,
} from './schedulingCoplanar/common/coplanarMode';
import {
  DIALOG_CONFIG,
  EXHIBIT_SCHEDULING_CONFIRMATION_DIALOG_TYPE,
  getDialogType,
  type ExhibitSchedulingCoplanarConfirmationDialogConfig,
} from './schedulingCoplanar/common/dialog';
import { useExhibitSchedulingCoplanarFlags } from './schedulingCoplanar/common/flags';
import {
  CANCEL_BUTTON_LABEL,
  CREATE_TITLE,
  EDIT_TITLE,
  NAME_INPUT_PLACEHOLDER,
} from './schedulingCoplanar/common/lang';
import {
  convertAltValueToLocalWeekdaySet,
  convertLocalAltValueToAltValue,
  getRepeatModeAltValue,
} from './schedulingCoplanar/utils/recurrenceLogic';
import {
  createFlattenedSettings,
  createSelectedControls,
} from './utils/scheduleTransformations';
import { useAppDispatch } from '../../../app/store';
import { addToast } from '../../../app/services/toast';
import { TOAST } from './schedulingCoplanar/common/toast';

const INITIAL_END_DATE_TIME_OFFSET = { months: 3 } as const;
const MAX_END_DATE_OFFSET = { years: 1 } as const;

const ERRORS = {
  START_DATE_REQUIRED: 'Start date is required',
  END_DATE_AFTER_START: 'End date must be after Start date',
  END_DATE_TOO_FAR: 'Event duration cannot exceed 1 year',
} as const;

export const COPLANAR_SUBPAGE = {
  ADD_CONTROLS: 'add-controls',
  ADD_SETTINGS: 'add-settings',
} as const;
const ACTIONS = 'Actions' as const;

export type CoplanarSubpage = ObjectValues<typeof COPLANAR_SUBPAGE>;

export const isCoplanarSubpage = (
  subpage?: unknown
): subpage is CoplanarSubpage =>
  !!subpage &&
  typeof subpage === 'string' &&
  Object.values(COPLANAR_SUBPAGE).includes(subpage as CoplanarSubpage);

export interface ExhibitSchedulingCoplanarProps {
  // undefined when new event
  onClose: () => void;
  exhibitId: Exhibit['id'];
  mode: SchedulingCoplanarMode;
  eventId?: ExhibitScheduledEvent['id'];
}

export const ExhibitSchedulingCoplanar: FunctionComponent<
  ExhibitSchedulingCoplanarProps
> = ({ onClose, exhibitId, mode, eventId }) => {
  const { flags, setFlag, resetFlags, areFlagsDirty } =
    useExhibitSchedulingCoplanarFlags();

  const { data: manifest } =
    useGetExhibitManifestWithoutStatusSubscriptionQuery({ exhibitId });

  const dispatch = useAppDispatch();
  const [createEvent] = useCreateEventMutation();
  const [updateEvent] = useUpdateEventMutation();
  const [deleteEvent] = useDeleteEventMutation();
  const { event } = useGetScheduledEventById(exhibitId, eventId);

  const [coplanarSubpage, setCoplanarSubpage] = useState<
    CoplanarSubpage | undefined
  >(undefined);

  const [cachedSelectedControls, setCachedSelectedControls] = useState<
    Array<Control>
  >(
    !isNil(event) && !isNil(manifest)
      ? createSelectedControls(manifest.controls, event)
      : []
  );

  const [pendingOpMode, setPendingOpMode] = useState<OpMode | null>(null);

  const [cachedSelectedSettings, setCachedSelectedSettings] = useState<
    Array<FlattenedSettingsBlock>
  >(
    !isNil(event) && !isNil(manifest)
      ? (createFlattenedSettings(
          manifest,
          event
        ) as Array<FlattenedSettingsBlock>)
      : []
  );

  const handleSettingValueChange = useCallback(
    (
      id: number,
      manifestId: string,
      value: string | number | null,
      valueReset: boolean,
      isStrapiSetting?: boolean
    ) => {
      const newSelectedSettings = new Array(...cachedSelectedSettings);
      const parentManifestId = manifestId
        .split(MANIFEST_ID_SEPARATOR)
        .slice(0, -1)
        .join(MANIFEST_ID_SEPARATOR);
      const cachedSettingBlockIdx = newSelectedSettings.findIndex(
        (block) =>
          (block.breadcrumbs.at(-1)?.manifestId || '') === parentManifestId
      );

      if (cachedSettingBlockIdx >= 0) {
        const cachedSettingIdx = newSelectedSettings[
          cachedSettingBlockIdx
        ].settings.findIndex((setting) => setting.manifestId === manifestId);

        if (cachedSettingIdx >= 0) {
          newSelectedSettings[cachedSettingBlockIdx].settings[
            cachedSettingIdx
          ] = {
            ...newSelectedSettings[cachedSettingBlockIdx].settings[
              cachedSettingIdx
            ],
            value: isStrapiSetting
              ? {
                  id: value,
                }
              : value,
          } as IndividualSetting;
        }
      }

      setCachedSelectedSettings(newSelectedSettings);

      // simple way to track if changes occurred -- won't catch if the setting is different from the existing schedule setting value
      setFlag('isSelectedSettingsDirty', true);
    },
    [cachedSelectedSettings, setFlag]
  );

  const [dialog, setDialog] = useState<
    ExhibitSchedulingCoplanarConfirmationDialogConfig | undefined
  >(undefined);

  const [dialogCloseCallback, setDialogCloseCallback] = useState<
    (() => void) | undefined
  >(undefined);

  const [repeatMode, setRepeatMode] = useState<RepeatMode>(REPEAT_MODE.NEVER);
  const [customRepeatDays, setCustomRepeatDays] = useState<Set<Weekday>>(
    new Set()
  );
  const [startDateTime, setStartDateTime] = useState<DateTime | null>(
    DateTime.now()
  );

  const [endDateTime, setEndDateTime] = useState<DateTime | null>(null);
  const [changeAll, setChangeAll] = useState(false);

  useEffect(() => {
    if (!endDateTime) {
      setEndDateTime(startDateTime?.plus(INITIAL_END_DATE_TIME_OFFSET) ?? null);
    }
  }, [startDateTime, event, endDateTime]);

  const {
    control: eventNameFieldControl,
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty: isFormDirty },
    getValues,
    setValue,
    reset: resetForm,
  } = useExhibitSchedulingCoplanarForm({
    name: event?.name ?? '',
  });

  const isRepeatModeValid = useMemo(() => {
    return isRepeatMode(repeatMode);
  }, [repeatMode]);

  const maxEndDate = useMemo(() => {
    const startDate = startDateTime ?? DateTime.now();
    return startDate.plus(MAX_END_DATE_OFFSET);
  }, [startDateTime]);

  const dateTimeValidationError: string | undefined = useMemo(() => {
    if (!startDateTime) {
      return ERRORS.START_DATE_REQUIRED;
    }

    if (endDateTime) {
      if (startDateTime > endDateTime) {
        return ERRORS.END_DATE_AFTER_START;
      }

      if (endDateTime > maxEndDate) {
        return ERRORS.END_DATE_TOO_FAR;
      }
    }

    return undefined;
  }, [startDateTime, endDateTime, maxEndDate]);

  const areActionsValid = useMemo(
    () =>
      // At least one control or setting
      cachedSelectedControls.length > 0 ||
      cachedSelectedSettings.some((block) => block.settings.length > 0) ||
      pendingOpMode !== null,
    [cachedSelectedControls, cachedSelectedSettings, pendingOpMode]
  );

  const canSubmit = useMemo(() => {
    const formIsValid =
      isValid &&
      isRepeatModeValid &&
      !dateTimeValidationError &&
      areActionsValid;
    const formIsDirty = areFlagsDirty || isFormDirty;

    return !isSubmitting && formIsValid && formIsDirty;
  }, [
    isValid,
    isRepeatModeValid,
    dateTimeValidationError,
    areActionsValid,
    areFlagsDirty,
    isFormDirty,
    isSubmitting,
  ]);

  const dialogPrimaryActionDisabled = useMemo(() => {
    if (dialog?.type.startsWith('edit')) {
      return !canSubmit;
    }
    if (dialog?.type.startsWith('delete')) {
      return isSubmitting;
    }
    return false;
  }, [dialog?.type, canSubmit, isSubmitting]);

  const localAltValue = useMemo(() => {
    return getRepeatModeAltValue(repeatMode, startDateTime, customRepeatDays);
  }, [repeatMode, startDateTime, customRepeatDays]);

  // TODO: This can probably live inside CreateEdit function
  const selectedFrequency = useMemo(() => {
    const label = repeatMode.charAt(0).toUpperCase() + repeatMode.slice(1);

    const recurringOption = {
      label,
      value: repeatMode,
      altValue: convertLocalAltValueToAltValue({
        startDate: startDateTime,
        localAltValue,
      }),
    };

    return recurringOption;
  }, [repeatMode, startDateTime, localAltValue]);

  const title = useMemo(() => {
    switch (mode) {
      case SCHEDULING_COPLANAR_MODE.EDIT:
        return EDIT_TITLE;
      case SCHEDULING_COPLANAR_MODE.NEW:
        return CREATE_TITLE;
      default:
        return exhaustiveGuard(mode);
    }
  }, [mode]);

  const closeDialog = useCallback(
    () => dialog && setDialog({ ...dialog, open: false }),
    [dialog]
  );

  const resetComponent = useCallback(() => {
    resetForm({
      name: '',
    });
    resetFlags();
    setRepeatMode(REPEAT_MODE.NEVER);
    setCustomRepeatDays(new Set());
    setStartDateTime(DateTime.now());
    setEndDateTime(null);
    setCachedSelectedControls([]);
    setCachedSelectedSettings([]);
    setPendingOpMode(null);
  }, [resetForm, resetFlags, setStartDateTime, setEndDateTime]);

  const handleEventChange = useCallback(() => {
    if (!event) return;

    const startTime = DateTime.fromISO(event.startDate);

    resetComponent();
    setValue('name', event.name);
    setStartDateTime(startTime);

    if (event.recurring) {
      const frequency = event.frequency.value;

      if (isRepeatMode(frequency)) {
        setRepeatMode(frequency);
      } else {
        setRepeatMode(REPEAT_MODE.CUSTOM);
      }

      setEndDateTime(DateTime.fromISO(event.recurringEndDate));
      setCustomRepeatDays(
        convertAltValueToLocalWeekdaySet(startTime, event.frequency.altValue)
      );
    }

    resetFlags();

    if (!isNil(manifest)) {
      setCachedSelectedControls(
        createSelectedControls(manifest.controls, event)
      );
      setCachedSelectedSettings(createFlattenedSettings(manifest, event));
      if (manifest.opMode !== null && event.opMode !== null) {
        setPendingOpMode(event.opMode ? 'On' : 'Off');
      } else {
        setPendingOpMode(null);
      }
    } else {
      // TODO: consider throwing an error toast
      console.error('manifest failed to load properly');
    }
  }, [
    event,
    setValue,
    setStartDateTime,
    setRepeatMode,
    setEndDateTime,
    setCustomRepeatDays,
    resetFlags,
    resetComponent,
    manifest,
  ]);

  useEffect(() => {
    if (event) {
      handleEventChange();
    } else {
      resetComponent();
    }
  }, [event, handleEventChange, resetComponent]);

  const handleRepeatModeChange: EventScheduleInputProps['onChangeRepeatMode'] =
    useCallback(
      (newRepeatMode) => {
        setRepeatMode(newRepeatMode);
        setFlag('isRepeatModeDirty', true);
      },
      [setRepeatMode, setFlag]
    );

  const handleDateTimeChange = useCallback(
    (time: 'start' | 'end', newDateTime: DateTime | null) => {
      setFlag('isDateTimeDirty', true);

      if (time === 'start') {
        setStartDateTime(newDateTime);
        return;
      }

      setEndDateTime(newDateTime);
    },
    [setStartDateTime, setFlag]
  );

  const handleCoplanarClose = useCallback(() => {
    resetComponent();
    onClose();
  }, [onClose, resetComponent]);

  const handleDialogClose = useCallback(() => {
    closeDialog();

    if (dialogCloseCallback) {
      dialogCloseCallback();
      setDialogCloseCallback(undefined);
    }
  }, [closeDialog, dialogCloseCallback]);

  const handleDeleteClick = useCallback(() => {
    const dialogType = getDialogType({
      type: 'delete',
      recurring: event?.recurring,
    });
    if (!dialogType) return;

    setDialog({
      open: true,
      type: EXHIBIT_SCHEDULING_CONFIRMATION_DIALOG_TYPE.DELETE,
      ...DIALOG_CONFIG[dialogType],
    });
  }, [event]);

  const handleConfirmDelete = useCallback(async () => {
    if (!event || isNil(exhibitId)) {
      return;
    }

    const { recurringId } = event;

    try {
      if (changeAll && !recurringId) {
        return;
      }

      await deleteEvent({ eventId: event.id, changeAll, recurringId }).unwrap();
      dispatch(addToast(TOAST.EVENT_DELETED));
    } catch (error) {
      dispatch(addToast(TOAST.EVENT_DELETE_ERROR));
    }

    setDialogCloseCallback(() => {
      resetComponent();
      onClose();
    });

    closeDialog();
  }, [
    dispatch,
    deleteEvent,
    event,
    exhibitId,
    closeDialog,
    changeAll,
    resetComponent,
    onClose,
  ]);

  const handleCreateEdit = useCallback(async () => {
    if (!startDateTime || !isValid || isNil(exhibitId)) {
      return;
    }

    const manifestControls: ScheduleControlManifest = {};
    const manifestSettings: ScheduleSettingsManifest = {};
    const manifestStrapiContent: ScheduleStrapiContentManifest = {};

    cachedSelectedControls.forEach((control) => {
      manifestControls[control.id.toString()] = control;
    });

    cachedSelectedSettings.forEach((block) => {
      block.settings.forEach((setting) => {
        if (setting.type !== 'StrapiContent') {
          manifestSettings[setting.id.toString()] = setting;
        } else {
          manifestStrapiContent[setting.id.toString()] = {
            ...setting,
            value: setting.value ? setting.value.id.toString() : undefined,
          };
        }
      });
    });

    const params: ExhibitCreateEventRequestParameters = {
      exhibitId,
      manifest: {
        opMode: pendingOpMode !== null ? pendingOpMode === 'On' : undefined,
        controls: manifestControls,
        settings: manifestSettings,
        strapiContent: manifestStrapiContent,
      },
      eventName: getValues('name'),
      startDate: startDateTime.toMillis(),
      endDate:
        endDateTime?.toMillis() ??
        startDateTime
          .plus(INITIAL_END_DATE_TIME_OFFSET)
          .startOf('minute')
          .toMillis(),
      recurring: repeatMode !== REPEAT_MODE.NEVER,
      selectedFrequency,
    };

    try {
      if (mode === SCHEDULING_COPLANAR_MODE.EDIT && event) {
        const newChangeAll = dialog?.forceChangeAll ?? changeAll ?? false;
        const editParams: ExhibitUpdateEventRequestParameters = {
          ...params,
          eventId: event.id,
          recurringId: event.recurringId,
          changeAll: newChangeAll,
        };

        await updateEvent(editParams).unwrap();
        dispatch(addToast(TOAST.EVENT_UPDATED));
      } else {
        await createEvent(params).unwrap();
        dispatch(addToast(TOAST.EVENT_CREATED));
      }

      closeDialog();
      onClose();
    } catch (error) {
      if (mode === SCHEDULING_COPLANAR_MODE.EDIT) {
        dispatch(addToast(TOAST.EVENT_UPDATE_ERROR));
      } else {
        dispatch(addToast(TOAST.EVENT_CREATE_ERROR));
      }
    }
  }, [
    startDateTime,
    dispatch,
    isValid,
    exhibitId,
    cachedSelectedControls,
    cachedSelectedSettings,
    pendingOpMode,
    getValues,
    endDateTime,
    repeatMode,
    selectedFrequency,
    mode,
    event,
    closeDialog,
    onClose,
    dialog?.forceChangeAll,
    changeAll,
    updateEvent,
    createEvent,
  ]);

  const handleCoplanarDialogAction = useCallback(async () => {
    if (mode === SCHEDULING_COPLANAR_MODE.EDIT) {
      const dialogType = getDialogType({
        type: 'edit',
        recurring: event?.recurring,
        isRepeatModeDirty: flags.isRepeatModeDirty,
      });
      if (!dialogType) return;

      setDialog({
        open: true,
        type: dialogType,
        ...DIALOG_CONFIG[dialogType],
      });
    } else {
      // Since we're not confirming creation, we can just call the handler directly.
      await handleCreateEdit();
    }
  }, [mode, event, flags.isRepeatModeDirty, handleCreateEdit]);

  const handleDialogPrimaryAction = useCallback(async () => {
    if (dialog?.type.startsWith('delete')) {
      await handleConfirmDelete();
    } else if (dialog?.type.startsWith('edit')) {
      await handleCreateEdit();
    }
  }, [dialog, handleConfirmDelete, handleCreateEdit]);

  let coplanarContent = (
    <>
      <MainPanelCoplanarTitle titleText={title} onClose={onClose} />
      <div className='ExhibitSchedulingCoplanar__contentWrapper'>
        <div className='ExhibitSchedulingCoplanar__content'>
          <ControlledTextField
            name='name'
            control={eventNameFieldControl}
            placeholder={NAME_INPUT_PLACEHOLDER}
            fullWidth
          />
          <div className='ExhibitSchedulingCoplanar__scheduleBlock'>
            <span className='ExhibitSchedulingCoplanar__blockTitle'>
              <Badge
                variant='circle'
                Icon={EventNoteIcon}
                className='ExhibitSchedulingCoplanar__scheduleIconBadge'
              />
              Schedule
            </span>
            <EventScheduleInput
              repeatMode={repeatMode}
              customRepeatDays={customRepeatDays}
              startDateTime={startDateTime}
              endDateTime={endDateTime}
              onChangeRepeatMode={handleRepeatModeChange}
              onChangeCustomRepeatDays={(newCustomRepeatDays) => {
                setCustomRepeatDays(newCustomRepeatDays);
                setFlag('isCustomRepeatDaysDirty', true);
              }}
              onChangeStartDateTime={(newDateTime) =>
                handleDateTimeChange('start', newDateTime)
              }
              onChangeEndDateTime={(newDateTime) =>
                handleDateTimeChange('end', newDateTime)
              }
              endDateError={!!dateTimeValidationError}
              endDateHelperText={dateTimeValidationError}
            />
          </div>
          <div className='ExhibitSchedulingCoplanar__actionsBlock'>
            <span className='ExhibitSchedulingCoplanar__blockTitle'>
              <Badge
                variant='circle'
                Icon={ActionsIcon}
                className='ExhibitSchedulingCoplanar__actionIconBadge'
              />
              {ACTIONS}
            </span>
            <SelectedExhibitControlsCard
              selectedControls={cachedSelectedControls}
              onButtonClick={() =>
                setCoplanarSubpage(COPLANAR_SUBPAGE.ADD_CONTROLS)
              }
            />
            <SelectedExhibitSettingsCard
              opMode={pendingOpMode}
              onOpModeChange={(value) => {
                if (pendingOpMode !== null) {
                  setPendingOpMode(value);
                }
                setFlag('isOperatingModeDirty', true);
              }}
              selectedExhibitSettings={cachedSelectedSettings}
              onButtonClick={() =>
                setCoplanarSubpage(COPLANAR_SUBPAGE.ADD_SETTINGS)
              }
              onSettingValueChange={handleSettingValueChange}
            />
          </div>
        </div>
        <ExhibitSchedulingCoplanarActions
          mode={mode}
          isDisabled={!canSubmit}
          onDelete={handleDeleteClick}
          onCancel={handleCoplanarClose}
          onSave={handleSubmit(handleCoplanarDialogAction)}
        />
      </div>
      {dialog && (
        <ExhibitSchedulingCoplanarConfirmationDialog
          open={dialog.open ?? false}
          title={dialog.title ?? ''}
          subtitle={dialog.subtitle ?? ''}
          recurring={dialog.offerChangeAll}
          onClose={handleDialogClose}
          changeAll={changeAll}
          onChangeAll={setChangeAll}
          primaryActionDisabled={dialogPrimaryActionDisabled}
          primaryActionLabel={dialog.primaryActionLabel}
          secondaryActionLabel={CANCEL_BUTTON_LABEL}
          onPrimaryAction={handleSubmit(handleDialogPrimaryAction)}
          onSecondaryAction={handleDialogClose}
        />
      )}
    </>
  );

  if (isCoplanarSubpage(coplanarSubpage) && manifest) {
    switch (coplanarSubpage) {
      case COPLANAR_SUBPAGE.ADD_CONTROLS: {
        coplanarContent = (
          <AddControlsSubpage
            controls={manifest.controls}
            selectedControls={cachedSelectedControls}
            titleText={title}
            onSelectedControlsChange={(newSelectedControls) => {
              setCachedSelectedControls(newSelectedControls);
              setFlag('isSelectedControlsDirty', true);
            }}
            onClose={() => setCoplanarSubpage(undefined)}
            onBack={() => setCoplanarSubpage(undefined)}
          />
        );
        break;
      }
      case COPLANAR_SUBPAGE.ADD_SETTINGS: {
        coplanarContent = (
          <AddSettingsSubpage
            opModeChecked={pendingOpMode !== null}
            onOpModeClick={() => {
              if (pendingOpMode === null && manifest.opMode !== null) {
                setPendingOpMode(manifest.opMode);
              } else {
                setPendingOpMode(null);
              }
              setFlag('isOperatingModeDirty', true);
            }}
            settingsManifest={manifest}
            selectedSettings={cachedSelectedSettings}
            titleText={title}
            onSelectedSettingsChange={(newSelectedSettings) => {
              setCachedSelectedSettings(newSelectedSettings);
              setFlag('isSelectedSettingsDirty', true);
            }}
            onClose={() => setCoplanarSubpage(undefined)}
            onBack={() => setCoplanarSubpage(undefined)}
          />
        );
        break;
      }
      default:
        exhaustiveGuard(coplanarSubpage);
    }
  }

  return <div className='ExhibitSchedulingCoplanar'>{coplanarContent}</div>;
};
