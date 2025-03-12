import { type FunctionComponent } from 'react';
import { OpMode } from '../../../../../app/entities/exhibit';
import { BreadcrumbItem } from '../../../../common/BreadcrumbItem';
import { Breadcrumbs } from '../../../../common/Breadcrumbs';
import { ExhibitSettingsIcon } from '../../../../common/icons';
import { FlattenedSettingsBlock } from '../../../common/utils/settings';
import { ExhibitSetting } from '../../../settings/ExhibitSetting';
import {
  OperatingModeSetting,
  OperatingModeSettingProps,
} from '../../../settings/OperatingModeSetting';
import { addRemoveButtonProps } from '../common/addRemoveButtonProps';
import { ScheduleSelectedPropertiesCard } from '../common/ScheduleSelectedPropertiesCard';
import './SelectedExhibitSettingsCard.css';

export interface SelectedExhibitSettingsCardProps {
  onButtonClick: () => void;
  opMode: OpMode | null;
  onOpModeChange: OperatingModeSettingProps['onChange'];
  selectedExhibitSettings: Array<FlattenedSettingsBlock>;
  onSettingValueChange: (
    id: number,
    manifestId: string,
    value: string | number | null,
    reset: boolean
  ) => void;
}

export const SelectedExhibitSettingsCard: FunctionComponent<
  SelectedExhibitSettingsCardProps
> = ({
  onButtonClick,
  opMode,
  onOpModeChange,
  selectedExhibitSettings,
  onSettingValueChange,
}) => {
  return (
    <ScheduleSelectedPropertiesCard
      className='SelectedExhibitSettingsCard'
      label='Settings'
      buttonProps={{
        onClick: onButtonClick,
        ...addRemoveButtonProps,
      }}
      badgeProps={{ Icon: ExhibitSettingsIcon }}
    >
      {opMode && (
        <OperatingModeSetting
          onChange={onOpModeChange}
          value={opMode}
          updatedValue={opMode}
          hideHelperText
        />
      )}
      {selectedExhibitSettings.map((settingBlock) => (
        <div
          className='SelectedExhibitSettingsCard__settingBlock'
          key={`settingBlock-${settingBlock.breadcrumbs?.at(-1)?.manifestId || 'all'}`}
        >
          {!!settingBlock?.breadcrumbs?.length && (
            <Breadcrumbs className='SelectedExhibitSettingsCard__settingBlockBreadcrumbs'>
              <BreadcrumbItem key='all' label='All' />
              {settingBlock.breadcrumbs.map((breadcrumb) => (
                <BreadcrumbItem
                  key={breadcrumb.manifestId}
                  label={breadcrumb.label}
                />
              ))}
            </Breadcrumbs>
          )}
          {/* the onSelect method only applies to settinglist and settinggroup link cards and we do not render those in this component */}
          {settingBlock.settings.map((setting) => (
            <ExhibitSetting
              key={`setting-${setting.manifestId}`}
              exhibitId={setting.exhibitId}
              setting={setting}
              onSelect={() => {}}
              onChange={onSettingValueChange}
              updatedValue={
                setting.type === 'StrapiContent'
                  ? setting.value?.id?.toString()
                  : setting.value
              }
            />
          ))}
        </div>
      ))}
    </ScheduleSelectedPropertiesCard>
  );
};
