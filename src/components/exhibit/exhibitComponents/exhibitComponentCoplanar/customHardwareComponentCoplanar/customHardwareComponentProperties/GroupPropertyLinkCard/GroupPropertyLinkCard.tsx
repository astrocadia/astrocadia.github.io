import { type FunctionComponent } from 'react';
import {
  MainPanelCoplanarSubpageLinkCard,
  MainPanelCoplanarSubpageLinkCardProps,
} from '../../../../../../MainPanel/MainPanelCoplanar/MainPanelCoplanarSubpageLinkCard';
import { FolderIcon } from '../../../../../../common/icons';
import './GroupPropertyLinkCard.css';

interface GroupPropertyLinkCardProps
  extends MainPanelCoplanarSubpageLinkCardProps {}

export const GroupPropertyLinkCard: FunctionComponent<
  GroupPropertyLinkCardProps
> = ({ ...props }) => {
  return (
    <div className='GroupPropertyLinkCard'>
      <MainPanelCoplanarSubpageLinkCard icon={<FolderIcon />} {...props} />
    </div>
  );
};
