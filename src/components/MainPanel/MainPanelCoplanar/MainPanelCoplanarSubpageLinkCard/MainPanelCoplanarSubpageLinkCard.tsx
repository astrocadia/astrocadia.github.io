import cx from 'classnames';
import { type FunctionComponent } from 'react';
import { LinkCard, type LinkCardProps } from '../../../LinkCard';
import './MainPanelCoplanarSubpageLinkCard.css';

export type MainPanelCoplanarSubpageLinkCardProps = LinkCardProps;

export const MainPanelCoplanarSubpageLinkCard: FunctionComponent<
  MainPanelCoplanarSubpageLinkCardProps
> = ({ className, ...props }) => (
  <LinkCard
    className={cx('MainPanelCoplanarSubpageLinkCard', className)}
    {...props}
  />
);
