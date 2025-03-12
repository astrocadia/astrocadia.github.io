import { FunctionComponent, PropsWithChildren } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { GumbandDateAdapter } from './gumbandDateAdapter';

export const GumbandDateProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <LocalizationProvider dateAdapter={GumbandDateAdapter}>
    {children}
  </LocalizationProvider>
);
