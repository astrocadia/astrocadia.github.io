import {
  Control,
  ControlGroupItem,
  ExhibitSettingsManifest,
  IndividualSetting,
} from '../../../../app/entities/exhibitManifest';
import {
  ExhibitScheduledEvent,
  ScheduleSetting,
  ScheduleStrapiContent,
} from '../../../../app/services/exhibit';
import { isNil } from '../../../../utils/lang';
import {
  FlattenedSettingsBlock,
  flattenManifestSettings,
} from '../../common/utils/settings';
import { sortControls } from '../../common/utils/sorting';

export const createSelectedControls = (
  manifestControls: Array<Control>,
  schedule: ExhibitScheduledEvent
): Array<Control> => {
  const controls = new Map<Control['id'], Control>();
  const groupItems = new Map<ControlGroupItem['uniqueId'], ControlGroupItem>();

  manifestControls.forEach((control) => {
    controls.set(control.id, control);
    if (control.type === 'Group') {
      control.items.forEach((item) => {
        groupItems.set(item.uniqueId, item);
      });
    }
  });

  return schedule.schedulecontrols
    .map((scheduleControl) => {
      const control = controls.get(scheduleControl.controlId);
      if (
        control &&
        control.type === 'Group' &&
        scheduleControl.control.type === 'Group'
      ) {
        const selectedControlGroupItem = groupItems.get(
          scheduleControl.controlGroupItemId
        );
        return {
          ...control,
          items: selectedControlGroupItem ? [selectedControlGroupItem] : [],
        };
      }
      if (
        control &&
        control.type === 'Single' &&
        scheduleControl.control.type === 'Single'
      ) {
        return control;
      }
      return undefined;
    })
    .reduce((prev: Array<Control>, nextControl) => {
      if (nextControl === undefined) {
        return prev;
      }
      const foundControl = prev.find((c) => c.id === nextControl.id);
      if (nextControl.type === 'Single' || isNil(foundControl)) {
        return [...prev, nextControl];
      }

      if (!isNil(foundControl) && foundControl.type === 'Group') {
        // Combine selected controlgroup items
        foundControl.items = foundControl.items
          .concat(nextControl.items)
          .sort(sortControls);
      }

      return prev;
    }, [])
    .sort(sortControls);
};

export const createFlattenedSettings = (
  manifest: ExhibitSettingsManifest,
  schedule: ExhibitScheduledEvent
): Array<FlattenedSettingsBlock> => {
  const flattenedManifestSettings = flattenManifestSettings(manifest);

  const scheduleSettingValues: Record<number, ScheduleSetting['value']> = {};
  schedule.schedulesettings.forEach((scheduleSetting) => {
    scheduleSettingValues[scheduleSetting.settingId] = scheduleSetting.value;
  });

  const scheduleStrapiContentValues: Record<
    number,
    ScheduleStrapiContent['value']
  > = {};
  schedule.schedulestrapicontents.forEach((scheduleStrapiContent) => {
    scheduleStrapiContentValues[scheduleStrapiContent.strapiContentId] =
      scheduleStrapiContent.value;
  });

  const flattenedSelectedSettings = flattenedManifestSettings
    .map((settingBlock) => {
      const blockSettings: Array<IndividualSetting> = settingBlock.settings
        .filter(
          (setting) =>
            (setting.type !== 'StrapiContent' &&
              scheduleSettingValues[setting.id]) ||
            (setting.type === 'StrapiContent' &&
              scheduleStrapiContentValues[setting.id])
        )
        .map((setting) =>
          setting.type !== 'StrapiContent'
            ? {
                ...setting,
                value: scheduleSettingValues[setting.id],
              }
            : {
                ...setting,
                value: {
                  id: scheduleStrapiContentValues[setting.id],
                  // hopefully the strapisetting component will fill in the blanks here
                },
              }
        ) as Array<IndividualSetting>;
      return {
        ...settingBlock,
        settings: blockSettings,
      };
    })
    .filter((settingBlock) => settingBlock.settings.length > 0);

  return flattenedSelectedSettings;
};
