import {
  AccordionSummary as MUIAccordionSummary,
  type AccordionSummaryProps as MUIAccordionSummaryProps,
} from '@mui/material';
import { type FunctionComponent } from 'react';

export type AccordionSummaryProps = Omit<MUIAccordionSummaryProps, 'sx'>;

export const AccordionSummary: FunctionComponent<AccordionSummaryProps> = (
  props
) => <MUIAccordionSummary {...props} />;
