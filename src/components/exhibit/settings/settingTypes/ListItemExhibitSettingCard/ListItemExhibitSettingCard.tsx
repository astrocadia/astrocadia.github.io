import { ReactNode, useMemo, type FunctionComponent } from 'react';
import {
  Setting,
  SettingList,
  type SettingListItem,
} from '../../../../../app/entities/exhibitManifest';
import { MainPanelCoplanarSubpageCard } from '../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageCard';
import { IconButton } from '../../../../common/buttons/IconButton';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ContentCopyIcon,
} from '../../../../common/icons';
import { sortSettings } from '../../../common/utils/sorting';
import { ListItemDeleteButton } from './ListItemDeleteButton/ListItemDeleteButton';
import './ListItemExhibitSettingCard.css';

export interface ListItemExhibitSettingCardProps extends SettingListItem {
  exhibitId: number;
  settingListId: SettingList['id'];
  manifestId: SettingList['manifestId'];
  settingListItemIndex: number;
  onCopy?: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  hideDelete?: boolean;
  renderSetting: (setting: Setting, index: number) => ReactNode;
  first?: boolean;
  last?: boolean;
}

export const ListItemExhibitSettingCard: FunctionComponent<
  ListItemExhibitSettingCardProps
> = ({
  exhibitId,
  listName,
  items,
  settingListId,
  manifestId,
  settingListItemIndex,
  onCopy,
  onMoveUp,
  onMoveDown,
  hideDelete = false,
  renderSetting: renderItem,
  first,
  last,
}) => {
  const onHandleCopy = useMemo(() => {
    if (onCopy) {
      return () => onCopy(settingListItemIndex);
    }

    return undefined;
  }, [onCopy, settingListItemIndex]);

  const onHandleMoveUp = useMemo(() => {
    if (onMoveUp) {
      return () => onMoveUp(settingListItemIndex);
    }

    return undefined;
  }, [onMoveUp, settingListItemIndex]);

  const onHandleMoveDown = useMemo(() => {
    if (onMoveDown) {
      return () => onMoveDown(settingListItemIndex);
    }

    return undefined;
  }, [onMoveDown, settingListItemIndex]);

  const showHeaderActions = useMemo(() => {
    return (
      onHandleCopy !== undefined ||
      onHandleMoveUp !== undefined ||
      onHandleMoveDown !== undefined ||
      hideDelete === false
    );
  }, [hideDelete, onHandleCopy, onHandleMoveDown, onHandleMoveUp]);

  const sortedSettings = useMemo(() => [...items].sort(sortSettings), [items]);

  return (
    <MainPanelCoplanarSubpageCard
      className='ListItemExhibitSettingCard'
      variant='block'
      title={listName}
      headerAction={
        showHeaderActions ? (
          <div className='ListItemExhibitSettingCard__actions'>
            {!!onHandleMoveUp && (
              <IconButton disabled={first} onClick={onHandleMoveUp}>
                <ArrowUpIcon />
              </IconButton>
            )}
            {!!onHandleMoveDown && (
              <IconButton disabled={last} onClick={onHandleMoveDown}>
                <ArrowDownIcon />
              </IconButton>
            )}
            {!!onHandleCopy && (
              <IconButton onClick={onHandleCopy}>
                <ContentCopyIcon />
              </IconButton>
            )}
            {hideDelete === false && (
              <ListItemDeleteButton
                exhibitId={exhibitId}
                settingListId={settingListId}
                manifestId={manifestId}
                itemName={listName}
              />
            )}
          </div>
        ) : undefined
      }
    >
      {sortedSettings.length > 0 && (
        <div className='ListItemExhibitSettingCard__settingWrapper'>
          {sortedSettings?.map(renderItem)}
        </div>
      )}
    </MainPanelCoplanarSubpageCard>
  );
};
