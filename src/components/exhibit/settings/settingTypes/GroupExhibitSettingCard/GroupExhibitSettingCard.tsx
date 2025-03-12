import { useCallback, useMemo, type FunctionComponent } from 'react';
import type {
  Setting,
  SettingGroup,
} from '../../../../../app/entities/exhibitManifest';
import { FolderIcon } from '../../../../common/icons';
import {
  MainPanelCoplanarSubpageLinkCard,
  MainPanelCoplanarSubpageLinkCardProps,
} from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageLinkCard';
import { hasDecendentChanged } from '../../common/utils/decendentUtils';

export interface GroupExhibitSettingCardProps
  extends Omit<
    MainPanelCoplanarSubpageLinkCardProps,
    'label' | 'icon' | 'marked' | 'onClick' | 'onSelect'
  > {
  manifestIdsWithPendingChanges?: Set<Setting['manifestId']>;
  disabled?: boolean;
  settingGroup: SettingGroup;
  onSelect: (settingGroup: SettingGroup) => void;
}

export const GroupExhibitSettingCard: FunctionComponent<
  GroupExhibitSettingCardProps
> = ({
  manifestIdsWithPendingChanges,
  disabled,
  settingGroup,
  onSelect,
  ...rest
}) => {
  const handleOnSelect = useCallback(() => {
    onSelect(settingGroup);
  }, [onSelect, settingGroup]);

  const hasChanged = useMemo(
    () =>
      hasDecendentChanged(
        settingGroup.manifestId,
        manifestIdsWithPendingChanges
      ),
    [manifestIdsWithPendingChanges, settingGroup.manifestId]
  );

  return (
    <MainPanelCoplanarSubpageLinkCard
      label={settingGroup.groupDisplay}
      icon={<FolderIcon />}
      marked={hasChanged}
      onClick={disabled ? undefined : handleOnSelect}
      {...rest}
    />
  );
};
