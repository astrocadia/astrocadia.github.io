import type { FunctionComponent, ReactElement } from 'react';
import type { ButtonProps } from '../../common/buttons';
import type { IconButtonProps } from '../../common/buttons/IconButton';
import './MainPanelHeader.css';

export interface MainPanelHeaderProps {
  actions?: Array<ReactElement<IconButtonProps> | ReactElement<ButtonProps>>;
  title: string;
  subtitle?: string;
}

export const MainPanelHeader: FunctionComponent<MainPanelHeaderProps> = ({
  actions,
  title,
  subtitle,
}) => (
  <div className='MainPanelHeader'>
    <div className='MainPanelHeader__titleWrapper'>
      <h1 className='MainPanelHeader__title'>{title}</h1>
      {subtitle && <div className='MainPanelHeader__subtitle'>{subtitle}</div>}
    </div>
    {!!actions?.length && (
      <div className='MainPanelHeader__actions'>{actions}</div>
    )}
  </div>
);
