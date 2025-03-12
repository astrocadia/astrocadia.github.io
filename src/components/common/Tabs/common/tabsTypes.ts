import { TabsProps as MUITabsProps } from '@mui/material';
import { ReactElement } from 'react';
import { TabProps } from '../../Tab';

export type StandardTabsProps = Omit<
  MUITabsProps,
  'TabIndicatorProps' | 'indicatorColor' | 'variant'
>;

export type TabElement = ReactElement<TabProps>;
