import { FunctionComponent, ReactNode } from 'react';
import cx from 'classnames';
import './MainPanelContent.css';

export interface MainPanelContentProps {
  children: ReactNode;
  className?: string;
}

export const MainPanelContent: FunctionComponent<MainPanelContentProps> = ({
  children,
  className,
}) => <div className={cx('MainPanelContent', className)}>{children}</div>;
