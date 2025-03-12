import { type FunctionComponent, useCallback, useMemo } from 'react';
import {
  type Setting,
  type SettingList,
} from '../../../../../app/entities/exhibitManifest';
import {
  MainPanelCoplanarSubpageLinkCard,
  MainPanelCoplanarSubpageLinkCardProps,
} from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageLinkCard';
import { SettingListIcon } from '../../../../common/icons';
import { hasDecendentChanged } from '../../common/utils/decendentUtils';

export interface ListExhibitSettingCardProps
  extends Omit<
    MainPanelCoplanarSubpageLinkCardProps,
    'label' | 'icon' | 'marked' | 'onClick' | 'onSelect'
  > {
  manifestIdsWithPendingChanges?: Set<Setting['manifestId']>;
  disabled?: boolean;
  settingList: SettingList;
  onSelect: (settingList: SettingList) => void;
}

export const ListExhibitSettingCard: FunctionComponent<
  ListExhibitSettingCardProps
> = ({
  manifestIdsWithPendingChanges,
  disabled,
  settingList,
  onSelect,
  ...rest
}) => {
  const handleOnSelect = useCallback(() => {
    onSelect(settingList);
  }, [onSelect, settingList]);

  const hasChanged = useMemo(
    () =>
      hasDecendentChanged(
        settingList.manifestId,
        manifestIdsWithPendingChanges
      ),
    [manifestIdsWithPendingChanges, settingList.manifestId]
  );

  return (
    <MainPanelCoplanarSubpageLinkCard
      label={settingList.listDisplay}
      icon={<SettingListIcon />}
      marked={hasChanged}
      onClick={disabled ? undefined : handleOnSelect}
      {...rest}
    />
  );
};
