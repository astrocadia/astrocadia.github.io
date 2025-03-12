import { Tabs as MUITabs } from '@mui/material';
import { FunctionComponent } from 'react';
import './StandardTabs.css';
import cx from 'classnames';
import { StandardTabsProps } from '../common/tabsTypes';

export const StandardTabs: FunctionComponent<StandardTabsProps> = ({
  children,
  className,
  value,
  ...props
}) => {
  return (
    <MUITabs className={cx(className, 'StandardTabs')} value={value} {...props}>
      {children}
    </MUITabs>
  );
};
