import { FunctionComponent } from 'react';
import cx from 'classnames';
import { Divider } from '../../common/Divider';
import './MainPanelContentDivider.css';

interface MainPanelContentDividerProps {
  className?: string;
}

export const MainPanelContentDivider: FunctionComponent<
  MainPanelContentDividerProps
> = ({ className }) => (
  <Divider className={cx('MainPanelContentDivider', className)} />
);
